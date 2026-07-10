import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  limit,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  revalidateTag,
} from "next/cache";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { TAGS } from 'lib/constants';
import { Cart, CartItem, Collection, Menu, Page, Product, ProductVariant } from './types';

// Helper to generate a random ID
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

// ----------------------------------------------------
// Cart Operations
// ----------------------------------------------------

export async function createCart(): Promise<Cart> {
  const cartId = generateId();
  const newCart: Cart = {
    id: cartId,
    checkoutUrl: '/checkout', // URL for the fake checkout demo
    cost: {
      subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
      totalAmount: { amount: '0.00', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0.00', currencyCode: 'USD' }
    },
    lines: [],
    totalQuantity: 0
  };

  await setDoc(doc(db, 'carts', cartId), newCart);
  return newCart;
}

export async function getCart(): Promise<Cart | undefined> {
  "use cache: private";
  cacheTag(TAGS.cart);
  cacheLife("seconds");

  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) return undefined;

  const cartDoc = await getDoc(doc(db, 'carts', cartId));
  if (!cartDoc.exists()) return undefined;

  return cartDoc.data() as Cart;
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) throw new Error('Cart not found');

  const cartDocRef = doc(db, 'carts', cartId);
  const cartDoc = await getDoc(cartDocRef);
  if (!cartDoc.exists()) throw new Error('Cart not found');

  const cart = cartDoc.data() as Cart;

  for (const line of lines) {
    const existingLineIndex = cart.lines.findIndex(
      (l) => l.merchandise.id === line.merchandiseId
    );

    if (existingLineIndex > -1) {
      // Update quantity
      cart.lines[existingLineIndex]!.quantity += line.quantity;
    } else {
      // Find the product and variant in Firestore
      const productsSnapshot = await getDocs(collection(db, 'products'));
      let foundProduct: Product | undefined;
      let foundVariant: ProductVariant | undefined;

      for (const pDoc of productsSnapshot.docs) {
        const prod = pDoc.data() as Product;
        const variant = prod.variants.find((v) => v.id === line.merchandiseId);
        if (variant) {
          foundProduct = prod;
          foundVariant = variant;
          break;
        }
      }

      if (!foundProduct || !foundVariant) {
        throw new Error('Product or variant not found');
      }

      const cartItem: CartItem & { unitPrice?: any } = {
        id: generateId(),
        quantity: line.quantity,
        cost: {
          totalAmount: {
            amount: foundVariant.price.amount,
            currencyCode: foundVariant.price.currencyCode
          }
        },
        merchandise: {
          id: foundVariant.id,
          title: foundVariant.title,
          selectedOptions: foundVariant.selectedOptions,
          product: {
            id: foundProduct.id,
            handle: foundProduct.handle,
            title: foundProduct.title,
            featuredImage: foundProduct.featuredImage
          }
        },
        unitPrice: {
          amount: foundVariant.price.amount,
          currencyCode: foundVariant.price.currencyCode
        }
      };

      cart.lines.push(cartItem);
    }
  }

  // Recalculate totals
  recalculateCartTotals(cart);
  await setDoc(cartDocRef, cart);
  return cart;
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) throw new Error('Cart not found');

  const cartDocRef = doc(db, 'carts', cartId);
  const cartDoc = await getDoc(cartDocRef);
  if (!cartDoc.exists()) throw new Error('Cart not found');

  const cart = cartDoc.data() as Cart;
  cart.lines = cart.lines.filter((line) => !lineIds.includes(line.id || ''));

  recalculateCartTotals(cart);
  await setDoc(cartDocRef, cart);
  return cart;
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) throw new Error('Cart not found');

  const cartDocRef = doc(db, 'carts', cartId);
  const cartDoc = await getDoc(cartDocRef);
  if (!cartDoc.exists()) throw new Error('Cart not found');

  const cart = cartDoc.data() as Cart;

  for (const line of lines) {
    const existingLineIndex = cart.lines.findIndex((l) => l.id === line.id);
    if (existingLineIndex > -1) {
      if (line.quantity <= 0) {
        cart.lines.splice(existingLineIndex, 1);
      } else {
        cart.lines[existingLineIndex]!.quantity = line.quantity;
      }
    }
  }

  recalculateCartTotals(cart);
  await setDoc(cartDocRef, cart);
  return cart;
}

function recalculateCartTotals(cart: Cart) {
  let totalQuantity = 0;
  let currencyCode = 'USD';
  let subtotal = 0;

  cart.lines.forEach((line: any) => {
    // Retain unit price to calculate correctly when quantity changes
    if (!line.unitPrice) {
      line.unitPrice = { ...line.cost.totalAmount };
    }
    const unitPrice = parseFloat(line.unitPrice.amount) || 0;
    const lineTotal = unitPrice * line.quantity;
    
    line.cost.totalAmount.amount = lineTotal.toFixed(2);
    subtotal += lineTotal;
    totalQuantity += line.quantity;
    currencyCode = line.cost.totalAmount.currencyCode;
  });

  cart.totalQuantity = totalQuantity;
  cart.cost = {
    subtotalAmount: { amount: subtotal.toFixed(2), currencyCode },
    totalAmount: { amount: subtotal.toFixed(2), currencyCode },
    totalTaxAmount: { amount: '0.00', currencyCode }
  };
}

// ----------------------------------------------------
// Product Operations
// ----------------------------------------------------

export async function getProduct(handle: string): Promise<Product | undefined> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  const q = query(collection(db, 'products'), where('handle', '==', handle), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return undefined;
  }

  return querySnapshot.docs[0]!.data() as Product;
}

export async function getProducts({
  query: searchQuery,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  let q = query(collection(db, 'products'));

  // Firestore ordering (simplified - if index is not present, we fall back to in-memory sorting)
  // Let's retrieve all and sort/filter in memory to make it bulletproof and index-free for the demo.
  const querySnapshot = await getDocs(q);
  let products = querySnapshot.docs.map((doc) => doc.data() as Product);

  // Search filter
  if (searchQuery) {
    const lowercaseQuery = searchQuery.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Sort logic
  if (sortKey === 'PRICE') {
    products.sort((a, b) => {
      const aPrice = parseFloat(a.priceRange.minVariantPrice.amount);
      const bPrice = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? bPrice - aPrice : aPrice - bPrice;
    });
  } else if (sortKey === 'CREATED_AT') {
    products.sort((a, b) => {
      const aTime = new Date(a.updatedAt).getTime();
      const bTime = new Date(b.updatedAt).getTime();
      return reverse ? bTime - aTime : aTime - bTime;
    });
  } else {
    // Default: Sort by title
    products.sort((a, b) => {
      return reverse ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
    });
  }

  return products;
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  const q = query(collection(db, 'products'), limit(4));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => doc.data() as Product);

  // Filter out current product
  return products.filter((p) => p.id !== productId);
}

// ----------------------------------------------------
// Collection Operations
// ----------------------------------------------------

export async function getCollection(handle: string): Promise<Collection | undefined> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  const q = query(collection(db, 'collections'), where('handle', '==', handle), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return undefined;
  }

  return querySnapshot.docs[0]!.data() as Collection;
}

export async function getCollections(): Promise<Collection[]> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  const querySnapshot = await getDocs(collection(db, 'collections'));
  const collections = querySnapshot.docs.map((doc) => doc.data() as Collection);

  // Always append an "All" collection if it's not present
  const hasAll = collections.some((c) => c.handle === '');
  if (!hasAll) {
    collections.unshift({
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All Products',
        description: 'Browse all products in our store'
      },
      updatedAt: new Date().toISOString(),
      path: '/search'
    });
  }

  return collections;
}

export async function getCollectionProducts({
  collection: collectionHandle,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.collections, TAGS.products);
  cacheLife("days");

  if (!collectionHandle) {
    return getProducts({ reverse, sortKey });
  }

  // Filter in memory for maximum robustness for demo
  const allProducts = await getProducts({ reverse, sortKey });
  return allProducts.filter((p) => p.collectionIds && p.collectionIds.includes(collectionHandle));
}

// ----------------------------------------------------
// CMS and Menu Operations
// ----------------------------------------------------

export async function getMenu(handle: string): Promise<Menu[]> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  const q = query(collection(db, 'menus'), where('handle', '==', handle), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    // Demo fallback navigation menus
    if (handle === 'nextjs-frontend-header-menu') {
      return [
        { title: 'All', path: '/search' },
        { title: 'Shirts', path: '/search/shirts' },
        { title: 'Stickers', path: '/search/stickers' }
      ];
    }
    if (handle === 'nextjs-frontend-footer-menu') {
      return [
        { title: 'About', path: '/about' },
        { title: 'Terms & Conditions', path: '/terms-of-service' },
        { title: 'Privacy Policy', path: '/privacy-policy' }
      ];
    }
    return [];
  }

  const menuData = querySnapshot.docs[0]!.data();
  return menuData.items || [];
}

export async function getPage(handle: string): Promise<Page> {
  const q = query(collection(db, 'pages'), where('handle', '==', handle), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    // Fallback static page for demo
    return {
      id: `page_${handle}`,
      title: handle === 'about' ? 'About Us' : handle.toUpperCase(),
      handle: handle,
      body: `This is a placeholder page for "${handle}". Populate this in Firestore to customize.`,
      bodySummary: `Placeholder for ${handle}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  return querySnapshot.docs[0]!.data() as Page;
}

export async function getPages(): Promise<Page[]> {
  const querySnapshot = await getDocs(collection(db, 'pages'));
  return querySnapshot.docs.map((doc) => doc.data() as Page);
}

// ----------------------------------------------------
// Revalidation
// ----------------------------------------------------

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // Can be called to purge cache tags. Since this is Firestore, we can trigger it manually.
  const tag = req.nextUrl.searchParams.get('tag');
  if (tag) {
    revalidateTag(tag, "seconds");
    return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
  }
  return NextResponse.json({ status: 400, message: 'Missing tag' });
}

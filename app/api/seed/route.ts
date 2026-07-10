import { db } from 'lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

const collectionsData = [
  {
    handle: 'shirts',
    title: 'Shirts',
    description: 'Beautiful t-shirts, hoodies, and sweatshirts.',
    path: '/search/shirts',
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Shirts & Apparel - Acme Commerce',
      description: 'Explore our shirt and apparel collection'
    }
  },
  {
    handle: 'stickers',
    title: 'Stickers',
    description: 'Waterproof vinyl stickers for your laptop or water bottle.',
    path: '/search/stickers',
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Stickers - Acme Commerce',
      description: 'Explore our sticker collection'
    }
  },
  {
    handle: 'accessories',
    title: 'Accessories',
    description: 'High-quality backpacks, caps, mugs, and notebooks.',
    path: '/search/accessories',
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Accessories - Acme Commerce',
      description: 'Explore our accessories collection'
    }
  }
];

const productsData = [
  {
    id: 'prod_tshirt',
    handle: 'acme-tshirt',
    availableForSale: true,
    title: 'Acme T-Shirt',
    description: 'A classic cotton t-shirt with the Acme logo.',
    descriptionHtml: '<p>A classic cotton t-shirt with the Acme logo.</p>',
    collectionIds: ['shirts'],
    tags: ['shirt', 'apparel', 'cotton'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/111/fff?text=Acme+T-Shirt',
      altText: 'Acme T-Shirt',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/111/fff?text=Acme+T-Shirt',
        altText: 'Acme T-Shirt Front',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_size',
        name: 'Size',
        values: ['S', 'M', 'L']
      },
      {
        id: 'opt_color',
        name: 'Color',
        values: ['Black', 'White']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '20.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '25.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_tshirt_black_s',
        title: 'Black / S',
        availableForSale: true,
        price: { amount: '20.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Black' },
          { name: 'Size', value: 'S' }
        ]
      },
      {
        id: 'var_tshirt_black_m',
        title: 'Black / M',
        availableForSale: true,
        price: { amount: '22.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Black' },
          { name: 'Size', value: 'M' }
        ]
      },
      {
        id: 'var_tshirt_white_l',
        title: 'White / L',
        availableForSale: true,
        price: { amount: '25.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'White' },
          { name: 'Size', value: 'L' }
        ]
      }
    ],
    seo: {
      title: 'Acme T-Shirt - Next.js Commerce',
      description: 'Get the classic Acme cotton t-shirt today.'
    }
  },
  {
    id: 'prod_hoodie',
    handle: 'acme-hoodie',
    availableForSale: true,
    title: 'Acme Hoodie',
    description: 'A cozy cotton-blend hoodie perfect for cooler weather.',
    descriptionHtml: '<p>A cozy cotton-blend hoodie perfect for cooler weather.</p>',
    collectionIds: ['shirts'],
    tags: ['hoodie', 'apparel', 'cozy'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/222/fff?text=Acme+Hoodie',
      altText: 'Acme Hoodie',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/222/fff?text=Acme+Hoodie',
        altText: 'Acme Hoodie Front',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_size',
        name: 'Size',
        values: ['M', 'L']
      },
      {
        id: 'opt_color',
        name: 'Color',
        values: ['Gray', 'Black']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '45.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '50.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_hoodie_gray_m',
        title: 'Gray / M',
        availableForSale: true,
        price: { amount: '45.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Gray' },
          { name: 'Size', value: 'M' }
        ]
      },
      {
        id: 'var_hoodie_black_l',
        title: 'Black / L',
        availableForSale: true,
        price: { amount: '50.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Black' },
          { name: 'Size', value: 'L' }
        ]
      }
    ],
    seo: {
      title: 'Acme Hoodie - Next.js Commerce',
      description: 'Shop the premium cozy Acme hoodie.'
    }
  },
  {
    id: 'prod_cap',
    handle: 'acme-cap',
    availableForSale: true,
    title: 'Acme Cap',
    description: 'A stylish snapback cap with embroidered Acme logo.',
    descriptionHtml: '<p>A stylish snapback cap with embroidered Acme logo.</p>',
    collectionIds: ['accessories'],
    tags: ['cap', 'accessory', 'headwear'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/333/fff?text=Acme+Cap',
      altText: 'Acme Cap',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/333/fff?text=Acme+Cap',
        altText: 'Acme Cap Front',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_color',
        name: 'Color',
        values: ['Black', 'Navy']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '15.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '15.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_cap_black',
        title: 'Black',
        availableForSale: true,
        price: { amount: '15.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }]
      },
      {
        id: 'var_cap_navy',
        title: 'Navy',
        availableForSale: true,
        price: { amount: '15.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Navy' }]
      }
    ],
    seo: {
      title: 'Acme Cap - Next.js Commerce',
      description: 'Get the Acme embroidered snapback cap.'
    }
  },
  {
    id: 'prod_mug',
    handle: 'acme-mug',
    availableForSale: true,
    title: 'Acme Mug',
    description: 'A matte ceramic mug for your coffee or tea.',
    descriptionHtml: '<p>A matte ceramic mug for your coffee or tea.</p>',
    collectionIds: ['accessories'],
    tags: ['mug', 'accessory', 'kitchen'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/444/fff?text=Acme+Mug',
      altText: 'Acme Mug',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/444/fff?text=Acme+Mug',
        altText: 'Acme Mug Side',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_default',
        name: 'Title',
        values: ['Default Title']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '12.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '12.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_mug_default',
        title: 'Default Title',
        availableForSale: true,
        price: { amount: '12.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Title', value: 'Default Title' }]
      }
    ],
    seo: {
      title: 'Acme Ceramic Mug - Next.js Commerce',
      description: 'A premium ceramic mug for coffee lovers.'
    }
  },
  {
    id: 'prod_sticker',
    handle: 'acme-sticker',
    availableForSale: true,
    title: 'Acme Sticker Pack',
    description: 'A collection of 5 waterproof vinyl stickers with custom Acme designs.',
    descriptionHtml: '<p>A collection of 5 waterproof vinyl stickers with custom Acme designs.</p>',
    collectionIds: ['stickers'],
    tags: ['sticker', 'accessory', 'vinyl'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/555/fff?text=Acme+Sticker+Pack',
      altText: 'Acme Sticker Pack',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/555/fff?text=Acme+Sticker+Pack',
        altText: 'Acme Sticker Pack Group',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_default',
        name: 'Title',
        values: ['Default Title']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '8.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '8.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_sticker_default',
        title: 'Default Title',
        availableForSale: true,
        price: { amount: '8.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Title', value: 'Default Title' }]
      }
    ],
    seo: {
      title: 'Acme Sticker Pack - Next.js Commerce',
      description: 'Waterproof vinyl stickers for developers.'
    }
  },
  {
    id: 'prod_backpack',
    handle: 'acme-backpack',
    availableForSale: true,
    title: 'Acme Backpack',
    description: 'A durable water-resistant backpack with a dedicated laptop compartment.',
    descriptionHtml: '<p>A durable water-resistant backpack with a dedicated laptop compartment.</p>',
    collectionIds: ['accessories'],
    tags: ['backpack', 'accessory', 'travel'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/666/fff?text=Acme+Backpack',
      altText: 'Acme Backpack',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/666/fff?text=Acme+Backpack',
        altText: 'Acme Backpack Front',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_color',
        name: 'Color',
        values: ['Black', 'Olive']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '45.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '45.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_backpack_black',
        title: 'Black',
        availableForSale: true,
        price: { amount: '45.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }]
      },
      {
        id: 'var_backpack_olive',
        title: 'Olive',
        availableForSale: true,
        price: { amount: '45.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Olive' }]
      }
    ],
    seo: {
      title: 'Acme Backpack - Next.js Commerce',
      description: 'Durable water-resistant developer backpack.'
    }
  },
  {
    id: 'prod_notebook',
    handle: 'acme-notebook',
    availableForSale: true,
    title: 'Acme Notebook',
    description: 'Dotted grid notebook with synthetic leather cover.',
    descriptionHtml: '<p>Dotted grid notebook with synthetic leather cover.</p>',
    collectionIds: ['accessories'],
    tags: ['notebook', 'accessory', 'office'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/777/fff?text=Acme+Notebook',
      altText: 'Acme Notebook',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/777/fff?text=Acme+Notebook',
        altText: 'Acme Notebook Dotted',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_size',
        name: 'Size',
        values: ['A5', 'A4']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '10.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '14.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_notebook_a5',
        title: 'A5',
        availableForSale: true,
        price: { amount: '10.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Size', value: 'A5' }]
      },
      {
        id: 'var_notebook_a4',
        title: 'A4',
        availableForSale: true,
        price: { amount: '14.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Size', value: 'A4' }]
      }
    ],
    seo: {
      title: 'Acme Dotted Notebook - Next.js Commerce',
      description: 'A premium dotted grid notebook for planning.'
    }
  },
  {
    id: 'prod_socks',
    handle: 'acme-socks',
    availableForSale: true,
    title: 'Acme Socks',
    description: 'Comfortable athletic crew socks with Acme logo.',
    descriptionHtml: '<p>Comfortable athletic crew socks with Acme logo.</p>',
    collectionIds: ['shirts'],
    tags: ['socks', 'apparel', 'cotton'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/888/fff?text=Acme+Socks',
      altText: 'Acme Socks',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/888/fff?text=Acme+Socks',
        altText: 'Acme Socks Crew',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_color',
        name: 'Color',
        values: ['White', 'Black']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '9.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '9.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_socks_white',
        title: 'White',
        availableForSale: true,
        price: { amount: '9.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'White' }]
      },
      {
        id: 'var_socks_black',
        title: 'Black',
        availableForSale: true,
        price: { amount: '9.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Color', value: 'Black' }]
      }
    ],
    seo: {
      title: 'Acme Socks - Next.js Commerce',
      description: 'Get the official Acme crew socks.'
    }
  },
  {
    id: 'prod_bottle',
    handle: 'acme-bottle',
    availableForSale: true,
    title: 'Acme Water Bottle',
    description: 'Double-walled vacuum insulated stainless steel water bottle.',
    descriptionHtml: '<p>Double-walled vacuum insulated stainless steel water bottle.</p>',
    collectionIds: ['accessories'],
    tags: ['bottle', 'accessory', 'drinkware'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/999/fff?text=Acme+Bottle',
      altText: 'Acme Water Bottle',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/999/fff?text=Acme+Bottle',
        altText: 'Acme Water Bottle Insulated',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_size',
        name: 'Size',
        values: ['500ml', '750ml']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '18.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '22.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_bottle_500',
        title: '500ml',
        availableForSale: true,
        price: { amount: '18.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Size', value: '500ml' }]
      },
      {
        id: 'var_bottle_750',
        title: '750ml',
        availableForSale: true,
        price: { amount: '22.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Size', value: '750ml' }]
      }
    ],
    seo: {
      title: 'Acme Insulated Water Bottle - Next.js Commerce',
      description: 'Keep your drinks cold or hot with our insulated bottle.'
    }
  },
  {
    id: 'prod_keychain',
    handle: 'acme-keychain',
    availableForSale: true,
    title: 'Acme Keychain',
    description: 'Enamel metal keychain featuring the Acme corporate logo.',
    descriptionHtml: '<p>Enamel metal keychain featuring the Acme corporate logo.</p>',
    collectionIds: ['accessories'],
    tags: ['keychain', 'accessory', 'metal'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://placehold.co/600x600/aaa/fff?text=Acme+Keychain',
      altText: 'Acme Keychain',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://placehold.co/600x600/aaa/fff?text=Acme+Keychain',
        altText: 'Acme Keychain Metal',
        width: 600,
        height: 600
      }
    ],
    options: [
      {
        id: 'opt_default',
        name: 'Title',
        values: ['Default Title']
      }
    ],
    priceRange: {
      minVariantPrice: { amount: '4.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '4.00', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'var_keychain_default',
        title: 'Default Title',
        availableForSale: true,
        price: { amount: '4.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Title', value: 'Default Title' }]
      }
    ],
    seo: {
      title: 'Acme Keychain - Next.js Commerce',
      description: 'Get the official Acme metal keychain.'
    }
  }
];

const menusData = [
  {
    handle: 'nextjs-frontend-header-menu',
    items: [
      { title: 'All', path: '/search' },
      { title: 'Shirts', path: '/search/shirts' },
      { title: 'Stickers', path: '/search/stickers' },
      { title: 'Accessories', path: '/search/accessories' }
    ]
  },
  {
    handle: 'nextjs-frontend-footer-menu',
    items: [
      { title: 'About', path: '/about' },
      { title: 'Terms of Service', path: '/terms-of-service' },
      { title: 'Privacy Policy', path: '/privacy-policy' }
    ]
  }
];

const pagesData = [
  {
    id: 'page_about',
    title: 'About Us',
    handle: 'about',
    body: 'Welcome to Acme Commerce! We are a demo e-commerce store backed by Google Cloud Firestore.',
    bodySummary: 'About our company and demo store.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'About Us - Acme Commerce',
      description: 'Read about our history and values.'
    }
  }
];

export async function GET() {
  console.log('Starting seed process via Client Web SDK endpoints...');
  try {
    // 1. Seed Collections
    for (const coll of collectionsData) {
      await setDoc(doc(db, 'collections', coll.handle), coll);
    }

    // 2. Seed Products
    for (const prod of productsData) {
      await setDoc(doc(db, 'products', prod.id), prod);
    }

    // 3. Seed Menus
    for (const menu of menusData) {
      await setDoc(doc(db, 'menus', menu.handle), menu);
    }

    // 4. Seed Pages
    for (const pg of pagesData) {
      await setDoc(doc(db, 'pages', pg.handle), pg);
    }

    return NextResponse.json({
      success: true,
      message: 'Base de datos poblada con éxito con 10 productos, colecciones, menús y páginas.'
    });
  } catch (error: any) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';

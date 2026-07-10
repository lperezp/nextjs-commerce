import { db } from 'lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { collectionsData, productsData, menusData, pagesData } from 'lib/seed-data';

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

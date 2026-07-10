const fs = require('fs');
const path = require('path');

// Parse .env.local manually
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env.local file not found at', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'lperezp-ecommerce',
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const data = require('./seed');

async function run() {
  const { initializeApp } = await import('firebase/app');
  const { getFirestore, doc, setDoc } = await import('firebase/firestore');

  console.log(`Starting client-side seed for Firestore on project: ${firebaseConfig.projectId}...`);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // 1. Seed Collections
  console.log('Seeding collections...');
  for (const coll of data.collectionsData) {
    await setDoc(doc(db, 'collections', coll.handle), coll);
    console.log(`- Seeded collection: ${coll.title}`);
  }

  // 2. Seed Products
  console.log('Seeding products...');
  for (const prod of data.productsData) {
    await setDoc(doc(db, 'products', prod.id), prod);
    console.log(`- Seeded product: ${prod.title}`);
  }

  // 3. Seed Menus
  console.log('Seeding menus...');
  for (const menu of data.menusData) {
    await setDoc(doc(db, 'menus', menu.handle), menu);
    console.log(`- Seeded menu: ${menu.handle}`);
  }

  // 4. Seed Pages
  console.log('Seeding pages...');
  for (const pg of data.pagesData) {
    await setDoc(doc(db, 'pages', pg.handle), pg);
    console.log(`- Seeded page: ${pg.title}`);
  }

  console.log('Seeding completed successfully!');
}

run().catch((err) => {
  console.error('Error during seeding:', err);
  process.exit(1);
});

export const collectionsData = [
  {
    handle: 'shirts',
    title: 'Shirts',
    description: 'Beautiful t-shirts, hoodies, and sweatshirts.',
    path: '/search/shirts',
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Shirts & Apparel - Fireshop',
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
      title: 'Stickers - Fireshop',
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
      title: 'Accessories - Fireshop',
      description: 'Explore our accessories collection'
    }
  },
  {
    handle: 'hidden-homepage-featured-items',
    title: 'Homepage Featured',
    description: 'Featured items on the homepage.',
    path: '/search/hidden-homepage-featured-items',
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Homepage Featured - Fireshop',
      description: 'Explore our featured homepage items'
    }
  },
  {
    handle: 'hidden-homepage-carousel',
    title: 'Homepage Carousel',
    description: 'Carousel items on the homepage.',
    path: '/search/hidden-homepage-carousel',
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Homepage Carousel - Fireshop',
      description: 'Explore our homepage carousel items'
    }
  }
];

export const productsData = [
  {
    id: 'prod_tshirt',
    handle: 'acme-tshirt',
    availableForSale: true,
    title: 'Acme T-Shirt',
    description: 'A classic cotton t-shirt with the Acme logo.',
    descriptionHtml: '<p>A classic cotton t-shirt with the Acme logo.</p>',
    collectionIds: ['shirts', 'hidden-homepage-featured-items', 'hidden-homepage-carousel'],
    tags: ['shirt', 'apparel', 'cotton'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://i.ibb.co/ym0GSQC0/Gemini-Generated-Image-t-shirt-Photoroom.png',
      altText: 'Acme T-Shirt',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/ym0GSQC0/Gemini-Generated-Image-t-shirt-Photoroom.png',
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
      title: 'Acme T-Shirt - Fireshop',
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
    collectionIds: ['shirts', 'hidden-homepage-featured-items', 'hidden-homepage-carousel'],
    tags: ['hoodie', 'apparel', 'cozy'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://i.ibb.co/1fW3PD5M/Gemini-Generated-Image-hoddie-Photoroom.png',
      altText: 'Acme Hoodie',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/1fW3PD5M/Gemini-Generated-Image-hoddie-Photoroom.png',
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
      title: 'Acme Hoodie - Fireshop',
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
    collectionIds: ['accessories', 'hidden-homepage-featured-items', 'hidden-homepage-carousel'],
    tags: ['cap', 'accessory', 'headwear'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://i.ibb.co/ZR6nWg5K/Gemini-Generated-Image-cap-Photoroom.png',
      altText: 'Acme Cap',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/ZR6nWg5K/Gemini-Generated-Image-cap-Photoroom.png',
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
      title: 'Acme Cap - Fireshop',
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
    collectionIds: ['accessories', 'hidden-homepage-carousel'],
    tags: ['mug', 'accessory', 'kitchen'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://i.ibb.co/HfGbKdTK/Gemini-Generated-Image-mug-Photoroom.png',
      altText: 'Acme Mug',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/HfGbKdTK/Gemini-Generated-Image-mug-Photoroom.png',
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
      title: 'Acme Ceramic Mug - Fireshop',
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
    collectionIds: ['stickers', 'hidden-homepage-carousel'],
    tags: ['sticker', 'accessory', 'vinyl'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://i.ibb.co/qPF2brF/Gemini-Generated-Image-sticker-Photoroom.png',
      altText: 'Acme Sticker Pack',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/qPF2brF/Gemini-Generated-Image-sticker-Photoroom.png',
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
      title: 'Acme Sticker Pack - Fireshop',
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
    collectionIds: ['accessories', 'hidden-homepage-carousel'],
    tags: ['backpack', 'accessory', 'travel'],
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: 'https://i.ibb.co/MxWgmfmb/Gemini-Generated-Image-sdvgkrsdvgkrsdvg-1.png',
      altText: 'Acme Backpack',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/MxWgmfmb/Gemini-Generated-Image-sdvgkrsdvgkrsdvg-1.png',
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
      title: 'Acme Backpack - Fireshop',
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
      url: 'https://i.ibb.co/d0WQ3kG3/Gemini-Generated-Image-notebook-Photoroom.png',
      altText: 'Acme Notebook',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/d0WQ3kG3/Gemini-Generated-Image-notebook-Photoroom.png',
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
      title: 'Acme Dotted Notebook - Fireshop',
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
      url: 'https://i.ibb.co/JwqMS1VQ/Gemini-Generated-Image-sock-Photoroom.png',
      altText: 'Acme Socks',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/JwqMS1VQ/Gemini-Generated-Image-sock-Photoroom.png',
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
      title: 'Acme Socks - Fireshop',
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
      url: 'https://i.ibb.co/Z6QzSkP3/Gemini-Generated-Image-bottle-Photoroom.png',
      altText: 'Acme Water Bottle',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/Z6QzSkP3/Gemini-Generated-Image-bottle-Photoroom.png',
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
      title: 'Acme Insulated Water Bottle - Fireshop',
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
      url: 'https://i.ibb.co/rKd6k2Pg/Gemini-Generated-Image-keychain-Photoroom.png',
      altText: 'Acme Keychain',
      width: 600,
      height: 600
    },
    images: [
      {
        url: 'https://i.ibb.co/rKd6k2Pg/Gemini-Generated-Image-keychain-Photoroom.png',
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
      title: 'Acme Keychain - Fireshop',
      description: 'Get the official Acme metal keychain.'
    }
  }
];

export const menusData = [
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

export const pagesData = [
  {
    id: 'page_about',
    title: 'About Us',
    handle: 'about',
    body: 'Welcome to Fireshop! We are a demo e-commerce store backed by Google Cloud Firestore.',
    bodySummary: 'About our company and demo store.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'About Us - Fireshop',
      description: 'Read about our history and values.'
    }
  }
];

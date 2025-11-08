export interface Product {
  id: number
  name: string
  slug: string
  categoryId: number
  price: number
  salePrice?: number
  image: string
  images?: string[]
  description: string
  shortDescription: string
  brand?: string
  sku?: string
  inStock: boolean
  featured?: boolean
  rating?: number
  reviewCount?: number
}

export const products: Product[] = [
  // Bombas Sumergibles
  {
    id: 1001,
    name: 'Bomba Sumergible Serie KTV Tsurumi Pump',
    slug: 'serie-ktv-tsurumi-pump',
    categoryId: 11,
    price: 2850000,
    image: '/images/products/bomba-ktv.webp',
    images: ['/images/products/bomba-ktv.webp', '/images/products/bomba-ktv-2.webp'],
    shortDescription: 'Bomba sumergible para agua limpia y residual',
    description: 'Bomba sumergible de alta eficiencia de la serie KTV de Tsurumi. Ideal para aplicaciones industriales, sistemas de drenaje, tratamiento de aguas y transferencia de líquidos.',
    brand: 'Tsurumi Pump',
    sku: 'KTV-2055',
    inStock: true,
    featured: true,
    rating: 5,
    reviewCount: 12
  },
  {
    id: 1002,
    name: 'Bomba Sumergible Serie HSE Tsurumi Pump',
    slug: 'serie-hse-tsurumi-pump',
    categoryId: 11,
    price: 3200000,
    image: '/images/products/bomba-hse.webp',
    shortDescription: 'Bomba sumergible para aguas residuales',
    description: 'Bomba robusta diseñada para manejo de aguas residuales con sólidos. Motor sellado herméticamente para mayor durabilidad.',
    brand: 'Tsurumi Pump',
    sku: 'HSE-2.4S',
    inStock: true,
    rating: 5,
    reviewCount: 8
  },
  {
    id: 1003,
    name: 'Bomba Sumergible Serie LH Tsurumi Pump',
    slug: 'serie-lh-tsurumi-pump',
    categoryId: 11,
    price: 1850000,
    salePrice: 1650000,
    image: '/images/products/bomba-lh.webp',
    shortDescription: 'Bomba sumergible liviana para drenaje',
    description: 'Bomba compacta y liviana ideal para drenaje de sótanos, piscinas y aplicaciones residenciales.',
    brand: 'Tsurumi Pump',
    sku: 'LH-410',
    inStock: true,
    featured: true,
    rating: 4.5,
    reviewCount: 15
  },

  // Herramientas Eléctricas - Taladros
  {
    id: 2001,
    name: 'Taladro Percutor 18V XPT Makita',
    slug: '196031-6-makita',
    categoryId: 21,
    price: 850000,
    image: '/images/products/taladro-makita.webp',
    shortDescription: 'Taladro inalámbrico con percusión',
    description: 'Taladro percutor inalámbrico de 18V con tecnología XPT (protección extrema). Motor sin escobillas para mayor eficiencia y durabilidad.',
    brand: 'Makita',
    sku: '196031-6',
    inStock: true,
    featured: true,
    rating: 5,
    reviewCount: 24
  },

  // Amoladoras
  {
    id: 2101,
    name: 'Amoladora Angular 9" Makita',
    slug: '2012nb-makita',
    categoryId: 22,
    price: 1250000,
    image: '/images/products/amoladora-makita.webp',
    shortDescription: 'Amoladora de 9 pulgadas profesional',
    description: 'Amoladora angular de 230mm (9") para trabajos pesados. Motor potente de 2200W con sistema de arranque suave.',
    brand: 'Makita',
    sku: '2012NB',
    inStock: true,
    rating: 5,
    reviewCount: 18
  },

  // Sierras
  {
    id: 2201,
    name: 'Sierra Circular 7-1/4" Makita',
    slug: '3709-makita',
    categoryId: 23,
    price: 680000,
    salePrice: 610000,
    image: '/images/products/sierra-makita.webp',
    shortDescription: 'Sierra circular profesional',
    description: 'Sierra circular de 7-1/4" con motor de 1800W. Base de aluminio fundido para mayor precisión y durabilidad.',
    brand: 'Makita',
    sku: '5007MG',
    inStock: true,
    rating: 4.5,
    reviewCount: 20
  },

  // Discos Diamantados
  {
    id: 4001,
    name: 'Disco Diamantado Eco Asphalt 14" Lion Diamond',
    slug: 'disco-diamantado-eco-asphalt-14',
    categoryId: 41,
    price: 450000,
    image: '/images/products/disco-asphalt.webp',
    shortDescription: 'Disco para corte de asfalto y concreto fresco',
    description: 'Disco diamantado de 14" diseñado específicamente para corte de asfalto, concreto fresco y materiales abrasivos. Segmentos de diamante de alta calidad.',
    brand: 'Lion Diamond',
    sku: 'ECO-ASP-14',
    inStock: true,
    featured: true,
    rating: 5,
    reviewCount: 10
  },
  {
    id: 4002,
    name: 'Disco Diamantado ProConcret 14" Lion Diamond',
    slug: 'disco-diamantado-proconcret-14',
    categoryId: 41,
    price: 520000,
    image: '/images/products/disco-proconcret.webp',
    shortDescription: 'Disco profesional para concreto curado',
    description: 'Disco diamantado profesional de 14" para corte de concreto curado y materiales de alta dureza. Vida útil extendida.',
    brand: 'Lion Diamond',
    sku: 'PRO-CON-14',
    inStock: true,
    rating: 5,
    reviewCount: 14
  },

  // Motosierras
  {
    id: 5001,
    name: 'Motosierra 525P5S Husqvarna',
    slug: '525p5s-husqvarna',
    categoryId: 51,
    price: 1950000,
    image: '/images/products/motosierra-husqvarna.webp',
    shortDescription: 'Motosierra profesional para poda',
    description: 'Motosierra de poda con barra de 12". Motor de 2 tiempos de bajo consumo con tecnología X-Torq. Ideal para trabajos en altura.',
    brand: 'Husqvarna',
    sku: '525P5S',
    inStock: true,
    featured: true,
    rating: 5,
    reviewCount: 9
  },

  // Sopladoras
  {
    id: 5101,
    name: 'Sopladora a Batería 36V Makita',
    slug: 'sopladora-36v-makita',
    categoryId: 52,
    price: 750000,
    salePrice: 675000,
    image: '/images/products/sopladora-makita.webp',
    shortDescription: 'Sopladora inalámbrica de alto rendimiento',
    description: 'Sopladora a batería 36V (2x18V) con velocidad variable. Bajo nivel de ruido y cero emisiones. Ideal para jardinería profesional.',
    brand: 'Makita',
    sku: 'DUB363Z',
    inStock: true,
    rating: 4.5,
    reviewCount: 16
  },

  // WD-40 (Grasas y Lubricantes)
  {
    id: 8001,
    name: 'Aceite Multiusos 11 oz WD-40',
    slug: 'aceite-multiusos-11-oz-wd-40',
    categoryId: 81,
    price: 24900,
    image: '/images/products/wd40-11oz.webp',
    shortDescription: 'Lubricante multiusos spray 11 oz',
    description: 'Aceite lubricante multiusos WD-40 en spray de 11 oz. Lubrica, protege, limpia y desplaza la humedad.',
    brand: 'WD-40',
    sku: 'WD40-110',
    inStock: true,
    featured: true,
    rating: 5,
    reviewCount: 156
  },
  {
    id: 8002,
    name: 'Aceite Multiusos 1 Galón WD-40',
    slug: 'aceite-multiusos-1-galon-wd-40',
    categoryId: 81,
    price: 189000,
    image: '/images/products/wd40-galon.webp',
    shortDescription: 'Lubricante multiusos galón',
    description: 'Aceite WD-40 presentación industrial de 1 galón (3.78 L). Ideal para talleres y uso profesional.',
    brand: 'WD-40',
    sku: 'WD40-GAL',
    inStock: true,
    rating: 5,
    reviewCount: 42
  },
  {
    id: 8003,
    name: 'Aceite Multiusos 14.4 oz EZ-Reach WD-40',
    slug: 'aceite-multiusos-14-4-oz-ez-reach-wd-40',
    categoryId: 81,
    price: 34900,
    image: '/images/products/wd40-ezreach.webp',
    shortDescription: 'Lubricante con tubo flexible de 8"',
    description: 'WD-40 EZ-Reach con tubo flexible de 8 pulgadas para llegar a lugares de difícil acceso. Presentación 14.4 oz.',
    brand: 'WD-40',
    sku: 'WD40-EZR',
    inStock: true,
    rating: 5,
    reviewCount: 67
  },

  // Pulidoras de Piso
  {
    id: 3201,
    name: 'Pulidora de Piso Eléctrica 1F',
    slug: 'pulidora-piso-electrica-1f',
    categoryId: 321,
    price: 3850000,
    image: '/images/products/pulidora-electrica.webp',
    shortDescription: 'Pulidora monofásica para acabados',
    description: 'Pulidora de piso eléctrica monofásica para acabados de concreto. Motor de 5.5 HP, disco de 36". Ideal para pulido y abrillantado.',
    brand: 'XCP',
    sku: 'PUL-1F-36',
    inStock: true,
    rating: 4.5,
    reviewCount: 7
  },

  // Motores Eléctricos WEG
  {
    id: 6201,
    name: 'Motor Eléctrico Trifásico 5 HP WEG',
    slug: 'motor-trifasico-5hp-weg',
    categoryId: 62,
    price: 1450000,
    image: '/images/products/motor-weg-5hp.webp',
    shortDescription: 'Motor industrial TEFC 5 HP',
    description: 'Motor eléctrico trifásico WEG de 5 HP, 1750 RPM. Carcasa TEFC (totalmente cerrado con ventilación). Alta eficiencia y bajo mantenimiento.',
    brand: 'WEG',
    sku: 'WEG-5HP-3F',
    inStock: true,
    featured: true,
    rating: 5,
    reviewCount: 11
  }
]

// Helper functions
export function getProductsByCategory(categoryId: number): Product[] {
  return products.filter(p => p.categoryId === categoryId)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getProductsOnSale(): Product[] {
  return products.filter(p => p.salePrice && p.salePrice < p.price)
}

export function getAllProducts(): Product[] {
  return products
}

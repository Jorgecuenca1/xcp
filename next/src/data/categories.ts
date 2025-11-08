export interface Category {
  id: number
  name: string
  slug: string
  parentId: number | null
  image?: string
  description?: string
}

export const categories: Category[] = [
  // Categorías principales
  { id: 1, name: 'Bombeo', slug: 'bombeo', parentId: null, image: '/images/categories/bombeo.webp' },
  { id: 2, name: 'Herramienta Eléctrica', slug: 'herramienta-electrica', parentId: null, image: '/images/categories/herramienta.webp' },
  { id: 3, name: 'Compactación y Hormigón', slug: 'compactacion-y-hormigon', parentId: null, image: '/images/categories/compactacion.webp' },
  { id: 4, name: 'Desbaste y Acabados', slug: 'desbaste-y-acabados', parentId: null, image: '/images/categories/desbaste.webp' },
  { id: 5, name: 'Jardinería y Forestal', slug: 'jardineria-y-forestal', parentId: null, image: '/images/categories/jardineria.webp' },
  { id: 6, name: 'Generación y Motores', slug: 'generacion-y-motores', parentId: null, image: '/images/categories/generacion.webp' },
  { id: 7, name: 'Soldaduras', slug: 'soldaduras', parentId: null, image: '/images/categories/soldaduras.webp' },
  { id: 8, name: 'Grasas y Lubricantes', slug: 'grasas-y-lubricantes', parentId: null, image: '/images/categories/grasas.webp' },

  // Subcategorías de Bombeo
  { id: 11, name: 'Bombas Sumergibles', slug: 'bombas-sumergibles', parentId: 1 },
  { id: 12, name: 'Bombas de Superficie', slug: 'bombas-superficie', parentId: 1 },
  { id: 13, name: 'Bombas Multicelulares', slug: 'bombas-multicelulares', parentId: 1 },
  { id: 14, name: 'Accesorios de Bombeo', slug: 'accesorios-bombeo', parentId: 1 },

  // Subcategorías de Herramienta Eléctrica
  { id: 21, name: 'Taladros', slug: 'taladros', parentId: 2 },
  { id: 22, name: 'Amoladoras', slug: 'amoladoras', parentId: 2 },
  { id: 23, name: 'Sierras', slug: 'sierras', parentId: 2 },
  { id: 24, name: 'Martillos Demoledores', slug: 'martillos-demoledores', parentId: 2 },

  // Subcategorías de Compactación y Hormigón
  { id: 31, name: 'Compactadores', slug: 'compactadores', parentId: 3 },
  { id: 32, name: 'Pulidoras de Piso', slug: 'pulidoras-de-piso', parentId: 3 },
  { id: 33, name: 'Vibradoras de Concreto', slug: 'vibradoras-concreto', parentId: 3 },

  // Sub-subcategorías (ejemplo de recursividad de tercer nivel)
  { id: 321, name: 'Pulidoras Eléctricas', slug: 'pulidoras-electricas', parentId: 32 },
  { id: 322, name: 'Pulidoras a Gasolina', slug: 'pulidoras-gasolina', parentId: 32 },

  // Subcategorías de Desbaste y Acabados
  { id: 41, name: 'Discos Diamantados', slug: 'discos-diamantados', parentId: 4 },
  { id: 42, name: 'Discos de Corte', slug: 'discos-corte', parentId: 4 },
  { id: 43, name: 'Discos de Desbaste', slug: 'discos-desbaste', parentId: 4 },

  // Subcategorías de Jardinería y Forestal
  { id: 51, name: 'Motosierras', slug: 'motosierras', parentId: 5 },
  { id: 52, name: 'Sopladoras', slug: 'sopladoras', parentId: 5 },
  { id: 53, name: 'Desbrozadoras', slug: 'desbrozadoras', parentId: 5 },

  // Subcategorías de Generación y Motores
  { id: 61, name: 'Generadores Eléctricos', slug: 'generadores', parentId: 6 },
  { id: 62, name: 'Motores Eléctricos', slug: 'motores-electricos', parentId: 6 },
  { id: 63, name: 'Variadores de Frecuencia', slug: 'variadores-frecuencia', parentId: 6 },

  // Subcategorías de Grasas y Lubricantes
  { id: 81, name: 'WD-40', slug: 'wd-40', parentId: 8 },
  { id: 82, name: 'Grasas Industriales', slug: 'grasas-industriales', parentId: 8 },
]

// Función helper para obtener categorías hijas
export function getChildCategories(parentId: number | null): Category[] {
  return categories.filter(cat => cat.parentId === parentId)
}

// Función helper para obtener categorías principales
export function getRootCategories(): Category[] {
  return getChildCategories(null)
}

// Función helper para obtener una categoría por slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug)
}

// Función helper para obtener el árbol de categorías con sus padres
export function getCategoryPath(categoryId: number): Category[] {
  const path: Category[] = []
  let current = categories.find(c => c.id === categoryId)

  while (current) {
    path.unshift(current)
    current = current.parentId ? categories.find(c => c.id === current!.parentId) : undefined
  }

  return path
}

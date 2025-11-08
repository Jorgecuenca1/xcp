'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCategoryTree } from '@/lib/demoData'
import styles from './page.module.scss'

export default function CategoriasPage() {
  const [rootCategories, setRootCategories] = useState<any[]>([])

  useEffect(() => {
    const categories = getCategoryTree()
    setRootCategories(categories)
  }, [])

  return (
    <div className={styles.categoriasPage}>
      <div className="container py-4">
        <h1 className={styles.pageTitle}>Todas las Categorías</h1>
        <p className={styles.pageDescription}>Explora nuestro completo catálogo de productos organizados por categorías</p>

        <div className={styles.categoriesGrid}>
          {rootCategories.map(category => (
            <Link
              key={category.id}
              href={`/categorias/${category.slug}`}
              className={styles.categoryCard}
            >
              <div className={styles.categoryImage}>
                {category.image ? (
                  <img src={category.image} alt={category.name} loading="lazy" />
                ) : (
                  <div className={styles.categoryPlaceholder}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 7h-9"></path>
                      <path d="M14 17H5"></path>
                      <circle cx="17" cy="17" r="3"></circle>
                      <circle cx="7" cy="7" r="3"></circle>
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.categoryInfo}>
                <h3>{category.name}</h3>
                <span className={styles.categoryLinkText}>Ver productos →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

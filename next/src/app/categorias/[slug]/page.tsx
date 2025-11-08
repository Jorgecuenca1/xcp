'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { useState, useEffect } from 'react'
import { getCategories, getProducts, getProductsByCategory, type Product, type Category } from '@/lib/demoData'
import styles from './page.module.scss'

export default function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const [category, setCategory] = useState<Category | null>(null)
  const [childCategories, setChildCategories] = useState<Category[]>([])
  const [categoryPath, setCategoryPath] = useState<Category[]>([])
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([])

  useEffect(() => {
    const categories = getCategories()
    const foundCategory = categories.find(c => c.slug === params.slug)

    if (!foundCategory) {
      notFound()
      return
    }

    setCategory(foundCategory)

    // Get child categories
    const children = categories.filter(c => c.parent === foundCategory.id && c.active)
    setChildCategories(children)

    // Get category path (breadcrumb)
    const buildPath = (catId: string): Category[] => {
      const cat = categories.find(c => c.id === catId)
      if (!cat || !cat.parent) return cat ? [cat] : []
      return [...buildPath(cat.parent), cat]
    }
    setCategoryPath(buildPath(foundCategory.id))

    // Get products
    const products = getProductsByCategory(params.slug)
    setCategoryProducts(products.filter(p => p.active))
  }, [params.slug])

  if (!category) {
    return <div className="container py-4">Cargando...</div>
  }

  return (
    <div className={styles.categoryPage}>
      <div className="container py-4">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Inicio</Link>
          <span className={styles.separator}>/</span>
          <Link href="/categorias">Categorías</Link>
          {categoryPath.slice(0, -1).map(parent => (
            <span key={parent.id}>
              <span className={styles.separator}>/</span>
              <Link href={`/categorias/${parent.slug}`}>{parent.name}</Link>
            </span>
          ))}
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className={`${styles.categoryHeader} mb-4`}>
          <h1>{category.name}</h1>
          {category.description && <p>{category.description}</p>}
        </div>

        {/* Subcategories */}
        {childCategories.length > 0 && (
          <div className={`${styles.subcategoriesSection} mb-5`}>
            <h3>Subcategorías</h3>
            <div className={styles.subcategoriesGrid}>
              {childCategories.map(child => (
                <Link
                  key={child.id}
                  href={`/categorias/${child.slug}`}
                  className={styles.subcategoryCard}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <h4>{child.name}</h4>
                  <span>Ver productos →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        <div className={styles.productsSection}>
          <div className={`${styles.sectionHeader} mb-3`}>
            <h3>Productos</h3>
            <span className={styles.productCount}>{categoryProducts.length} productos encontrados</span>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="product-grid">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.noProducts}>
              <p>No hay productos en esta categoría en este momento.</p>
              <Link href="/categorias" className="btn btn-primary mt-3">
                Ver todas las categorías
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { getSlides, initializeDemoData, type Slide, getProducts, getCategoryTree, type Product } from '@/lib/demoData'
import styles from './page.module.scss'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'nuevos' | 'vendidos' | 'valorados'>('nuevos')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<Slide[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])

  // Load data from database
  useEffect(() => {
    initializeDemoData()
    const loadedSlides = getSlides()
    const loadedProducts = getProducts()
    setSlides(loadedSlides)
    setAllProducts(loadedProducts)
  }, [])

  // Auto-advance slider
  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const rootCategories = getCategoryTree()
  const featuredProducts = allProducts.filter(p => p.featured && p.active).slice(0, 8)
  const saleProducts = allProducts.filter(p => p.comparePrice && p.comparePrice > p.price && p.active).slice(0, 4)

  // Simulamos productos nuevos, más vendidos y mejor valorados
  const nuevosProducts = allProducts.filter(p => p.active).slice(0, 8)
  const vendidosProducts = [...allProducts].filter(p => p.active).sort(() => Math.random() - 0.5).slice(0, 8)
  const valoradosProducts = featuredProducts

  const getProductsByTab = () => {
    switch (activeTab) {
      case 'nuevos':
        return nuevosProducts
      case 'vendidos':
        return vendidosProducts
      case 'valorados':
        return valoradosProducts
      default:
        return nuevosProducts
    }
  }

  return (
    <div className={styles.homePage}>
      {/* Hero Slider - Administrable desde el panel */}
      <section className={styles.heroSlider}>
        <div className={styles.sliderContainer}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              {/* Solo mostrar overlay de texto si la imagen NO tiene texto incorporado */}
              {!slide.hasEmbeddedText && (slide.title || slide.description) && (
                <div className="container">
                  <div className={styles.slideContent}>
                    {slide.title && (
                      <h1 className={styles.slideTitle}>{slide.title}</h1>
                    )}
                    {slide.description && (
                      <p className={styles.slideDescription}>{slide.description}</p>
                    )}
                    {slide.buttonText && slide.buttonLink && (
                      <Link href={slide.buttonLink} className="btn btn-primary btn-large">
                        {slide.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Slider Navigation Dots */}
          {slides.length > 1 && (
            <div className={styles.sliderDots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3 Category Images - Exacto como www.xcp.com.co */}
      <section className={styles.categoriesImageSection}>
        <div className={styles.categoriesImageGrid}>
          <div className={styles.categoryImageItem}>
            <img src="/images/categories/bombas-sumergibles.webp" alt="Bombas Sumergibles" />
          </div>
          <div className={styles.categoryImageItem}>
            <img src="/images/categories/limpieza-desinfeccion.webp" alt="Limpieza y Desinfección" />
          </div>
          <div className={styles.categoryImageItem}>
            <img src="/images/categories/jardineria-forestal.webp" alt="Jardinería y Forestal" />
          </div>
        </div>
      </section>

      {/* Features Section - 5 bloques exactos como Electro */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Envíos</h3>
                <p className={styles.featureHighlight}>NACIONALES</p>
              </div>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Atención</h3>
                <p className={styles.featureHighlight}>PERSONALIZADA</p>
              </div>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Servicio</h3>
                <p className={styles.featureHighlight}>GARANTIZADO</p>
              </div>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Pago con</h3>
                <p className={styles.featureHighlight}>TARJETA</p>
              </div>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Ofertas</h3>
                <p className={styles.featureHighlight}>Todos los meses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products with Tabs - Exacto como Electro */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Productos Destacados</h2>

            <div className={styles.productTabs}>
              <button
                className={`${styles.tabButton} ${activeTab === 'nuevos' ? styles.active : ''}`}
                onClick={() => setActiveTab('nuevos')}
              >
                Nuevos
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'vendidos' ? styles.active : ''}`}
                onClick={() => setActiveTab('vendidos')}
              >
                Más Vendidos
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'valorados' ? styles.active : ''}`}
                onClick={() => setActiveTab('valorados')}
              >
                Mejor Valorados
              </button>
            </div>
          </div>

          <div className="product-grid">
            {getProductsByTab().map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase - Exacto como Electro */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className={styles.sectionTitle}>Explora por Categoría</h2>
            <p className={styles.sectionSubtitle}>Encuentra exactamente lo que necesitas</p>
          </div>

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
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 7h-9"></path>
                        <path d="M14 17H5"></path>
                        <circle cx="17" cy="17" r="3"></circle>
                        <circle cx="7" cy="7" r="3"></circle>
                      </svg>
                    </div>
                  )}
                </div>
                <div className={styles.categoryOverlay}>
                  <h3>{category.name}</h3>
                  <span className={styles.categoryLink}>Ver Productos →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers - Si hay productos en oferta */}
      {saleProducts.length > 0 && (
        <section className={styles.offersSection}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className={styles.sectionTitle}>Ofertas Especiales</h2>
              <p className={styles.sectionSubtitle}>Aprovecha nuestros descuentos exclusivos</p>
            </div>

            <div className="product-grid">
              {saleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

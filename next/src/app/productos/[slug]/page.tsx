'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { getProducts, getCategoryTree, type Product as ProductType } from '@/lib/demoData'
import styles from './page.module.scss'

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [product, setProduct] = useState<ProductType | null>(null)
  const [category, setCategory] = useState<any>(null)
  const [currentImage, setCurrentImage] = useState('')
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'utilities' | 'reviews'>('description')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const products = getProducts()
    const foundProduct = products.find(p => p.slug === slug)

    if (foundProduct) {
      setProduct(foundProduct)
      setCurrentImage(foundProduct.images[0])

      // Find category
      const categories = getCategoryTree()
      const allCategories = categories.flatMap(c => [c, ...(c.subcategories || [])])
      const foundCategory = allCategories.find(cat => cat.id === foundProduct.category)
      setCategory(foundCategory)
    }
  }, [slug])

  if (!product) {
    return <div className={styles.productPage}><div className="container py-4">Cargando...</div></div>
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discountPercent = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const whatsappMessage = `Hola, estoy interesado en: ${product.name} (SKU: ${product.sku})`
  const whatsappLink = `https://wa.me/573222101885?text=${encodeURIComponent(whatsappMessage)}`

  const renderStars = (rating?: number) => {
    if (!rating) rating = 0
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map(i => (
          <span
            key={i}
            className={`${styles.star} ${i <= rating! ? styles.filled : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.productPage}>
      <div className="container py-4">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Inicio</Link>
          <span className={styles.separator}>&gt;</span>
          {category && (
            <>
              <Link href={`/categorias/${category.slug}`}>{category.name}</Link>
              <span className={styles.separator}>&gt;</span>
            </>
          )}
          <span className={styles.current}>{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className={styles.productMain}>
          {/* Product Gallery */}
          <div className={styles.productGallery}>
            <div className={styles.mainImageContainer}>
              <img src={currentImage} alt={product.name} className={styles.mainImage} />
              {product.comparePrice && (
                <span className={styles.saleBadge}>-{discountPercent}%</span>
              )}
              {product.featured && (
                <span className={styles.featuredBadge}>Destacado</span>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.thumbnail} ${currentImage === image ? styles.active : ''}`}
                    onClick={() => setCurrentImage(image)}
                  >
                    <img src={image} alt={`${product.name} - ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Summary */}
          <div className={styles.productSummary}>
            {product.brandName && (
              <div className={styles.brand}>
                Marca: <strong>{product.brandName}</strong>
              </div>
            )}

            <h1 className={styles.productTitle}>{product.name}</h1>

            {product.rating && (
              <div className={styles.productRating}>
                {renderStars(product.rating)}
                <span className={styles.ratingText}>({product.rating}/5)</span>
                {product.reviewCount && (
                  <span className={styles.reviewCount}>
                    {product.reviewCount} reseña{product.reviewCount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}

            {product.sku && (
              <div className={styles.sku}>
                <span>SKU:</span> <strong>{product.sku}</strong>
              </div>
            )}

            <div className={styles.priceBox}>
              {product.comparePrice && (
                <div className={styles.oldPrice}>{formatPrice(product.comparePrice)}</div>
              )}
              <div className={styles.currentPrice}>{formatPrice(product.price)}</div>
            </div>

            <div className={`${styles.stockStatus} ${product.stock > 0 ? styles.inStock : styles.outStock}`}>
              {product.stock > 0 ? (
                <>
                  <span className={styles.stockIcon}>✓</span>
                  <span>En stock ({product.stock} disponibles)</span>
                </>
              ) : (
                <>
                  <span className={styles.stockIcon}>✗</span>
                  <span>Agotado</span>
                </>
              )}
            </div>

            {product.shortDescription && (
              <div className={styles.shortDescription}>
                <p>{product.shortDescription}</p>
              </div>
            )}

            <div className={styles.productActions}>
              <div className={styles.quantitySelector}>
                <label>Cantidad:</label>
                <div className={styles.quantityInput}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.quoteButton}
              >
                <span className={styles.whatsappIcon}>📱</span>
                Cotizar ahora
              </a>

              <div className={styles.productMeta}>
                <button className={styles.compareBtn}>
                  <span>⚖️</span> Comparar
                </button>
                <button className={styles.wishlistBtn}>
                  <span>❤️</span> Favoritos
                </button>
              </div>
            </div>

            {category && (
              <div className={styles.productCategories}>
                <span>Categoría:</span>{' '}
                <Link href={`/categorias/${category.slug}`}>{category.name}</Link>
              </div>
            )}
          </div>
        </div>

        {/* Product Tabs */}
        <div className={styles.productTabs}>
          <div className={styles.tabsNav}>
            <button
              className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Descripción
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'additional' ? styles.active : ''}`}
              onClick={() => setActiveTab('additional')}
            >
              Información adicional
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'utilities' ? styles.active : ''}`}
              onClick={() => setActiveTab('utilities')}
            >
              Utilidades
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reseñas ({product.reviewCount || 0})
            </button>
          </div>

          <div className={styles.tabsContent}>
            {activeTab === 'description' && (
              <div className={styles.tabPanel}>
                <h2>Descripción del Producto</h2>
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className={styles.tabPanel}>
                <h2>Información adicional</h2>
                <table className={styles.additionalInfo}>
                  <tbody>
                    {product.weight && (
                      <tr>
                        <th>Peso</th>
                        <td>{product.weight}</td>
                      </tr>
                    )}
                    {product.dimensions && (
                      <tr>
                        <th>Dimensiones</th>
                        <td>{product.dimensions}</td>
                      </tr>
                    )}
                    {product.brandName && (
                      <tr>
                        <th>Marca</th>
                        <td>{product.brandName}</td>
                      </tr>
                    )}
                    {product.sku && (
                      <tr>
                        <th>SKU</th>
                        <td>{product.sku}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'utilities' && (
              <div className={styles.tabPanel}>
                <h2>Utilidades del Producto</h2>
                {product.utilities ? (
                  <div className={styles.utilitiesContent}>
                    <p style={{ whiteSpace: 'pre-line' }}>{product.utilities}</p>
                  </div>
                ) : (
                  <p>No hay información de utilidades disponible para este producto.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className={styles.tabPanel}>
                <h2>Reseñas de clientes</h2>
                {product.reviewCount ? (
                  <div className={styles.reviewsSummary}>
                    <div className={styles.averageRating}>
                      <div className={styles.ratingNumber}>{product.rating}</div>
                      {renderStars(product.rating)}
                      <div className={styles.totalReviews}>
                        Basado en {product.reviewCount} reseña{product.reviewCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Aún no hay reseñas para este producto.</p>
                )}
                <div className={styles.addReview}>
                  <p>Sé el primero en opinar sobre "{product.name}"</p>
                  <Link href="/contacto" className="btn btn-primary">
                    Escribir una reseña
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

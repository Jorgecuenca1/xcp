import Link from 'next/link'
import { type Product } from '@/lib/demoData'
import { getCategoryById } from '@/lib/demoData'
import styles from './ProductCard.module.scss'

export default function ProductCard({ product }: { product: Product }) {
  const category = product.category ? getCategoryById(product.category) : null

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const productImage = product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.png'
  const hasDiscount = product.comparePrice && product.comparePrice > product.price

  return (
    <div className={styles.productCard}>
      <Link href={`/productos/${product.slug}`} className={styles.productImageLink}>
        <div className={styles.productImage}>
          <img src={productImage} alt={product.name} loading="lazy" />
          <div className={styles.productBadges}>
            {hasDiscount && <span className="badge badge-sale">Oferta</span>}
            {product.featured && <span className="badge badge-new">Destacado</span>}
            {product.stock === 0 && <span className="badge badge-stock">Agotado</span>}
          </div>
        </div>
      </Link>

      <div className={styles.productContent}>
        {category && (
          <div className={styles.productCategory}>
            <Link href={`/categorias/${category.slug}`}>
              {category.name}
            </Link>
          </div>
        )}

        <h3 className={styles.productTitle}>
          <Link href={`/productos/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {product.rating && (
          <div className={styles.productRating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`${styles.star} ${i < product.rating! ? styles.filled : ''}`}>
                  ★
                </span>
              ))}
            </div>
            {product.reviewCount && (
              <span className={styles.reviewCount}>
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        <p className={styles.productDescription}>{product.shortDescription}</p>

        <div className={styles.productFooter}>
          <div className={styles.productPrice}>
            {hasDiscount && (
              <span className={styles.priceOld}>
                {formatPrice(product.comparePrice!)}
              </span>
            )}
            <span className={styles.priceCurrent}>
              {formatPrice(product.price)}
            </span>
          </div>

          <Link href={`/productos/${product.slug}`} className={styles.btnViewDetails}>
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

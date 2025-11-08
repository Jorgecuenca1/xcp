'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './tienda.module.scss';
import {
  initializeDemoData,
  getProducts,
  getCategoryTree,
  type Product as ProductType,
} from '@/lib/demoData';

// Tipos
interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  subcategories?: Category[];
  expanded?: boolean;
}

export default function TiendaPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'grid-extended' | 'list' | 'list-small'>(
    'grid'
  );
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 });
  const [currentPriceRange, setCurrentPriceRange] = useState({ min: 0, max: 5000000 });
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Cargar datos al montar el componente
  useEffect(() => {
    // Inicializar datos demo si no existen
    initializeDemoData();

    // Cargar categorías con árbol
    const categoryTree = getCategoryTree();
    setCategories(categoryTree.map((cat) => ({ ...cat, expanded: false })));

    // Cargar productos
    const allProducts = getProducts();
    setProducts(allProducts);

    setIsLoading(false);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat))
    );
  };

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, currentPriceRange]);

  const filteredProducts = products
    .filter((product) => {
      // Filtro de activo
      if (!product.active) return false;

      // Filtro de categoría
      if (selectedCategory) {
        const category = categories
          .flatMap((c) => [c, ...(c.subcategories || [])])
          .find((c) => c.slug === selectedCategory);

        if (category) {
          // Si es categoría padre, incluir productos de subcategorías
          const categoryIds = [
            category.id,
            ...(category.subcategories?.map((sc) => sc.id) || []),
          ];

          const matchesCategory =
            product.category && categoryIds.some((id) => id === product.category);
          if (!matchesCategory) return false;
        }
      }

      // Filtro de precio
      if (product.price < currentPriceRange.min || product.price > currentPriceRange.max)
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const renderStars = (rating?: number) => {
    if (!rating) rating = 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className={styles.starFilled}>
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className={styles.starHalf}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={styles.starEmpty}>
            ★
          </span>
        );
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className={styles.shopPage}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', padding: '4rem' }}>Cargando tienda...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shopPage}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Inicio</Link>
          <span className={styles.separator}>/</span>
          <span>Tienda</span>
        </nav>

        <div className={styles.shopWrapper}>
          {/* Mobile Filter Toggle Button */}
          <button
            className={styles.mobileFilterToggle}
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <span className={styles.filterIcon}>⚙</span>
            Filtros y Categorías
            <span className={styles.filterCount}>({totalProducts})</span>
          </button>

          {/* Sidebar */}
          <aside className={`${styles.sidebar} ${mobileFiltersOpen ? styles.mobileOpen : ''}`}>
            {/* Categories Widget */}
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Categorías de productos</h3>
              <ul className={styles.productCategories}>
                <li className={selectedCategory === '' ? styles.currentCat : ''}>
                  <button onClick={() => handleCategorySelect('')}>
                    Todas las categorías
                    <span className={styles.count}>({products.filter((p) => p.active).length})</span>
                  </button>
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className={`${selectedCategory === cat.slug ? styles.currentCat : ''} ${
                      cat.subcategories && cat.subcategories.length > 0 ? styles.catParent : ''
                    }`}
                  >
                    <div className={styles.categoryRow}>
                      <button onClick={() => handleCategorySelect(cat.slug)}>
                        {cat.name}
                        <span className={styles.count}>({cat.count})</span>
                      </button>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <button
                          className={styles.toggleBtn}
                          onClick={() => toggleCategory(cat.id)}
                          aria-label="Toggle subcategories"
                        >
                          {cat.expanded ? '−' : '+'}
                        </button>
                      )}
                    </div>
                    {cat.subcategories && cat.subcategories.length > 0 && cat.expanded && (
                      <ul className={styles.children}>
                        {cat.subcategories.map((subcat) => (
                          <li
                            key={subcat.id}
                            className={selectedCategory === subcat.slug ? styles.currentCat : ''}
                          >
                            <button onClick={() => handleCategorySelect(subcat.slug)}>
                              {subcat.name}
                              <span className={styles.count}>({subcat.count})</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter Widget */}
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Filtrar por precio</h3>
              <div className={styles.priceFilterContainer}>
                <div className={styles.priceSlider}>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="100000"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
                    }
                    className={styles.rangeMin}
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="100000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                    }
                    className={styles.rangeMax}
                  />
                </div>
                <div className={styles.priceInputs}>
                  <span>Precio: </span>
                  <span className={styles.priceAmount}>
                    {formatPrice(priceRange.min)} — {formatPrice(priceRange.max)}
                  </span>
                </div>
                <button
                  className={styles.filterBtn}
                  onClick={() => setCurrentPriceRange(priceRange)}
                >
                  FILTRAR
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* Shop Control Bar */}
            <div className={styles.shopControlBar}>
              <div className={styles.gridListButtons}>
                <button
                  className={viewMode === 'grid' ? styles.active : ''}
                  onClick={() => setViewMode('grid')}
                  aria-label="Vista en cuadrícula"
                  title="Grid"
                >
                  <span className={styles.icon}>⊞</span>
                </button>
                <button
                  className={viewMode === 'grid-extended' ? styles.active : ''}
                  onClick={() => setViewMode('grid-extended')}
                  aria-label="Vista extendida"
                  title="Grid Extended"
                >
                  <span className={styles.icon}>⊟</span>
                </button>
                <button
                  className={viewMode === 'list' ? styles.active : ''}
                  onClick={() => setViewMode('list')}
                  aria-label="Vista en lista"
                  title="List"
                >
                  <span className={styles.icon}>☰</span>
                </button>
                <button
                  className={viewMode === 'list-small' ? styles.active : ''}
                  onClick={() => setViewMode('list-small')}
                  aria-label="Vista lista compacta"
                  title="List Small"
                >
                  <span className={styles.icon}>≡</span>
                </button>
              </div>

              <div className={styles.shopControlBarRight}>
                <div className={styles.resultCount}>
                  Mostrando {startIndex + 1}–{Math.min(endIndex, totalProducts)} de {totalProducts} resultados
                </div>
                <select
                  className={styles.orderby}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Orden por defecto</option>
                  <option value="popularity">Ordenar por popularidad</option>
                  <option value="rating">Ordenar por calificación media</option>
                  <option value="date">Ordenar por los últimos</option>
                  <option value="price-asc">Ordenar por precio: bajo a alto</option>
                  <option value="price-desc">Ordenar por precio: alto a bajo</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`${styles.products} ${styles[`view-${viewMode}`]}`}>
              {filteredProducts.length === 0 ? (
                <div className={styles.noProducts}>
                  <div className={styles.noProductsIcon}>🔍</div>
                  <h3>No se encontraron productos</h3>
                  <p>Intenta ajustar los filtros para ver más resultados</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setCurrentPriceRange({ min: 0, max: 5000000 });
                      setPriceRange({ min: 0, max: 5000000 });
                    }}
                    className={styles.resetBtn}
                  >
                    Limpiar filtros
                  </button>
                </div>
              ) : (
                paginatedProducts.map((product) => (
                  <div key={product.id} className={styles.productOuter}>
                    <div className={styles.productInner}>
                      <div className={styles.productLoopHeader}>
                        <span className={styles.loopProductCategories}>
                          {product.categoryName || 'Sin categoría'}
                        </span>
                        {product.featured && <span className={styles.featuredBadge}>★ Destacado</span>}
                      </div>

                      <div className={styles.productLoopBody}>
                        <div className={styles.productImageWrapper}>
                          <Link
                            href={`/productos/${product.slug}`}
                            className={styles.productImageLink}
                          >
                            <img
                              src={product.images[0] || 'https://via.placeholder.com/600x600?text=Sin+Imagen'}
                              alt={product.name}
                            />
                          </Link>
                          <div className={styles.hoverArea}>
                            <div className={styles.actionButtons}>
                              <button className={styles.compareBtn} aria-label="Comparar">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                  <path d="M2 2h6v2H4v4H2V2zm8 12v2h6v-6h-2v4h-4zM2 10h2v4h4v2H2v-6zm14-6h-4V2h6v6h-2V4z" />
                                </svg>
                              </button>
                              <button className={styles.wishlistBtn} aria-label="Lista de deseos">
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path
                                    d="M9 15.5L7.5 14.2C4 11.1 2 9.3 2 7C2 5.3 3.3 4 5 4C6 4 7 4.4 7.6 5.1L9 6.5L10.4 5.1C11 4.4 12 4 13 4C14.7 4 16 5.3 16 7C16 9.3 14 11.1 10.5 14.2L9 15.5Z"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {product.stock < 5 && product.stock > 0 && (
                            <div className={styles.lowStockBadge}>¡Últimas unidades!</div>
                          )}
                          {product.stock === 0 && (
                            <div className={styles.outOfStockBadge}>Agotado</div>
                          )}
                        </div>

                        <div className={styles.productDetails}>
                          <h3 className={styles.productTitle}>
                            <Link href={`/productos/${product.slug}`}>{product.name}</Link>
                          </h3>

                          {product.rating && (
                            <div className={styles.starRating}>
                              {renderStars(product.rating)}
                              {product.reviewCount && (
                                <span className={styles.reviewCount}>({product.reviewCount})</span>
                              )}
                            </div>
                          )}

                          {(viewMode === 'list' || viewMode === 'list-small') && (
                            <div className={styles.productShortDescription}>
                              <p>{product.shortDescription || product.description}</p>
                              <p className={styles.sku}>
                                <strong>SKU:</strong> {product.sku}
                              </p>
                              {product.brandName && (
                                <p className={styles.brand}>
                                  <strong>Marca:</strong> {product.brandName}
                                </p>
                              )}
                            </div>
                          )}

                          <div className={styles.priceAddToCartWrapper}>
                            <span className={styles.price}>
                              {product.comparePrice && (
                                <span className={styles.comparePrice}>
                                  {formatPrice(product.comparePrice)}
                                </span>
                              )}
                              <span className={styles.amount}>{formatPrice(product.price)}</span>
                            </span>

                            {product.stock > 0 && (
                              <div className={styles.addToCartButton}>
                                <button className={styles.addToCart}>Añadir al carrito</button>
                              </div>
                            )}
                          </div>

                          <div className={styles.whatsappButton}>
                            <a
                              href={`https://wa.me/573222101885?text=Hola! Quiero cotizar ${product.name} - SKU: ${product.sku}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.cotizarAhora}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                              </svg>
                              Cotizar ahora
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalProducts > 0 && totalPages > 1 && (
              <nav className={styles.pagination}>
                <ul className={styles.pageNumbers}>
                  {/* Previous Button */}
                  <li>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={currentPage === 1 ? styles.disabled : ''}
                    >
                      ← Anterior
                    </button>
                  </li>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);

                    if (!showPage) {
                      // Show ellipsis
                      if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                        return (
                          <li key={pageNum}>
                            <span className={styles.pageEllipsis}>...</span>
                          </li>
                        );
                      }
                      return null;
                    }

                    return (
                      <li key={pageNum}>
                        {pageNum === currentPage ? (
                          <span className={styles.pageCurrent}>{pageNum}</span>
                        ) : (
                          <button onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>
                        )}
                      </li>
                    );
                  })}

                  {/* Next Button */}
                  <li>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={currentPage === totalPages ? styles.disabled : ''}
                    >
                      Siguiente →
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

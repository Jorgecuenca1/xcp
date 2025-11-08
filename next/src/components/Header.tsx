'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRootCategories } from '@/data/categories';
import styles from './Header.module.scss';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const rootCategories = getRootCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/buscar?q=${encodeURIComponent(searchQuery)}${
          selectedCategory !== '0' ? `&cat=${selectedCategory}` : ''
        }`
      );
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={styles.siteHeader}>
      {/* Top Bar - Exacto como www.xcp.com.co */}
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarContent}>
            <div className={styles.topBarLeft}>Bienvenido a Xtreme Construction Products</div>
            <div className={styles.topBarRight}>
              <span>Contacto 322 210 1885</span>
              <span>Localiza nuestras tiendas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Masthead */}
      <div className={styles.masthead}>
        <div className="container">
          <div className={styles.mastheadRow}>
            {/* Mobile Menu Toggle */}
            <button
              className={styles.mobileMenuToggle}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>

            {/* Logo */}
            <div className={styles.headerLogo}>
              <Link href="/" onClick={closeMobileMenu}>
                <span className={styles.logoText}>XCP</span>
              </Link>
            </div>

            {/* Search Bar con dropdown de categorías */}
            <form className={styles.navbarSearch} onSubmit={handleSearch}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  className={styles.searchField}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar Productos"
                />
                <select
                  className={styles.searchCategories}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="0">Todas las Categorias</option>
                  {rootCategories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button type="submit" className={styles.searchButton}>
                  <i className="ec-search">🔍</i>
                </button>
              </div>
            </form>

            {/* Header Icons */}
            <div className={styles.headerIcons}>
              <Link href="/compare" className={styles.headerIcon} title="Compare">
                <i className="ec-compare">⚖️</i>
              </Link>
              <Link href="/wishlist" className={styles.headerIcon} title="Wishlist">
                <i className="ec-favorites">❤️</i>
              </Link>
              <Link href="/cart" className={styles.headerIcon} title="Cart">
                <i className="ec-shopping-bag">🛍️</i>
                <span className={styles.cartCount}>0</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation - Exacta como Electro */}
      <nav className={styles.primaryNav}>
        <div className="container">
          <ul className={styles.navMenu}>
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/tienda">Tienda</Link>
            </li>
            <li>
              <Link href="/categorias">Categorías</Link>
            </li>
            <li>
              <Link href="/nosotros">Nosotros</Link>
            </li>
            <li>
              <a href="https://xcpingenieria.com/" target="_blank" rel="noopener noreferrer">
                Ingeniería
              </a>
            </li>
            <li>
              <Link href="/servicios">Servicios</Link>
            </li>
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <h3>Menú</h3>
              <button onClick={closeMobileMenu} aria-label="Close menu">
                ✕
              </button>
            </div>

            {/* Mobile Search */}
            <form className={styles.mobileSearch} onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
              />
              <button type="submit">🔍</button>
            </form>

            {/* Mobile Navigation Links - Accordion Style */}
            <div className={styles.mobileNavAccordion}>
              <Link href="/" onClick={closeMobileMenu} className={styles.accordionItem}>
                <span className={styles.accordionIcon}>🏠</span>
                <span className={styles.accordionText}>Inicio</span>
                <span className={styles.accordionArrow}>›</span>
              </Link>

              <Link href="/tienda" onClick={closeMobileMenu} className={styles.accordionItem}>
                <span className={styles.accordionIcon}>🛍️</span>
                <span className={styles.accordionText}>Tienda</span>
                <span className={styles.accordionArrow}>›</span>
              </Link>

              <Link href="/categorias" onClick={closeMobileMenu} className={styles.accordionItem}>
                <span className={styles.accordionIcon}>📂</span>
                <span className={styles.accordionText}>Categorías</span>
                <span className={styles.accordionArrow}>›</span>
              </Link>

              <Link href="/nosotros" onClick={closeMobileMenu} className={styles.accordionItem}>
                <span className={styles.accordionIcon}>ℹ️</span>
                <span className={styles.accordionText}>Nosotros</span>
                <span className={styles.accordionArrow}>›</span>
              </Link>

              <a
                href="https://xcpingenieria.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className={styles.accordionItem}
              >
                <span className={styles.accordionIcon}>🔧</span>
                <span className={styles.accordionText}>Ingeniería</span>
                <span className={styles.accordionArrow}>↗</span>
              </a>

              <Link href="/servicios" onClick={closeMobileMenu} className={styles.accordionItem}>
                <span className={styles.accordionIcon}>⚙️</span>
                <span className={styles.accordionText}>Servicios</span>
                <span className={styles.accordionArrow}>›</span>
              </Link>

              <Link href="/contacto" onClick={closeMobileMenu} className={styles.accordionItem}>
                <span className={styles.accordionIcon}>📞</span>
                <span className={styles.accordionText}>Contacto</span>
                <span className={styles.accordionArrow}>›</span>
              </Link>
            </div>

            {/* Mobile Quick Links */}
            <div className={styles.mobileQuickLinks}>
              <Link href="/compare" onClick={closeMobileMenu}>
                ⚖️ Comparar
              </Link>
              <Link href="/wishlist" onClick={closeMobileMenu}>
                ❤️ Favoritos
              </Link>
              <Link href="/cart" onClick={closeMobileMenu}>
                🛒 Carrito
              </Link>
            </div>

            {/* Mobile Contact Info */}
            <div className={styles.mobileContactInfo}>
              <p>
                <strong>📞 Contacto:</strong> 322 210 1885
              </p>
              <p>
                <strong>📧 Email:</strong> info@xcp.com.co
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

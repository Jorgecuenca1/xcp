'use client'

import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerColumn}>
              <h4>XCP</h4>
              <p>
                XCP (Xtreme Construction Products) es una tienda especializada en equipos y
                soluciones para construcción, minería, agroindustria y sistemas hidráulicos.
              </p>
              <div className={styles.footerFeatures}>
                <div className={styles.featureItem}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Envíos Nacionales</span>
                </div>
                <div className={styles.featureItem}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Atención Personalizada</span>
                </div>
                <div className={styles.featureItem}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Servicio Garantizado</span>
                </div>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h4>Categorías</h4>
              <ul>
                <li><Link href="/categorias/bombeo">Bombeo</Link></li>
                <li><Link href="/categorias/herramienta-electrica">Herramienta Eléctrica</Link></li>
                <li><Link href="/categorias/compactacion-y-hormigon">Compactación y Hormigón</Link></li>
                <li><Link href="/categorias/desbaste-y-acabados">Desbaste y Acabados</Link></li>
                <li><Link href="/categorias/jardineria-y-forestal">Jardinería y Forestal</Link></li>
                <li><Link href="/categorias/generacion-y-motores">Generación y Motores</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Enlaces</h4>
              <ul>
                <li><Link href="/nosotros">Nosotros</Link></li>
                <li><Link href="/servicios">Servicios</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
                <li><Link href="/terminos-y-condiciones">Términos y Condiciones</Link></li>
                <li><Link href="/politica-privacidad">Política de Privacidad</Link></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Contacto</h4>
              <ul className={styles.contactInfo}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+57 (1) 234 5678</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>info@xcp.com.co</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Bogotá, Colombia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.footerBottomContent}>
            <p>&copy; {currentYear} XCP - Xtreme Construction Products. Todos los derechos reservados.</p>
            <div className={styles.footerPayment}>
              <span>Métodos de pago:</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon}>💳</span>
                <span className={styles.paymentIcon}>💰</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

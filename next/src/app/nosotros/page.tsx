import styles from './page.module.scss'

export const metadata = {
  title: 'Nosotros - Tienda XCP',
  description: 'XCP S.A.S. cuenta con más de 7 años de experiencia en equipos para construcción, minería y agroindustria.'
}

export default function NosotrosPage() {
  return (
    <div className={styles.nosotrosPage}>
      <div className="container py-5">
        <div className={styles.pageHeader}>
          <h1>Nuestra Empresa</h1>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.sectionBlock}>
            <h2>XCP S.A.S.</h2>
            <p>
              Cuenta con más de 7 años de experiencia y con un amplio portafolio de productos y servicios,
              dándole prioridad a una venta responsable y sostenible.
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h2>Xtreme Construction Products</h2>
            <p>
              Nos especializamos en la distribución de equipos y soluciones para construcción, minería,
              agroindustria y sistemas hidráulicos. Ofrecemos productos de las mejores marcas del mercado,
              garantizando calidad y durabilidad.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Experiencia</h3>
              <p>Más de 7 años en el mercado</p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Calidad</h3>
              <p>Productos de las mejores marcas</p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Asesoría</h3>
              <p>Atención personalizada y técnica</p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3>Cobertura</h3>
              <p>Envíos a todo Colombia</p>
            </div>
          </div>

          <div className={`${styles.sectionBlock} mt-5`}>
            <h2>Nuestro Compromiso</h2>
            <p>
              En XCP nos comprometemos con la satisfacción de nuestros clientes, ofreciendo productos de alta calidad,
              asesoría técnica especializada y un servicio postventa excepcional. Trabajamos con las mejores marcas
              del mercado para garantizar que cada proyecto cuente con las herramientas y equipos adecuados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

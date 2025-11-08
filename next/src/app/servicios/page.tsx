import Link from 'next/link'
import styles from './page.module.scss'

export const metadata = {
  title: 'Servicios - Tienda XCP',
  description: 'Venta de equipos, asesoría técnica, mantenimiento y servicios especializados para construcción y minería.'
}

export default function ServiciosPage() {
  return (
    <div className={styles.serviciosPage}>
      <div className="container py-5">
        <div className={styles.pageHeader}>
          <h1>Nuestros Servicios</h1>
          <p>Soluciones integrales para tu proyecto</p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <h3>Venta de Equipos</h3>
            <p>Amplio catálogo de maquinaria y herramientas para construcción, minería y agroindustria de las mejores marcas del mercado.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3>Asesoría Técnica</h3>
            <p>Contamos con personal especializado para asesorarte en la selección del equipo adecuado para tu proyecto específico.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>Mantenimiento</h3>
            <p>Servicio de mantenimiento preventivo y correctivo para garantizar el óptimo funcionamiento de tus equipos.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h3>Despacho y Logística</h3>
            <p>Envío de equipos a nivel nacional con rastreo en tiempo real y manipulación especializada.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>Garantía</h3>
            <p>Todos nuestros productos cuentan con garantía del fabricante y soporte postventa.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <h3>Sistemas Hidráulicos</h3>
            <p>Diseño, instalación y mantenimiento de sistemas de bombeo y distribución de agua.</p>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2>¿Necesitas más información?</h2>
          <p>Contáctanos y uno de nuestros asesores te ayudará</p>
          <Link href="/contacto" className="btn btn-primary btn-large">
            Contactar Ahora
          </Link>
        </div>
      </div>
    </div>
  )
}

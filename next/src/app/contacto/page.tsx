'use client'

import { useState } from 'react'
import styles from './page.module.scss'

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Formulario enviado (demo). En producción, esto enviaría los datos a un servidor.')
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div className={styles.contactoPage}>
      <div className="container py-5">
        <div className={styles.pageHeader}>
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte</p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3>Dirección</h3>
              <p>Bogotá D.C., Colombia</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3>Teléfono</h3>
              <p>+57 (1) 234-5678</p>
              <p>+57 300 123-4567</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3>Email</h3>
              <p>ventas@xcp.com.co</p>
              <p>info@xcp.com.co</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Horario</h3>
              <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p>Sábados: 9:00 AM - 1:00 PM</p>
            </div>
          </div>

          <div className={styles.contactFormSection}>
            <h2>Envíanos un Mensaje</h2>
            <p className={styles.formDescription}>Completa el formulario y nos pondremos en contacto contigo pronto</p>

            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo *</label>
                <input type="text" id="name" value={form.name} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" value={form.phone} onChange={handleChange} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Asunto *</label>
                <input type="text" id="subject" value={form.subject} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Mensaje *</label>
                <textarea id="message" value={form.message} onChange={handleChange} rows={5} required></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

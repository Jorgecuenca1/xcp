'use client';

import { useState, useEffect } from 'react';
import styles from './configuracion.module.scss';

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  currency: string;
  tax: number;
  productsPerPage: number;
}

export default function ConfiguracionPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'XCP - Tienda Industrial',
    siteDescription: 'Equipos y soluciones para construcción',
    contactEmail: 'info@xcp.com.co',
    contactPhone: '+57 322 210 1885',
    whatsapp: '573222101885',
    address: 'Villavicencio, Meta, Colombia',
    facebook: 'https://www.facebook.com/xcptienda',
    instagram: 'https://www.instagram.com/xcpingenieria/',
    linkedin: 'https://www.linkedin.com/in/xcp-sas-287868342/',
    youtube: 'https://www.youtube.com/@xcptienda',
    currency: 'COP',
    tax: 19,
    productsPerPage: 24,
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.configPage}>
      <div className={styles.header}>
        <h1>Configuración</h1>
        <p>Administra la configuración general de la tienda</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Información General */}
        <div className={styles.section}>
          <h3>Información General</h3>

          <div className={styles.formGroup}>
            <label htmlFor="siteName">Nombre del Sitio</label>
            <input
              id="siteName"
              name="siteName"
              type="text"
              value={settings.siteName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="siteDescription">Descripción</label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>

        {/* Contacto */}
        <div className={styles.section}>
          <h3>Información de Contacto</h3>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="contactEmail">Email</label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contactPhone">Teléfono</label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={settings.contactPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="whatsapp">WhatsApp (sin +)</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="text"
                value={settings.whatsapp}
                onChange={handleChange}
                placeholder="573222101885"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Dirección</label>
              <input
                id="address"
                name="address"
                type="text"
                value={settings.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className={styles.section}>
          <h3>Redes Sociales</h3>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="facebook">Facebook</label>
              <input
                id="facebook"
                name="facebook"
                type="url"
                value={settings.facebook}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="instagram">Instagram</label>
              <input
                id="instagram"
                name="instagram"
                type="url"
                value={settings.instagram}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                id="linkedin"
                name="linkedin"
                type="url"
                value={settings.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="youtube">YouTube</label>
              <input
                id="youtube"
                name="youtube"
                type="url"
                value={settings.youtube}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Configuración de Tienda */}
        <div className={styles.section}>
          <h3>Configuración de Tienda</h3>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="currency">Moneda</label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="COP">COP - Peso Colombiano</option>
                <option value="USD">USD - Dólar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tax">IVA (%)</label>
              <input
                id="tax"
                name="tax"
                type="number"
                value={settings.tax}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="productsPerPage">Productos por Página</label>
              <input
                id="productsPerPage"
                name="productsPerPage"
                type="number"
                value={settings.productsPerPage}
                onChange={handleChange}
                min="8"
                max="100"
                step="4"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {saved && <div className={styles.successMessage}>✓ Configuración guardada</div>}
          <button type="submit" className={styles.saveBtn}>
            💾 Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import styles from './marcas.module.scss';

interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  active?: boolean;
  createdAt: string;
}

export default function MarcasPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    logo: '',
    website: '',
    active: true,
  });

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () => {
    const stored = localStorage.getItem('brands');
    if (stored) {
      setBrands(JSON.parse(stored));
    } else {
      const defaultBrands: Brand[] = [
        {
          id: '1',
          name: 'Tsurumi',
          slug: 'tsurumi',
          description: 'Bombas de agua japonesas',
          active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Honda',
          slug: 'honda',
          description: 'Motores y generadores',
          active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Makita',
          slug: 'makita',
          description: 'Herramientas eléctricas',
          active: true,
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('brands', JSON.stringify(defaultBrands));
      setBrands(defaultBrands);
    }
  };

  const openModal = (brand?: Brand) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData({
        name: brand.name,
        slug: brand.slug,
        description: brand.description || '',
        logo: brand.logo || '',
        website: brand.website || '',
        active: brand.active ?? true,
      });
    } else {
      setEditingBrand(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        logo: '',
        website: '',
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || generateSlug(formData.name);

    if (editingBrand) {
      const updated = brands.map((brand) =>
        brand.id === editingBrand.id
          ? { ...brand, ...formData, slug, updatedAt: new Date().toISOString() }
          : brand
      );
      setBrands(updated);
      localStorage.setItem('brands', JSON.stringify(updated));
    } else {
      const newBrand: Brand = {
        id: Date.now().toString(),
        ...formData,
        slug,
        createdAt: new Date().toISOString(),
      };
      const updated = [newBrand, ...brands];
      setBrands(updated);
      localStorage.setItem('brands', JSON.stringify(updated));
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta marca?')) {
      const updated = brands.filter((brand) => brand.id !== id);
      setBrands(updated);
      localStorage.setItem('brands', JSON.stringify(updated));
    }
  };

  const toggleActive = (id: string) => {
    const updated = brands.map((brand) =>
      brand.id === id ? { ...brand, active: !brand.active } : brand
    );
    setBrands(updated);
    localStorage.setItem('brands', JSON.stringify(updated));
  };

  return (
    <div className={styles.marcasPage}>
      <div className={styles.header}>
        <div>
          <h1>Marcas</h1>
          <p>Gestiona las marcas de productos</p>
        </div>
        <button onClick={() => openModal()} className={styles.addBtn}>
          ➕ Nueva Marca
        </button>
      </div>

      <div className={styles.grid}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.brandCard}>
            {brand.logo && (
              <div className={styles.brandLogo}>
                <img src={brand.logo} alt={brand.name} />
              </div>
            )}

            <div className={styles.brandContent}>
              <div className={styles.brandHeader}>
                <h3>{brand.name}</h3>
                <span className={`${styles.badge} ${brand.active ? styles.active : styles.inactive}`}>
                  {brand.active ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              {brand.description && <p className={styles.description}>{brand.description}</p>}

              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.website}
                >
                  🌐 Sitio web
                </a>
              )}

              <div className={styles.actions}>
                <button onClick={() => openModal(brand)} className={styles.editBtn}>
                  ✏️ Editar
                </button>
                <button onClick={() => toggleActive(brand.id)} className={styles.toggleBtn}>
                  {brand.active ? '👁️' : '🚫'}
                </button>
                <button onClick={() => handleDelete(brand.id)} className={styles.deleteBtn}>
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}

        {brands.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🏷️</div>
            <h3>No hay marcas</h3>
            <p>Agrega marcas para organizar mejor tus productos</p>
            <button onClick={() => openModal()} className={styles.emptyBtn}>
              Nueva Marca
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingBrand ? 'Editar Marca' : 'Nueva Marca'}</h2>
              <button onClick={closeModal} className={styles.closeBtn}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  Nombre <span className={styles.required}>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  required
                  placeholder="Ej: Tsurumi"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="slug">Slug (URL)</label>
                <input
                  id="slug"
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="tsurumi"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Descripción de la marca..."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="logo">Logo (URL)</label>
                <input
                  id="logo"
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://ejemplo.com/logo.png"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="website">Sitio Web</label>
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.marca.com"
                />
              </div>

              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  <span>Marca activa</span>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>
                  Cancelar
                </button>
                <button type="submit" className={styles.saveBtn}>
                  💾 Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

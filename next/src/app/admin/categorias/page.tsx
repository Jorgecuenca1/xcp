'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './categorias.module.scss';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string;
  image?: string;
  count?: number;
  active?: boolean;
  createdAt: string;
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent: '',
    image: '',
    active: true,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const stored = localStorage.getItem('categories');
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      // Categorías por defecto
      const defaultCategories: Category[] = [
        {
          id: '1',
          name: 'Bombeo',
          slug: 'bombeo',
          description: 'Bombas de todo tipo',
          count: 118,
          active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Herramienta eléctrica',
          slug: 'herramienta-electrica',
          count: 9,
          active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Generación y Motores',
          slug: 'generacion-motores',
          count: 54,
          active: true,
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
      setCategories(defaultCategories);
    }
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        parent: category.parent || '',
        image: category.image || '',
        active: category.active ?? true,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        parent: '',
        image: '',
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
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

    if (editingCategory) {
      // Actualizar categoría
      const updated = categories.map((cat) =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData, slug, updatedAt: new Date().toISOString() }
          : cat
      );
      setCategories(updated);
      localStorage.setItem('categories', JSON.stringify(updated));
    } else {
      // Nueva categoría
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        slug,
        count: 0,
        createdAt: new Date().toISOString(),
      };
      const updated = [newCategory, ...categories];
      setCategories(updated);
      localStorage.setItem('categories', JSON.stringify(updated));
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      const updated = categories.filter((cat) => cat.id !== id);
      setCategories(updated);
      localStorage.setItem('categories', JSON.stringify(updated));
    }
  };

  const toggleActive = (id: string) => {
    const updated = categories.map((cat) =>
      cat.id === id ? { ...cat, active: !cat.active } : cat
    );
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  return (
    <div className={styles.categoriasPage}>
      <div className={styles.header}>
        <div>
          <h1>Categorías</h1>
          <p>Organiza tus productos por categorías</p>
        </div>
        <button onClick={() => openModal()} className={styles.addBtn}>
          ➕ Nueva Categoría
        </button>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            {category.image && (
              <div className={styles.categoryImage}>
                <img src={category.image} alt={category.name} />
              </div>
            )}

            <div className={styles.categoryContent}>
              <div className={styles.categoryHeader}>
                <h3>{category.name}</h3>
                <span className={`${styles.badge} ${category.active ? styles.active : styles.inactive}`}>
                  {category.active ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              {category.description && (
                <p className={styles.description}>{category.description}</p>
              )}

              <div className={styles.categoryMeta}>
                <span className={styles.slug}>/{category.slug}</span>
                <span className={styles.count}>{category.count || 0} productos</span>
              </div>

              <div className={styles.actions}>
                <button onClick={() => openModal(category)} className={styles.editBtn}>
                  ✏️ Editar
                </button>
                <button onClick={() => toggleActive(category.id)} className={styles.toggleBtn}>
                  {category.active ? '👁️' : '🚫'}
                </button>
                <button onClick={() => handleDelete(category.id)} className={styles.deleteBtn}>
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📁</div>
            <h3>No hay categorías</h3>
            <p>Crea tu primera categoría para organizar los productos</p>
            <button onClick={() => openModal()} className={styles.emptyBtn}>
              Nueva Categoría
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
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
                  placeholder="Ej: Bombeo"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="slug">Slug (URL)</label>
                <input
                  id="slug"
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="bombeo"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Descripción de la categoría..."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="parent">Categoría Padre</label>
                <select
                  id="parent"
                  value={formData.parent}
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                >
                  <option value="">Sin categoría padre</option>
                  {categories
                    .filter((cat) => cat.id !== editingCategory?.id)
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="image">Imagen (URL)</label>
                <input
                  id="image"
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  <span>Categoría activa</span>
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

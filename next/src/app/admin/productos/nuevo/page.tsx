'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './form.module.scss';

export default function NuevoProducto() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    category: '',
    brand: '',
    description: '',
    shortDescription: '',
    utilities: '',
    image: '',
    images: [] as string[],
    featured: false,
    active: true,
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    tags: [] as string[],
  });

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  const loadCategories = () => {
    const stored = localStorage.getItem('categories');
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      // Categorías por defecto
      const defaultCategories = [
        { id: '1', name: 'Bombeo' },
        { id: '2', name: 'Herramienta eléctrica' },
        { id: '3', name: 'Generación y Motores' },
        { id: '4', name: 'Desbaste y Acabados' },
      ];
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
      setCategories(defaultCategories);
    }
  };

  const loadBrands = () => {
    const stored = localStorage.getItem('brands');
    if (stored) {
      setBrands(JSON.parse(stored));
    } else {
      // Marcas por defecto
      const defaultBrands = [
        { id: '1', name: 'Tsurumi' },
        { id: '2', name: 'Honda' },
        { id: '3', name: 'Makita' },
      ];
      localStorage.setItem('brands', JSON.stringify(defaultBrands));
      setBrands(defaultBrands);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newProduct = {
      id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      weight: parseFloat(formData.weight) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Guardar en localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.unshift(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    setTimeout(() => {
      router.push('/admin/productos');
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (name.startsWith('dimensions.')) {
      const dim = name.split('.')[1];
      setFormData({
        ...formData,
        dimensions: { ...formData.dimensions, [dim]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addImage = () => {
    const url = prompt('URL de la imagen:');
    if (url) {
      setFormData({ ...formData, images: [...formData.images, url] });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/productos" className={styles.backLink}>
            ← Volver
          </Link>
          <h1>Agregar Nuevo Producto</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Información Básica */}
          <div className={styles.section}>
            <h3>Información Básica</h3>

            <div className={styles.formGroup}>
              <label htmlFor="name">
                Nombre del Producto <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ej: Bomba Sumergible 1HP"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="sku">
                  SKU <span className={styles.required}>*</span>
                </label>
                <input
                  id="sku"
                  name="sku"
                  type="text"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  placeholder="BOM-SUM-001"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="brand">Marca</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar marca</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="shortDescription">Descripción Corta</label>
              <input
                id="shortDescription"
                name="shortDescription"
                type="text"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Breve descripción del producto"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Descripción Completa</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Descripción detallada del producto..."
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="utilities">Utilidades del Producto</label>
              <textarea
                id="utilities"
                name="utilities"
                value={formData.utilities}
                onChange={handleChange}
                rows={5}
                placeholder="Describe las utilidades y aplicaciones del producto..."
              />
              <small className={styles.helpText}>
                Información sobre los usos y aplicaciones prácticas del producto
              </small>
            </div>
          </div>

          {/* Precio e Inventario */}
          <div className={styles.section}>
            <h3>Precio e Inventario</h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="price">
                  Precio (COP) <span className={styles.required}>*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="100"
                  placeholder="450000"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="stock">
                  Stock <span className={styles.required}>*</span>
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="25"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">
                Categoría <span className={styles.required}>*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dimensiones y Peso */}
          <div className={styles.section}>
            <h3>Dimensiones y Peso</h3>

            <div className={styles.formGroup}>
              <label htmlFor="weight">Peso (kg)</label>
              <input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.1"
                placeholder="5.5"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="dimensions.length">Largo (cm)</label>
                <input
                  id="dimensions.length"
                  name="dimensions.length"
                  type="number"
                  value={formData.dimensions.length}
                  onChange={handleChange}
                  min="0"
                  placeholder="50"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dimensions.width">Ancho (cm)</label>
                <input
                  id="dimensions.width"
                  name="dimensions.width"
                  type="number"
                  value={formData.dimensions.width}
                  onChange={handleChange}
                  min="0"
                  placeholder="30"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dimensions.height">Alto (cm)</label>
                <input
                  id="dimensions.height"
                  name="dimensions.height"
                  type="number"
                  value={formData.dimensions.height}
                  onChange={handleChange}
                  min="0"
                  placeholder="40"
                />
              </div>
            </div>
          </div>

          {/* Imágenes */}
          <div className={styles.section}>
            <h3>Imágenes</h3>

            <div className={styles.formGroup}>
              <label htmlFor="image">Imagen Principal (URL)</label>
              <input
                id="image"
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Galería de Imágenes</label>
              <div className={styles.imageGallery}>
                {formData.images.map((img, index) => (
                  <div key={index} className={styles.imageItem}>
                    <img src={img} alt={`Imagen ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className={styles.removeImageBtn}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addImage} className={styles.addImageBtn}>
                  ➕ Agregar Imagen
                </button>
              </div>
            </div>
          </div>

          {/* Configuración */}
          <div className={styles.section}>
            <h3>Configuración</h3>

            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <span>Producto Destacado</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
                <span>Activo (visible en tienda)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link href="/admin/productos" className={styles.cancelBtn}>
            Cancelar
          </Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? 'Guardando...' : '💾 Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}

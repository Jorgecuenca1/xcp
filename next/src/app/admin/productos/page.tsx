'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './productos.module.scss';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  description: string;
  image?: string;
  images?: string[];
  featured?: boolean;
  active?: boolean;
  createdAt: string;
}

export default function ProductosPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, filterCategory, products]);

  const loadProducts = () => {
    const stored = localStorage.getItem('products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      // Datos de ejemplo
      const sampleProducts: Product[] = [
        {
          id: '1',
          name: 'Bomba Sumergible 1HP',
          sku: 'BOM-SUM-001',
          price: 450000,
          stock: 25,
          category: 'Bombeo',
          brand: 'Tsurumi',
          description: 'Bomba sumergible de alta eficiencia',
          image: '/images/products/bomba-1.jpg',
          featured: true,
          active: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Motor Gasolina 13HP',
          sku: 'MOT-GAS-013',
          price: 1200000,
          stock: 10,
          category: 'Generación y Motores',
          brand: 'Honda',
          description: 'Motor a gasolina de 13HP',
          image: '/images/products/motor-1.jpg',
          featured: false,
          active: true,
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('products', JSON.stringify(sampleProducts));
      setProducts(sampleProducts);
    }
  };

  const loadCategories = () => {
    const stored = localStorage.getItem('categories');
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem('products', JSON.stringify(updated));
    }
  };

  const toggleFeatured = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const toggleActive = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, active: !p.active } : p
    );
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <div>
          <h1>Productos</h1>
          <p>Gestiona el catálogo de productos de la tienda</p>
        </div>
        <Link href="/admin/productos/nuevo" className={styles.addBtn}>
          ➕ Agregar Producto
        </Link>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button className={styles.exportBtn}>📥 Exportar</button>
      </div>

      {/* Products Table */}
      <div className={styles.tableContainer}>
        {filteredProducts.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>SKU</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Destacado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.productCell}>
                      {product.image && (
                        <img src={product.image} alt={product.name} />
                      )}
                      <div>
                        <div className={styles.productName}>{product.name}</div>
                        {product.brand && (
                          <div className={styles.productBrand}>{product.brand}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>
                    <span
                      className={`${styles.stockBadge} ${
                        product.stock > 10 ? styles.inStock : styles.lowStock
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleActive(product.id)}
                      className={`${styles.statusBadge} ${
                        product.active ? styles.active : styles.inactive
                      }`}
                    >
                      {product.active ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={styles.featuredBtn}
                    >
                      {product.featured ? '⭐' : '☆'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/productos/${product.id}`}
                        className={styles.editBtn}
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className={styles.deleteBtn}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📦</div>
            <h3>No hay productos</h3>
            <p>Comienza agregando tu primer producto</p>
            <Link href="/admin/productos/nuevo" className={styles.emptyBtn}>
              Agregar Producto
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className={styles.pagination}>
          <span>Mostrando {filteredProducts.length} productos</span>
        </div>
      )}
    </div>
  );
}

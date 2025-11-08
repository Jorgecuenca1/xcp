'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.scss';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    revenue: 0,
  });

  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    // Cargar estadísticas desde localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');

    setStats({
      totalProducts: products.length,
      totalCategories: categories.length,
      totalOrders: 45,
      revenue: 12500000,
    });

    setRecentProducts(products.slice(0, 5));
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const statCards = [
    {
      title: 'Total Productos',
      value: stats.totalProducts,
      icon: '📦',
      color: '#667eea',
      link: '/admin/productos',
    },
    {
      title: 'Categorías',
      value: stats.totalCategories,
      icon: '📁',
      color: '#764ba2',
      link: '/admin/categorias',
    },
    {
      title: 'Pedidos',
      value: stats.totalOrders,
      icon: '🛒',
      color: '#f093fb',
      link: '#',
    },
    {
      title: 'Ingresos',
      value: formatPrice(stats.revenue),
      icon: '💰',
      color: '#4facfe',
      link: '#',
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Bienvenido al panel de administración de XCP</p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <Link href={stat.link} key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statTitle}>{stat.title}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2>Acciones Rápidas</h2>
        <div className={styles.quickActions}>
          <Link href="/admin/productos/nuevo" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span>Agregar Producto</span>
          </Link>
          <Link href="/admin/categorias/nueva" className={styles.actionCard}>
            <span className={styles.actionIcon}>📁</span>
            <span>Nueva Categoría</span>
          </Link>
          <Link href="/admin/marcas/nueva" className={styles.actionCard}>
            <span className={styles.actionIcon}>🏷️</span>
            <span>Nueva Marca</span>
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Productos Recientes</h2>
          <Link href="/admin/productos" className={styles.viewAll}>
            Ver todos →
          </Link>
        </div>

        {recentProducts.length > 0 ? (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>SKU</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productCell}>
                        {product.image && (
                          <img src={product.image} alt={product.name} />
                        )}
                        <span>{product.name}</span>
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
                      <Link
                        href={`/admin/productos/${product.id}`}
                        className={styles.editBtn}
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No hay productos registrados</p>
            <Link href="/admin/productos/nuevo" className={styles.addFirstBtn}>
              Agregar Primer Producto
            </Link>
          </div>
        )}
      </div>

      {/* Activity */}
      <div className={styles.section}>
        <h2>Actividad Reciente</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon} style={{ background: '#667eea' }}>
              📦
            </div>
            <div className={styles.activityContent}>
              <strong>Nuevo producto agregado</strong>
              <span>Hace 2 horas</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon} style={{ background: '#764ba2' }}>
              📁
            </div>
            <div className={styles.activityContent}>
              <strong>Categoría actualizada</strong>
              <span>Hace 5 horas</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon} style={{ background: '#f093fb' }}>
              🛒
            </div>
            <div className={styles.activityContent}>
              <strong>Nuevo pedido recibido</strong>
              <span>Hace 1 día</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

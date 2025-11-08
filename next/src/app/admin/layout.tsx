'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.scss';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');

    if (pathname !== '/admin/login') {
      if (!token) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
        if (user) setAdminUser(JSON.parse(user));
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  // Si es la página de login, no mostrar el layout del admin
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: '🎬', label: 'Sliders', path: '/admin/sliders' },
    { icon: '📦', label: 'Productos', path: '/admin/productos' },
    { icon: '📁', label: 'Categorías', path: '/admin/categorias' },
    { icon: '🏷️', label: 'Marcas', path: '/admin/marcas' },
    { icon: '⚙️', label: 'Configuración', path: '/admin/configuracion' },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>XCP Admin</h2>
          <button className={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {sidebarOpen && <span className={styles.label}>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {sidebarOpen && (
          <div className={styles.sidebarFooter}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>👤</div>
              <div className={styles.userDetails}>
                <div className={styles.userName}>{adminUser?.name}</div>
                <div className={styles.userEmail}>{adminUser?.email}</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <button className={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>

          <div className={styles.headerRight}>
            <button className={styles.notificationBtn}>
              🔔
              <span className={styles.badge}>3</span>
            </button>

            <div className={styles.userMenu}>
              <button className={styles.userBtn}>
                <span className={styles.userAvatar}>👤</span>
                <span>{adminUser?.name}</span>
              </button>
              <div className={styles.dropdown}>
                <Link href="/admin/perfil">Mi Perfil</Link>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

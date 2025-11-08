'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.scss';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Credenciales de prueba (en producción esto iría a una API)
    if (credentials.email === 'admin@xcp.com' && credentials.password === 'admin123') {
      // Guardar token de sesión
      localStorage.setItem('adminToken', 'authenticated');
      localStorage.setItem('adminUser', JSON.stringify({
        email: credentials.email,
        name: 'Administrador XCP',
        role: 'admin'
      }));

      router.push('/admin/dashboard');
    } else {
      setError('Credenciales incorrectas');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <h1>XCP Admin</h1>
          <p>Panel de Administración</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="admin@xcp.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <div className={styles.credentials}>
            <small>
              <strong>Credenciales de prueba:</strong><br />
              Email: admin@xcp.com<br />
              Contraseña: admin123
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

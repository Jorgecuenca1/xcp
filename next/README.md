# XCP Next.js Application

Aplicación e-commerce para XCP construida con Next.js 15, React 19 y TypeScript.

## 🚀 Desarrollo Local

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en: http://localhost:3001

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo (puerto 3001)
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción (puerto 3001)
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
next/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página de inicio
│   │   ├── api/                # API Routes
│   │   │   └── health/         # Health check endpoint
│   │   ├── admin/              # Panel administrativo
│   │   ├── categorias/         # Páginas de categorías
│   │   │   └── [slug]/
│   │   ├── productos/          # Páginas de productos
│   │   │   └── [slug]/
│   │   ├── tienda/             # Tienda general
│   │   ├── contacto/           # Página de contacto
│   │   ├── nosotros/           # Página sobre nosotros
│   │   └── servicios/          # Página de servicios
│   ├── components/             # Componentes reutilizables
│   │   ├── Header.tsx          # Header del sitio
│   │   ├── Footer.tsx          # Footer del sitio
│   │   ├── ProductCard.tsx     # Card de producto
│   │   └── ChatBot.tsx         # Chatbot de asistencia
│   ├── data/                   # Datos mock
│   │   ├── categories.ts       # Categorías de productos
│   │   └── products.ts         # Productos
│   ├── lib/                    # Utilidades y helpers
│   │   └── demoData.ts         # Datos demo completos
│   └── styles/                 # Estilos globales
│       └── globals.scss        # SCSS global
├── public/                     # Archivos estáticos
│   └── images/                 # Imágenes
│       ├── categories/         # Imágenes de categorías
│       ├── products/           # Imágenes de productos
│       ├── slider/             # Imágenes del slider
│       └── logo/               # Logos
├── Dockerfile                  # Configuración Docker
├── .dockerignore              # Exclusiones Docker
├── next.config.ts             # Configuración Next.js
├── tsconfig.json              # Configuración TypeScript
└── package.json               # Dependencias

```

## 🎨 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: SCSS Modules
- **Build**: Turbopack (dev), Webpack (prod)

## 🐳 Docker

### Build local

```bash
# Construir imagen
docker build -t xcp-next .

# Ejecutar contenedor
docker run -p 3000:3000 xcp-next
```

### Características del Dockerfile

- **Multi-stage build**: Optimización de tamaño de imagen
- **Standalone output**: Aplicación autocontenida
- **Non-root user**: Seguridad mejorada
- **Health check**: Monitoreo automático

## 📊 API Endpoints

### Health Check

**GET** `/api/health`

Respuesta:
```json
{
  "status": "ok",
  "timestamp": "2025-11-18T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

## 🗂️ Datos

### Categorías

Las categorías están definidas en `src/data/categories.ts`:

```typescript
interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  image?: string;
  description?: string;
}
```

### Productos

Los productos están definidos en `src/data/products.ts`:

```typescript
interface Product {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  description: string;
  shortDescription: string;
  brand?: string;
  sku?: string;
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
}
```

## 🎨 Estilos

### Colores principales

```scss
// Primario
$primary-color: #cf2e2e;
$primary-hover: #b82525;

// Secundario
$secondary-color: #333;
$text-color: #666;

// Backgrounds
$bg-light: #f5f5f5;
$bg-white: #fff;
```

### Tipografías

- **Headings**: 'Roboto Slab', serif
- **Body**: 'Inter', 'Roboto', sans-serif

## 🔧 Configuración

### Environment Variables

Crear archivo `.env.local`:

```bash
# Desarrollo local
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Analytics (opcional)
# NEXT_PUBLIC_GA_ID=
```

### Next.js Config

El archivo `next.config.ts` incluye:

- **Standalone output**: Para Docker deployment
- **Image optimization**: Soporte para dominios remotos

## 📦 Build para Producción

### Local Build

```bash
npm run build
npm run start
```

### Docker Build

```bash
docker build -t xcp-next .
docker run -p 3000:3000 xcp-next
```

### Verificar build

```bash
# Health check
curl http://localhost:3000/api/health

# Página principal
curl http://localhost:3000
```

## 🐛 Debugging

### Logs en desarrollo

```bash
npm run dev
# Los logs aparecerán en la terminal
```

### Logs en Docker

```bash
docker logs xcp_next
docker logs -f xcp_next  # Follow mode
```

## 📝 Notas de Desarrollo

1. **Puerto**: La aplicación usa el puerto 3001 en desarrollo
2. **Hot Reload**: Cambios en código se reflejan automáticamente
3. **SCSS Modules**: Los estilos están escopeados por componente
4. **Static Generation**: Páginas se generan estáticamente cuando es posible
5. **Image Optimization**: Next.js optimiza imágenes automáticamente

## 🚀 Deployment

Ver documentación en el directorio raíz:

- [DEPLOY-DOCKER.md](../DEPLOY-DOCKER.md) - Docker con HTTPS Portal
- [DEPLOY-DIGITAL-OCEAN.md](../DEPLOY-DIGITAL-OCEAN.md) - Digital Ocean con PM2

---

**Versión**: 1.0.0
**Next.js**: 15.1.6
**React**: 19.0.0

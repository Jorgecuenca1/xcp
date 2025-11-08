# xcp

Tienda XCP - E-commerce en Next.js 15

Este repositorio contiene la implementación en **Next.js** del e-commerce para XCP (Xtreme Construction Products), replicando el diseño del tema Electro de WordPress.

## 🚀 Inicio Rápido

```bash
# Navegar al directorio de Next
cd next

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El sitio estará disponible en: http://localhost:3000
```

## 📁 Estructura del Proyecto

```
xcp/
└── next/              # Implementación en Next.js 15
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── categorias/[slug]/page.tsx
    │   │   └── productos/[slug]/page.tsx
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── ProductCard.tsx
    │   ├── data/
    │   │   ├── categories.ts
    │   │   └── products.ts
    │   └── styles/
    │       └── globals.scss
    ├── next.config.ts
    ├── package.json
    └── tsconfig.json
```

## 🎨 Diseño y Características

- **Colores**: Esquema rojo basado en Electro theme (#cf2e2e como primario)
- **Tipografía**: Inter, Roboto, Roboto Slab
- **Responsive**: Mobile-first design, totalmente responsive
- **Categorías Recursivas**: Sistema de categorías con subcategorías ilimitadas
- **Sin Login ni Carrito**: Enfocado solo en catálogo y visualización de productos

### Características Implementadas

✅ Header con búsqueda y menú de categorías
✅ Footer con información de contacto y enlaces
✅ Homepage con banner, features, productos destacados
✅ Páginas de categorías con breadcrumbs y subcategorías
✅ Páginas de productos con galería de imágenes
✅ Product cards con ratings, precios y descuentos
✅ Sistema de categorías recursivas (tabla única)
✅ Data mock completa con productos reales

## 📦 Dependencias Principales

- `next`: ^15.1.6
- `react`: ^19.0.0
- `sass`: ^1.80.7

## 🗄️ Modelo de Datos

### Categorías (Recursivas)

```typescript
interface Category {
  id: number
  name: string
  slug: string
  parentId: number | null  // null = categoría raíz
  image?: string
  description?: string
}
```

### Productos

```typescript
interface Product {
  id: number
  name: string
  slug: string
  categoryId: number
  price: number
  salePrice?: number
  image: string
  images?: string[]
  description: string
  shortDescription: string
  brand?: string
  sku?: string
  inStock: boolean
  featured?: boolean
  rating?: number
  reviewCount?: number
}
```

## 🚢 Compilación para Producción

```bash
npm run build
npm run start      # Servir build de producción
```

## 📝 Documentación Adicional

- [QUICK-START-GUIDE.md](./QUICK-START-GUIDE.md) - Guía de inicio rápido
- [INSTRUCCIONES_FINALES.md](./INSTRUCCIONES_FINALES.md) - Instrucciones finales de configuración
- [CLAUDE.md](./CLAUDE.md) - Información del proyecto para Claude Code

## 📄 Licencia

Este proyecto fue creado para replicar el diseño del tema Electro de WordPress.

---

**Desarrollado con**: Next.js 15, TypeScript, SCSS
**Fecha**: Noviembre 2025

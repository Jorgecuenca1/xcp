#!/bin/bash

# Script de deployment para Digital Ocean
# Este script automatiza el proceso de actualización del sitio

echo "🚀 Iniciando deployment de XCP Next.js..."

# Detener la aplicación si está corriendo
echo "⏸️  Deteniendo aplicación..."
pm2 stop xcp-next || true

# Actualizar código desde GitHub
echo "📥 Actualizando código desde GitHub..."
git pull origin main

# Navegar al directorio de Next
cd next

# Instalar/actualizar dependencias
echo "📦 Instalando dependencias..."
npm install --production

# Construir la aplicación
echo "🔨 Construyendo aplicación..."
npm run build

# Volver al directorio raíz
cd ..

# Iniciar/reiniciar la aplicación con PM2
echo "✅ Iniciando aplicación con PM2..."
pm2 start ecosystem.config.js || pm2 restart xcp-next

# Guardar la configuración de PM2
pm2 save

echo "✨ Deployment completado!"
echo "📍 La aplicación está corriendo en el puerto 3000"
echo "🔍 Verifica el estado con: pm2 status"
echo "📋 Ver logs con: pm2 logs xcp-next"

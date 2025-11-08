# Guía de Deployment en Digital Ocean

Esta guía te ayudará a desplegar tu aplicación Next.js de XCP en un servidor Digital Ocean.

## 📋 Requisitos Previos

1. **Droplet de Digital Ocean** creado (Ubuntu 20.04 o superior recomendado)
2. **Acceso SSH** al servidor
3. **Dominio** (opcional, puedes usar la IP directamente)

## 🚀 Paso 1: Preparar el Servidor

### 1.1 Conectarse al servidor vía SSH

```bash
ssh root@YOUR_SERVER_IP
```

Reemplaza `YOUR_SERVER_IP` con la IP de tu droplet.

### 1.2 Actualizar el sistema

```bash
apt update && apt upgrade -y
```

### 1.3 Instalar Node.js (versión 18 o superior)

```bash
# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verificar instalación
node --version
npm --version
```

### 1.4 Instalar PM2 (gestor de procesos)

```bash
npm install -g pm2

# Verificar instalación
pm2 --version
```

### 1.5 Instalar Git

```bash
apt install -y git

# Verificar instalación
git --version
```

### 1.6 Configurar Firewall (opcional pero recomendado)

```bash
# Permitir SSH
ufw allow 22/tcp

# Permitir puerto 3000 (tu aplicación)
ufw allow 3000/tcp

# Permitir HTTP/HTTPS si usarás nginx
ufw allow 80/tcp
ufw allow 443/tcp

# Activar firewall
ufw enable

# Ver estado
ufw status
```

## 📥 Paso 2: Clonar el Repositorio

### 2.1 Crear directorio para la aplicación

```bash
# Crear directorio
mkdir -p /var/www
cd /var/www

# Clonar repositorio
git clone https://github.com/Jorgecuenca1/xcp.git

# Entrar al directorio
cd xcp
```

### 2.2 Configurar variables de entorno (opcional)

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tu IP
nano .env.local
```

Modifica `YOUR_SERVER_IP` con tu IP real.

## 🔨 Paso 3: Instalar y Construir la Aplicación

### 3.1 Instalar dependencias

```bash
cd next
npm install
```

### 3.2 Construir la aplicación

```bash
npm run build
```

### 3.3 Volver al directorio raíz

```bash
cd /var/www/xcp
```

## ▶️ Paso 4: Iniciar la Aplicación con PM2

### 4.1 Dar permisos de ejecución al script

```bash
chmod +x deploy.sh
```

### 4.2 Iniciar la aplicación

```bash
pm2 start ecosystem.config.js
```

### 4.3 Guardar configuración de PM2

```bash
pm2 save
pm2 startup
```

Ejecuta el comando que PM2 te muestra para que la aplicación se inicie automáticamente al reiniciar el servidor.

### 4.4 Verificar que está corriendo

```bash
pm2 status
pm2 logs xcp-next
```

## 🌐 Paso 5: Acceder a tu Aplicación

Tu aplicación estará disponible en:

```
http://YOUR_SERVER_IP:3000
```

Reemplaza `YOUR_SERVER_IP` con la IP de tu servidor.

## 🔄 Actualización del Código (Deployments Futuros)

Para actualizar el código después de hacer cambios:

### Opción 1: Usar el script automático

```bash
cd /var/www/xcp
./deploy.sh
```

### Opción 2: Manual

```bash
cd /var/www/xcp

# Detener la aplicación
pm2 stop xcp-next

# Actualizar código
git pull origin main

# Instalar dependencias (si hay cambios)
cd next
npm install

# Reconstruir
npm run build

# Volver y reiniciar
cd ..
pm2 restart xcp-next
```

## 🎯 Paso 6: Configurar Nginx (Opcional - Recomendado)

Si quieres usar un dominio o exponer en el puerto 80:

### 6.1 Instalar Nginx

```bash
apt install -y nginx
```

### 6.2 Crear configuración

```bash
nano /etc/nginx/sites-available/xcp
```

Añade este contenido:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6.3 Activar configuración

```bash
# Crear symlink
ln -s /etc/nginx/sites-available/xcp /etc/nginx/sites-enabled/

# Verificar configuración
nginx -t

# Reiniciar nginx
systemctl restart nginx
```

Ahora puedes acceder sin especificar puerto:

```
http://YOUR_DOMAIN_OR_IP
```

### 6.4 Configurar SSL con Let's Encrypt (Opcional)

```bash
# Instalar certbot
apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
certbot --nginx -d YOUR_DOMAIN

# Renovación automática
certbot renew --dry-run
```

## 📊 Comandos Útiles de PM2

```bash
# Ver estado de aplicaciones
pm2 status

# Ver logs en tiempo real
pm2 logs xcp-next

# Ver logs de errores
pm2 logs xcp-next --err

# Ver métricas (CPU, memoria)
pm2 monit

# Reiniciar aplicación
pm2 restart xcp-next

# Detener aplicación
pm2 stop xcp-next

# Eliminar aplicación de PM2
pm2 delete xcp-next

# Ver logs guardados
pm2 logs xcp-next --lines 100
```

## 🔍 Solución de Problemas

### La aplicación no inicia

```bash
# Ver logs de PM2
pm2 logs xcp-next

# Ver logs de Nginx (si lo usas)
tail -f /var/log/nginx/error.log

# Verificar que el puerto 3000 está libre
netstat -tulpn | grep 3000

# Reiniciar todo
pm2 restart xcp-next
systemctl restart nginx
```

### Error de permisos

```bash
# Dar permisos al directorio
chown -R $USER:$USER /var/www/xcp

# O si usas root
chown -R root:root /var/www/xcp
```

### Memoria insuficiente

Si tu droplet tiene poca RAM (1GB):

```bash
# Crear swap
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### Actualizar Node.js

```bash
# Actualizar a la última versión LTS
npm install -g n
n lts

# Reiniciar aplicación
pm2 restart xcp-next
```

## 📝 Checklist de Deployment

- [ ] Servidor Digital Ocean creado
- [ ] Node.js 18+ instalado
- [ ] PM2 instalado globalmente
- [ ] Git instalado
- [ ] Repositorio clonado en `/var/www/xcp`
- [ ] Dependencias instaladas (`npm install`)
- [ ] Aplicación construida (`npm run build`)
- [ ] PM2 iniciado (`pm2 start ecosystem.config.js`)
- [ ] PM2 configurado para auto-inicio (`pm2 startup`)
- [ ] Firewall configurado (puerto 3000 abierto)
- [ ] Nginx instalado y configurado (opcional)
- [ ] SSL configurado (opcional)
- [ ] Aplicación accesible desde navegador

## 🎉 ¡Listo!

Tu aplicación Next.js de XCP debería estar funcionando en:

```
http://YOUR_SERVER_IP:3000
```

O si configuraste Nginx:

```
http://YOUR_DOMAIN
```

## 🆘 Soporte

Si encuentras problemas:

1. Revisa los logs: `pm2 logs xcp-next`
2. Verifica el estado: `pm2 status`
3. Comprueba el firewall: `ufw status`
4. Verifica que Node.js esté actualizado: `node --version`

---

**Documentación creada**: Noviembre 2025
**Actualizada**: Noviembre 2025

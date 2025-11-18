# Deployment con Docker y HTTPS Portal

Guía completa para desplegar la aplicación XCP Next.js usando Docker y HTTPS Portal con certificados SSL automáticos.

## 📋 Prerrequisitos

- **Docker** (versión 20.10 o superior)
- **Docker Compose** (versión 2.0 o superior)
- **Dominio configurado**: `xcp.seguroslavictoria.co` apuntando a tu servidor (registro A en DNS)
- **Puertos abiertos**: 80 (HTTP) y 443 (HTTPS)

## 🚀 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jorgecuenca1/xcp.git
cd xcp
```

### 2. Configurar variables de entorno (opcional)

El archivo `docker-compose.yml` ya incluye la configuración necesaria, pero puedes personalizarla:

```bash
# Copiar archivo de ejemplo (opcional)
cp .env.docker.example .env.docker

# Editar variables si es necesario
nano .env.docker
```

### 3. Desplegar con Docker Compose

```bash
# Construir y levantar los servicios
docker-compose up -d --build

# Ver logs en tiempo real
docker-compose logs -f

# Ver estado de los contenedores
docker-compose ps
```

### 4. Verificar el deployment

- **HTTP**: http://xcp.seguroslavictoria.co (redirige automáticamente a HTTPS)
- **HTTPS**: https://xcp.seguroslavictoria.co
- **Health Check**: https://xcp.seguroslavictoria.co/api/health

## 📁 Estructura Docker

```
xcp/
├── docker-compose.yml          # Orquestación de servicios
├── .env.docker.example         # Variables de entorno ejemplo
└── next/
    ├── Dockerfile              # Imagen multi-stage de Next.js
    └── .dockerignore           # Archivos excluidos del build
```

## 🔧 Configuración de Servicios

### Next.js Application (`xcp-next`)

```yaml
xcp-next:
  build: ./next
  environment:
    - NODE_ENV=production
    - PORT=3000
    - NEXT_PUBLIC_SITE_URL=https://xcp.seguroslavictoria.co
  expose:
    - "3000"
```

**Características:**
- Build multi-stage optimizado
- Output standalone para menor tamaño
- Health check integrado
- Usuario no-root por seguridad

### HTTPS Portal (`https-portal`)

```yaml
https-portal:
  image: steveltn/https-portal:1
  ports:
    - '80:80'
    - '443:443'
  environment:
    - DOMAINS=xcp.seguroslavictoria.co -> http://xcp-next:3000
    - STAGE=production
```

**Características:**
- Certificados SSL automáticos via Let's Encrypt
- Renovación automática de certificados
- Redirección HTTP → HTTPS
- Reverse proxy nginx

## 🔐 Etapas de HTTPS Portal (STAGE)

Cambia la variable `STAGE` según tu entorno:

### `local` - Desarrollo local
```yaml
STAGE: 'local'
```
- Usa certificados auto-firmados
- No contacta a Let's Encrypt
- Útil para desarrollo sin dominio

### `staging` - Pruebas
```yaml
STAGE: 'staging'
```
- Usa Let's Encrypt Staging
- Certificados de prueba (no confiables en navegadores)
- No cuenta contra límites de rate limit
- **Recomendado para pruebas iniciales**

### `production` - Producción
```yaml
STAGE: 'production'
```
- Usa Let's Encrypt Production
- Certificados válidos y confiables
- Límites de rate limit: 50 certificados/semana/dominio
- **Solo usar cuando todo funcione correctamente**

## 📊 Comandos Docker Útiles

### Gestión de servicios

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Ver logs
docker-compose logs -f xcp-next
docker-compose logs -f https-portal

# Ver estado
docker-compose ps
```

### Mantenimiento

```bash
# Reconstruir después de cambios en código
docker-compose up -d --build

# Ver uso de recursos
docker stats

# Limpiar volúmenes (CUIDADO: borra certificados SSL)
docker-compose down -v

# Limpiar imágenes no usadas
docker system prune -a
```

### Debugging

```bash
# Entrar al contenedor de Next.js
docker exec -it xcp_next sh

# Entrar al contenedor de HTTPS Portal
docker exec -it xcp_https_portal sh

# Ver logs completos
docker-compose logs --tail=100 xcp-next
docker-compose logs --tail=100 https-portal
```

## 🔄 Actualización de la aplicación

```bash
# 1. Detener servicios
docker-compose down

# 2. Actualizar código desde GitHub
git pull origin main

# 3. Reconstruir y levantar
docker-compose up -d --build

# 4. Verificar logs
docker-compose logs -f
```

## 🩺 Health Checks

### Next.js Application

El Dockerfile incluye un health check que verifica cada 30 segundos:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', ...)"
```

### Verificar manualmente

```bash
# Desde el servidor
curl http://localhost:3000
curl https://xcp.seguroslavictoria.co

# Verificar health check
docker inspect --format='{{.State.Health.Status}}' xcp_next
```

## 🔧 Solución de Problemas

### Error: "Address already in use" (Puerto 80/443)

```bash
# Ver qué está usando los puertos
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Detener servicio conflictivo (ejemplo: nginx)
sudo systemctl stop nginx
sudo systemctl disable nginx
```

### Error: Certificados SSL no se generan

**Verificaciones:**

1. **DNS configurado correctamente:**
   ```bash
   nslookup xcp.seguroslavictoria.co
   # Debe apuntar a la IP de tu servidor
   ```

2. **Firewall permite tráfico:**
   ```bash
   # Ubuntu/Debian
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw status

   # CentOS/RHEL
   sudo firewall-cmd --permanent --add-service=http
   sudo firewall-cmd --permanent --add-service=https
   sudo firewall-cmd --reload
   ```

3. **Usar staging primero:**
   ```yaml
   STAGE: 'staging'  # Prueba primero con staging
   ```

4. **Forzar renovación (solo si es necesario):**
   ```yaml
   FORCE_RENEW: 'true'  # Agregar esta línea temporalmente
   ```

### Error: Contenedor Next.js no inicia

```bash
# Ver logs detallados
docker-compose logs xcp-next

# Verificar build
docker-compose build --no-cache xcp-next

# Verificar configuración
docker-compose config
```

### Contenedor reiniciándose constantemente

```bash
# Ver health check status
docker inspect xcp_next | grep -A 10 Health

# Probar acceso interno
docker exec xcp_next wget -O- http://localhost:3000
```

## 📊 Monitoreo

### Logs persistentes

```bash
# Guardar logs a archivo
docker-compose logs > deployment.log

# Monitorear logs en tiempo real
docker-compose logs -f --tail=50
```

### Recursos

```bash
# Ver uso de CPU/Memoria
docker stats xcp_next xcp_https_portal

# Ver tamaño de imágenes
docker images | grep xcp
```

## 🔒 Seguridad

### Mejores prácticas implementadas:

✅ Usuario no-root en contenedor Next.js
✅ Multi-stage build (menor superficie de ataque)
✅ HTTPS automático con Let's Encrypt
✅ Health checks para monitoreo
✅ Restart policy `unless-stopped`
✅ Network isolation con bridge network
✅ Volúmenes persistentes para certificados

### Recomendaciones adicionales:

```bash
# 1. Configurar firewall (ejemplo UFW)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# 2. Actualizar sistema regularmente
sudo apt update && sudo apt upgrade -y

# 3. Monitorear logs de seguridad
docker-compose logs | grep -i error
```

## 🌐 Dominios adicionales

Para agregar más dominios al mismo servidor:

```yaml
environment:
  DOMAINS: |
    xcp.seguroslavictoria.co -> http://xcp-next:3000,
    otro-dominio.com -> http://xcp-next:3000
  STAGE: 'production'
```

## 📦 Backup y Restauración

### Backup de certificados SSL

```bash
# Backup de volúmenes
docker run --rm -v xcp_https-portal-data:/data -v $(pwd):/backup alpine tar czf /backup/ssl-backup.tar.gz /data
```

### Restauración

```bash
# Restaurar volúmenes
docker run --rm -v xcp_https-portal-data:/data -v $(pwd):/backup alpine tar xzf /backup/ssl-backup.tar.gz -C /
```

## 📞 Soporte

- **Repositorio**: https://github.com/Jorgecuenca1/xcp
- **HTTPS Portal Docs**: https://github.com/SteveLTN/https-portal
- **Next.js Docs**: https://nextjs.org/docs

## 📝 Notas Importantes

1. **Primera ejecución**: Los certificados SSL pueden tardar 1-2 minutos en generarse
2. **Rate Limits**: Let's Encrypt tiene límites (50 cert/semana). Usa `staging` para pruebas
3. **DNS**: Asegúrate de que el dominio apunte a tu servidor antes de iniciar
4. **Puertos**: Los puertos 80 y 443 deben estar libres y accesibles desde internet
5. **Renovación**: Los certificados se renuevan automáticamente antes de expirar

---

**Fecha de creación**: Noviembre 2025
**Versión**: 1.0.0
**Mantenedor**: XCP Development Team

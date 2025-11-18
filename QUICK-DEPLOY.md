# ⚡ Deployment Rápido - XCP

## 3 Pasos para Deployment Completo

### 1️⃣ Clonar

```bash
git clone https://github.com/Jorgecuenca1/xcp.git
cd xcp
```

### 2️⃣ Desplegar

```bash
docker-compose up -d --build
```

### 3️⃣ Verificar

```bash
# Ver logs
docker-compose logs -f

# Verificar estado
docker-compose ps
```

## 🌐 Acceder

- **HTTPS**: https://xcp.seguroslavictoria.co
- **Health**: https://xcp.seguroslavictoria.co/api/health

## ✅ Características Automáticas

- ✅ SSL/HTTPS con Let's Encrypt
- ✅ Renovación automática de certificados
- ✅ Sin configuración de variables
- ✅ Listo para producción

## 📋 Prerrequisitos

1. Docker y Docker Compose instalados
2. DNS apuntando a tu servidor: `xcp.seguroslavictoria.co → IP_SERVIDOR`
3. Puertos 80 y 443 abiertos

## 🔧 Comandos Útiles

```bash
# Detener
docker-compose down

# Reiniciar
docker-compose restart

# Ver logs
docker-compose logs -f

# Actualizar código
git pull origin main
docker-compose up -d --build
```

## 📚 Documentación Completa

Para más detalles, ver [DEPLOY-DOCKER.md](./DEPLOY-DOCKER.md)

---

**¡Eso es todo!** Tu sitio está funcionando con HTTPS.

# 🚀 Opciones de Despliegue del Bot

## 📋 Resumen de Opciones

| Opción | Costo | Dificultad | Rendimiento | Recomendado |
|--------|-------|------------|-------------|-------------|
| **VPS (DigitalOcean, Linode)** | $5-20/mes | ⭐⭐ Media | ⭐⭐⭐⭐⭐ Excelente | ✅ SÍ |
| **AWS EC2** | $10-30/mes | ⭐⭐⭐ Alta | ⭐⭐⭐⭐⭐ Excelente | ✅ SÍ |
| **Google Cloud Compute** | $10-25/mes | ⭐⭐⭐ Alta | ⭐⭐⭐⭐⭐ Excelente | ✅ SÍ |
| **Heroku** | $7-25/mes | ⭐ Fácil | ⭐⭐⭐ Bueno | ⚠️ Limitado |
| **Railway** | $5-20/mes | ⭐ Fácil | ⭐⭐⭐⭐ Muy bueno | ✅ SÍ |
| **Render** | $7-25/mes | ⭐ Fácil | ⭐⭐⭐⭐ Muy bueno | ✅ SÍ |
| **PC Local 24/7** | Gratis | ⭐ Fácil | ⭐⭐⭐⭐⭐ Excelente | ⚠️ Depende |
| **Raspberry Pi** | $50 inicial | ⭐⭐ Media | ⭐⭐⭐ Bueno | ⚠️ Limitado |

---

## 🏆 OPCIÓN RECOMENDADA: VPS (Virtual Private Server)

### ¿Por qué VPS?

✅ **Ventajas:**
- Control total del servidor
- Recursos dedicados (RAM, CPU, disco)
- Puedes instalar FFmpeg y Whisper.cpp sin problemas
- Precio predecible
- Fácil de escalar
- Conexión estable 24/7

❌ **Desventajas:**
- Requiere conocimientos básicos de Linux
- Debes configurar todo manualmente
- Responsable de la seguridad

---

## 🎯 Proveedores VPS Recomendados

### 1. **DigitalOcean** ⭐ MÁS RECOMENDADO

**Precio:** $6/mes (Droplet básico)

**Especificaciones:**
- 1 GB RAM
- 1 vCPU
- 25 GB SSD
- 1 TB transferencia

**Pros:**
- Interfaz muy simple
- Documentación excelente
- Snapshots automáticos
- Monitoreo incluido
- Comunidad grande

**Cons:**
- 1 GB RAM puede ser justo para modelo medium
- Necesitarás 2 GB RAM ($12/mes) para modelo large

**Cómo empezar:**
1. Crea cuenta en: https://www.digitalocean.com/
2. Crea un Droplet Ubuntu 22.04
3. Sigue la guía de instalación (ver abajo)

---

### 2. **Linode (Akamai)**

**Precio:** $5/mes (Nanode)

**Especificaciones:**
- 1 GB RAM
- 1 vCPU
- 25 GB SSD
- 1 TB transferencia

**Pros:**
- Más barato que DigitalOcean
- Buen rendimiento
- Soporte 24/7

**Cons:**
- Interfaz menos intuitiva
- Menos documentación en español

**Cómo empezar:**
1. Crea cuenta en: https://www.linode.com/
2. Crea un Linode Ubuntu 22.04
3. Sigue la guía de instalación

---

### 3. **Vultr**

**Precio:** $6/mes (Cloud Compute)

**Especificaciones:**
- 1 GB RAM
- 1 vCPU
- 25 GB SSD
- 1 TB transferencia

**Pros:**
- Muchas ubicaciones (incluye Latinoamérica)
- Buen rendimiento
- Snapshots gratuitos

**Cons:**
- Soporte básico

---

### 4. **Contabo** (Opción económica)

**Precio:** €4.50/mes (~$5/mes)

**Especificaciones:**
- 4 GB RAM ⭐
- 2 vCPUs
- 50 GB SSD
- Tráfico ilimitado

**Pros:**
- Muy económico
- Muchos recursos por el precio
- Perfecto para modelo large

**Cons:**
- Servidores en Europa (mayor latencia)
- Soporte limitado

---

## ☁️ Opciones Cloud (AWS, Google Cloud, Azure)

### AWS EC2

**Precio:** ~$10-30/mes

**Recomendado:**
- t3.small (2 GB RAM, 2 vCPUs) - $15/mes
- t3.medium (4 GB RAM, 2 vCPUs) - $30/mes

**Pros:**
- Infraestructura robusta
- Escalabilidad automática
- Muchos servicios adicionales

**Cons:**
- Complejo para principiantes
- Costos pueden aumentar inesperadamente
- Requiere configuración de seguridad

---

### Google Cloud Compute Engine

**Precio:** ~$10-25/mes

**Recomendado:**
- e2-small (2 GB RAM) - $13/mes
- e2-medium (4 GB RAM) - $27/mes

**Pros:**
- Crédito gratis de $300 para nuevos usuarios
- Buen rendimiento
- Integración con otros servicios Google

**Cons:**
- Interfaz compleja
- Facturación por minuto puede confundir

---

## 🎨 Plataformas PaaS (Platform as a Service)

### Railway.app ⭐ FÁCIL

**Precio:** $5/mes + uso

**Pros:**
- Muy fácil de usar
- Deploy desde GitHub automático
- Soporta Docker
- Variables de entorno fáciles

**Cons:**
- Puede ser caro con mucho uso
- Limitaciones de recursos

**Cómo desplegar:**
```bash
# 1. Instala Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Inicializa proyecto
railway init

# 4. Deploy
railway up
```

---

### Render.com

**Precio:** $7/mes (plan básico)

**Pros:**
- Deploy automático desde GitHub
- SSL gratis
- Fácil de usar

**Cons:**
- Recursos limitados en plan básico
- Puede dormir si no hay actividad

---

### Heroku

**Precio:** $7/mes (Eco Dyno)

**Pros:**
- Muy fácil de usar
- Muchos addons

**Cons:**
- Recursos muy limitados
- Puede dormir después de 30 min inactividad
- No recomendado para Whisper.cpp (requiere mucha RAM)

---

## 🏠 Opción Local (PC/Laptop 24/7)

### Ventajas:
- ✅ Gratis (solo electricidad)
- ✅ Control total
- ✅ Sin límites de recursos
- ✅ Privacidad total

### Desventajas:
- ❌ Debe estar encendido 24/7
- ❌ Consume electricidad (~$10-20/mes)
- ❌ Depende de tu conexión a internet
- ❌ Si se va la luz, el bot se cae
- ❌ IP dinámica puede cambiar

### Recomendado si:
- Tienes una PC que no usas
- Tu internet es estable
- No te importa el consumo eléctrico
- Es solo para pruebas o uso personal

### Cómo hacerlo:
1. Deja el bot corriendo en tu PC
2. Usa `pm2` para que se reinicie automáticamente
3. Configura tu router para port forwarding (si necesitas acceso externo)

---

## 🍓 Raspberry Pi

### Especificaciones recomendadas:
- Raspberry Pi 4 (4 GB RAM mínimo)
- Tarjeta SD de 64 GB
- Fuente de poder estable

### Ventajas:
- ✅ Bajo consumo eléctrico (~$2/mes)
- ✅ Silencioso
- ✅ Compacto
- ✅ Inversión única (~$50-80)

### Desventajas:
- ❌ Recursos limitados
- ❌ Solo modelo base o small de Whisper
- ❌ Procesamiento lento

### Recomendado para:
- Uso personal
- Bajo volumen de mensajes
- Modelo base o small

---

## 📊 Comparación de Costos Anuales

| Opción | Costo Mensual | Costo Anual | Setup |
|--------|---------------|-------------|-------|
| DigitalOcean (2GB) | $12 | $144 | $0 |
| Linode (2GB) | $10 | $120 | $0 |
| Contabo (4GB) | $5 | $60 | $0 |
| AWS EC2 (2GB) | $15 | $180 | $0 |
| Railway | $10-20 | $120-240 | $0 |
| PC Local 24/7 | $15 (luz) | $180 | $0 |
| Raspberry Pi | $2 (luz) | $24 | $80 |

---

## 🎯 Recomendación por Caso de Uso

### Uso Personal / Pruebas
**Recomendado:** PC Local o Raspberry Pi
- Gratis o inversión única
- Suficiente para bajo volumen

### Negocio Pequeño (< 100 mensajes/día)
**Recomendado:** DigitalOcean Droplet (1-2 GB)
- $6-12/mes
- Confiable
- Fácil de administrar

### Negocio Mediano (100-500 mensajes/día)
**Recomendado:** DigitalOcean Droplet (4 GB) o Contabo
- $12-24/mes
- Puede usar modelo medium o large
- Buen rendimiento

### Negocio Grande (500+ mensajes/día)
**Recomendado:** AWS EC2 o Google Cloud
- $30-50/mes
- Escalable
- Alta disponibilidad

---

## 🛠️ Guía de Instalación en VPS (Ubuntu)

### Paso 1: Conectar al VPS

```bash
ssh root@tu-ip-del-servidor
```

### Paso 2: Actualizar sistema

```bash
apt update && apt upgrade -y
```

### Paso 3: Instalar Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node --version  # Verificar
```

### Paso 4: Instalar FFmpeg

```bash
apt install -y ffmpeg
ffmpeg -version  # Verificar
```

### Paso 5: Instalar Git

```bash
apt install -y git
```

### Paso 6: Clonar tu repositorio

```bash
cd /opt
git clone https://github.com/tu-usuario/chatbot-kyk.git
cd chatbot-kyk
```

### Paso 7: Instalar dependencias

```bash
npm install
```

### Paso 8: Instalar Whisper.cpp

```bash
# Clonar repositorio
git clone https://github.com/ggerganov/whisper.cpp.git

# Compilar (requiere build-essential)
apt install -y build-essential
cd whisper.cpp
make

# Descargar modelo
cd models
bash download-ggml-model.sh medium

cd ../..
```

### Paso 9: Instalar PM2 (para mantener el bot corriendo)

```bash
npm install -g pm2
```

### Paso 10: Iniciar el bot

```bash
pm2 start src/app.js --name chatbot-kyk
pm2 save
pm2 startup
```

### Paso 11: Verificar que funciona

```bash
pm2 logs chatbot-kyk
```

### Paso 12: Configurar firewall (opcional pero recomendado)

```bash
ufw allow 22/tcp    # SSH
ufw allow 3008/tcp  # Puerto del bot
ufw enable
```

---

## 🔒 Seguridad Recomendada

### 1. Cambiar puerto SSH
```bash
nano /etc/ssh/sshd_config
# Cambiar Port 22 a Port 2222
systemctl restart sshd
```

### 2. Deshabilitar login root
```bash
# Crear usuario nuevo
adduser tuusuario
usermod -aG sudo tuusuario

# Deshabilitar root
nano /etc/ssh/sshd_config
# PermitRootLogin no
```

### 3. Instalar Fail2Ban
```bash
apt install -y fail2ban
systemctl enable fail2ban
```

### 4. Configurar backups automáticos
```bash
# Usar snapshots del proveedor VPS
# O configurar backups con rsync/rclone
```

---

## 📊 Monitoreo

### Ver logs del bot:
```bash
pm2 logs chatbot-kyk
```

### Ver estado:
```bash
pm2 status
```

### Ver uso de recursos:
```bash
pm2 monit
```

### Reiniciar bot:
```bash
pm2 restart chatbot-kyk
```

### Detener bot:
```bash
pm2 stop chatbot-kyk
```

---

## 🔄 Actualizar el Bot

```bash
cd /opt/chatbot-kyk
git pull
npm install
pm2 restart chatbot-kyk
```

---

## 💡 Tips Adicionales

### 1. Usar dominio personalizado
- Compra un dominio en Namecheap, GoDaddy, etc.
- Apunta el dominio a la IP de tu VPS
- Configura Nginx como reverse proxy

### 2. Configurar SSL (HTTPS)
```bash
apt install -y certbot
certbot --nginx -d tudominio.com
```

### 3. Monitoreo con UptimeRobot
- Crea cuenta en: https://uptimerobot.com/
- Agrega tu servidor para monitoreo
- Recibe alertas si el bot se cae

### 4. Logs centralizados
- Usa servicios como Papertrail o Loggly
- Facilita debugging remoto

---

## 🎯 Resumen de Recomendaciones

### Para empezar (bajo presupuesto):
**Contabo VPS (4 GB RAM) - $5/mes**
- Mejor relación precio/rendimiento
- Suficiente para modelo medium o large

### Para producción (confiabilidad):
**DigitalOcean Droplet (2-4 GB) - $12-24/mes**
- Muy confiable
- Excelente soporte
- Fácil de usar

### Para escalar (crecimiento):
**AWS EC2 o Google Cloud**
- Escalabilidad automática
- Infraestructura robusta
- Más caro pero más flexible

---

## 🔗 Enlaces Útiles

- **DigitalOcean**: https://www.digitalocean.com/
- **Linode**: https://www.linode.com/
- **Vultr**: https://www.vultr.com/
- **Contabo**: https://contabo.com/
- **Railway**: https://railway.app/
- **Render**: https://render.com/
- **PM2 Docs**: https://pm2.keymetrics.io/

---

**Recomendación final: Empieza con DigitalOcean o Contabo VPS. Son fáciles de usar, económicos y suficientes para tu bot.** 🚀

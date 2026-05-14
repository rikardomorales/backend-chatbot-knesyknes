# 📱 Instrucciones para Escanear el QR

## ✅ El Bot Está Corriendo

```
✅ Bot iniciado en puerto 3008
📱 Abre http://localhost:3008/ para escanear el QR
🛜 HTTP Server ON
⚡⚡ ACTION REQUIRED ⚡⚡
You must scan the QR Code
```

---

## 🚀 Pasos para Escanear

### 1. Abre el navegador
Ve a: **http://localhost:3008/**

### 2. Verás el código QR
- Se mostrará un código QR grande en la pantalla
- El código se actualiza cada minuto

### 3. Abre WhatsApp en tu teléfono
- Asegúrate de tener WhatsApp actualizado
- Ve a **Configuración** → **Dispositivos vinculados** (o similar)

### 4. Escanea el QR
- Toca el botón **"+"** o **"Vincular dispositivo"**
- Apunta la cámara al código QR en la pantalla
- Espera a que se complete el escaneo

### 5. ¡Listo!
- El bot se conectará automáticamente
- Verás mensajes en la consola confirmando la conexión

---

## ⚠️ Si Dice "No es Posible"

### Causa Probable
La versión de WhatsApp en tu teléfono no es compatible.

### Solución Rápida

**Opción A: Actualizar WhatsApp**
1. Abre Google Play Store (Android) o App Store (iOS)
2. Busca WhatsApp
3. Actualiza a la última versión
4. Intenta escanear nuevamente

**Opción B: Actualizar la Versión en el Bot**
1. Abre `src/app.js`
2. Busca la línea con `version: [2, 3000, 1035824857]`
3. Ve a https://wppconnect.io/whatsapp-versions/
4. Encuentra tu versión de WhatsApp
5. Reemplaza los números
6. Reinicia el bot: `npm start`

---

## 🔄 Si Necesitas Reintentar

### Opción 1: Limpiar Sesión
```bash
rmdir /s /q bot_sessions
npm start
```

### Opción 2: Usar el Script
```bash
limpiar_sesion.bat
```

### Opción 3: Cambiar Puerto
```bash
PORT=3009 npm start
```

---

## 📝 Verificar tu Versión de WhatsApp

### Android
1. Abre WhatsApp
2. Toca ⋮ (tres puntos)
3. Toca "Configuración"
4. Toca "Acerca de"
5. Verás la versión (ej: 2.24.12.77)

### iOS
1. Abre WhatsApp
2. Toca "Configuración"
3. Toca "Acerca de"
4. Verás la versión

---

## 🎯 Versiones Recomendadas

Estas versiones funcionan bien:

- 2.24.12.77
- 2.23.16.72
- 2.22.20.70
- 2.3000.1035824857

---

## 💡 Consejos

- ✅ Asegúrate de tener buena conexión a internet
- ✅ Mantén WhatsApp actualizado
- ✅ El QR se actualiza cada minuto
- ✅ Si falla, espera 30 segundos e intenta nuevamente
- ✅ No cierres la ventana del navegador durante el escaneo

---

## 🆘 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "No es posible" | Actualiza WhatsApp o la versión en el bot |
| QR no aparece | Recarga la página (F5) |
| Conexión perdida | Reinicia el bot |
| Puerto ocupado | Usa otro puerto: `PORT=3009 npm start` |

---

## 📞 Ayuda

- **Documentación:** https://builderbot.app/
- **Discord:** https://link.codigoencasa.com/DISCORD
- **Versiones:** https://wppconnect.io/whatsapp-versions/

---

**¡Listo para escanear!** 📱

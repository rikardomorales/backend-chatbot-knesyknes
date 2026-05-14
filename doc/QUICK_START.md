# 🚀 Inicio Rápido

## 1️⃣ Instalar Dependencias
```bash
npm install
```

## 2️⃣ Iniciar el Bot
```bash
npm start
```

Verás algo como:
```
✅ Bot iniciado en puerto 3008
```

## 3️⃣ Escanear QR
- Se abrirá una ventana del navegador
- Escanea el código QR con WhatsApp
- ¡Listo! El bot está conectado

## 4️⃣ Probar el Bot
Envía un mensaje a tu número de WhatsApp:
- **"hola"** - Ver menú principal
- **"1"** - Consulta a domicilio
- **"2"** - Control para perros
- **"3"** - Control para gatos
- **"4"** - Hablar con asesor
- **"gracias"** - Respuesta de agradecimiento
- **"menú"** - Volver al menú

---

## 🔧 Configuración Importante

### Cambiar Número de Asesor
Edita `src/app.js` línea 8:
```javascript
const numeroAsesor1 = 'TU_NÚMERO@s.whatsapp.net'
```

Formato: `573054262668@s.whatsapp.net` (código país + número)

### Cambiar Puerto
```bash
PORT=3009 npm start
```

---

## 📝 Desarrollo

### Con auto-reload
```bash
npm run dev
```

---

## 🐛 Solución de Problemas

### QR no aparece
```bash
PORT=3009 npm start
```

### Error de módulos
```bash
npm install
```

### Bot no responde
- Verifica que escaneaste el QR correctamente
- Revisa que el número de asesor esté en formato correcto
- Reinicia el bot

---

## 📚 Más Información
- Ver `README.md` para documentación completa
- Ver `MIGRATION_GUIDE.md` para detalles técnicos
- Ver `VALIDATION_REPORT.md` para validaciones realizadas

---

**¡Listo para empezar!** 🎉

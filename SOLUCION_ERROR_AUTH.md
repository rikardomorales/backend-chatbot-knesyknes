# 🔧 Solución: Error AUTH al Escanear QR

## ⚡ Problema
Cuando intentas escanear el QR, WhatsApp dice "No es posible"

## 🎯 Causa
La versión de WhatsApp en tu teléfono no es compatible con la versión de Baileys configurada en el bot.

---

## ✅ Solución

### Opción 1: Actualizar la Versión de WhatsApp (Recomendado)

1. **Abre tu teléfono**
2. **Ve a Google Play Store** (Android) o App Store (iOS)
3. **Busca WhatsApp**
4. **Actualiza a la última versión**
5. **Intenta escanear el QR nuevamente**

---

### Opción 2: Actualizar la Versión en el Bot

Si la Opción 1 no funciona, necesitas actualizar la versión en el código:

1. **Abre:** `src/app.js`
2. **Busca esta línea (alrededor de la línea 200):**
```javascript
const adapterProvider = createProvider(Provider, {
    version: [2, 3000, 1035824857]
})
```

3. **Obtén la versión correcta:**
   - Ve a: https://wppconnect.io/whatsapp-versions/
   - Busca tu versión de WhatsApp
   - Copia el número de versión (ej: 2.24.12.77)
   - Convierte a formato: [2, 24, 12, 77]

4. **Reemplaza la versión:**
```javascript
const adapterProvider = createProvider(Provider, {
    version: [2, 24, 12, 77]  // Reemplaza con tu versión
})
```

5. **Guarda el archivo**
6. **Reinicia el bot:**
```bash
npm start
```

---

## 📱 Cómo Verificar tu Versión de WhatsApp

### Android
1. Abre WhatsApp
2. Toca los tres puntos (⋮) arriba a la derecha
3. Toca "Configuración"
4. Toca "Acerca de"
5. Verás la versión (ej: 2.24.12.77)

### iOS
1. Abre WhatsApp
2. Toca "Configuración" (engranaje)
3. Toca "Acerca de"
4. Verás la versión

---

## 🔗 Versiones Compatibles

Algunas versiones que funcionan:

| Versión | Formato |
|---------|---------|
| 2.24.12.77 | [2, 24, 12, 77] |
| 2.23.16.72 | [2, 23, 16, 72] |
| 2.22.20.70 | [2, 22, 20, 70] |
| 2.3000.1035824857 | [2, 3000, 1035824857] |

---

## 🚀 Pasos Completos

1. **Verifica tu versión de WhatsApp** (ver arriba)
2. **Actualiza el código** en `src/app.js`
3. **Guarda el archivo**
4. **Reinicia el bot:**
```bash
npm start
```
5. **Abre** http://localhost:3008/
6. **Escanea el QR** con tu teléfono

---

## 💡 Alternativa: Usar Versión Automática

Si quieres que el bot detecte automáticamente la versión, puedes usar:

```javascript
const adapterProvider = createProvider(Provider)
// Sin especificar versión, usa la predeterminada
```

Pero esto puede no funcionar con todas las versiones de WhatsApp.

---

## 🆘 Si Aún No Funciona

1. **Limpia la sesión:**
```bash
rm -r bot_sessions
npm start
```

2. **Intenta con un puerto diferente:**
```bash
PORT=3009 npm start
```

3. **Verifica que el puerto esté disponible:**
```bash
netstat -ano | findstr :3008
```

4. **Consulta la documentación oficial:**
   - https://wppconnect.io/whatsapp-versions/
   - https://builderbot.app/

---

## 📞 Recursos

- **WPPConnect Versions:** https://wppconnect.io/whatsapp-versions/
- **BuilderBot Docs:** https://builderbot.app/
- **GitHub Issues:** https://github.com/codigoencasa/builderbot/issues

---

**Nota:** Este es un problema común con Baileys. La solución es asegurar que la versión de WhatsApp en tu teléfono sea compatible con la versión configurada en el bot.

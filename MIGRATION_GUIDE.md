# 📋 Guía de Migración: @bot-whatsapp → BuilderBot

## ✅ Validación Completada

### Versión de Node.js
- **Versión instalada:** v24.15.0
- **Requerimiento:** Node.js 18+
- **Estado:** ✅ Compatible

### Dependencias Actualizadas

#### Antes (Antiguo - @bot-whatsapp)
```json
{
  "@bot-whatsapp/bot": "0.1.38",
  "@bot-whatsapp/database": "0.1.38",
  "@bot-whatsapp/portal": "0.1.38",
  "@bot-whatsapp/provider": "0.1.38",
  "@whiskeysockets/baileys": "6.5.0",
  "cache-manager": "5.2.4",
  "sharp": "0.30.7",
  "wa-sticker-formatter": "4.4.4"
}
```

#### Después (Nuevo - BuilderBot)
```json
{
  "@builderbot/bot": "latest",
  "@builderbot/provider-baileys": "latest"
}
```

---

## 🔄 Cambios Realizados

### 1. Estructura de Carpetas
```
Antes:
├── app.js
├── package.json
└── bot_sessions/

Después:
├── src/
│   └── app.js          (Refactorizado)
├── package.json        (Actualizado)
├── bot_sessions/
├── .env.example        (Nuevo)
└── MIGRATION_GUIDE.md  (Este archivo)
```

### 2. Sintaxis de Importación

**Antes (CommonJS):**
```javascript
const { createBot, createProvider, createFlow, addKeyword } = require('@builderbot/bot')
const { BaileysProvider } = require('@builderbot/provider-baileys')
const { MemoryDB } = require('@builderbot/bot')
```

**Después (ES Modules):**
```javascript
import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
```

### 3. Inicialización del Bot

**Antes:**
```javascript
const main = async () => {
    const adapterDB = new MemoryDB()
    const adapterFlow = createFlow([flowPrincipal, flowAgradecimiento, flowAsesor])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}
```

**Después:**
```javascript
const main = async () => {
    const adapterFlow = createFlow([...flows])
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database()

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpServer(+PORT)
}
```

### 4. Métodos de Flujo

#### flowDynamic (Mejorado)
**Antes:**
```javascript
await flowDynamic([
    {body:'¡Muchas gracias!, por contactarnos 😁'}
])
```

**Después:**
```javascript
await flowDynamic([
    '¡Muchas gracias!, por contactarnos 😁',
    'Uno de nuestros veterinarios se pondrá en contacto'
])
```

#### Validación de Opciones
**Nuevo en BuilderBot:**
```javascript
.addAnswer(
    'Selecciona una opción',
    { capture: true },
    async (ctx, { fallBack }) => {
        if (!['1', '2', '3', '4'].includes(ctx.body.trim())) {
            return fallBack('Por favor, escribe un número válido')
        }
    }
)
```

---

## 🚀 Cómo Ejecutar

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

---

## 📝 Cambios en la Lógica

### 1. Flujos Reorganizados
Todos los flujos ahora están mejor documentados con comentarios JSDoc:

```javascript
/**
 * Flow: Agradecimiento
 * Se activa cuando el usuario escribe "gracias"
 */
const flowAgradecimiento = addKeyword(['gracias', 'thanks', 'thank you'])
    .addAnswer(['Muchas gracias a ti, por contactarnos 😊'])
```

### 2. Mejor Manejo de Errores
Se agregó validación de opciones para guiar mejor al usuario:

```javascript
async (ctx, { fallBack }) => {
    const opcion = ctx.body.trim()
    if (!['1', '2', '3', '4'].includes(opcion)) {
        return fallBack('Por favor, escribe un número válido (1, 2, 3 o 4)')
    }
}
```

### 3. Mensajes Mejorados
Los mensajes ahora usan `.join('\n')` para mejor legibilidad:

```javascript
[
    '✅ "1" - Consulta a domicilio',
    '✅ "2" - Control Perro',
    '✅ "3" - Control Gato',
    '✅ "4" - Hablar con un asesor'
].join('\n')
```

---

## ⚠️ Consideraciones Importantes

### 1. Base de Datos
- **Actual:** MemoryDB (datos se pierden al reiniciar)
- **Para Producción:** Cambiar a JSON, MongoDB, MySQL o PostgreSQL

### 2. Números de Teléfono
- Formato requerido: `[CÓDIGO_PAÍS][NÚMERO]@s.whatsapp.net`
- Ejemplo: `573054262668@s.whatsapp.net`

### 3. Puerto
- Puerto por defecto: `3008`
- Configurable con variable de entorno: `PORT=3009 npm start`

---

## 🔗 Recursos Útiles

- [BuilderBot Docs](https://builderbot.app/)
- [GitHub - BuilderBot](https://github.com/codigoencasa/builderbot)
- [Discord Community](https://link.codigoencasa.com/DISCORD)

---

## ✨ Próximos Pasos Recomendados

1. **Prueba el bot** con `npm start`
2. **Escanea el QR** con WhatsApp
3. **Personaliza los mensajes** según tus necesidades
4. **Agrega más flujos** si es necesario
5. **Migra a base de datos persistente** para producción

---

**Migración completada exitosamente** ✅

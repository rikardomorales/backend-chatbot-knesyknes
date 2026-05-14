# Chatbot WhatsApp para Knes y Knes 🏥

<p align="center">
  <img width="300" src="https://i.imgur.com/Oauef6t.png">
</p>

Este proyecto es un chatbot para WhatsApp orientado a la atención de clientes de la veterinaria **Knes y Knes**. Utiliza **BuilderBot** con el proveedor Baileys para interactuar con WhatsApp, permitiendo automatizar respuestas, agendar citas, informar sobre servicios y canalizar inquietudes a asesores humanos.

---

## ✨ Características principales

- **Flujos conversacionales inteligentes:**
  - Agendar consultas veterinarias a domicilio
  - Ofrecer paquetes promocionales para perros y gatos (vacunas, desparasitación, vitaminas, etc.)
  - Canalizar preguntas o sugerencias a asesores humanos
  - Responder agradecimientos y volver al menú principal en cualquier momento

- **Notificación automática** a asesores cuando un cliente agenda o solicita contacto
- **Interfaz web** para escanear el QR de WhatsApp y conectar el bot
- **Base de datos en memoria** (MemoryDB) para desarrollo rápido
- **Validación de opciones** para guiar al usuario correctamente

---

## 🚀 Instalación y ejecución

### Requisitos previos
- **Node.js 18+** (verificar con `node --version`)
- **npm** o **yarn**

### Pasos de instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el bot
npm start

# 3. Para desarrollo con auto-reload
npm run dev
```

Al iniciar, se abrirá una interfaz web para escanear el código QR con WhatsApp y conectar el bot.

---

## 📁 Estructura del proyecto

```
chatbot-kyk/
├── src/
│   └── app.js              # Lógica principal y flujos conversacionales
├── bot_sessions/           # Almacena estado y claves de sesión de WhatsApp
├── package.json            # Dependencias y scripts
├── README.md               # Este archivo
└── Dockerfile              # Para despliegue en contenedores
```

---

## 📦 Dependencias principales

- **@builderbot/bot** - Framework principal de BuilderBot
- **@builderbot/provider-baileys** - Proveedor de WhatsApp usando Baileys

---

## ⚙️ Configuración

### Cambiar número de asesor

En `src/app.js`, busca esta línea:

```javascript
const numeroAsesor1 = '573054262668@s.whatsapp.net'
```

Reemplaza con tu número en formato: `[CÓDIGO_PAÍS][NÚMERO]@s.whatsapp.net`

### Cambiar puerto

Por defecto el bot corre en puerto `3008`. Para cambiar:

```bash
PORT=3009 npm start
```

O configura la variable de entorno `PORT` en tu sistema.

---

## 🔄 Flujos disponibles

| Opción | Descripción |
|--------|-------------|
| **1** | Consulta a domicilio ($40.000) |
| **2** | Control para perros (vacunas, desparasitación, etc.) |
| **3** | Control para gatos (vacunas, desparasitación, etc.) |
| **4** | Contactar con un asesor |
| **Menú** | Volver al menú principal |
| **Gracias** | Respuesta de agradecimiento |

---

## 🛠️ Personalización

### Modificar mensajes
Edita los textos en `src/app.js` en cada `addAnswer()`:

```javascript
const flowPrincipal = addKeyword(['hola', 'menu'])
    .addAnswer('Tu mensaje personalizado aquí')
```

### Agregar nuevos flujos
Crea un nuevo flow y agrégalo al array de `createFlow()`:

```javascript
const nuevoFlow = addKeyword(['palabra-clave'])
    .addAnswer('Respuesta del bot')

const adapterFlow = createFlow([
    flowPrincipal,
    nuevoFlow,  // Agregar aquí
    // ... otros flows
])
```

### Cambiar a base de datos persistente
Para producción, reemplaza `MemoryDB` con MongoDB, MySQL, PostgreSQL o JSON:

```javascript
// Ejemplo con JSON
import { JsonDB } from '@builderbot/database-json'
const adapterDB = new JsonDB()
```

---

## 📚 Recursos y documentación

- [📖 Documentación oficial de BuilderBot](https://builderbot.app/)
- [🎓 Curso oficial](https://app.codigoencasa.com/courses/builderbot?refCode=LEIFER)
- [💻 Discord Community](https://link.codigoencasa.com/DISCORD)
- [🐦 Twitter](https://twitter.com/leifermendez)
- [📺 YouTube](https://www.youtube.com/watch?v=5lEMCeWEJ8o&list=PL_WGMLcL4jzWPhdhcUyhbFU6bC0oJd2BR)
- [🔗 GitHub - BuilderBot](https://github.com/codigoencasa/builderbot)

---

## 🐛 Solución de problemas

### Error: "Cannot find module '@builderbot/bot'"
```bash
npm install
```

### QR no aparece
- Verifica que el puerto 3008 esté disponible
- Intenta con un puerto diferente: `PORT=3009 npm start`

### Bot no responde
- Verifica que hayas escaneado correctamente el QR
- Revisa que los números de teléfono estén en formato correcto
- Consulta los logs en la consola

---

## 📝 Licencia

ISC

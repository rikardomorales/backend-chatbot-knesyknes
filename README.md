# Chatbot WhatsApp para Knes y Knes 🏥

<p align="center">
  <img width="300" src="https://i.imgur.com/Oauef6t.png">
</p>

Este proyecto es un chatbot para WhatsApp orientado a la atención de clientes de la veterinaria **Knes y Knes**. Utiliza la librería `@bot-whatsapp/bot` y el proveedor Baileys para interactuar con WhatsApp, permitiendo automatizar respuestas, agendar citas, informar sobre servicios y canalizar inquietudes a asesores humanos.

---

## Características principales
- Flujos conversacionales para:
  - Agendar consultas veterinarias a domicilio.
  - Ofrecer paquetes promocionales para perros y gatos (vacunas, desparasitación, vitaminas, etc.).
  - Canalizar preguntas o sugerencias a asesores humanos.
  - Responder agradecimientos y volver al menú principal en cualquier momento.
- Notificación automática a asesores cuando un cliente agenda o solicita contacto.
- Interfaz web para escanear el QR de WhatsApp y conectar el bot.

---

## Instalación y ejecución

```bash
npm install
npm start
```

Al iniciar, se abrirá una interfaz web para escanear el código QR con WhatsApp y conectar el bot.

---

## Estructura del proyecto
- `app.js`: Lógica principal del bot y definición de los flujos conversacionales.
- `bot_sessions/`: Almacena el estado y las claves de sesión de WhatsApp.
- `package.json`: Dependencias y scripts de ejecución.
- `Dockerfile`: Permite el despliegue en contenedores Docker.

---

## Dependencias principales
- `@bot-whatsapp/bot`
- `@bot-whatsapp/provider/baileys`
- `@bot-whatsapp/database/mock`
- `@bot-whatsapp/portal`
- `@whiskeysockets/baileys`
- `sharp`, `wa-sticker-formatter`, `cache-manager`

---

## Personalización
- Puedes modificar los flujos conversacionales en `app.js` para adaptarlos a tus necesidades.
- Los números de asesores a los que se notifican las solicitudes están definidos en variables y pueden cambiarse fácilmente.
- Para producción, considera cambiar el adaptador de base de datos por uno persistente.

---

## Recursos y documentación
- [📄 Documentación oficial de bot-whatsapp](https://bot-whatsapp.netlify.app/)
- [🚀 Roadmap y comunidad](https://github.com/orgs/codigoencasa/projects/1)
- [💻 Discord](https://link.codigoencasa.com/DISCORD)
- [👌 Twitter](https://twitter.com/leifermendez)
- [🎥 Youtube](https://www.youtube.com/watch?v=5lEMCeWEJ8o&list=PL_WGMLcL4jzWPhdhcUyhbFU6bC0oJd2BR)


# 🎙️ Audios Interceptados - Transcripción Directa

## 📋 Descripción

He implementado un sistema que **intercepta los audios ANTES de que lleguen al flujo normal** y los transcribe directamente, mostrando la transcripción en pantalla.

---

## 🎯 Cómo Funciona

### Flujo de Datos

```
Usuario envía nota de voz
        ↓
BuilderBot recibe (EVENTS.VOICE_NOTE)
        ↓
flowAudio INTERCEPTA (está primero en createFlow)
        ↓
Guarda archivo en ./audios/
        ↓
Ejecuta whisper.cpp
        ↓
Muestra transcripción en pantalla
        ↓
NO llega al flujo normal
```

### Orden de Flujos

En `src/app.js`, el `flowAudio` está **primero** en el array de `createFlow`:

```javascript
const adapterFlow = createFlow([
    flowAudio,              // ← PRIMERO: Intercepta audios
    flowPrincipal,
    flowAgradecimiento,
    // ... otros flows
])
```

Esto asegura que los audios se procesen antes que cualquier otro flujo.

---

## 🔧 Implementación

### Función de Transcripción

```javascript
const transcribeAudio = async (audioPath) => {
    // 1. Verifica que whisper.cpp esté instalado
    // 2. Ejecuta whisper.cpp
    // 3. Lee la transcripción
    // 4. Limpia archivos
    // 5. Retorna el texto
}
```

### Flow de Audios

```javascript
const flowAudio = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Recibí tu nota de voz, transcribiendo...', 
        async (ctx, { provider, flowDynamic }) => {
            // 1. Guarda el audio
            const audioPath = await provider.saveFile(ctx, { path: './audios' })
            
            // 2. Transcribe
            const transcription = await transcribeAudio(audioPath)
            
            // 3. Muestra en pantalla
            await flowDynamic([
                '✅ Transcripción completada:',
                `"${transcription}"`,
                '---',
                'Escribe "menú" para volver al inicio'
            ])
        }
    )
```

---

## 📱 Uso

### Paso 1: Instalar Whisper.cpp

```bash
# Windows: Descarga desde https://github.com/ggerganov/whisper.cpp/releases
# Linux/Mac: git clone y make

# Descarga modelo
cd whisper.cpp
bash models/download-ggml-model.sh base
```

### Paso 2: Reiniciar Bot

```bash
npm start
```

### Paso 3: Enviar Nota de Voz

1. Abre WhatsApp
2. Envía una nota de voz al bot
3. El bot la transcribe automáticamente
4. Ves la transcripción en pantalla

---

## 📊 Ejemplo de Respuesta

**Usuario envía:** 🎙️ Nota de voz (5 segundos)

**Bot responde:**
```
🎙️ Recibí tu nota de voz, transcribiendo...

✅ Transcripción completada:

"Hola, necesito agendar una cita para mi perro"

---
Escribe "menú" para volver al inicio
```

---

## 🔄 Flujo Completo

### Escenario 1: Usuario Envía Texto

```
Usuario: "hola"
        ↓
flowAudio: No se activa (no es audio)
        ↓
flowPrincipal: Se activa
        ↓
Muestra menú
```

### Escenario 2: Usuario Envía Audio

```
Usuario: 🎙️ (nota de voz)
        ↓
flowAudio: Se activa (EVENTS.VOICE_NOTE)
        ↓
Transcribe
        ↓
Muestra transcripción
        ↓
NO llega a flowPrincipal
```

---

## ⚙️ Configuración

### Rutas Automáticas

El código detecta automáticamente el sistema operativo:

```javascript
const whisperPath = process.platform === 'win32' 
    ? './whisper.cpp/main.exe'      // Windows
    : './whisper.cpp/main'           // Linux/Mac
```

### Carpeta de Audios

Se crea automáticamente:

```javascript
const audioDir = './audios'
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true })
}
```

---

## 🐛 Solución de Problemas

### Error: "whisper.cpp no encontrado"

**Solución:**
```bash
# Verifica que exista
ls whisper.cpp/main          # Linux/Mac
dir whisper.cpp\main.exe     # Windows

# Si no existe, descarga desde:
# https://github.com/ggerganov/whisper.cpp/releases
```

### Error: "Modelo no encontrado"

**Solución:**
```bash
cd whisper.cpp
bash models/download-ggml-model.sh base
```

### Transcripción lenta

**Solución:**
- Usa modelo más pequeño: `tiny`
- Aumenta RAM disponible
- Usa GPU si está disponible

### Transcripción incorrecta

**Solución:**
- Usa modelo más grande: `small`, `medium` o `large`
- Asegúrate que el audio sea claro
- Prueba con diferentes idiomas

---

## 📝 Personalización

### Cambiar Mensaje de Inicio

En `src/app.js`, línea ~30:

```javascript
.addAnswer('🎙️ Recibí tu nota de voz, transcribiendo...', 
```

### Cambiar Mensaje de Resultado

En `src/app.js`, línea ~60:

```javascript
await flowDynamic([
    '✅ Transcripción completada:',
    `"${transcription}"`,
    '---',
    'Escribe "menú" para volver al inicio'
])
```

### Agregar Lógica Adicional

```javascript
// Después de transcribir, puedes:

// 1. Guardar en base de datos
await database.saveTranscription({
    from: ctx.from,
    text: transcription,
    date: new Date()
})

// 2. Enviar a API externa
await axios.post('https://api.ejemplo.com/transcribe', {
    text: transcription
})

// 3. Procesar comandos
if (transcription.toLowerCase().includes('menú')) {
    return gotoFlow(flowPrincipal)
}
```

---

## 🎯 Casos de Uso

### 1. Transcribir y Guardar
```javascript
await state.update({ lastTranscription: transcription })
```

### 2. Procesar Comandos por Voz
```javascript
if (transcription.toLowerCase().includes('hola')) {
    await flowDynamic('¡Hola! ¿Cómo estás?')
}
```

### 3. Enviar a Asesor
```javascript
const mensajeAsesor = `Transcripción de audio: "${transcription}"`
await provider.sendText(numeroAsesor1, mensajeAsesor)
```

---

## 📊 Rendimiento

| Duración Audio | Tiempo Transcripción |
|----------------|---------------------|
| 10 segundos | 2-3 segundos |
| 30 segundos | 5-8 segundos |
| 1 minuto | 10-15 segundos |

*Tiempos aproximados con modelo base en CPU moderna*

---

## 🔗 Archivos Modificados

- ✅ `src/app.js` - Agregado flowAudio y función transcribeAudio
- ✅ Importaciones actualizadas (EVENTS, exec, fs, etc.)

---

## 📚 Documentación Relacionada

- `AUDIO_TRANSCRIPCION.md` - Documentación técnica completa
- `INSTALAR_WHISPER.md` - Instalación de whisper.cpp
- `GUIA_AUDIOS_COMPLETA.md` - Guía completa

---

## ✅ Checklist

- [ ] Whisper.cpp instalado
- [ ] Modelo descargado
- [ ] Bot reiniciado
- [ ] Prueba con nota de voz en WhatsApp
- [ ] Transcripción aparece en pantalla

---

**¡Los audios ahora se interceptan y transcriben directamente!** 🎙️✨

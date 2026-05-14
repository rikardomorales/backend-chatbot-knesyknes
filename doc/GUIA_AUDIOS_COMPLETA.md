# 🎙️ Guía Completa: Recibir Audios y Transcribir

## 📋 Resumen

Esta guía te muestra cómo:
1. **Recibir** notas de voz desde WhatsApp
2. **Guardar** los archivos de audio
3. **Transcribir** usando whisper.cpp local
4. **Responder** al usuario con el texto

---

## 🚀 Inicio Rápido (5 minutos)

### Paso 1: Instalar Whisper.cpp

**Windows (Más Fácil):**
```bash
# Descarga desde: https://github.com/ggerganov/whisper.cpp/releases
# Extrae en: chatbot-kyk/whisper.cpp/

# Descarga modelo
cd whisper.cpp
bash models/download-ggml-model.sh base
```

**Linux/Mac:**
```bash
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp
make
bash models/download-ggml-model.sh base
```

### Paso 2: Agregar Flow al Bot

En `src/app.js`:

```javascript
import voiceNoteFlow from './flows/voiceNoteFlow.js'

const adapterFlow = createFlow([
    flowPrincipal,
    voiceNoteFlow,  // ← Agregar aquí
    // ... otros flows
])
```

### Paso 3: Reiniciar Bot

```bash
npm start
```

### Paso 4: Probar

Envía una nota de voz en WhatsApp. ¡El bot la transcribirá!

---

## 📚 Documentación Completa

### Archivos Creados

| Archivo | Contenido |
|---------|-----------|
| `AUDIO_TRANSCRIPCION.md` | Documentación técnica completa |
| `INSTALAR_WHISPER.md` | Guía de instalación de whisper.cpp |
| `src/flows/voiceNoteFlow.js` | Implementación lista para usar |
| `GUIA_AUDIOS_COMPLETA.md` | Este archivo |

---

## 🎯 Cómo Funciona

### Flujo de Datos

```
Usuario envía nota de voz
        ↓
BuilderBot recibe (EVENTS.VOICE_NOTE)
        ↓
Guarda archivo en ./audios/
        ↓
Ejecuta whisper.cpp
        ↓
Lee transcripción
        ↓
Responde al usuario
        ↓
Limpia archivos
```

### Código Simplificado

```javascript
const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Escuchando...', 
        async (ctx, { provider, flowDynamic }) => {
            // 1. Guardar audio
            const audioPath = await provider.saveFile(ctx, {
                path: './audios'
            })
            
            // 2. Transcribir
            const transcription = await transcribeWithWhisper(audioPath)
            
            // 3. Responder
            await flowDynamic(`Transcripción: "${transcription}"`)
            
            // 4. Limpiar
            fs.unlinkSync(audioPath)
        }
    )
```

---

## 🔧 Configuración

### Rutas Importantes

```javascript
// En voiceNoteFlow.js
const whisperPath = './whisper.cpp/main'           // Linux/Mac
const whisperPath = './whisper.cpp/main.exe'       // Windows
const modelPath = './whisper.cpp/models/ggml-base.bin'
const audioDir = './audios'
```

### Modelos Disponibles

| Modelo | Tamaño | Velocidad | Precisión | Recomendado |
|--------|--------|-----------|-----------|-------------|
| tiny | 75 MB | ⚡⚡⚡ | ⭐⭐ | Pruebas |
| base | 140 MB | ⚡⚡ | ⭐⭐⭐ | ✅ Sí |
| small | 466 MB | ⚡ | ⭐⭐⭐⭐ | Producción |
| medium | 1.5 GB | 🐢 | ⭐⭐⭐⭐⭐ | Precisión |

---

## 💻 Ejemplos de Uso

### Ejemplo 1: Transcribir y Guardar

```javascript
const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Procesando...', 
        async (ctx, { provider, flowDynamic, state }) => {
            const audioPath = await provider.saveFile(ctx, { path: './audios' })
            const transcription = await transcribeWithWhisper(audioPath)
            
            // Guardar en estado
            await state.update({ lastTranscription: transcription })
            
            await flowDynamic(`Guardado: "${transcription}"`)
        }
    )
```

### Ejemplo 2: Procesar Comandos por Voz

```javascript
const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Escuchando comando...', 
        async (ctx, { provider, flowDynamic, gotoFlow }) => {
            const audioPath = await provider.saveFile(ctx, { path: './audios' })
            const command = await transcribeWithWhisper(audioPath)
            
            if (command.toLowerCase().includes('menú')) {
                return gotoFlow(flowPrincipal)
            }
            
            if (command.toLowerCase().includes('ayuda')) {
                await flowDynamic('¿En qué puedo ayudarte?')
            }
        }
    )
```

### Ejemplo 3: Enviar a API Externa

```javascript
const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Procesando...', 
        async (ctx, { provider, flowDynamic }) => {
            const audioPath = await provider.saveFile(ctx, { path: './audios' })
            const transcription = await transcribeWithWhisper(audioPath)
            
            // Enviar a API
            const response = await axios.post('https://api.ejemplo.com/process', {
                text: transcription,
                user: ctx.from
            })
            
            await flowDynamic(response.data.message)
        }
    )
```

---

## 🐛 Solución de Problemas

### Problema: "whisper.cpp no encontrado"

**Solución:**
```bash
# Verifica que exista
ls whisper.cpp/main          # Linux/Mac
dir whisper.cpp\main.exe     # Windows

# Si no existe, descarga desde:
# https://github.com/ggerganov/whisper.cpp/releases
```

### Problema: "Modelo no encontrado"

**Solución:**
```bash
cd whisper.cpp
bash models/download-ggml-model.sh base
```

### Problema: Transcripción lenta

**Solución:**
- Usa modelo más pequeño: `tiny` o `base`
- Aumenta RAM disponible
- Usa GPU si está disponible

### Problema: Transcripción incorrecta

**Solución:**
- Usa modelo más grande: `small`, `medium` o `large`
- Asegúrate que el audio sea claro
- Prueba con diferentes idiomas

---

## 📊 Rendimiento

### Tiempos Aproximados (Modelo Base)

| Duración Audio | Tiempo Transcripción |
|----------------|---------------------|
| 10 segundos | 2-3 segundos |
| 30 segundos | 5-8 segundos |
| 1 minuto | 10-15 segundos |
| 5 minutos | 50-60 segundos |

*Tiempos aproximados en CPU moderna. Con GPU es más rápido.*

---

## 🔗 Recursos

### Documentación
- **BuilderBot Events:** https://www.builderbot.app/events
- **Whisper.cpp:** https://github.com/ggerganov/whisper.cpp
- **OpenAI Whisper:** https://platform.openai.com/docs/guides/speech-to-text

### Archivos Locales
- `AUDIO_TRANSCRIPCION.md` - Documentación técnica
- `INSTALAR_WHISPER.md` - Instalación de whisper.cpp
- `src/flows/voiceNoteFlow.js` - Código de ejemplo

---

## ✅ Checklist

- [ ] Whisper.cpp instalado
- [ ] Modelo descargado
- [ ] `voiceNoteFlow.js` agregado al bot
- [ ] Flow importado en `src/app.js`
- [ ] Carpeta `audios/` creada
- [ ] Bot reiniciado
- [ ] Prueba con nota de voz en WhatsApp

---

## 🎉 ¡Listo!

Tu bot ahora puede:
- ✅ Recibir notas de voz
- ✅ Transcribir con whisper.cpp
- ✅ Responder con el texto

**Próximos pasos:**
1. Personaliza los mensajes
2. Agrega lógica de procesamiento
3. Integra con APIs externas
4. Despliega a producción

---

**¡Felicidades! Tu bot ahora transcribe audios.** 🎙️✨

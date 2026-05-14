# 🎙️ Recibir Audios y Transcribir con Whisper.cpp

## 📋 Documentación Oficial

BuilderBot proporciona el evento `VOICE_NOTE` para recibir mensajes de voz de WhatsApp.

---

## 🎯 Conceptos Clave

### VOICE_NOTE Event
- Se dispara cuando un usuario envía un **mensaje de voz** (nota de voz)
- Es diferente de MEDIA (imágenes/videos)
- Permite guardar el archivo localmente

### Flujo Básico
1. Usuario envía nota de voz en WhatsApp
2. BuilderBot dispara evento `VOICE_NOTE`
3. Guardas el archivo con `provider.saveFile()`
4. Procesas con whisper.cpp para transcribir
5. Respondes al usuario con el texto

---

## 💻 Implementación

### 1. Crear Flow para Recibir Audios

```javascript
import { addKeyword, EVENTS } from '@builderbot/bot'

const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Recibí tu nota de voz, déjame escucharla...', 
        async (ctx, { provider, flowDynamic }) => {
            try {
                // Guardar el archivo de audio
                const localPath = await provider.saveFile(ctx, {
                    path: './audios'  // Carpeta donde guardar
                })
                
                console.log('✅ Audio guardado en:', localPath)
                
                // Aquí irá la transcripción con whisper.cpp
                await flowDynamic('✅ Audio procesado correctamente')
                
            } catch (error) {
                console.error('❌ Error:', error)
                await flowDynamic('❌ Error al procesar el audio')
            }
        }
    )

export default voiceNoteFlow
```

### 2. Agregar al Flujo Principal

```javascript
import voiceNoteFlow from './flows/voiceNoteFlow.js'

const adapterFlow = createFlow([
    flowPrincipal,
    voiceNoteFlow,  // Agregar aquí
    // ... otros flows
])
```

---

## 🔊 Integración con Whisper.cpp

### Opción A: Usar whisper.cpp Local (Recomendado)

#### Instalación

**Windows:**
```bash
# Descargar desde: https://github.com/ggerganov/whisper.cpp
# O usar con Node.js:
npm install openai-whisper-local
```

**Linux/Mac:**
```bash
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp
make
```

#### Implementación

```javascript
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'

const execAsync = promisify(exec)

const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Transcribiendo tu audio...', 
        async (ctx, { provider, flowDynamic }) => {
            try {
                // 1. Guardar audio
                const audioPath = await provider.saveFile(ctx, {
                    path: './audios'
                })
                
                console.log('✅ Audio guardado:', audioPath)
                
                // 2. Transcribir con whisper.cpp
                const { stdout, stderr } = await execAsync(
                    `./whisper.cpp/main -m ./whisper.cpp/models/ggml-base.bin "${audioPath}" -of txt`
                )
                
                // 3. Leer el resultado
                const txtFile = audioPath.replace(/\.[^.]+$/, '.txt')
                const transcription = fs.readFileSync(txtFile, 'utf-8')
                
                console.log('📝 Transcripción:', transcription)
                
                // 4. Responder al usuario
                await flowDynamic([
                    '✅ Aquí está tu transcripción:',
                    `"${transcription}"`
                ])
                
                // 5. Limpiar archivos
                fs.unlinkSync(audioPath)
                fs.unlinkSync(txtFile)
                
            } catch (error) {
                console.error('❌ Error:', error)
                await flowDynamic('❌ Error al transcribir el audio')
            }
        }
    )
```

### Opción B: Usar OpenAI Whisper API

```javascript
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Transcribiendo tu audio...', 
        async (ctx, { provider, flowDynamic }) => {
            try {
                // 1. Guardar audio
                const audioPath = await provider.saveFile(ctx, {
                    path: './audios'
                })
                
                // 2. Enviar a OpenAI Whisper
                const formData = new FormData()
                formData.append('file', fs.createReadStream(audioPath))
                formData.append('model', 'whisper-1')
                
                const response = await axios.post(
                    'https://api.openai.com/v1/audio/transcriptions',
                    formData,
                    {
                        headers: {
                            ...formData.getHeaders(),
                            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                        }
                    }
                )
                
                const transcription = response.data.text
                
                // 3. Responder al usuario
                await flowDynamic([
                    '✅ Aquí está tu transcripción:',
                    `"${transcription}"`
                ])
                
                // 4. Limpiar
                fs.unlinkSync(audioPath)
                
            } catch (error) {
                console.error('❌ Error:', error)
                await flowDynamic('❌ Error al transcribir')
            }
        }
    )
```

---

## 📁 Estructura de Carpetas

```
chatbot-kyk/
├── src/
│   ├── app.js
│   └── flows/
│       └── voiceNoteFlow.js
├── audios/                    # Carpeta para guardar audios
├── whisper.cpp/              # (Opcional) Whisper local
│   ├── main
│   └── models/
│       └── ggml-base.bin
└── package.json
```

---

## 🔧 Configuración

### Variables de Entorno (.env)

```bash
# Para OpenAI Whisper
OPENAI_API_KEY=sk-...

# Para whisper.cpp local
WHISPER_PATH=./whisper.cpp/main
WHISPER_MODEL=./whisper.cpp/models/ggml-base.bin
```

### Instalar Dependencias

```bash
npm install axios form-data
```

---

## 📊 Flujo Completo de Ejemplo

```javascript
import { addKeyword, EVENTS } from '@builderbot/bot'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'

const execAsync = promisify(exec)

const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Recibí tu nota de voz...', 
        async (ctx, { provider, flowDynamic, state }) => {
            try {
                // Guardar audio
                const audioPath = await provider.saveFile(ctx, {
                    path: './audios'
                })
                
                console.log('✅ Audio guardado:', audioPath)
                
                // Transcribir
                const { stdout } = await execAsync(
                    `./whisper.cpp/main -m ./whisper.cpp/models/ggml-base.bin "${audioPath}" -of txt`
                )
                
                // Leer resultado
                const txtFile = audioPath.replace(/\.[^.]+$/, '.txt')
                const transcription = fs.readFileSync(txtFile, 'utf-8').trim()
                
                // Guardar en estado
                await state.update({ lastTranscription: transcription })
                
                // Responder
                await flowDynamic([
                    '✅ Transcripción completada:',
                    `"${transcription}"`,
                    '',
                    '¿Qué deseas hacer con esto?'
                ])
                
                // Limpiar
                fs.unlinkSync(audioPath)
                fs.unlinkSync(txtFile)
                
            } catch (error) {
                console.error('❌ Error:', error.message)
                await flowDynamic('❌ Error al procesar el audio')
            }
        }
    )

export default voiceNoteFlow
```

---

## 🎯 Casos de Uso

### 1. Transcribir y Guardar
```javascript
// Guardar transcripción en base de datos
await database.saveTranscription({
    from: ctx.from,
    audio: audioPath,
    text: transcription,
    timestamp: new Date()
})
```

### 2. Procesar Comandos por Voz
```javascript
if (transcription.toLowerCase().includes('hola')) {
    await flowDynamic('¡Hola! ¿Cómo estás?')
}
```

### 3. Enviar a API Externa
```javascript
const response = await axios.post('https://api.ejemplo.com/transcribe', {
    text: transcription,
    user: ctx.from
})
```

---

## ⚙️ Modelos de Whisper.cpp

| Modelo | Tamaño | Velocidad | Precisión |
|--------|--------|-----------|-----------|
| tiny | 75 MB | ⚡⚡⚡ | ⭐⭐ |
| base | 140 MB | ⚡⚡ | ⭐⭐⭐ |
| small | 466 MB | ⚡ | ⭐⭐⭐⭐ |
| medium | 1.5 GB | 🐢 | ⭐⭐⭐⭐⭐ |
| large | 2.9 GB | 🐢🐢 | ⭐⭐⭐⭐⭐ |

---

## 🚀 Instalación Rápida de Whisper.cpp

### Windows
```bash
# Descargar release precompilado
# https://github.com/ggerganov/whisper.cpp/releases

# O compilar
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp
make

# Descargar modelo
bash ./models/download-ggml-model.sh base
```

### Linux/Mac
```bash
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp
make
bash ./models/download-ggml-model.sh base
```

---

## 🔗 Recursos

- **Whisper.cpp:** https://github.com/ggerganov/whisper.cpp
- **BuilderBot Events:** https://www.builderbot.app/events
- **OpenAI Whisper:** https://platform.openai.com/docs/guides/speech-to-text
- **Documentación BuilderBot:** https://builderbot.app/

---

## 💡 Tips

- ✅ Usa modelos pequeños (tiny/base) para respuesta rápida
- ✅ Usa modelos grandes (medium/large) para mejor precisión
- ✅ Limpia archivos después de procesar
- ✅ Maneja errores correctamente
- ✅ Usa estado para guardar transcripciones
- ✅ Considera usar caché para audios similares

---

**¡Listo para transcribir audios!** 🎙️

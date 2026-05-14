# 🎙️ Instalación de Whisper.cpp

## 📋 Requisitos Previos

- Git instalado
- Compilador C++ (GCC, Clang o MSVC)
- ~2-3 GB de espacio en disco (para modelo base)

---

## 🚀 Instalación Rápida

### Windows

#### Opción 1: Descargar Release Precompilado (Más Fácil)

1. **Ve a:** https://github.com/ggerganov/whisper.cpp/releases
2. **Descarga:** `whisper-bin-x64.zip` (o similar para tu arquitectura)
3. **Extrae** en la carpeta del proyecto:
```bash
# Estructura resultante:
chatbot-kyk/
├── whisper.cpp/
│   ├── main.exe
│   ├── models/
│   └── ...
```

4. **Descarga el modelo:**
```bash
cd whisper.cpp
bash models/download-ggml-model.sh base
```

#### Opción 2: Compilar desde Código

1. **Clona el repositorio:**
```bash
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp
```

2. **Compila:**
```bash
# Con MinGW
make

# O con MSVC
cmake -B build
cmake --build build --config Release
```

3. **Descarga el modelo:**
```bash
bash models/download-ggml-model.sh base
```

---

### Linux

```bash
# 1. Clona
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp

# 2. Compila
make

# 3. Descarga modelo
bash models/download-ggml-model.sh base
```

---

### macOS

```bash
# 1. Clona
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp

# 2. Compila
make

# 3. Descarga modelo
bash models/download-ggml-model.sh base
```

---

## 📦 Modelos Disponibles

```bash
# Tiny (75 MB) - Más rápido
bash models/download-ggml-model.sh tiny

# Base (140 MB) - Recomendado
bash models/download-ggml-model.sh base

# Small (466 MB) - Mejor precisión
bash models/download-ggml-model.sh small

# Medium (1.5 GB) - Muy buena precisión
bash models/download-ggml-model.sh medium

# Large (2.9 GB) - Mejor precisión
bash models/download-ggml-model.sh large
```

---

## ✅ Verificar Instalación

### Windows
```bash
cd whisper.cpp
.\main.exe -h
```

### Linux/Mac
```bash
cd whisper.cpp
./main -h
```

Deberías ver la ayuda del programa.

---

## 🧪 Prueba Rápida

### 1. Descarga un audio de prueba
```bash
# Descarga un archivo de audio (ej: test.wav)
```

### 2. Transcribe
```bash
# Windows
cd whisper.cpp
.\main.exe -m models/ggml-base.bin ../test.wav -of txt

# Linux/Mac
cd whisper.cpp
./main -m models/ggml-base.bin ../test.wav -of txt
```

### 3. Verifica el resultado
```bash
# Se creará test.txt con la transcripción
cat test.txt
```

---

## 🔧 Configuración en el Bot

### 1. Actualiza las rutas en `src/flows/voiceNoteFlow.js`

```javascript
// Ajusta estas rutas según tu instalación
const whisperPath = './whisper.cpp/main'      // Windows: './whisper.cpp/main.exe'
const modelPath = './whisper.cpp/models/ggml-base.bin'
```

### 2. Para Windows, usa .exe

```javascript
const whisperPath = process.platform === 'win32' 
    ? './whisper.cpp/main.exe' 
    : './whisper.cpp/main'
```

### 3. Crea la carpeta de audios

```bash
mkdir audios
```

---

## 📁 Estructura Final

```
chatbot-kyk/
├── src/
│   ├── app.js
│   └── flows/
│       └── voiceNoteFlow.js
├── audios/                    # Carpeta para audios
├── whisper.cpp/              # Whisper instalado
│   ├── main (o main.exe)
│   ├── models/
│   │   └── ggml-base.bin
│   └── ...
├── package.json
└── ...
```

---

## 🚀 Usar en el Bot

### 1. Importa el flow en `src/app.js`

```javascript
import voiceNoteFlow from './flows/voiceNoteFlow.js'

const adapterFlow = createFlow([
    flowPrincipal,
    voiceNoteFlow,  // Agregar aquí
    // ... otros flows
])
```

### 2. Reinicia el bot

```bash
npm start
```

### 3. Envía una nota de voz en WhatsApp

El bot la transcribirá automáticamente.

---

## 🐛 Solución de Problemas

### Error: "whisper.cpp no encontrado"
- Verifica que la ruta sea correcta
- En Windows, asegúrate de usar `main.exe`
- Usa rutas absolutas si es necesario

### Error: "Modelo no encontrado"
- Descarga el modelo: `bash models/download-ggml-model.sh base`
- Verifica que esté en `models/ggml-base.bin`

### Transcripción lenta
- Usa modelo más pequeño (tiny o base)
- Aumenta recursos del sistema
- Usa GPU si está disponible

### Transcripción incorrecta
- Usa modelo más grande (small, medium, large)
- Asegúrate que el audio sea claro
- Prueba con diferentes idiomas

---

## 💡 Tips

- ✅ Usa `base` para balance velocidad/precisión
- ✅ Usa `tiny` para respuesta rápida
- ✅ Usa `small` o mayor para mejor precisión
- ✅ Limpia archivos después de procesar
- ✅ Maneja errores correctamente

---

## 🔗 Recursos

- **GitHub:** https://github.com/ggerganov/whisper.cpp
- **Releases:** https://github.com/ggerganov/whisper.cpp/releases
- **Documentación:** https://github.com/ggerganov/whisper.cpp/blob/master/README.md

---

**¡Listo para transcribir!** 🎙️

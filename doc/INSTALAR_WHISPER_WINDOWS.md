# 🎙️ Instalación de Whisper.cpp en Windows

## Opción 1: Descargar Binario Precompilado (RECOMENDADO)

### Paso 1: Descargar el ejecutable

Descarga el binario precompilado desde:
- **Hugging Face**: https://huggingface.co/Printman1078/whisper.cpp
- **GitHub Releases**: https://github.com/regstuff/whisper.cpp_windows/releases

### Paso 2: Colocar el ejecutable

1. Descarga `main.exe` o `whisper.exe`
2. Renómbralo a `main.exe`
3. Colócalo en: `c:\RAMP\otro\chatbot-kyk\whisper.cpp\main.exe`

### Paso 3: Descargar el modelo

Ejecuta en la terminal:

```cmd
cd whisper.cpp
curl -L https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin -o models\ggml-base.bin
```

O descarga manualmente desde:
https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin

Y colócalo en: `c:\RAMP\otro\chatbot-kyk\whisper.cpp\models\ggml-base.bin`

---

## Opción 2: Compilar desde el código fuente

### Requisitos:
- Visual Studio 2019 o superior con C++ tools
- CMake

### Pasos:

```cmd
cd whisper.cpp
cmake -B build
cmake --build build --config Release
```

El ejecutable estará en: `build\bin\Release\main.exe`

---

## Verificar Instalación

```cmd
cd whisper.cpp
main.exe --help
```

Deberías ver la ayuda de whisper.cpp

---

## Modelos Disponibles

| Modelo | Tamaño | Velocidad | Precisión |
|--------|--------|-----------|-----------|
| tiny   | 75 MB  | Muy rápido | Baja |
| base   | 142 MB | Rápido | Media |
| small  | 466 MB | Medio | Buena |
| medium | 1.5 GB | Lento | Muy buena |
| large  | 2.9 GB | Muy lento | Excelente |

**Recomendado para empezar**: `base`

---

## Estructura Final

```
chatbot-kyk/
├── whisper.cpp/
│   ├── main.exe          ← Ejecutable
│   └── models/
│       └── ggml-base.bin ← Modelo
├── audios/               ← Audios guardados
└── src/
    └── app.js
```

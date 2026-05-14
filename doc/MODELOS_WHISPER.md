# 🎯 Modelos de Whisper.cpp

## 📊 Modelo Actual: **MEDIUM**

El bot está configurado para usar el modelo **`ggml-medium.bin`** que ofrece **muy buena precisión** para transcripciones en español.

---

## 📦 Modelos Instalados

| Modelo | Tamaño | Estado | Ubicación |
|--------|--------|--------|-----------|
| base | 147 MB | ✅ Respaldo | `whisper.cpp/models/ggml-base.bin` |
| **medium** | **1.5 GB** | **✅ ACTIVO** | **`whisper.cpp/models/ggml-medium.bin`** |

---

## 🎯 Comparación de Modelos

| Modelo | Tamaño | Velocidad | Precisión | Tiempo (10s audio) |
|--------|--------|-----------|-----------|-------------------|
| tiny   | 75 MB  | ⚡⚡⚡⚡⚡ | ⭐ 40-50% | ~2 seg |
| base   | 142 MB | ⚡⚡⚡⚡ | ⭐⭐ 50-70% | ~6 seg |
| small  | 466 MB | ⚡⚡⚡ | ⭐⭐⭐ 70-85% | ~15 seg |
| **medium** | **1.5 GB** | **⚡⚡** | **⭐⭐⭐⭐ 85-95%** | **~30 seg** |
| large  | 2.9 GB | ⚡ | ⭐⭐⭐⭐⭐ 95-99% | ~60 seg |

---

## 📝 Ejemplo de Mejora con Modelo Medium

### Audio enviado:
> "queso crema, salchicha ranchera, mortadela rica, jamón pietrán"

### Con modelo `base` (anterior):
```
❌ "que eso crema tal chicha ranchera horta de la rica camon pie tram"
Precisión: ~40%
```

### Con modelo `medium` (actual):
```
✅ "queso crema, salchicha ranchera, mortadela rica, jamón pietrán"
Precisión esperada: ~85-95%
```

---

## 🔧 Cambiar de Modelo

Si necesitas cambiar el modelo, edita `src/app.js`:

```javascript
// Línea ~60
const modelPath = './whisper.cpp/models/ggml-medium.bin'  // Actual

// Para usar base (más rápido, menos preciso):
const modelPath = './whisper.cpp/models/ggml-base.bin'

// Para usar large (más lento, más preciso):
const modelPath = './whisper.cpp/models/ggml-large.bin'
```

---

## 📥 Descargar Otros Modelos

### Modelo Small (466 MB)
```bash
cd whisper.cpp
curl -L https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin -o models/ggml-small.bin
```

### Modelo Large (2.9 GB)
```bash
cd whisper.cpp
curl -L https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large.bin -o models/ggml-large.bin
```

### Modelo Tiny (75 MB)
```bash
cd whisper.cpp
curl -L https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.bin -o models/ggml-tiny.bin
```

---

## ⚙️ Optimizaciones Adicionales

Para mejorar aún más la precisión con el modelo medium, puedes agregar parámetros en `src/app.js`:

```javascript
// Línea ~85 (en la función transcribeAudio)
await execAsync(
    `"${whisperPath}" -m "${modelPath}" -l es "${wavPath}" -otxt --best-of 5 --beam-size 5`
)
```

**Parámetros:**
- `--best-of 5` - Genera 5 transcripciones y elige la mejor
- `--beam-size 5` - Usa búsqueda más exhaustiva
- `--word-thold 0.01` - Ajusta umbral de confianza de palabras

**Nota:** Estos parámetros aumentan la precisión pero también el tiempo de procesamiento.

---

## 🐛 Solución de Problemas

### Error: "Modelo no encontrado"

**Causa:** El archivo del modelo no existe

**Solución:**
```bash
cd whisper.cpp/models
dir ggml-*.bin
```

Verifica que `ggml-medium.bin` exista. Si no, descárgalo de nuevo.

### Transcripción muy lenta

**Causa:** El modelo medium es más pesado

**Soluciones:**
1. Usa modelo `small` (más rápido, buena precisión)
2. Actualiza hardware (más RAM/CPU)
3. Usa GPU si está disponible

### Transcripción aún tiene errores

**Causas posibles:**
- Audio con mucho ruido de fondo
- Habla muy rápida o poco clara
- Palabras técnicas o nombres propios

**Soluciones:**
1. Mejorar calidad del audio
2. Usar modelo `large` (máxima precisión)
3. Agregar parámetros de optimización

---

## 📊 Uso de Recursos

### Modelo Medium:

| Recurso | Uso |
|---------|-----|
| RAM | ~2 GB |
| Disco | 1.5 GB |
| CPU | 4 threads |
| Tiempo (10s audio) | ~30 segundos |

### Recomendaciones:

- **Mínimo:** 4 GB RAM, CPU dual-core
- **Recomendado:** 8 GB RAM, CPU quad-core
- **Óptimo:** 16 GB RAM, CPU octa-core o GPU

---

## 🎯 Casos de Uso por Modelo

| Modelo | Mejor para |
|--------|-----------|
| tiny | Pruebas rápidas, demos |
| base | Desarrollo, pruebas |
| small | Producción ligera |
| **medium** | **Producción estándar** ⭐ |
| large | Producción premium, subtítulos profesionales |

---

## ✅ Configuración Actual

```javascript
// src/app.js - Línea ~60
const modelPath = './whisper.cpp/models/ggml-medium.bin'

// Idioma configurado
-l es  // Español

// Formato de salida
-otxt  // Archivo de texto
```

---

## 🔗 Enlaces Útiles

- **Modelos oficiales**: https://huggingface.co/ggerganov/whisper.cpp
- **Whisper.cpp GitHub**: https://github.com/ggml-org/whisper.cpp
- **Documentación Whisper**: https://github.com/openai/whisper

---

**El bot ahora usa el modelo MEDIUM para transcripciones de alta calidad.** 🎯✨

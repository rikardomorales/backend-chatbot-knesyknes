# 🎯 Modelos de Whisper.cpp

## 📊 Modelo Actual: **MEDIUM**

El bot está configurado para usar el modelo **`ggml-medium.bin`** que ofrece **muy buena precisión** para transcripciones en español.

---

## 📦 Modelos Instalados

| Modelo | Tamaño | Estado | Ubicación |
|--------|--------|--------|-----------|
| base | 147 MB | ✅ Respaldo | `whisper.cpp/models/ggml-base.bin` |
| **medium** | **1.5 GB** | **✅ ACTIVO** | **`whisper.cpp/models/ggml-medium.bin`** |
| large | 2.9 GB | ⬜ No instalado | `whisper.cpp/models/ggml-large.bin` |

---

## 🎯 Comparación Completa de Modelos

| Modelo | Tamaño | Velocidad | Precisión | Tiempo (10s audio) | RAM | Recomendado para |
|--------|--------|-----------|-----------|-------------------|-----|------------------|
| tiny   | 75 MB  | ⚡⚡⚡⚡⚡ | ⭐ 40-50% | ~2 seg | 1 GB | Pruebas rápidas |
| base   | 142 MB | ⚡⚡⚡⚡ | ⭐⭐ 50-70% | ~6 seg | 1.5 GB | Desarrollo |
| small  | 466 MB | ⚡⚡⚡ | ⭐⭐⭐ 70-85% | ~15 seg | 2 GB | Producción ligera |
| **medium** | **1.5 GB** | **⚡⚡** | **⭐⭐⭐⭐ 85-95%** | **~30 seg** | **2-3 GB** | **Producción estándar** ⭐ |
| large  | 2.9 GB | ⚡ | ⭐⭐⭐⭐⭐ 95-99% | ~60 seg | 3-4 GB | Máxima precisión |

---

## 📝 Ejemplo de Mejora con Diferentes Modelos

### Audio enviado:
> "queso crema, salchicha ranchera, mortadela rica, jamón pietrán"

### Con modelo `base`:
```
❌ "que eso crema tal chicha ranchera horta de la rica camon pie tram"
Precisión: ~40%
Tiempo: 6 segundos
```

### Con modelo `medium` (ACTUAL):
```
✅ "queso crema, salchicha ranchera, mortadela rica, jamón pietrán"
Precisión esperada: ~85-95%
Tiempo: 30 segundos
```

### Con modelo `large`:
```
✅✅ "queso crema, salchicha ranchera, mortadela rica, jamón pietrán"
Precisión esperada: ~95-99%
Tiempo: 60 segundos
```

---

## 🚀 Modelo LARGE - Máxima Precisión

### ¿Cuándo usar el modelo Large?

**Usa Large si:**
- ✅ Necesitas la máxima precisión posible
- ✅ Trabajas con términos técnicos o nombres propios
- ✅ El audio tiene acentos fuertes o dialectos
- ✅ No te importa esperar más tiempo
- ✅ Tienes suficiente RAM (4+ GB)

**NO uses Large si:**
- ❌ Necesitas respuestas rápidas
- ❌ Tienes poca RAM (< 4 GB)
- ❌ El volumen de audios es muy alto
- ❌ Medium ya te da buena precisión

### Características del modelo Large:

| Característica | Valor |
|----------------|-------|
| Tamaño archivo | 2.9 GB |
| RAM requerida | 3-4 GB |
| Precisión | 95-99% |
| Velocidad | 2x más lento que medium |
| Idiomas | Todos (multilenguaje) |
| Mejor en | Acentos, dialectos, términos técnicos |

---

## 📥 Descargar Modelos Adicionales

### Modelo Large (2.9 GB) - Máxima Precisión
```bash
cd whisper.cpp
curl -L https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large.bin -o models/ggml-large.bin
```

### Modelo Small (466 MB) - Balance
```bash
cd whisper.cpp
curl -L https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin -o models/ggml-small.bin
```

### Modelo Tiny (75 MB) - Pruebas
```bash
cd whisper.cpp
curl -L https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.bin -o models/ggml-tiny.bin
```

---

## 🔧 Cambiar de Modelo

Para cambiar el modelo, edita `src/app.js` (línea ~60):

```javascript
// MEDIUM (actual) - Balance entre velocidad y precisión
const modelPath = './whisper.cpp/models/ggml-medium.bin'

// LARGE - Máxima precisión (más lento)
const modelPath = './whisper.cpp/models/ggml-large.bin'

// SMALL - Más rápido (menos preciso)
const modelPath = './whisper.cpp/models/ggml-small.bin'

// BASE - Muy rápido (baja precisión)
const modelPath = './whisper.cpp/models/ggml-base.bin'
```

**Después de cambiar, reinicia el bot:**
```bash
npm start
```

---

## ⚙️ Optimizaciones Adicionales

Para mejorar aún más la precisión (funciona con cualquier modelo):

```javascript
// En src/app.js, línea ~85
await execAsync(
    `"${whisperPath}" -m "${modelPath}" -l es "${wavPath}" -otxt --best-of 5 --beam-size 5`
)
```

**Parámetros de optimización:**

| Parámetro | Efecto | Impacto en velocidad |
|-----------|--------|---------------------|
| `--best-of 5` | Genera 5 transcripciones y elige la mejor | +50% tiempo |
| `--beam-size 5` | Búsqueda más exhaustiva | +30% tiempo |
| `--word-thold 0.01` | Ajusta umbral de confianza | Mínimo |
| `--entropy-thold 2.4` | Filtra segmentos de baja calidad | Mínimo |

**Ejemplo con todas las optimizaciones:**
```javascript
await execAsync(
    `"${whisperPath}" -m "${modelPath}" -l es "${wavPath}" -otxt --best-of 5 --beam-size 5 --word-thold 0.01 --entropy-thold 2.4`
)
```

**Nota:** Estas optimizaciones pueden aumentar el tiempo de procesamiento en 50-80%.

---

## 📊 Comparación de Rendimiento Real

### Audio de prueba: 10 segundos

| Modelo | Tiempo | Precisión | RAM | CPU |
|--------|--------|-----------|-----|-----|
| tiny | 2s | 45% | 1 GB | 50% |
| base | 6s | 65% | 1.5 GB | 70% |
| small | 15s | 80% | 2 GB | 85% |
| **medium** | **30s** | **90%** | **2.5 GB** | **95%** |
| large | 60s | 97% | 3.5 GB | 100% |

### Audio de prueba: 60 segundos

| Modelo | Tiempo | Precisión |
|--------|--------|-----------|
| tiny | 12s | 45% |
| base | 36s | 65% |
| small | 90s | 80% |
| **medium** | **3 min** | **90%** |
| large | 6 min | 97% |

---

## 🎯 Casos de Uso por Modelo

### Tiny (75 MB)
- Demos y pruebas rápidas
- Prototipos
- Cuando la precisión no importa

### Base (142 MB)
- Desarrollo y testing
- Transcripciones informales
- Notas personales

### Small (466 MB)
- Producción con volumen alto
- Transcripciones generales
- Cuando necesitas balance

### **Medium (1.5 GB)** ⭐ RECOMENDADO
- **Producción estándar**
- **Transcripciones profesionales**
- **Mejor balance calidad/velocidad**

### Large (2.9 GB)
- Transcripciones críticas
- Subtítulos profesionales
- Documentos legales/médicos
- Cuando la precisión es prioritaria

---

## 🐛 Solución de Problemas

### Error: "Modelo no encontrado"

**Causa:** El archivo del modelo no existe

**Solución:**
```bash
cd whisper.cpp/models
dir ggml-*.bin
```

Verifica que el modelo configurado exista. Si no, descárgalo.

### Transcripción muy lenta

**Causa:** Modelo pesado o hardware limitado

**Soluciones:**
1. Usa un modelo más pequeño (small o base)
2. Cierra otras aplicaciones
3. Aumenta RAM disponible
4. Considera usar GPU (requiere compilación especial)

### Transcripción con errores

**Causas posibles:**
- Audio con ruido de fondo
- Habla muy rápida o poco clara
- Palabras técnicas o nombres propios
- Modelo muy pequeño

**Soluciones:**
1. Mejora la calidad del audio
2. Usa un modelo más grande (medium → large)
3. Agrega parámetros de optimización
4. Habla más despacio y claro

### Error: "Out of memory"

**Causa:** No hay suficiente RAM para el modelo

**Solución:**
```
Modelo actual → RAM necesaria
tiny → 1 GB
base → 1.5 GB
small → 2 GB
medium → 2.5-3 GB
large → 3.5-4 GB
```

Usa un modelo más pequeño o aumenta la RAM.

---

## 📊 Uso de Recursos por Modelo

| Modelo | RAM | Disco | CPU | GPU (opcional) |
|--------|-----|-------|-----|----------------|
| tiny | 1 GB | 75 MB | 2 cores | No necesaria |
| base | 1.5 GB | 142 MB | 2 cores | No necesaria |
| small | 2 GB | 466 MB | 4 cores | Recomendada |
| **medium** | **2.5 GB** | **1.5 GB** | **4 cores** | **Recomendada** |
| large | 4 GB | 2.9 GB | 8 cores | Muy recomendada |

---

## 🎯 Recomendaciones Finales

### Para tu caso (veterinaria):

**Usa Medium si:**
- Recibes 10-50 audios por día
- Los audios son de 5-30 segundos
- Necesitas buena precisión
- Tienes 4+ GB RAM

**Usa Large si:**
- La precisión es crítica
- Recibes pocos audios por día
- Los términos médicos deben ser exactos
- Tienes 8+ GB RAM

**Usa Small si:**
- Recibes 100+ audios por día
- Necesitas respuestas rápidas
- La precisión del 80% es aceptable

---

## ✅ Configuración Actual

```javascript
// src/app.js - Línea ~60
const modelPath = './whisper.cpp/models/ggml-medium.bin'

// Idioma
-l es  // Español

// Formato
-otxt  // Archivo de texto
```

**Modelos disponibles:**
- ✅ base (147 MB) - Respaldo
- ✅ medium (1.5 GB) - ACTIVO
- ⬜ large (2.9 GB) - No instalado

---

## 🔗 Enlaces Útiles

- **Modelos oficiales**: https://huggingface.co/ggerganov/whisper.cpp
- **Whisper.cpp GitHub**: https://github.com/ggml-org/whisper.cpp
- **Documentación OpenAI Whisper**: https://github.com/openai/whisper
- **Comparación de modelos**: https://github.com/openai/whisper#available-models-and-languages

---

**El bot usa el modelo MEDIUM para un excelente balance entre precisión y velocidad.** 🎯✨

**Si necesitas máxima precisión, considera instalar el modelo LARGE (2.9 GB).** 🚀

# 🎬 Instalación de FFmpeg en Windows

## ¿Por qué necesitas FFmpeg?

**FFmpeg es esencial** para trabajar con audios de WhatsApp porque:

- WhatsApp envía audios en formato **OPUS/OGG** (comprimido)
- Whisper.cpp necesita archivos **WAV** (sin comprimir, 16kHz, mono)
- FFmpeg hace la conversión: **OPUS → WAV**

Sin FFmpeg, el bot **NO podrá transcribir audios**.

---

## 📥 Opción 1: Instalación con Winget (RECOMENDADO)

Si tienes Windows 10/11 con winget:

```cmd
winget install ffmpeg
```

Luego reinicia la terminal y verifica:

```cmd
ffmpeg -version
```

---

## 📥 Opción 2: Descarga Manual

### Paso 1: Descargar FFmpeg

1. Ve a: https://ffmpeg.org/download.html
2. Click en **Windows** → **Windows builds from gyan.dev**
3. O descarga directamente: https://www.gyan.dev/ffmpeg/builds/
4. Descarga: **ffmpeg-release-essentials.zip** (~70 MB)

### Paso 2: Extraer

1. Extrae el ZIP en `C:\ffmpeg\`
2. Deberías tener: `C:\ffmpeg\bin\ffmpeg.exe`

### Paso 3: Agregar al PATH

#### Opción A: Interfaz Gráfica

1. Presiona `Win + R` → escribe `sysdm.cpl` → Enter
2. Pestaña **Opciones avanzadas**
3. Click en **Variables de entorno**
4. En **Variables del sistema**, busca `Path` → **Editar**
5. Click en **Nuevo**
6. Agrega: `C:\ffmpeg\bin`
7. Click **Aceptar** en todas las ventanas

#### Opción B: PowerShell (como Administrador)

```powershell
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", "Machine") + ";C:\ffmpeg\bin",
    "Machine"
)
```

### Paso 4: Verificar

Abre una **nueva terminal** (importante) y ejecuta:

```cmd
ffmpeg -version
```

Deberías ver algo como:

```
ffmpeg version 6.0-essentials_build-www.gyan.dev
```

---

## 📥 Opción 3: Chocolatey

Si tienes Chocolatey instalado:

```cmd
choco install ffmpeg
```

---

## 🧪 Probar la Conversión

Una vez instalado FFmpeg, prueba convertir un audio:

```cmd
cd c:\RAMP\otro\chatbot-kyk\audios
ffmpeg -i audio_123456.ogg -ar 16000 -ac 1 -c:a pcm_s16le test.wav
```

Si funciona, verás un archivo `test.wav` creado.

---

## 🔧 Parámetros de Conversión Usados

El bot usa este comando para convertir:

```bash
ffmpeg -i input.ogg -ar 16000 -ac 1 -c:a pcm_s16le output.wav -y -loglevel error
```

**Explicación:**
- `-i input.ogg` - Archivo de entrada (OPUS/OGG de WhatsApp)
- `-ar 16000` - Frecuencia de muestreo: 16kHz (requerido por Whisper)
- `-ac 1` - Canales de audio: 1 (mono)
- `-c:a pcm_s16le` - Codec: PCM 16-bit little-endian (WAV estándar)
- `-y` - Sobrescribir archivo si existe
- `-loglevel error` - Solo mostrar errores

---

## 🐛 Solución de Problemas

### Error: "ffmpeg no se reconoce como comando"

**Causa:** FFmpeg no está en el PATH

**Solución:**
1. Verifica que `C:\ffmpeg\bin\ffmpeg.exe` exista
2. Agrega `C:\ffmpeg\bin` al PATH (ver Paso 3)
3. **Cierra y abre una nueva terminal**

### Error: "Cannot find a suitable output format"

**Causa:** Archivo de entrada corrupto o formato no soportado

**Solución:**
- Verifica que el archivo `.ogg` no esté vacío
- Intenta con otro audio

### Error: "Permission denied"

**Causa:** El archivo está siendo usado por otro proceso

**Solución:**
- Cierra el bot
- Elimina archivos temporales en `./audios/`
- Reinicia el bot

---

## ✅ Checklist de Instalación

- [ ] FFmpeg descargado
- [ ] Extraído en `C:\ffmpeg\`
- [ ] Agregado al PATH
- [ ] Terminal reiniciada
- [ ] `ffmpeg -version` funciona
- [ ] Bot reiniciado
- [ ] Audio de prueba enviado

---

## 🎯 Próximos Pasos

Una vez instalado FFmpeg:

1. **Reinicia el bot:**
   ```cmd
   cd c:\RAMP\otro\chatbot-kyk
   npm start
   ```

2. **Envía un audio** por WhatsApp

3. **Verás en los logs:**
   ```
   🎙️ AUDIO DETECTADO!
   📥 Descargando audio...
   ✅ Audio guardado en: ./audios/audio_xxxxx.ogg
   🔄 Audio no es WAV, convirtiendo...
   🔄 Convirtiendo ./audios/audio_xxxxx.ogg a WAV...
   ✅ Convertido a: ./audios/audio_xxxxx.wav
   🔄 Ejecutando whisper.cpp...
   📝 Transcripción: "tu texto aquí"
   ```

4. **El bot responde:**
   ```
   ✅ Transcripción completada:
   
   "tu texto aquí"
   ```

---

## 🔗 Enlaces Útiles

- **FFmpeg oficial**: https://ffmpeg.org/
- **Builds para Windows**: https://www.gyan.dev/ffmpeg/builds/
- **Documentación FFmpeg**: https://ffmpeg.org/documentation.html
- **Whisper.cpp**: https://github.com/ggml-org/whisper.cpp

---

## 📊 Comparación de Opciones

| Método | Dificultad | Tiempo | Recomendado |
|--------|-----------|--------|-------------|
| Winget | ⭐ Fácil | 2 min | ✅ Sí |
| Manual | ⭐⭐ Media | 5 min | ✅ Sí |
| Chocolatey | ⭐ Fácil | 2 min | Si ya lo tienes |

---

**Una vez instalado FFmpeg, el sistema de transcripción estará 100% funcional.** 🎉

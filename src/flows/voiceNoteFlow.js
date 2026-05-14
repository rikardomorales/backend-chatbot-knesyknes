import { addKeyword, EVENTS } from '@builderbot/bot'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

/**
 * Flow: Recibir y Transcribir Notas de Voz
 * 
 * Cuando un usuario envía una nota de voz:
 * 1. Se guarda el archivo de audio
 * 2. Se transcribe usando whisper.cpp (local)
 * 3. Se devuelve la transcripción al usuario
 * 
 * Requisitos:
 * - whisper.cpp instalado y compilado
 * - Modelo descargado (ej: ggml-base.bin)
 */

const voiceNoteFlow = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('🎙️ Recibí tu nota de voz, déjame escucharla...', 
        async (ctx, { provider, flowDynamic, state }) => {
            try {
                // 1. Crear carpeta de audios si no existe
                const audioDir = './audios'
                if (!fs.existsSync(audioDir)) {
                    fs.mkdirSync(audioDir, { recursive: true })
                }

                // 2. Guardar el archivo de audio
                console.log('📥 Guardando audio...')
                const audioPath = await provider.saveFile(ctx, {
                    path: audioDir
                })
                
                console.log('✅ Audio guardado en:', audioPath)

                // 3. Transcribir con whisper.cpp
                console.log('🔄 Transcribiendo...')
                
                // Ruta a whisper.cpp (ajusta según tu instalación)
                const whisperPath = './whisper.cpp/main'
                const modelPath = './whisper.cpp/models/ggml-base.bin'
                
                // Verificar que existan los archivos
                if (!fs.existsSync(whisperPath)) {
                    throw new Error(`whisper.cpp no encontrado en: ${whisperPath}`)
                }
                if (!fs.existsSync(modelPath)) {
                    throw new Error(`Modelo no encontrado en: ${modelPath}`)
                }

                // Ejecutar whisper.cpp
                const { stdout, stderr } = await execAsync(
                    `"${whisperPath}" -m "${modelPath}" "${audioPath}" -of txt -otxt`
                )

                // 4. Leer el archivo de transcripción
                const txtFile = audioPath.replace(/\.[^.]+$/, '.txt')
                
                if (!fs.existsSync(txtFile)) {
                    throw new Error('No se generó el archivo de transcripción')
                }

                const transcription = fs.readFileSync(txtFile, 'utf-8').trim()
                
                console.log('📝 Transcripción:', transcription)

                // 5. Guardar en estado para usar después
                await state.update({ 
                    lastTranscription: transcription,
                    lastAudioPath: audioPath,
                    transcriptionDate: new Date().toISOString()
                })

                // 6. Responder al usuario
                await flowDynamic([
                    '✅ Aquí está tu transcripción:',
                    `"${transcription}"`,
                    '',
                    '¿Qué deseas hacer con esto?'
                ])

                // 7. Limpiar archivos temporales
                console.log('🧹 Limpiando archivos...')
                fs.unlinkSync(audioPath)
                fs.unlinkSync(txtFile)
                
                console.log('✅ Proceso completado')

            } catch (error) {
                console.error('❌ Error al procesar audio:', error.message)
                
                // Responder con error al usuario
                await flowDynamic([
                    '❌ Error al procesar el audio:',
                    error.message,
                    '',
                    'Por favor, intenta nuevamente'
                ])
            }
        }
    )

export default voiceNoteFlow

import { createBot, createProvider, createFlow, addKeyword, EVENTS } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { downloadMediaMessage } from '@whiskeysockets/baileys'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'

const execAsync = promisify(exec)
const PORT = process.env.PORT ?? 3008

// Números de asesores
const numeroAsesor1 = '573054262668@s.whatsapp.net'

/**
 * Función auxiliar para convertir OPUS/OGG a WAV usando FFmpeg
 */
const convertToWav = async (inputPath) => {
    try {
        const outputPath = inputPath.replace(/\.[^.]+$/, '.wav')
        
        // Verificar que FFmpeg esté instalado
        try {
            await execAsync('ffmpeg -version')
        } catch (error) {
            console.warn('⚠️ FFmpeg no está instalado')
            return null
        }
        
        // Convertir a WAV (16kHz, mono, PCM 16-bit)
        console.log(`🔄 Convirtiendo ${inputPath} a WAV...`)
        await execAsync(
            `ffmpeg -i "${inputPath}" -ar 16000 -ac 1 -c:a pcm_s16le "${outputPath}" -y -loglevel error`
        )
        
        console.log(`✅ Convertido a: ${outputPath}`)
        
        // Eliminar el archivo original
        fs.unlinkSync(inputPath)
        
        return outputPath
    } catch (error) {
        console.error('❌ Error al convertir audio:', error.message)
        return null
    }
}

/**
 * Función auxiliar para transcribir audios con whisper.cpp
 */
const transcribeAudio = async (audioPath) => {
    try {
        const whisperPath = process.platform === 'win32' 
            ? './whisper.cpp/main.exe' 
            : './whisper.cpp/main'
        // Usar modelo MEDIUM para mejor precisión
        const modelPath = './whisper.cpp/models/ggml-medium.bin'
        
        // Verificar que existan los archivos
        if (!fs.existsSync(whisperPath)) {
            console.warn(`⚠️ whisper.cpp no encontrado en: ${whisperPath}`)
            return null
        }
        if (!fs.existsSync(modelPath)) {
            console.warn(`⚠️ Modelo no encontrado en: ${modelPath}`)
            return null
        }

        // Convertir a WAV si no lo es
        let wavPath = audioPath
        if (!audioPath.endsWith('.wav')) {
            console.log('🔄 Audio no es WAV, convirtiendo...')
            wavPath = await convertToWav(audioPath)
            if (!wavPath) {
                return null
            }
        }

        // Ejecutar whisper.cpp con idioma español
        console.log('🔄 Ejecutando whisper.cpp...')
        const { stdout, stderr } = await execAsync(
            `"${whisperPath}" -m "${modelPath}" -l es "${wavPath}" -otxt`
        )

        // Leer el archivo de transcripción
        // whisper.cpp genera el archivo como "archivo.wav.txt" no "archivo.txt"
        const txtFile = `${wavPath}.txt`
        
        if (!fs.existsSync(txtFile)) {
            console.warn('⚠️ No se generó el archivo de transcripción')
            console.warn('Buscando:', txtFile)
            console.warn('stdout:', stdout)
            console.warn('stderr:', stderr)
            return null
        }

        const transcription = fs.readFileSync(txtFile, 'utf-8').trim()
        
        // Limpiar archivos
        if (fs.existsSync(wavPath)) fs.unlinkSync(wavPath)
        if (fs.existsSync(txtFile)) fs.unlinkSync(txtFile)
        
        return transcription
    } catch (error) {
        console.error('❌ Error al transcribir:', error.message)
        return null
    }
}

/**
 * Flow: Agradecimiento
 * Se activa cuando el usuario escribe "gracias"
 */
const flowAgradecimiento = addKeyword(['gracias', 'thanks', 'thank you'])
    .addAnswer(['Muchas gracias a ti, por contactarnos 😊'])

/**
 * Función para configurar el listener de audios
 * Se ejecuta después de que el bot esté inicializado
 */
const setupAudioListener = (provider) => {
    console.log('🎙️ Configurando listener de audios...')
    
    provider.vendor.ev.on('messages.upsert', async ({ messages }) => {
        try {
            const m = messages[0]
            if (!m.message) return
            
            // Verificar si es un mensaje de audio/voz
            const isAudio = m.message?.audioMessage
            
            if (!isAudio) return
            
            console.log('🎙️ AUDIO DETECTADO!')
            console.log('📱 De:', m.key.remoteJid)
            console.log('📝 Tipo:', m.message.audioMessage.mimetype)
            
            // Crear carpeta de audios si no existe
            const audioDir = './audios'
            if (!fs.existsSync(audioDir)) {
                fs.mkdirSync(audioDir, { recursive: true })
            }
            
            // Descargar el audio
            console.log('📥 Descargando audio...')
            const buffer = await downloadMediaMessage(m, 'buffer', {}, {
                reuploadRequest: provider.vendor.updateMediaMessage,
                logger: undefined
            })
            
            // Guardar el audio
            const timestamp = Date.now()
            const audioPath = `${audioDir}/audio_${timestamp}.ogg`
            fs.writeFileSync(audioPath, buffer)
            console.log('✅ Audio guardado en:', audioPath)
            
            // Enviar mensaje de confirmación
            await provider.vendor.sendMessage(m.key.remoteJid, {
                text: '🎙️ Recibí tu nota de voz, transcribiendo...'
            })
            
            // Transcribir el audio
            console.log('🔄 Transcribiendo...')
            const transcription = await transcribeAudio(audioPath)
            
            if (!transcription) {
                await provider.vendor.sendMessage(m.key.remoteJid, {
                    text: '⚠️ No pude transcribir el audio.\n\n' +
                          '**Requisitos faltantes:**\n' +
                          '1. FFmpeg (para convertir OPUS → WAV)\n' +
                          '2. Whisper.cpp (para transcribir)\n\n' +
                          '**Instalar FFmpeg en Windows:**\n' +
                          '• Descarga: https://ffmpeg.org/download.html\n' +
                          '• O usa: winget install ffmpeg\n\n' +
                          'Ver: doc/INSTALAR_WHISPER_WINDOWS.md'
                })
                return
            }
            
            console.log('📝 Transcripción:', transcription)
            
            // Enviar la transcripción
            await provider.vendor.sendMessage(m.key.remoteJid, {
                text: `✅ Transcripción completada:\n\n"${transcription}"\n\n---\nEscribe "menú" para volver al inicio`
            })
            
        } catch (error) {
            console.error('❌ Error al procesar audio:', error.message)
        }
    })
    
    console.log('✅ Listener de audios configurado')
}



/**
 * Flow: Confirmación de cita (Si)
 * Se activa cuando el usuario confirma que desea agendar
 */
const flowSiCita = addKeyword(['si', 'sí', 'yes', 'claro', 'ok'])
    .addAnswer(
        ['📝 Por favor ingrese su dirección'],
        { capture: true },
        async (ctx, { flowDynamic, provider }) => {
            const numeroDeCliente = ctx.from
            const datosDeContacto = ctx.body

            const mensajeAsesor = `soy Kan, el 🤖 *Chatbot* de Knes y Knes 🏥 Veterinaria, por favor revisa la conversación 🤳🏼 con el número: +${numeroDeCliente}📱\n\nNos escribió los siguientes datos:\n${datosDeContacto}`

            // Enviar notificación al asesor
            await provider.sendText(numeroAsesor1, mensajeAsesor)

            // Responder al cliente
            await flowDynamic([
                '¡Muchas gracias!, por contactarnos 😁',
                'Uno de nuestros veterinarios 👨🏻‍⚕️ se pondrá en contacto 🤳🏼 con usted lo antes posible'
            ])
        }
    )

/**
 * Flow: Rechazo de cita (No)
 * Se activa cuando el usuario rechaza agendar
 */
const flowNoCita = addKeyword(['no', 'nope', 'no gracias'])
    .addAnswer([
        '¡Muchas gracias por contactarnos!',
        'Recuerda que en cualquier momento de la conversación puedes escribir 🤳🏼 la palabra "Menú", para volver al inicio 🏚'
    ])

/**
 * Flow: Consulta a domicilio
 * Se activa con la opción "1"
 */
const flowConsulta = addKeyword(['1'])
    .addAnswer(
        [
            '🩺👩‍⚕️👨🏻‍⚕️💉 La consulta a domicilio con uno de nuestros veterinarios:',
            '• Diagnóstico de tu mascota',
            '• Información del tratamiento a seguir',
            '• Valor: $40.000 mil pesos',
            '• Incluye el domicilio',
            '',
            '🗓 ¿Desea agendarlo?',
            'Por favor escribe: ✅ Si o ❎ No'
        ].join('\n'),
        null,
        null,
        [flowSiCita, flowNoCita]
    )

/**
 * Flow: Control para perros adultos
 * Se activa con la opción "adulto"
 */
const flowMayor = addKeyword(['adulto', 'mayor', 'grande'])
    .addAnswer(
        [
            '🩺👩‍⚕️👨🏻‍⚕️💉 Tenemos un paquete promocional 💊 para su mascota, incluye:',
            '✅ Vacunas',
            '✅ Desparasitación',
            '✅ Vitaminas',
            '✅ Complejo B',
            '✅ Calcio',
            '',
            'Valor: $90.000 (incluye domicilio)',
            '',
            '🗓 ¿Desea agendarlo?',
            'Por favor escribe: ✅ Si o ❎ No'
        ].join('\n'),
        null,
        null,
        [flowSiCita, flowNoCita]
    )

/**
 * Flow: Control para cachorros
 * Se activa con la opción "cachorro"
 */
const flowMenor = addKeyword(['cachorro', 'pequeño', 'joven'])
    .addAnswer(
        [
            '🩺👩‍⚕️👨🏻‍⚕️💉 Tenemos un paquete promocional 💊 para su mascota, incluye:',
            '✅ Vacunas',
            '✅ Desparasitación',
            '✅ Vitaminas',
            '✅ Complejo B',
            '✅ Calcio',
            '',
            'Valor: $70.000 (incluye domicilio)',
            '',
            '🗓 ¿Desea agendarlo?',
            'Por favor escribe: ✅ Si o ❎ No'
        ].join('\n'),
        null,
        null,
        [flowSiCita, flowNoCita]
    )

/**
 * Flow: Control completo para gatos
 * Se activa con la opción "3"
 */
const flowControlCompletoGato = addKeyword(['3'])
    .addAnswer(
        [
            '🩺👩‍⚕️👨🏻‍⚕️💉 Tenemos un paquete promocional 💊 para su mascota, incluye:',
            '✅ Vacunas',
            '✅ Desparasitación',
            '✅ Vitaminas',
            '✅ Complejo B',
            '✅ Calcio',
            '',
            'Valor: $70.000 (incluye domicilio)',
            '',
            '🗓 ¿Desea agendarlo?',
            'Por favor escribe: ✅ Si o ❎ No'
        ].join('\n'),
        null,
        null,
        [flowSiCita, flowNoCita]
    )

/**
 * Flow: Control completo para perros
 * Se activa con la opción "2"
 */
const flowControlCompletoPerro = addKeyword(['2'])
    .addAnswer(
        'Por favor escribe:',
        null,
        null,
        [flowMayor, flowMenor]
    )
    .addAnswer(
        [
            '• "adulto" para mayores de un año',
            '• "cachorro" para menores de un año'
        ].join('\n')
    )

/**
 * Flow: Contactar con asesor
 * Se activa con la opción "4"
 */
const flowAsesor = addKeyword(['4'])
    .addAnswer(
        ['📝 Por favor ingrese su inquietud, recomendación o sugerencia'],
        { capture: true },
        async (ctx, { flowDynamic, provider }) => {
            const numeroDeCliente = ctx.from
            const datosDeContacto = ctx.body

            const mensajeAsesor = `soy Kan, el 🤖 *Chatbot* de Knes y Knes 🏥 Veterinaria, por favor revisa la conversación 🤳🏼 con el número: +${numeroDeCliente}📱\n\nNos escribió los siguientes datos:\n${datosDeContacto}`

            // Enviar notificación al asesor
            await provider.sendText(numeroAsesor1, mensajeAsesor)

            // Responder al cliente
            await flowDynamic([
                '¡Muchas gracias!, por contactarnos 😁',
                'Uno de nuestros veterinarios 👨🏻‍⚕️ se pondrá en contacto 🤳🏼 con usted lo antes posible'
            ])
        }
    )

/**
 * Flow: Principal / Menú
 * Se activa con palabras de saludo
 */
const flowPrincipal = addKeyword(
    ['hola', 'buenas tardes', 'buenas noches', 'buenos días', 'buen día', 'buenas', 'menu', 'menú'],
    { sensitive: false }
)
    .addAnswer(
        [
            '🙌 Hola, es un gusto saludarte',
            'Bienvenido soy Kan, el 🤖 *Chatbot* de Knes y Knes 🏥 Veterinaria',
            '',
            'En que podemos ayudarte, por favor escribe el número de la opción que necesites:'
        ].join('\n')
    )
    .addAnswer(
        [
            '✅ "1" - Consulta a domicilio con veterinario 🩺👩‍⚕️👨🏻‍⚕️',
            '✅ "2" - Control Perro (incluye vacunas)',
            '✅ "3" - Control Gato (incluye vacunas)',
            '✅ "4" - Hablar con un asesor',
            '',
            'En cualquier momento puedes escribir "Menú" para volver al inicio'
        ].join('\n'),
        { capture: true },
        async (ctx, { fallBack }) => {
            // Validar que el usuario escriba una opción válida
            const opcion = ctx.body.trim()
            if (!['1', '2', '3', '4'].includes(opcion)) {
                return fallBack('Por favor, escribe un número válido (1, 2, 3 o 4)')
            }
        },
        [flowConsulta, flowControlCompletoPerro, flowControlCompletoGato, flowAsesor]
    )

/**
 * Función principal
 */
const main = async () => {
    // Crear adaptadores
    const adapterFlow = createFlow([
        flowPrincipal,
        flowAgradecimiento,
        flowConsulta,
        flowControlCompletoPerro,
        flowControlCompletoGato,
        flowMayor,
        flowMenor,
        flowSiCita,
        flowNoCita,
        flowAsesor
    ])

    // Configurar provider con versión de WhatsApp compatible
    const adapterProvider = createProvider(Provider, {
        version: [2, 3000, 1035824857]
    })
    
    const adapterDB = new Database()

    // Crear bot
    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    // Iniciar servidor HTTP
    httpServer(+PORT)
    console.log(`✅ Bot iniciado en puerto ${PORT}`)
    console.log(`📱 Abre http://localhost:${PORT}/ para escanear el QR`)
    
    // Configurar el listener de audios DESPUÉS de que el proveedor esté listo
    adapterProvider.on('ready', () => {
        console.log('🤖 Bot conectado y listo')
        setupAudioListener(adapterProvider)
    })
}

main()

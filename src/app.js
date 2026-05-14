import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

const PORT = process.env.PORT ?? 3008

// Números de asesores
const numeroAsesor1 = '573054262668@s.whatsapp.net'

/**
 * Flow: Agradecimiento
 * Se activa cuando el usuario escribe "gracias"
 */
const flowAgradecimiento = addKeyword(['gracias', 'thanks', 'thank you'])
    .addAnswer(['Muchas gracias a ti, por contactarnos 😊'])

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
    // Si tienes problemas de AUTH, actualiza la versión aquí
    // Puedes verificar la versión en: https://wppconnect.io/whatsapp-versions/
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
}

main()

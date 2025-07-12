
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const axios = require('axios')


const flowAgradecimiento = addKeyword(['gracias']).addAnswer(['Muchas gracias a ti, por contactarnos'])
 
let datosDeContacto;
let mensajeAsesor;
const numeroAsesor1 = '573246843681@s.whatsapp.net'
const numeroAsesor2 = '573054262668@s.whatsapp.net'

const  flowSiCita = addKeyword(['Si'])
    .addAnswer(
        ['📝 Por favor ingrese su dirección'],
        { capture: true}, 
        async (ctx, {flowDynamic,provider}) => { 

            const numeroDeCliente = ctx.from

            datosDeContacto = ctx.body 

            mensajeAsesor = 'soy Kan, el 🤖 *Chatbot* de Knes y Knes 🏥 Veterinaria, por favor revisa la conversación 🤳🏼 con el número: +'+
                              numeroDeCliente+'📱, Nos escribio los siguientes datos: '+datosDeContacto

            

            await provider.sendText(numeroAsesor1,mensajeAsesor)
            await provider.sendText(numeroAsesor2,mensajeAsesor)

            await flowDynamic([
                {body:'¡Muchas gracias!, por contactarnos 😁 , uno de nuestros veterinarios 👨🏻‍⚕️ se pondra en contacto 🤳🏼 con usted, lo antes posible'}
            ])
 
        }
    )

     
const flowNoCita = addKeyword(['No']).addAnswer(['¡Muchas gracias por contactarnos!, recuerda que en cualquier momento de la conversación puedes escribir 🤳🏼 la palabra "Menu", para volver al inicio 🏚'])

const flowConsulta = addKeyword(['1']).addAnswer(
    [
        '🩺👩‍⚕️👨🏻‍⚕️💉 La consulta a domicilio con uno de nuestros veterinarios, en la cual se diagnostica tu mascota y se informa el tratamiento a seguir, tiene un valor de $40.000 mil pesos, incluye el domicilio',
        '\n🗓¿Desea agendarlo?.',
        '\npor favor escribe la opción que necesites, ✅ Si,  ❎No',
    ],
    null,
    null,
    [flowSiCita,flowNoCita]
)

const flowMayor = addKeyword(['adulto']).addAnswer(
    [
        '🩺👩‍⚕️👨🏻‍⚕️💉 Tenemos un paquete promocional 💊 para su mascota, incluye:',
        '\n✅ Vacunas',
        '✅ Desparasitación.',
        '✅ Vitaminas.',
        '✅ Complejo B.',
        '✅ Calcio.',        
        '\nValor: $90.000, incluye domicilio',
        '\n🗓¿Desea agendarlo?.',
        '\npor favor escribe la opción que necesites, ✅ Si,  ❎No',
    ],
    null,
    null,
    [flowSiCita,flowNoCita]
)

const  flowAsesor = addKeyword(['4'])
    .addAnswer(
        ['📝 Por favor ingrese su inquietud, recomendación o sugerencia, para que uno de nuestros asesores lo contacte'],
        { capture: true}, 
        async (ctx, {flowDynamic,provider}) => { 

            const numeroDeCliente = ctx.from

            datosDeContacto = ctx.body 

            mensajeAsesor = 'soy Kan, el 🤖 *Chatbot* de Knes y Knes 🏥 Veterinaria, por favor revisa la conversación 🤳🏼 con el número: +'+
                              numeroDeCliente+'📱, Nos escribio los siguientes datos: '+datosDeContacto

  
            //await provider.sendText(numeroAsesor1,mensajeAsesor)
            await provider.sendText(numeroAsesor2,mensajeAsesor)

            await flowDynamic([
                {body:'¡Muchas gracias!, por contactarnos 😁 , uno de nuestros veterinarios 👨🏻‍⚕️ se pondra en contacto 🤳🏼 con usted, lo antes posible'}
            ])
 
        }
    )

const flowMenor = addKeyword(['cachorro']).addAnswer(
    [
        '🩺👩‍⚕️👨🏻‍⚕️💉 Tenemos un paquete promocional 💊 para su mascota, incluye:',
        '\n✅ Vacunas',
        '✅ Desparasitación.',
        '✅ Vitaminas.',
        '✅ Complejo B.',
        '✅ Calcio.',        
        '\nValor: $70.000, incluye domicilio',
        '\n🗓¿Desea agendarlo?.',
        '\npor favor escribe la opción que necesites, ✅ Si,  ❎No',
    ],
    null,
    null,
    [flowSiCita,flowNoCita]
)

const flowControlCompletoGato = addKeyword(['3'])
.addAnswer(
    [
        '🩺👩‍⚕️👨🏻‍⚕️💉 Tenemos un paquete promocional 💊 para su mascota, incluye:',
        '\n✅ Vacunas',
        '✅ Desparasitación.',
        '✅ Vitaminas.',
        '✅ Complejo B.',
        '✅ Calcio.',        
        '\nValor: $70.000, incluye domicilio',
        '\n🗓¿Desea agendarlo?.',
        '\npor favor escribe la opción que necesites, ✅ Si,  ❎No',
    ],
    null,
    null,
    [flowSiCita,flowNoCita]
)

const flowControlCompletoPerro = addKeyword(['2'])
    .addAnswer(['Por favor escribe la palabra adulto para mayores de un año o cachorro, para saber si tu mascota tiene menos de un año'],
            null,
            null,
            [flowMayor,flowMenor]
        )
 
const flowPrincipal = addKeyword(['hola', 'buenas tardes','Buenas noches',
                                  'Buenos dias','Buen día','Buen dia','Buenas','menu','menú','Menú'])
    .addAnswer(
        [   '🙌 Hola, es un gusto saludarte, Bienvenido soy Kan, el 🤖 *Chatbot* de Knes y Knes 🏥 Veterinaria',
            '\nEn que podemos ayudarte, por favor escribe el número de la opción que necesites: ',
            '\n✅  "1", Consulta, para agendar una cita con uno de nuestros veterinarios 🩺👩‍⚕️👨🏻‍⚕️',
            '✅  "2", Control Perro, Incluye vacunas',
            '✅  "3", Control Gato, Incluye vacunas',
            '✅  "4", Hablar, para contactar uno de nuestros asesores',
            '\nEn cualquier momento de la conversación puedes escribir la palabra "Menú", para volver al inicio',
        ],
        null,
        null,
        [flowConsulta,flowControlCompletoPerro, flowControlCompletoGato]
    )
  
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowAgradecimiento,flowAsesor])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

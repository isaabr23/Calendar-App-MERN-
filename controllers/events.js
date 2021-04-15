const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async( req, res = response ) => {

    // Para retornar todos los eventos que hay 
    const eventos = await Evento.find()
    // Para rellenar los datos del usuario (colocar todos los datos)
                                .populate('user', "name"); // Nos despliega toda la informacion de user y con el "name" solo nos mostrara el name y oculta lo demas  ** para mas seria .populate('user', "name password apellido etc"); sin comas
    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );

    try {
        // Para obtener el id
        evento.user = req.uid;
        
        // Para guardarlo en la BD
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const actualizarEvento = async( req, res = response ) => {

    // para tomar el id y pasarlo al URL
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun evento con ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Usted no creo este evento por lo que no puede editarlo'
            });
        }

        // Si llega aqui significa que es la misma persona que creo el evento quien intenta actualizar
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        // Para actualizar
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

const borrarEvento = async( req, res = response ) => {
    // para tomar el id y pasarlo al URL
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun evento con ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Usted no creo este evento por lo que no puede borrarlo'
            });
        }

        // Para buscar y borrar
        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}


/* el body es:
y lo utilizamos como res.body donde res es la respuesta

{
    "title": "Cumpleaños de mi amor!!!",
    "start": 1000000,
    "end": 200000,
    "notes": "Hola Mundo..."
}

*/
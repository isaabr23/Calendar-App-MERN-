// Para crear Registros (colecciones db)

const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    // El usuario que creo el registro
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Le damos el formato que quiera (como se vera) en este caso eliminaremos el __v y cambiaremos el nombre de _id
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    // Cambiamos el nombre de _id por id
    object.id = _id;
    return object;
})

// Exportamos el Modelo
module.exports = model('Evento', EventoSchema);


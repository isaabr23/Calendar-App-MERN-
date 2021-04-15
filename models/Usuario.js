const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,   // Tipo String
        required: true,  // Requerido
        unique: true    // Unico (ningun correo repetido)
    },

    password: {
        type: String,
        required: true
    }

});

// Exportamos el Modelo
module.exports = model('Usuario', UsuarioSchema);


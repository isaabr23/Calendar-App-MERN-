const { response } = require('express');
const { validationResult } = require('express-validator'); // Para habilitar la validacion de campos

const validarCampos = (req, res = response, next) =>{

    // Manejo de errores
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // Si no hay ningun error (mensaje de falta algo en formulario) se llama a la funcion next para continuar con la siguiente caja
    next();
}

module.exports = {
    validarCampos
}
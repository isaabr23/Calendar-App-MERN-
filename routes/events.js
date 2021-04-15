/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator'); // Para [ check ], validacion y mensajes
const { isDate } = require('../helpers/isDate'); // Para validar la fecha de inicio y de final
const { validarCampos } =  require('../middlewares/validar-campos'); // Para que nos muestre los mensajes ** se debe colocar despues de todos los CHECK´s
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');

//  Todos los "router" tienen que pasar por la validacion JWT
// antes todas ** outer.get('/', validarJWT, getEventos ); **
router.use( validarJWT );

// Cuidar que en POSTMAN esten bien los valores de GET/POST/PUT/DELETE

// Obtener eventos
router.get('/', getEventos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha final es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento );

// Actualizar evento
router.put('/:id', actualizarEvento );

// Borrar evento
router.delete('/:id', borrarEvento );

module.exports = router;
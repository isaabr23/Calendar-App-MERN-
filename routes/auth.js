/*
    Rutas de Usuario - Auth
    el Host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Destructuramos ´para obtener las variables del ** controllers/auth **
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');  

// Validacion video 328
router.post(
    '/new', // Url (direccionado a /new con metodo POST)
    [   // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(), // Que no este vacio
        check('email', 'El Email es obligatorio').isEmail(),    // Que sea formato de Email
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),   // Que sea minimo el password de 6 letras    
        validarCampos
    ],
    // Si todo esta ok ejecuta crearUsuario
    crearUsuario );

router.post(
    '/',
    [   // middlewares
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

// Exportamos router (asi se exporta en node.js)
module.exports = router;
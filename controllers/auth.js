const { response } = require('express');    // Para obtener la ayuda del teclado (autocompletado)
const bcrypt = require('bcryptjs'); // Instalamos la libreria para el hash ** npm i bcryptjs **
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async( req, res = response ) => {
    // console.log(req.body); ** verlo en consola 

    const { email, password } = req.body; //Esto es lo que le mandamos al new Usuario

    try {
        
        // Busca y verifica el email si no esta repetido (unique)
        let usuario = await Usuario.findOne({ email });
        
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya existe intenta con otro',
            });
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
        // Para grabarlo en la base de datos
        await usuario.save();

        // Generar JWT (await por que es una promesa)
        const token = await generarJWT( usuario.id, usuario.name );
    
        // Si se guarda correctamente mandara mensaje de 201 Created y el JSON de abajo
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador',
        });
        
    }
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    
    try {
        
        // Busca y verifica el email si no esta repetido (unique)
        const usuario = await Usuario.findOne({ email });
        
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese Email',
            });
        }

        // Confirmar los passwords
        // Comparamos los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );
        
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        
        // Generar JWT (JSON Web Token) (await por que es una promesa)
        // Podemos copiar y pegar el Token generado en https://jwt.io/ para visualizar los valores encriptados
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador',
        }); 
    }
}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

    // Para generar un nuevo Token
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}


// Exportar modulos
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
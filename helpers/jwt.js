const jwt = require('jsonwebtoken'); // instalamos ** npm i jsonwebtoken **

const generarJWT = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };

        // Genera el token
        // requiere 3 opciones * Payload * private key * opciones (expira en 2 horas)* y un callback que se dispara cuanda haya errores
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'   
        }, ( err, token )=> { // Si hay Errores

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el Token');
            }

            // Si todo es correcto
            resolve( token );
        })
    })
}

module.exports = {
    generarJWT
}

// Configuracion para la conexion con la BD

const mongoose =  require('mongoose'); // Se instala para facilitar configuracion **npm i mongoose**

// La constante para referirnos a la BD
const dbConnection = async() => {

    // Cacharemos si hay errores
    try {
        
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la BD ')    
    }
}

module.exports = {
    dbConnection
}
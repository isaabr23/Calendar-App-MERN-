// Config basica de express

const express = require('express'); 
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Lee el archivo ".env" para el localhost de 4000
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

// CORS ( podemos restringir que solo ciertos dominios puedan ingresar )
app.use( cors() );

// Directorio Publico
app.use( express.static('public') );

// Lectura y parseo del body (Lee la informacion JSON)
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Escuchar peticiones / este es el mensje que sale en la terminal de Servidor corriendo en puerto 4000
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
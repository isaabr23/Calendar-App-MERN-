// Valida la fecha inicio final
// Se instala moment ** npm i moment **

const moment = require('moment');

const isDate = ( value ) => {

    if ( !value ) {
        return false;
    } 

    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }

}


module.exports = { isDate };
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var ManifiestoSchema = new Schema({
    ruta: String,
    vehiculo: String,
    fecha:String,
    recibido:String,
    entregado:String   

    
});

/*TransSchema.plugin(passportLocalMongoose);


UserSchema.methods.isAdmin = function() {
    return (this.rol === "admin");
};

UserSchema.methods.isOperador = function() {
    return (this.rol === "operador");
};
*/

module.exports = mongoose.model('Manifiesto',ManifiestoSchema);

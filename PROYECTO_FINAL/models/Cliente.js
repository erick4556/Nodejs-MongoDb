var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var ClienteSchema = new Schema({
    cedula: String,
    nombre: String,
    direccion: String,
    telefono:String,
    correo:String
    
});

/*TransSchema.plugin(passportLocalMongoose);


UserSchema.methods.isAdmin = function() {
    return (this.rol === "admin");
};

UserSchema.methods.isOperador = function() {
    return (this.rol === "operador");
};
*/

module.exports = mongoose.model('Cliente', ClienteSchema);

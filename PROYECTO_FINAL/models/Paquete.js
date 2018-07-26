var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var PaqueteSchema = new Schema({
    id_encomienda: String,
    descripcion: String
    
});

/*TransSchema.plugin(passportLocalMongoose);


UserSchema.methods.isAdmin = function() {
    return (this.rol === "admin");
};

UserSchema.methods.isOperador = function() {
    return (this.rol === "operador");
};
*/

module.exports = mongoose.model('Paquete',PaqueteSchema);

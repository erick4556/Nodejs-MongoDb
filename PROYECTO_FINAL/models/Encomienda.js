var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var EncomiendaSchema = new Schema({
    fecha: String,
    suc_origen: String,
    suc_destino: String,
    quien_recibe:String,
    quien_envia:String,
    valor:String
    
});

/*TransSchema.plugin(passportLocalMongoose);


UserSchema.methods.isAdmin = function() {
    return (this.rol === "admin");
};

UserSchema.methods.isOperador = function() {
    return (this.rol === "operador");
};
*/

module.exports = mongoose.model('Encomienda', EncomiendaSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var TransSchema = new Schema({
    placa: String,
    tipo_tran: String,
    modelo: String,
    marca:String,
    dimension:String,
    peso:String,
    year:Number
});

/*TransSchema.plugin(passportLocalMongoose);


UserSchema.methods.isAdmin = function() {
    return (this.rol === "admin");
};

UserSchema.methods.isOperador = function() {
    return (this.rol === "operador");
};
*/

module.exports = mongoose.model('Transporte', TransSchema);

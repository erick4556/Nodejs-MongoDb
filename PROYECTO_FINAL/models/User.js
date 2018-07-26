var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: { type: String, unique: true, lowercase: true },
    password: String,
    nombre: String,
    apellido:String,
    cedula:String,
    telefono:String,
    rol:String
});

UserSchema.plugin(passportLocalMongoose);


UserSchema.methods.isAdmin = function() {
    return (this.rol === "admin");
};

UserSchema.methods.isLogistica = function() {
    return (this.rol === "logistica");
};

UserSchema.methods.isRutero = function() {
    return (this.rol === "rutero");
};

UserSchema.methods.isRecepcion_mercancia= function() {
    return (this.rol === "recepcion_mercancia");
};




module.exports = mongoose.model('User', UserSchema);

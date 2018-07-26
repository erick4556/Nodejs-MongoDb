var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var RutaSchema = new Schema({
    descripcion: String,
    tiempo: String
    
});



module.exports = mongoose.model('Ruta', RutaSchema);

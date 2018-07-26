var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var RutaDetalleSchema = new Schema({
    id_ruta: String,
    desde: String,
    hasta:String,
    orden:String
    
});



module.exports = mongoose.model('RutaDetalle', RutaDetalleSchema);

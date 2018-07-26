var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Paquete = mongoose.model('Paquete');

var passportLocalMongoose = require('passport-local-mongoose');

var Manifiesto_DetalleSchema = new Schema({
    id_manifiesto:String,
    id_paquete :String,
    entregado:String

    
});



module.exports = mongoose.model('Manifiesto_Detalle',Manifiesto_DetalleSchema);

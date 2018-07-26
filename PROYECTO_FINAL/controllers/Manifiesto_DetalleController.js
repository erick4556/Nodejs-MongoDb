var mongoose = require("mongoose");
var passport = require("passport");
var Encomienda = require("../models/Encomienda");
var Ruta = require("../models/Ruta");
var Transporte = require("../models/Transporte");
var Manifiesto = require("../models/Manifiesto");
var Manifiesto_Detalle = require("../models/Manifiesto_Detalle");
var Paquete = require("../models/Paquete");
var User = require("../models/User");


var manifiesto_detalleController = {};


  manifiesto_detalleController.ver_manifiesto_detalle = function(req, res) {
     if (req.isAuthenticated() && req.user.isRutero())
  {

        Manifiesto_Detalle.find({id_manifiesto:req.params.id}).exec(function (err,manifiesto_detalle) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('manifiesto_detalle/ver_manifiesto_detalle', {manifiestodetalle:manifiesto_detalle,id:req.params.id});
        }
      });
  }

  else
  {
    res.render('error');
  }
  
 
};


manifiesto_detalleController.form_detalle = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {

 
          res.render('manifiesto_detalle/agregar_detalle', {id:req.params.id});

  }
  else
  {
    res.render('error');
  }  
 
};


 manifiesto_detalleController.save = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
	
    var detalle= new Manifiesto_Detalle(req.body);

    detalle.save(function(err) {
    if(err) {
      console.log(err);
      res.render("/ver_manifiesto");
    } else {
       
      res.redirect("/ver_manifiesto");
    }
  });
  }
  else
  {
    res.render('error')
  }
};


manifiesto_detalleController.delete = function(req, res) {

   if (req.isAuthenticated() && req.user.isRutero())
  {
 
    Manifiesto_Detalle.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      
      res.redirect("/ver_manifiesto");
    }
  });

  }
  else
    {res.render('error');}
 

};

// ENTREGAR PAQUETE 

  manifiesto_detalleController.entregar_paquete = function(req, res) {
   if (req.isAuthenticated())
  {
    Manifiesto_Detalle.find({entregado:'NO'}).exec(function(err, paquete){
    if (err) throw err;
    res.render('manifiesto/entregar_paquete', {paquete:paquete});

        
    });
 }
  else
  {
    res.render('error');
  }
};

//ACTUALIZAR ENTREGADO

  manifiesto_detalleController.actualizar_entregado = function(req, res){

     if (req.isAuthenticated())
  {
  
       Manifiesto_Detalle.findByIdAndUpdate(req.params.id, { $set: {entregado:"SI" }}, { new: true }, function (err, manifiesto) {
      if (err) {
        console.log(err);
      }
      res.redirect("/entregar_paquete");
    });
  }
  else
  {
    res.render('error');
  }

  
}






 module.exports = manifiesto_detalleController;
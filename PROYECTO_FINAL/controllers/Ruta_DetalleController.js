var mongoose = require("mongoose");
var passport = require("passport");
var RutaDetalle = require("../models/Ruta_Detalle");
var Sucursal= require("../models/Sucursal");
var User = require("../models/User");

var rutadetalleController = {};

  rutadetalleController.show = function(req, res) {
     if (req.isAuthenticated() && req.user.isRutero())
  {

        RutaDetalle.find({id_ruta:req.params.id}).exec(function (err,rutadetalle) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('ruta_detalle/obtener_detalle', {rutadetalle:rutadetalle,id:req.params.id});
        }
      });
  }
  else

  {
    res.render('error');
  }
  
 
};


rutadetalleController.form_detalle = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {


        Sucursal.find({}).exec(function (err,sucursal) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('ruta_detalle/registro', {sucursal:sucursal,id:req.params.id});
        }
      });
  }
  else
  {
    res.render('error');
  }
  
 
};

 rutadetalleController.save = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
  var rutadetalle= new RutaDetalle(req.body);

    rutadetalle.save(function(err) {
    if(err) {
      console.log(err);
      res.render("/ver_ruta");
    } else {
       
      res.redirect("/ver_ruta");
    }
  });
  }
  else 
  {
    res.render('error')
  }
};


 rutadetalleController.edit = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {

  var sucursal= {};
  var rutadetalle={};

  RutaDetalle.findOne({_id: req.params.id}).exec(function (err, allrutadetalle) {
      if (err) {console.log("Error:", err);}
      else {
            rutadetalle=allrutadetalle
      }
      
    });

  Sucursal.find({}).exec(function (err, allsucursal) {
    if (err) {console.log("Error:", err);}
     else {
      
              sucursal=allsucursal;
              res.render("ruta_detalle/modificar_detalle", {rutadetalle: rutadetalle,sucursal:sucursal});
         }
      });

  }
  else
  {
    res.render('error');
  }



};



   rutadetalleController.update = function(req, res){
     if (req.isAuthenticated() && req.user.isRutero())
  {
 

    RutaDetalle.findByIdAndUpdate(req.params.id, { $set: { desde: req.body.desde, hasta: req.body.hasta,orden:req.body.orden }}, { new: true }, function (err, rutadetalle) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_ruta");
    });

  }
  else
  {
    res.render ('error');
  }
  
};






rutadetalleController.delete = function(req, res) {

   if (req.isAuthenticated() && req.user.isRutero())
  {
 
    RutaDetalle.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      
      res.redirect("/ver_ruta");
    }
  });

  }
  else
  {
    res.render('error');
  }
 

};





 module.exports = rutadetalleController;

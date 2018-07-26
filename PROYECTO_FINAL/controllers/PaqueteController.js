var mongoose = require("mongoose");
var passport = require("passport");
var Encomienda = require("../models/Encomienda");
var Sucursal = require("../models/Sucursal");
var Paquete = require("../models/Paquete");
var User = require("../models/User");

var paqueteController = {};

 paqueteController.show = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {

        Paquete.find({id_encomienda:req.params.id}).exec(function (err,paquete) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('paquete/obtener_paquete', {paquete:paquete,id:req.params.id});
        }
      });
  }
  else
  {
    res.render('error');
  }

  
};


 paqueteController.ver_detalle_paquete = function(req, res) {

   if (req.isAuthenticated() )
  {

        Paquete.findOne({_id:req.params.id}).exec(function (err,paquete) {
        if (err) {
          console.log("Error:", err);
        }



        else {
          res.render('manifiesto/ver_detalle_paquete', {paquete:paquete});
        }
      });

  }
  else
    {
      res.render('error');
    }

  
};



paqueteController.form_paquete = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {

          res.render('paquete/registro', {id:req.params.id});
  }
  else
    {res.render('error');

  }
    
};


 paqueteController.save = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
    var paquete= new Paquete(req.body);

      paquete.save(function(err) {
      if(err) {
        console.log(err);
        res.render("/ver_encomienda");
      } else {
         
        res.redirect("/ver_encomienda");
      }
    });
  }
  else{

    res.render('error');

  }
};



   paqueteController.edit = function(req, res) {
     if (req.isAuthenticated() && req.user.isRutero())
  {
    Paquete.findOne({_id: req.params.id}).exec(function (err, paquete) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("paquete/modificar_paquete", {paquete:paquete});
    }
  });
  }
  else
    { res.render('error');}
};



   paqueteController.update = function(req, res){

     if (req.isAuthenticated() && req.user.isRutero())
  {
 

     Paquete.findByIdAndUpdate(req.params.id, { $set: { descripcion: req.body.descripcion  }}, { new: true }, function (err, paquete) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_encomienda");
    });

   }
   else
   {
    res.render('error');
   }
  
};






    paqueteController.delete = function(req, res) {

     if (req.isAuthenticated() && req.user.isRutero())
  {
 
    Paquete.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      
      res.redirect("/ver_encomienda");
    }
  });

  }
  else
  {
    res.render('error');
  }
 

};


 module.exports = paqueteController;

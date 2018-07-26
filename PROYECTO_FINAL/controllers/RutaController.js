var mongoose = require("mongoose");
var passport = require("passport");
var Ruta = require("../models/Ruta");
var User = require("../models/User");

var rutaController = {};


rutaController.create = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {

  res.render("ruta/registro");
  }
  else

  {
    res.render('error');
  }

  
};


  rutaController.save = function(req, res) {
     if (req.isAuthenticated() && req.user.isRutero())
  {
    var ruta= new Ruta(req.body);

      ruta.save(function(err) {
      if(err) {
        console.log(err);
        res.render("ruta/registro");
      } else {
         
        res.redirect("/ver_ruta");
      }
    });
  }
  else
  {
    res.render('error');
  }
};




  rutaController.ver_ruta = function(req, res) {
     if (req.isAuthenticated() && req.user.isRutero())
  {

        Ruta.find({}).exec(function (err,ruta) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('ruta/ver_ruta', {ruta:ruta});
        }
      });
  }
  else
  {
    res.render('error');
  }
  
 
};


   rutaController.edit = function(req, res) {
     if (req.isAuthenticated() && req.user.isRutero())
  {
    Ruta.findOne({_id: req.params.id}).exec(function (err, ruta) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("ruta/modificar_ruta", {ruta: ruta});
    }
  });
  }
  else
  {
    res.render('error');
  }
};

   rutaController.update = function(req, res){

     if (req.isAuthenticated() && req.user.isRutero())
  {
 

    Ruta.findByIdAndUpdate(req.params.id, { $set: { descripcion: req.body.descripcion, tiempo: req.body.tiempo }}, { new: true }, function (err, ruta) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_ruta");
    });
  }
  else
  {
    res.render('error');
  }
  
};


rutaController.delete = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
 
    Ruta.remove({_id: req.params.id}, function(err) {
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

 
 module.exports = rutaController;



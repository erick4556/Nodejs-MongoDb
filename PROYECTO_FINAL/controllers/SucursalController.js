var mongoose = require("mongoose");
var passport = require("passport");
var Sucursal = require("../models/Sucursal");
var User = require("../models/User");

var sucursalController = {};


sucursalController.create = function(req, res) {

    if (req.isAuthenticated() && req.user.isRutero())
  {
   
  res.render("sucursal/registro");  
  }
  else
  {
    res.render('error');
  }
  
};


sucursalController.save = function(req, res) {

    if (req.isAuthenticated() && req.user.isRutero())
  {
   
  var sucursal= new Sucursal(req.body);

    sucursal.save(function(err) {
    if(err) {
      console.log(err);
      res.render("sucursal/registro");
    } else {
       
      res.redirect("/ver_sucursal");
    }
  });
  }
  else
  {
    res.render('error');
  }
};



sucursalController.ver_sucursal = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {


      Sucursal.find({}).exec(function (err, sucursal) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('sucursal/ver_sucursal', {sucursal: sucursal});
        }
      });
    }
    else
    {
      res.render('error');
    }
  
 
};


sucursalController.edit = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
   Sucursal.findOne({_id: req.params.id}).exec(function (err, sucursal) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("sucursal/modificar_sucursal", {sucursal: sucursal});
    }
  });
 }

 else
 {
  res.render('error');
 }

};

sucursalController.update = function(req, res){
   if (req.isAuthenticated() && req.user.isRutero())
  {
 

    Sucursal.findByIdAndUpdate(req.params.id, { $set: { descripcion: req.body.descripcion }}, { new: true }, function (err, sucursal) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_sucursal");
    });
  }
  else
  {
    res.render('error');
  }
  
};


sucursalController.delete = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
 
    Sucursal.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      
      res.redirect("/ver_sucursal");
    }
  });
  }
  else
  {
    res.render('error');
  }
 

};

 
 module.exports = sucursalController;



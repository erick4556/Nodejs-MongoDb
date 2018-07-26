var mongoose = require("mongoose");
var passport = require("passport");
var Encomienda = require("../models/Encomienda");
var Ruta = require("../models/Ruta");
var Transporte = require("../models/Transporte");
var Manifiesto = require("../models/Manifiesto");
var Manifiesto_Detalle = require("../models/Manifiesto_Detalle");
var User = require("../models/User");

var dateFormat = require('dateformat');
var now = new Date();

var manifiestoController = {};



manifiestoController.crear_manifiesto= function(req, res) {

   if (req.isAuthenticated() && req.user.isRutero())
  {

  var ruta= {};
  var transporte={};

  Ruta.find({}).exec(function (err, allruta) {
      if (err) {console.log("Error:", err);}
      else {
            ruta=allruta
      }
      
    });

  Transporte.find({}).exec(function (err, alltransporte) {
    if (err) {console.log("Error:", err);}
     else {
      
              transporte=alltransporte;
              res.render("manifiesto/crear_manifiesto", {ruta: ruta,transporte:transporte});
         }
      });

 }
 else

 {
  res.render('error');
 }




};


  manifiestoController.save = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
    var manifiesto= new Manifiesto(req.body);

      manifiesto.save(function(err) {
      if(err) {
        console.log(err);
        res.render("manifiesto/crear_manifiesto");
      } else {
         
        res.redirect("/ver_manifiesto");
      }
    });
  }
  else
  {
    res.render('error');
  }
};



  manifiestoController.ver_manifiesto= function(req, res) {
     if (req.isAuthenticated() && req.user.isRutero())
  {
        
        var fecha=dateFormat(now, "yyyy-mm-dd");
        
        Manifiesto.find({fecha:fecha}).exec(function (err,manifiesto) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('manifiesto/ver_manifiesto', {manifiesto:manifiesto});
        }
      });

  }

  else
  {
    res.render('error')
  }
  
 
};



manifiestoController.delete = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
   
      Manifiesto.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        
        res.redirect("/ver_manifiesto");
      }
    });
  }
  else
  {
    res.render('error');
  }
 

};


manifiestoController.edit = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {

    var ruta= {};
    var transporte={};
    var manifiesto={};

    
     Manifiesto.findOne({_id: req.params.id}).exec(function (err, allmanifiesto) {
        if (err) {console.log("Error:", err);}
        else {
              manifiesto=allmanifiesto;
        }
        
      });


    Ruta.find({}).exec(function (err, allruta) {
        if (err) {console.log("Error:", err);}
        else {
              ruta=allruta;
        }
        
      });

    Transporte.find({}).exec(function (err, alltransporte) {
      if (err) {console.log("Error:", err);}
       else {
        
                transporte=alltransporte;
                res.render("manifiesto/modificar_manifesto", {manifiesto:manifiesto, ruta: ruta,transporte:transporte});
           }
        });
  }
  else
  {
    res.render('error');
  }



};



   manifiestoController.update = function(req, res){

     if (req.isAuthenticated() && req.user.isRutero())
  {
 

    Manifiesto.findByIdAndUpdate(req.params.id, { $set: {fecha:req.body.fecha,ruta: req.body.ruta, vehiculo: req.body.vehiculo }}, { new: true }, function (err, manifiesto) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_manifiesto");
    });

  }

 else
 {
  res.render('error');
 }
  
};

// LA RECEPCION RECIBE EL MANIFIESTO 
  manifiestoController.recibir_manifiesto= function(req, res) {

     if (req.isAuthenticated())
  {
        
        var fecha=dateFormat(now, "yyyy-mm-dd");
        
        Manifiesto.find({fecha:fecha,recibido:"NO"}).exec(function (err,manifiesto) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('manifiesto/recibir_manifiesto', {manifiesto:manifiesto});
        }
      });

  }
  else
  {
    res.render('error');
  }
  
 
};


// ACTUALIZAR ESTADO DE "NO" A "SI" EN RECIBIDO
   manifiestoController.actualizar_recibido = function(req, res){

     if (req.isAuthenticated())
  {
   
    Manifiesto.findByIdAndUpdate(req.params.id, { $set: {recibido:"SI" }}, { new: true }, function (err, manifiesto) {
      if (err) {
        console.log(err);
      }
      res.redirect("/recibir_manifiesto");
    });

  }
  else
  {
    res.render('error')
  }
  
}





 module.exports = manifiestoController;
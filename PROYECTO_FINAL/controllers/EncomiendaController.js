var mongoose = require("mongoose");
var passport = require("passport");
var Encomienda = require("../models/Encomienda");
var Sucursal = require("../models/Sucursal");
var User = require("../models/User");

var encomiendaController = {};


encomiendaController.create = function(req, res) {

   if (req.isAuthenticated() && req.user.isRutero())
  {
  Sucursal.find({}).exec(function (err,sucursal) {

        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('encomienda/registro', {sucursal:sucursal});
        }
      });
  }
  else
  {
    res.render('error');
  }
  
};

 encomiendaController.save = function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {
  var encomienda= new Encomienda(req.body);

    encomienda.save(function(err) {
    if(err) {
      console.log(err);
      res.render("encomienda/registro");
    } else {
       
      res.redirect("/ver_encomienda");
    }
  });
  }
  else
  {
    res.render('error')
  }
};


 encomiendaController.ver_encomienda= function(req, res) {
   if (req.isAuthenticated() && req.user.isRutero())
  {

        Encomienda.find({}).exec(function (err,encomienda) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('encomienda/ver_encomienda', {encomienda:encomienda});
        }
      });
  }
  else
  {
    res.render('error');
  }
  
};


    encomiendaController.edit = function(req, res) {
       if (req.isAuthenticated() && req.user.isRutero())
  {

	  var sucursal= {};
	  var encomienda={};

      Encomienda.findOne({_id: req.params.id}).exec(function (err, allencomienda) {
      if (err) {console.log("Error:", err);}
      else {
            encomienda=allencomienda;
      }
      
    });

    Sucursal.find({}).exec(function (err, allsucursal) {
    if (err) {console.log("Error:", err);}
     else {
      
              sucursal=allsucursal;
              res.render("encomienda/modificar_encomienda", {encomienda:encomienda,sucursal:sucursal});
         }
      });

   }

   else
   {
    res.render('error');
   }


    
};

   encomiendaController.update = function(req, res){
     if (req.isAuthenticated() && req.user.isRutero())
  {
 
    Encomienda.findByIdAndUpdate(req.params.id, { 
    	$set: { 
    		   suc_origen: req.body.suc_origen, 
               suc_destino:req.body.suc_destino , 
               quien_recibe:req.body.quien_recibe,
               quien_envia:req.body.quien_envia,
               valor:req.body.valor


           }}, { new: true }, function (err, encomienda) {
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




encomiendaController.delete = function(req, res) {
  if (req.isAuthenticated() && req.user.isRutero())
  { 
 
    Encomienda.remove({_id: req.params.id}, function(err) {
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


 encomiendaController.ver_detalle_encomienda_paquete= function(req, res) {
   if (req.isAuthenticated())
  {

        Encomienda.findOne({_id:req.params.id}).exec(function (err,encomienda) {
        if (err) {
          console.log("Error:", err);
        }


        else {
          res.render('manifiesto/ver_detalle_encomienda_paquete', {encomienda:encomienda});
        }
      });
  }
  else
  {
    res.render('error');
  }
  
};





 
 module.exports = encomiendaController;
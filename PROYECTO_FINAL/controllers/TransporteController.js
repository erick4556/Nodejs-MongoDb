var mongoose = require("mongoose");
var passport = require("passport");
var Transporte = require("../models/Transporte");
var User = require("../models/User");


var userController = {};


// Restrict access to root page

userController.home = function(req, res,next) {
  if(req.isAuthenticated())
  {
  res.render('home');
  }else{
    res.sendStatus(403);
  }
};


userController.prueba= function(req, res,next) {

  if(req.isAuthenticated())
  {
  res.render('register');
  }else{
    res.render('home');;
  }
};


userController.rol= function(req, res,next) {
 
  if (req.isAuthenticated() && req.user.isAdmin()) {
        res.render('admin/admin_home');
    }

    else if (req.isAuthenticated() && req.user.isOperador()) {
        res.render('operador/operador_home');

    }

};



 //Transporte

// Go to registration page
// Create new employee
userController.create = function(req, res) {
  if (req.isAuthenticated() && req.user.isLogistica())
  {
     res.render("transporte/registro");

  } 
  else
  {
    res.render('error');
  }

 
};

// Save new employee
userController.save = function(req, res) {
    if (req.isAuthenticated() && req.user.isLogistica())
  {

      var transporte = new Transporte(req.body);

      transporte.save(function(err) {
        if(err) {
          console.log(err);
          res.render("transporte/registro");
        } else {
           
          res.redirect("/ver_transporte");
        }
      });
   }
   else
   {
    res.render('error');
   }

};




userController.ver_transporte = function(req, res) {

    if (req.isAuthenticated() && req.user.isLogistica())
  {



      Transporte.find({}).exec(function (err, transporte) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('transporte/ver_transporte', {transporte: transporte});
        }
      });
  }
  else
  {
    res.render('error');
  }
  
 
};

userController.edit = function(req, res) {

    if (req.isAuthenticated() && req.user.isLogistica())
  {

    Transporte.findOne({_id: req.params.id}).exec(function (err, transporte) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("transporte/modificar_trans", {transporte: transporte});
      }
    });
  }
  else
  {
    res.render('error');
  }


};

userController.update = function(req, res){

    if (req.isAuthenticated() && req.user.isLogistica())
  {
 

    Transporte.findByIdAndUpdate(req.params.id, { $set: { placa: req.body.placa, tipo_tran: req.body.tipo_tran, modelo: req.body.modelo, 
      marca: req.body.marca, dimension:req.body.dimension, peso: req.body.peso, year: req.body.year }}, { new: true }, function (err, transporte) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_transporte");
    });

  }
  else
    res.render('error');
  
};

userController.delete = function(req, res) {

    if (req.isAuthenticated() && req.user.isLogistica())
  {
   
    Transporte.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("Usuario!");
        res.redirect("/ver_transporte");
      }
    });
  } 
  else
  {
    res.render('error');
  } 
 

};



// Go to login page
userController.login = function(req, res) {

  res.render('login/login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local', { successRedirect: '/rol',
                                   failureRedirect: '/login',
                                   failureFlash: true })
  (req, res, function () {
    
   

  });
};


  function loggedIn (req, res,next) {
     if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};



// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};




module.exports = userController;

var mongoose = require("mongoose");
var passport = require("passport");
var Cliente = require("../models/Cliente");
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



// Go to registration page
// Create new employee
userController.create = function(req, res) {

    if (req.isAuthenticated() && req.user.isLogistica())
  {
   
  res.render("cliente/registro");
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
   
    var cliente = new Cliente(req.body);

    cliente.save(function(err) {
      if(err) {
        console.log(err);
        res.render("cliente/registro");
      } else {
          
        res.redirect("/ver_cliente");
      }
    });
  } 
  else
  {
    res.render('error')
  }
};



userController.ver_cliente = function(req, res) {

    if (req.isAuthenticated() && req.user.isLogistica())
  {
   


      Cliente.find({}).exec(function (err, cliente) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('cliente/ver_cliente', {cliente: cliente});
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
   
  Cliente.findOne({_id: req.params.id}).exec(function (err, cliente) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("cliente/modificar_cliente", {cliente: cliente});
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
   
 

    Cliente.findByIdAndUpdate(req.params.id, { $set: { cedula: req.body.cedula, nombre: req.body.nombre, direccion: req.body.direccion, 
      telefono: req.body.telefono, correo :req.body.correo }}, { new: true }, function (err, cliente) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_cliente");
    });
  }
  else
  {
    res.render('error');
  }
  
};

userController.delete = function(req, res) {

    if (req.isAuthenticated() && req.user.isLogistica())
  {
   
 
  Cliente.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      
      res.redirect("/ver_cliente");
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

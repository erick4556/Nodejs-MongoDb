var mongoose = require("mongoose");
var passport = require("passport");
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
  if (req.isAuthenticated())
  {
   
      if (req.isAuthenticated() && req.user.isAdmin()) {
          res.render('admin/admin_home',{ user: req.user.nombre});
      
      }

      else if (req.isAuthenticated() && req.user.isLogistica()) {
          res.render('logistica/logistica_home',{ user: req.user.nombre});
          
        } else if (req.isAuthenticated() && req.user.isRutero()) {
          res.render('rutero/rutero_home',{ user: req.user.nombre});

        } else if (req.isAuthenticated && req.user.isRecepcion_mercancia()){
          res.render('recepcion_mercancia/recepcion_mercancia_home',{ user: req.user.nombre});

        }
    }




};



 


// Go to registration page
userController.register = function(req, res) {
  if (req.isAuthenticated() && req.user.isAdmin()) 
  {

  res.render('login/registro');
  }

  else
  {
    res.render('error');
  }
};

// Post registration
userController.doRegister = function(req, res) {
  if (req.isAuthenticated() && req.user.isAdmin()) 
  {

  User.register(new User({ username : req.body.username, nombre: req.body.nombre,apellido: req.body.apellido ,cedula: req.body.cedula, telefono: req.body.telefono, rol: req.body.rol }), req.body.password, function(err, user) {
    if (err) {
      return res.render('login/registro', { user : user });

    }

      res.redirect('/ver_usuarios');
   
  });
 }
 else
 {
  res.render('render');
 }
};



userController.ver_usuarios = function(req, res) {

  if (req.isAuthenticated() && req.user.isAdmin()) 
  {

      User.find({}).exec(function (err, usuarios) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('login/ver_usuarios', {usuarios: usuarios});
        }
      });
  }
  else
  {
    res.render('error');
  }
};




userController.delete = function(req, res) {
  if (req.isAuthenticated() && req.user.isAdmin()) 
  {

  User.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Usuario!");
      res.redirect("/ver_usuarios");
    }
  });
 }
 else
 {
  res.render('error');
 }

};


userController.edit = function(req, res) {
  if (req.isAuthenticated() && req.user.isAdmin()) 
  {

    User.findOne({_id: req.params.id}).exec(function (err, usuario) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("login/modificar_usuario", {usuario: usuario});
      }
    });
  }
  else
  {
    res.render('error');
  }
};

// Update 


userController.update = function(req, res){
  if (req.isAuthenticated() && req.user.isAdmin()) 
  {

    User.findByIdAndUpdate(req.params.id, { $set: { nombre: req.body.nombre, apellido: req.body.apellido, cedula: req.body.cedula, telefono: req.body.telefono, rol:req.body.rol}}, { new: true }, function (err, usuario) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_usuarios");
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

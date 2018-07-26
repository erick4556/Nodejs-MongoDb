var mongoose = require("mongoose");
var passport = require("passport");
var Conductor = require("../models/Conductor");
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
   
  res.render("conductor/registro");
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
   
    var conductor= new Conductor(req.body);

    conductor.save(function(err) {
      if(err) {
        console.log(err);
        res.render("conductor/registro");
      } else {
          
        res.redirect("/ver_conductor");
      }
    });

  }
  else
  {
    res.render('error');
  }
};



userController.ver_conductor = function(req, res) {

    if (req.isAuthenticated() && req.user.isLogistica())
  {
   

      Conductor.find({}).exec(function (err, conductor) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render('conductor/ver_conductor', {conductor: conductor});
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
   
  Conductor.findOne({_id: req.params.id}).exec(function (err, conductor) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("conductor/modificar_conductor", {conductor: conductor});
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
   
 

    Conductor.findByIdAndUpdate(req.params.id, { $set: { cedula: req.body.cedula, nombre: req.body.nombre, direccion: req.body.direccion, 
      telefono: req.body.telefono, nacimiento :req.body.nacimiento }}, { new: true }, function (err, conductor) {
      if (err) {
        console.log(err);
      }
      res.redirect("/ver_conductor");
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
   
 
    Conductor.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        
        res.redirect("/ver_conductor");
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

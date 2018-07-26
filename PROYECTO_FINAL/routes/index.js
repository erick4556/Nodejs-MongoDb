var express = require('express');

var router = express.Router();
var auth = require("../controllers/AuthController.js");
var auth_tran = require("../controllers/TransporteController.js");
var auth_clien = require("../controllers/ClienteController.js");
var auth_conduc = require("../controllers/ConductorController.js");
var sucursal = require("../controllers/SucursalController.js");
var ruta = require("../controllers/RutaController.js");
var rutadetalle= require("../controllers/Ruta_DetalleController.js");
var encomienda= require("../controllers/EncomiendaController.js");
var paquete= require("../controllers/PaqueteController.js");
var manifiesto=require("../controllers/ManifiestoController.js");
var manifiesto_detalle=require("../controllers/Manifiesto_DetalleController.js");
var passport = require("passport");
var User = require("../models/User");

//var Transporte = require("../models/Transporte");

// ruta de login 
/*
router.get('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('login/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.render('/home');
    });
  })(req, res, next);
});

*/
// restrict index for logged in user only
router.get('/', auth.login);

router.get('/prueba', auth.prueba);

//router.get('/home',auth.home);

router.get('/home',auth.home);
router.get('/rol',auth.rol);



// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

router.get('/ver_usuarios',auth.ver_usuarios);


//borrar usuario

router.post('/eliminar_usuario/:id',auth.delete);


router.get('/editar_usuario/:id',auth.edit);

router.post('/update/:id',auth.update);


// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

//Transporte

router.get('/create', function(req, res) {
  auth_tran.create(req, res);
});

router.post('/save', function(req, res) {
  auth_tran.save(req, res);
});

router.get('/ver_transporte',auth_tran.ver_transporte);

router.get('/editar_transporte/:id',auth_tran.edit);

//router.post('transporte_update/:id',auth_tran.update);

router.post('/transporte_update/:id', function(req, res) {
 auth_tran.update(req, res);
});

router.post('/eliminar_transporte/:id',auth_tran.delete);

//Cliente

router.get('/create_clien', function(req, res) {
  auth_clien.create(req, res);
});

router.post('/save_clien', function(req, res) {
  auth_clien.save(req, res);
});

router.get('/ver_cliente',auth_clien.ver_cliente);

router.get('/editar_cliente/:id',auth_clien.edit);


router.post('/cliente_update/:id', function(req, res) {
 auth_clien.update(req, res);
});

router.post('/eliminar_cliente/:id',auth_clien.delete);

//Conductor

router.get('/create_conductor', function(req, res) {
  auth_conduc.create(req, res);
});

router.post('/save_conductor', function(req, res) {
  auth_conduc.save(req, res);
});

router.get('/ver_conductor',auth_conduc.ver_conductor);

router.get('/editar_conductor/:id',auth_conduc.edit);


router.post('/conductor_update/:id', function(req, res) {
 auth_conduc.update(req, res);
});

router.post('/eliminar_conductor/:id',auth_conduc.delete);


// Sucursal

router.get('/create_sucursal', function(req, res) {
 sucursal.create(req, res);
});

router.post('/save_sucursal', function(req, res) {
   sucursal.save(req, res);
});

router.get('/ver_sucursal',sucursal.ver_sucursal);


router.get('/editar_sucursal/:id',sucursal.edit);


router.post('/update_sucursal/:id', function(req, res) {
  sucursal.update(req, res);
});

router.post('/eliminar_sucursal/:id',sucursal.delete);





// RUTAS 

router.get('/create_ruta', function(req, res) {
 ruta.create(req, res);
});

router.post('/save_ruta', function(req, res) {
   ruta.save(req, res);
});

router.get('/ver_ruta',ruta.ver_ruta);


router.get('/editar_ruta/:id',ruta.edit);


router.post('/update_ruta/:id', function(req, res) {
  ruta.update(req, res);
});

router.post('/eliminar_ruta/:id',ruta.delete);


// RUTA DETALLE (SUB_RUTAS)
router.get('/show/:id', function(req, res) {
  rutadetalle.show(req, res);
});

router.get('/agregar_detalle/:id', function(req, res) {
  rutadetalle.form_detalle(req, res);
});

router.post('/save_ruta_detalle/', function(req, res) {
   rutadetalle.save(req, res);
});

router.get('/editar_ruta_detalle/:id',rutadetalle.edit);

router.post('/update_ruta_detalle/:id', function(req, res) {
  rutadetalle.update(req, res);
});

router.post('/eliminar_ruta_detalle/:id',rutadetalle.delete);


// ENCOMIENDA 

router.get('/create_encomienda', function(req, res) {
 encomienda.create(req, res);
});


router.post('/save_encomienda', function(req, res) {
   encomienda.save(req, res);
});

router.get('/ver_encomienda',encomienda.ver_encomienda);

router.get('/editar_encomienda/:id',encomienda.edit);

router.post('/update_encomienda/:id', function(req, res) {
   encomienda.update(req, res);
});

router.post('/eliminar_encomienda/:id',encomienda.delete);


//Paquete

router.get('/show_paquete/:id', function(req, res) {
  paquete.show(req, res);
});

router.get('/agregar_paquete/:id', function(req, res) {
    paquete.form_paquete(req, res);
});

router.post('/save_paquete/', function(req, res) {
   paquete.save(req, res);
});

router.get('/editar_paquete/:id',paquete.edit);

router.post('/update_paquete/:id', function(req, res) {
  paquete.update(req, res);
});

router.post('/eliminar_paquete/:id',paquete.delete);


// MANIFIESTO 

router.get('/crear_manifiesto/', function(req, res) {
    manifiesto.crear_manifiesto(req, res);
});

router.post('/save_manifiesto/', function(req, res) {
   manifiesto.save(req, res);
});


router.get('/ver_manifiesto',manifiesto.ver_manifiesto);

router.post('/eliminar_manifiesto/:id',manifiesto.delete);


router.get('/editar_manifiesto/:id',manifiesto.edit);

router.post('/update_manifiesto/:id', function(req, res) {
  manifiesto.update(req, res);
});


//MANIFIESTO DETALLE

router.get('/ver_manifiesto_detalle/:id', function(req, res) {
  manifiesto_detalle.ver_manifiesto_detalle(req, res);
});

router.get('/agregar_manifiesto_detalle/:id', function(req, res) {
  manifiesto_detalle.form_detalle(req, res);
});

router.post('/save_manifiesto_detalle/', function(req, res) {
   manifiesto_detalle.save(req, res);
});

router.post('/eliminar_manifiesto_detalle/:id',manifiesto_detalle.delete);


// RECIBIR MANIFIESTO
router.get('/recibir_manifiesto/', function(req, res) {
  manifiesto.recibir_manifiesto(req, res);
});

router.post('/actualizar_recibido/:id', function(req, res) {
  manifiesto.actualizar_recibido(req, res);
});

// ENTREGAR PAQUETE
router.get('/entregar_paquete/', function(req, res) {
  manifiesto_detalle.entregar_paquete(req, res);
});

router.get('/ver_detalle_paquete/:id', function(req, res) {
  paquete.ver_detalle_paquete(req, res);
});

router.get('/ver_detalle_encomienda_paquete/:id', function(req, res) {
  encomienda.ver_detalle_encomienda_paquete(req, res);
});




router.post('/actualizar_entregado/:id', function(req, res) {
  manifiesto_detalle.actualizar_entregado(req, res);
});







module.exports = router;

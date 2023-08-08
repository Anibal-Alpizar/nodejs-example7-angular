const express = require('express');
const router = express.Router();

//Controlador
const videojuegoController = require('../controllers/videojuegoController');
const auth=require("../middleware/auth");
//Rutas
//locahost:3000/videojuego/all

router.get('/', videojuegoController.get);

//Solo puede acceder el administrador
router.post('/',auth.grantRole(["ADMIN"]),videojuegoController.create);

router.get('/:id',auth.grantRole(["ADMIN","USER"]),videojuegoController.getById);

router.put('/:id',videojuegoController.update);



module.exports=router
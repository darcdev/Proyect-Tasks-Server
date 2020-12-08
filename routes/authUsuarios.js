// Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const {
  autenticarUsuario,
  usuarioAutenticado,
} = require("../controllers/authController");
const auth = require("../middlewares/auth");

//Login
// autenticar usuarios
router.post("/", autenticarUsuario);

//obtiene el usuario autenticado
router.get("/", auth, usuarioAutenticado);

module.exports = router;

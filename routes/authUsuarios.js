// Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { autenticarUsuario } = require("../controllers/authController");
const { check } = require("express-validator");

// autenticar usuarios
router.post(
  "/",
  [
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracters").isLength({
      min: 6,
    }),
  ],
  autenticarUsuario
);

module.exports = router;

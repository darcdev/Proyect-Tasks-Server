const express = require("express");
const router = express.Router();
const { crearTarea, obtenerTareas } = require("../controllers/tareaController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

// crear tarea

router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty(),
  ],
  crearTarea
);

router.get("/", auth, obtenerTareas);
module.exports = router;

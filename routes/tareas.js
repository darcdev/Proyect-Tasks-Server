const express = require("express");
const router = express.Router();
const {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
} = require("../controllers/tareaController");
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
//obtener tareas
router.get("/", auth, obtenerTareas);

// actualizar tarea

router.put("/:id", auth, actualizarTarea);

module.exports = router;

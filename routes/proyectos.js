const express = require("express");
const router = express.Router();
const {
  crearProyecto,
  obtenerProyectos,
  actualizarProyecto,
  eliminarProyecto,
} = require("../controllers/proyectoController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
//Crea proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  crearProyecto
);
//obtener proyectos
router.get("/", auth, obtenerProyectos);

// Actualizar Proyecto via ID

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  actualizarProyecto
);

// Eliminar un proyecto
router.delete("/:id", auth, eliminarProyecto);

module.exports = router;

const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

// Crea una nueva tarea

exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  // Extraer el proyecto y comprobar que exista
  const { proyecto } = req.body;
  console.log(proyecto);
  try {
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // Revisar si proyecto actual , pertenece al usuario autenticado

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    // Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  // Extraer el proyecto y comprobar que exista
  const { proyecto } = req.body;
  try {
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // Revisar si proyecto actual , pertenece al usuario autenticado

    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

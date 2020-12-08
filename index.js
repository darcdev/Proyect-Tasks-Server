const express = require("express");
const conectarDB = require("./config/db");
const usuarios = require("./routes/usuarios");
const authUsuarios = require("./routes/authUsuarios");
const proyectos = require("./routes/proyectos");
const tareas = require("./routes/tareas");
const cors = require("cors");
// crear el servidor
const app = express();

//conectar a base de datos
conectarDB();

//habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const port = process.env.port || 4000;

// importar rutas
app.use("/api/usuarios", usuarios);
app.use("/api/auth", authUsuarios);
app.use("/api/proyectos", proyectos);
app.use("/api/tareas", tareas);

app.listen(port, "0.0.0.0", () => {
  console.log("el servidor esta funcionando en el puerto", port);
});

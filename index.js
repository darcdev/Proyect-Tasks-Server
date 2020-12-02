const express = require("express");
const conectarDB = require("./config/db");
const usuarios = require("./routes/usuarios");
const authUsuarios = require("./routes/authUsuarios");

// crear el servidor
const app = express();

//conectar a base de datos

conectarDB();

// Habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use("/api/usuarios", usuarios);
app.use("/api/auth", authUsuarios);

app.listen(PORT, () => {
  console.log("el servidor esta funcionando en el puerto", PORT);
});

const express = require("express");
const conectarDB = require("./config/db");
// crear el servidor
const app = express();

//conectar a base de datos

conectarDB();

// puerto de la app
const PORT = process.env.PORT || 4000;

// definir la pagina principal

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(PORT, () => {
  console.log("el servidor esta funcionando en el puerto", PORT);
});
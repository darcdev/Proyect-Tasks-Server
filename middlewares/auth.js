const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Leer el token del header
  const token = req.header("x-auth-token");

  // Revisar si no hay token

  if (!token) {
    return res.status(401).json({ msg: "No hay Token , Permiso no valido" });
  }
  //validar token

  try {
    const cifrado = jwt.verify(token, process.env.TOKEN_SECRET);
    req.usuario = cifrado.usuario;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token no valido" });
  }
};

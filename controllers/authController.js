const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array(),
    });
  }
  const { email, password } = req.body;
  try {
    //Revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario no existe",
      });
    }
    const passCorrecto = await bcrypt.compare(password, usuario.password);

    if (!passCorrecto) {
      return res.status(400).json({
        msg: "Datos Incorrectos",
      });
    }
    // Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //firmar el JWT
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: Number(process.env.EXPIRATION_TIME_TOKEN),
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion
        return res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Hubo un error al iniciar sesion",
    });
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
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

    if (usuario) {
      return res.status(400).json({
        msg: "El usuario ya existe",
      });
    }
    //crea nuevo usuario
    usuario = new Usuario(req.body);
    // Hashear el password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    await usuario.save();

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
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion

        return res.json({ token });
      }
    );
    // return res.send({
    //   msg: "usuario creado correctamente",
    // });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Hubo un error al crear usuario",
    });
  }
};

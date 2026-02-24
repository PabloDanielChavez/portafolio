// controllers/authController.js
// const bcrypt = require('bcrypt');
import { usuario } from '../models/User.js';

export const loginUsuario = async (req, res) => {
  try {
    const { correo } = req.body;

    if (!correo) {
      console.log('Usuario no encontrado');
    }

    const usuarioEncontrado = await usuario.findOne({ where: { correo } });

    if (!usuarioEncontrado) {
      console.log('Usuario no encontrado');
    }

    // Aquí podrías continuar con la verificación de contraseña si la tienes
    res.json({ usuario: usuarioEncontrado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

export const registroUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const nuevoUsuario = await usuario.create({
      correo,
      contraseña
    });

    res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
};
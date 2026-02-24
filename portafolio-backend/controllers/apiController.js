// controllers/apiController.js
import { catalogoPaginas } from '../models/Portafolio.js';

export const obtenerPaginas = async (req, res) => {
    try {
        const paginasSalida = await catalogoPaginas.findAll();
        res.json({ 
            paginasSalida
        });
  } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los platos.' });
  }
};
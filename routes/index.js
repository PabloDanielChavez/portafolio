import express from 'express';
import {
        paginaInicio,
        paginaInformacion
} from '../controllers/paginasController.js';

// import {
//         guardarTestimonial
// } from '../controllers/testimonialController.js';

const router = express.Router();

router.get('/', paginaInicio);

router.get('/informacion', paginaInformacion);

// router.get('/servicios', paginaServicios);
// router.get('/servicios/:slug', paginaDetalleServicios);

// router.get('/testimoniales', paginaTestimoniales);
// router.post('/testimoniales', guardarTestimonial);

export default router;
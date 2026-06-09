import express from 'express';
import rateLimit from 'express-rate-limit';

import { obtenerPerfil, obtenerHabilidades, obtenerExperiencia, obtenerExpDesafio, obtenerExpTecnologia, obtenerServicios, obtenerClientes, obtenerTrabajos, obtenerTraTecnologia, guardarMensaje, actualizarAuditoriaPageSpeed }from '../controllers/apiController.js';
const router = express.Router();
const auditoriaLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora en milisegundos
    max: 2, // Límite de intentos
    message: { 
        mensaje: 'Tranquilo, fiera. Ya auditaste hace poco. Intentá de nuevo en una hora.' 
    },
    standardHeaders: true, // Devuelve información de límite en los headers `RateLimit-*`
    legacyHeaders: false, // Desactiva los headers viejos `X-RateLimit-*`
});

    router.get("/api/perfil", obtenerPerfil);
    router.get("/api/habilidades", obtenerHabilidades);
    router.get("/api/experiencia", obtenerExperiencia);
    router.get("/api/exp_desafio", obtenerExpDesafio);
    router.get("/api/exp_tecnologia", obtenerExpTecnologia);
    router.get("/api/servicios", obtenerServicios);
    router.get("/api/trabajos", obtenerTrabajos);
    router.get("/api/tra_tecnologia", obtenerTraTecnologia);
    router.get("/api/clientes", obtenerClientes);
    router.post("/api/contacto", guardarMensaje);
    router.post("/api/actualizar-auditoria", auditoriaLimiter, actualizarAuditoriaPageSpeed);

export default router;
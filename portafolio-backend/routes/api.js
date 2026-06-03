    import express from 'express';
    import { obtenerPerfil, obtenerHabilidades, obtenerExperiencia, obtenerExpDesafio, obtenerExpTecnologia, obtenerServicios, obtenerClientes, obtenerTrabajos, guardarMensaje }from '../controllers/apiController.js';
    const router = express.Router();

    router.get("/api/perfil", obtenerPerfil);
    router.get("/api/habilidades", obtenerHabilidades);
    router.get("/api/experiencia", obtenerExperiencia);
    router.get("/api/exp_desafio", obtenerExpDesafio);
    router.get("/api/exp_tecnologia", obtenerExpTecnologia);
    router.get("/api/servicios", obtenerServicios);
    router.get("/api/trabajos", obtenerTrabajos);
    router.get("/api/clientes", obtenerClientes);
    router.post("/api/contacto", guardarMensaje);

    export default router;
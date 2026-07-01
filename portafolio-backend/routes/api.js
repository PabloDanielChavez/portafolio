import express from 'express';

import {
    actualizarAuditoriaPageSpeed,
    guardarMensaje,
    obtenerClientes,
    obtenerExpDesafio,
    obtenerExperiencia,
    obtenerExpTecnologia,
    obtenerHabilidades,
    obtenerPerfil,
    obtenerSalud,
    obtenerServicios,
    obtenerTrabajoPorSlug,
    obtenerTrabajos,
    obtenerTraTecnologia
} from '../controllers/apiController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
    auditRateLimiter,
    contactRateLimiter,
    handleContactHoneypot,
    requireAuditToken,
    requireAllowedContactOrigin
} from '../middleware/security.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
    auditBodySchema,
    contactBodySchema,
    workSlugParamsSchema
} from '../validation/schemas.js';

const router = express.Router();

router.get('/api/health', asyncHandler(obtenerSalud));
router.get('/api/perfil', asyncHandler(obtenerPerfil));
router.get('/api/habilidades', asyncHandler(obtenerHabilidades));
router.get('/api/experiencia', asyncHandler(obtenerExperiencia));
router.get('/api/exp_desafio', asyncHandler(obtenerExpDesafio));
router.get('/api/exp_tecnologia', asyncHandler(obtenerExpTecnologia));
router.get('/api/servicios', asyncHandler(obtenerServicios));
router.get('/api/trabajos', asyncHandler(obtenerTrabajos));
router.get(
    '/api/trabajos/:slug',
    validateRequest(workSlugParamsSchema, 'params'),
    asyncHandler(obtenerTrabajoPorSlug)
);
router.get('/api/tra_tecnologia', asyncHandler(obtenerTraTecnologia));
router.get('/api/clientes', asyncHandler(obtenerClientes));

router.post(
    '/api/contacto',
    contactRateLimiter,
    requireAllowedContactOrigin,
    handleContactHoneypot,
    validateRequest(contactBodySchema),
    asyncHandler(guardarMensaje)
);
router.all('/api/contacto', (req, res) => {
    const message = 'Método no permitido.';

    res.set('Allow', 'POST, OPTIONS').status(405).json({
        success: false,
        message,
        mensaje: message
    });
});

router.post(
    '/api/actualizar-auditoria',
    requireAuditToken,
    auditRateLimiter,
    validateRequest(auditBodySchema),
    asyncHandler(actualizarAuditoriaPageSpeed)
);

export default router;

import rateLimit from 'express-rate-limit';

import { env } from '../config/env.js';
import { HttpError } from '../errors/HttpError.js';

const responseMessage = (message) => ({
    success: false,
    message,
    mensaje: message
});

const createRateLimiter = ({ windowMs, limit, message }) =>
    rateLimit({
        windowMs,
        limit,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json(responseMessage(message));
        }
    });

export const apiRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: env.apiRateLimitMax,
    message: 'Demasiadas solicitudes. Intentá nuevamente más tarde.'
});

export const contactRateLimiter = createRateLimiter({
    windowMs: env.contactRateLimitWindowMinutes * 60 * 1000,
    limit: env.contactRateLimitMax,
    message: 'Se alcanzó el límite de envíos. Intentá nuevamente más tarde.'
});

export const auditRateLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000,
    limit: env.auditRateLimitMax,
    message: 'La auditoría fue solicitada recientemente. Intentá más tarde.'
});

const getRequestOrigin = (req) => {
    const origin = req.get('origin');

    if (origin) return origin.replace(/\/+$/, '');

    const referer = req.get('referer');

    if (!referer) return null;

    try {
        return new URL(referer).origin;
    } catch {
        return null;
    }
};

export const requireAllowedContactOrigin = (req, res, next) => {
    if (!env.isProduction) {
        return next();
    }

    const requestOrigin = getRequestOrigin(req);

    if (!requestOrigin || !env.corsOrigins.includes(requestOrigin)) {
        return next(new HttpError(403, 'Origen de solicitud no permitido.'));
    }

    return next();
};

export const handleContactHoneypot = (req, res, next) => {
    const website = req.body?.website;

    if (typeof website !== 'string' || website.trim() === '') {
        return next();
    }

    const message = 'Mensaje recibido correctamente.';

    return res.status(201).json({
        success: true,
        message,
        mensaje: message
    });
};

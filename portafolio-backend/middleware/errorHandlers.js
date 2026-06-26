import { env } from '../config/env.js';

const createErrorResponse = (message) => ({
    success: false,
    message,
    mensaje: message
});

export const notFoundHandler = (req, res) => {
    const message = 'Recurso no encontrado.';

    res.status(404).json(createErrorResponse(message));
};

export const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    let statusCode = Number.isInteger(error.statusCode)
        ? error.statusCode
        : 500;
    let message =
        statusCode < 500
            ? error.message || 'No se pudo procesar la solicitud.'
            : 'No se pudo procesar la solicitud.';

    if (error.type === 'entity.too.large') {
        statusCode = 413;
        message = 'La solicitud supera el tamaño permitido.';
    } else if (
        error instanceof SyntaxError &&
        error.status === 400 &&
        'body' in error
    ) {
        statusCode = 400;
        message = 'El cuerpo de la solicitud no es JSON válido.';
    }

    if (statusCode >= 500) {
        if (env.isProduction) {
            console.error(
                `[${req.method} ${req.originalUrl}] Error interno: ${error.name}`
            );
        } else {
            console.error(error);
        }
    }

    return res.status(statusCode).json(createErrorResponse(message));
};

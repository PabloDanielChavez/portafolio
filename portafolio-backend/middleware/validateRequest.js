import { HttpError } from '../errors/HttpError.js';

export const validateRequest = (schema, source = 'body') => (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
        return next(new HttpError(400, 'Los datos enviados no son válidos.'));
    }

    req.validated = req.validated ?? {};
    req.validated[source] = result.data;

    return next();
};

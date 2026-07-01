import { createHash, timingSafeEqual } from "node:crypto";

const MINIMUM_TOKEN_LENGTH = 32;
const MAXIMUM_WORK_SLUG_LENGTH = 160;
const MAXIMUM_PATH_LENGTH =
    "/trabajos/".length + MAXIMUM_WORK_SLUG_LENGTH;
const STATIC_ALLOWED_PATHS = new Set([
    "/",
    "/contacto",
    "/servicios",
    "/trabajos"
]);

class RevalidationRequestError extends Error {
    constructor(status, message, headers = {}) {
        super(message);
        this.name = "RevalidationRequestError";
        this.status = status;
        this.headers = headers;
    }
}

const createJsonResponse = (body, status = 200, headers = {}) =>
    Response.json(body, {
        status,
        headers: {
            "Cache-Control": "no-store",
            ...headers
        }
    });

const hashToken = (token) =>
    createHash("sha256").update(token, "utf8").digest();

const validateAuthorization = (authorization, expectedToken) => {
    if (
        typeof expectedToken !== "string" ||
        expectedToken.length < MINIMUM_TOKEN_LENGTH
    ) {
        throw new RevalidationRequestError(
            503,
            "La revalidación no está configurada."
        );
    }

    if (!authorization) {
        throw new RevalidationRequestError(
            401,
            "Se requiere autenticación.",
            { "WWW-Authenticate": "Bearer" }
        );
    }

    const match = authorization.match(/^Bearer ([^\s]+)$/i);

    if (!match) {
        throw new RevalidationRequestError(
            401,
            "El encabezado de autenticación no es válido.",
            { "WWW-Authenticate": "Bearer" }
        );
    }

    if (!timingSafeEqual(hashToken(match[1]), hashToken(expectedToken))) {
        throw new RevalidationRequestError(
            403,
            "Las credenciales de revalidación no son válidas."
        );
    }
};

export const validateRevalidationPath = (path) => {
    if (
        typeof path !== "string" ||
        path.length === 0 ||
        path.length > MAXIMUM_PATH_LENGTH
    ) {
        throw new RevalidationRequestError(
            400,
            "El path de revalidación no es válido."
        );
    }

    if (
        !path.startsWith("/") ||
        path.includes("://") ||
        path.includes("?") ||
        path.includes("#") ||
        path.includes("..") ||
        path.includes("//") ||
        path.includes("\\") ||
        /%(?:2e|2f|5c)/i.test(path) ||
        /[\u0000-\u0020\u007f]/u.test(path)
    ) {
        throw new RevalidationRequestError(
            400,
            "El path de revalidación no está permitido."
        );
    }

    if (STATIC_ALLOWED_PATHS.has(path)) {
        return path;
    }

    const projectMatch = path.match(
        /^\/trabajos\/([a-z0-9]+(?:-[a-z0-9]+)*)$/
    );

    if (projectMatch) {
        const projectSlug = projectMatch[1];

        if (
            projectSlug.length <= MAXIMUM_WORK_SLUG_LENGTH &&
            /[a-z]/.test(projectSlug)
        ) {
            return path;
        }
    }

    throw new RevalidationRequestError(
        400,
        "El path de revalidación no está permitido."
    );
};

const readAndValidatePayload = async (request) => {
    let payload;

    try {
        payload = await request.json();
    } catch {
        throw new RevalidationRequestError(
            400,
            "El cuerpo de la solicitud no es JSON válido."
        );
    }

    if (
        !payload ||
        typeof payload !== "object" ||
        Array.isArray(payload)
    ) {
        throw new RevalidationRequestError(
            400,
            "El cuerpo de la solicitud no es válido."
        );
    }

    const fields = Object.keys(payload);

    if (fields.length !== 1 || fields[0] !== "path") {
        throw new RevalidationRequestError(
            400,
            "El cuerpo contiene campos no permitidos."
        );
    }

    return validateRevalidationPath(payload.path);
};

export const createRevalidationPostHandler = ({
    getExpectedToken,
    revalidate,
    now = Date.now
}) => async (request) => {
    try {
        validateAuthorization(
            request.headers.get("authorization"),
            getExpectedToken()
        );

        const path = await readAndValidatePayload(request);

        await revalidate(path);

        return createJsonResponse({
            revalidated: true,
            now: now()
        });
    } catch (error) {
        if (error instanceof RevalidationRequestError) {
            return createJsonResponse(
                { message: error.message },
                error.status,
                error.headers
            );
        }

        console.error("Error interno al revalidar una ruta.");

        return createJsonResponse(
            { message: "No se pudo completar la revalidación." },
            500
        );
    }
};

export const methodNotAllowedHandler = () =>
    createJsonResponse(
        { message: "Método no permitido." },
        405,
        { Allow: "POST" }
    );

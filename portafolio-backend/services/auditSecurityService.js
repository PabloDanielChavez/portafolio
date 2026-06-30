import { isIP } from 'node:net';

import { HttpError } from '../errors/HttpError.js';

const stripIpv6Brackets = (hostname) =>
    hostname.startsWith('[') && hostname.endsWith(']')
        ? hostname.slice(1, -1)
        : hostname;

const isNonPublicIpv4 = (hostname) => {
    const octets = hostname.split('.').map(Number);
    const [first, second] = octets;

    return (
        first === 0 ||
        first === 10 ||
        first === 127 ||
        (first === 100 && second >= 64 && second <= 127) ||
        (first === 169 && second === 254) ||
        (first === 172 && second >= 16 && second <= 31) ||
        (first === 192 && second === 0) ||
        (first === 192 && second === 168) ||
        (first === 198 && (second === 18 || second === 19)) ||
        first >= 224
    );
};

const isNonPublicIpv6 = (hostname) => {
    const normalized = hostname.toLowerCase();

    return (
        normalized === '::' ||
        normalized === '::1' ||
        normalized.startsWith('fc') ||
        normalized.startsWith('fd') ||
        /^fe[89ab]/.test(normalized) ||
        normalized.startsWith('ff') ||
        normalized.startsWith('2001:db8:') ||
        normalized.startsWith('::ffff:')
    );
};

const isForbiddenHostname = (hostname) => {
    const normalized = stripIpv6Brackets(hostname)
        .toLowerCase()
        .replace(/\.$/, '');
    const ipVersion = isIP(normalized);

    if (ipVersion === 4) return isNonPublicIpv4(normalized);
    if (ipVersion === 6) return isNonPublicIpv6(normalized);

    return (
        normalized === 'localhost' ||
        normalized.endsWith('.localhost') ||
        normalized.endsWith('.local') ||
        normalized.endsWith('.internal')
    );
};

const hasAllowedPort = (url) => {
    if (!url.port) return true;

    return (
        (url.protocol === 'http:' && url.port === '80') ||
        (url.protocol === 'https:' && url.port === '443')
    );
};

const normalizeComparableUrl = (value) => {
    const url = new URL(value);

    url.hash = '';

    if (
        (url.protocol === 'http:' && url.port === '80') ||
        (url.protocol === 'https:' && url.port === '443')
    ) {
        url.port = '';
    }

    if (url.pathname.length > 1) {
        url.pathname = url.pathname.replace(/\/+$/, '');
    }

    return url.toString();
};

const getProjectValue = (project, field) => {
    if (typeof project?.get === 'function') {
        return project.get(field);
    }

    return project?.[field];
};

const getRegisteredProjectUrls = (project) =>
    ['enlace_trabajo', 'enlace_trabajoResumido']
        .map((field) => getProjectValue(project, field))
        .filter((value) => typeof value === 'string' && value.trim())
        .flatMap((value) => {
            try {
                return [normalizeComparableUrl(value.trim())];
            } catch {
                return [];
            }
        });

export const validateProjectAuditUrl = ({
    requestedUrl,
    project,
    allowedHosts,
    isProduction
}) => {
    let parsedUrl;

    try {
        parsedUrl = new URL(requestedUrl);
    } catch {
        throw new HttpError(400, 'La URL de auditoría no es válida.');
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new HttpError(400, 'El protocolo de auditoría no está permitido.');
    }

    if (parsedUrl.username || parsedUrl.password) {
        throw new HttpError(
            400,
            'La URL de auditoría no puede contener credenciales.'
        );
    }

    if (!hasAllowedPort(parsedUrl)) {
        throw new HttpError(400, 'El puerto de auditoría no está permitido.');
    }

    if (isProduction && parsedUrl.protocol !== 'https:') {
        throw new HttpError(403, 'La auditoría requiere HTTPS en producción.');
    }

    const hostname = stripIpv6Brackets(parsedUrl.hostname)
        .toLowerCase()
        .replace(/\.$/, '');

    if (isForbiddenHostname(hostname)) {
        throw new HttpError(403, 'El hostname de auditoría no está permitido.');
    }

    if (!allowedHosts.includes(hostname)) {
        throw new HttpError(403, 'La URL no pertenece a un host autorizado.');
    }

    const requestedComparableUrl = normalizeComparableUrl(parsedUrl.toString());
    const registeredUrls = getRegisteredProjectUrls(project);

    if (!registeredUrls.includes(requestedComparableUrl)) {
        throw new HttpError(
            403,
            'La URL no coincide con la registrada para el proyecto.'
        );
    }

    return requestedUrl;
};

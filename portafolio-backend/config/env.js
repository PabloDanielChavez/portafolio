import dotenv from 'dotenv';
import { z } from 'zod';

const requestedNodeEnvironment =
    process.env.NODE_ENV?.trim().toLowerCase() || 'development';
const requestedEnvironment =
    requestedNodeEnvironment === 'local'
        ? 'development'
        : requestedNodeEnvironment;

dotenv.config({
    path: `.env.${requestedEnvironment}`,
    quiet: true
});
dotenv.config({
    path: '.env',
    quiet: true
});

const booleanFromString = (defaultValue = false) =>
    z.preprocess((value) => {
        if (value === undefined || value === '') return defaultValue;
        if (typeof value === 'boolean') return value;

        const normalizedValue = String(value).trim().toLowerCase();

        if (['true', '1', 'yes'].includes(normalizedValue)) return true;
        if (['false', '0', 'no'].includes(normalizedValue)) return false;

        return value;
    }, z.boolean());

const rawEnvironment = {
    ...process.env,
    NODE_ENV:
        process.env.NODE_ENV?.trim().toLowerCase() === 'local'
            ? 'development'
            : process.env.NODE_ENV,
    DB_HOST: process.env.DB_HOST ?? process.env.BD_HOST,
    DB_NAME: process.env.DB_NAME ?? process.env.BD_NAME,
    DB_USER: process.env.DB_USER ?? process.env.BD_USER,
    DB_PASSWORD: process.env.DB_PASSWORD ?? process.env.BD_PASS,
    DB_PORT: process.env.DB_PORT ?? process.env.BD_PORT
};

const environmentSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(4000),
    DB_HOST: z.string().trim().min(1),
    DB_NAME: z.string().trim().min(1),
    DB_USER: z.string().trim().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_PORT: z.coerce.number().int().min(1).max(65535).default(3306),
    DB_SSL: booleanFromString(false),
    DB_SSL_REJECT_UNAUTHORIZED: booleanFromString(true),
    DB_LOGGING: booleanFromString(false),
    CORS_ORIGINS: z.string().optional(),
    CORS_ORIGIN: z.string().optional(),
    FRONTEND_URL: z.string().optional(),
    TRUST_PROXY: z.string().trim().optional(),
    API_RATE_LIMIT_MAX: z.coerce.number().int().min(10).default(200),
    CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().min(1).default(5),
    CONTACT_RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().int().min(1).default(15),
    AUDIT_RATE_LIMIT_MAX: z.coerce.number().int().min(1).default(2),
    AUDIT_API_TOKEN: z.string().min(32).max(512).optional(),
    AUDIT_ALLOWED_HOSTS: z.string().optional(),
    PAGESPEED_API_KEY: z.string().trim().optional()
});

const parsedEnvironment = environmentSchema.safeParse(rawEnvironment);

if (!parsedEnvironment.success) {
    const invalidKeys = [
        ...new Set(parsedEnvironment.error.issues.map((issue) => issue.path.join('.')))
    ].join(', ');

    throw new Error(
        `Configuración de entorno inválida. Revisá estas variables: ${invalidKeys}`
    );
}

const values = parsedEnvironment.data;
const auditAllowedHosts = (values.AUDIT_ALLOWED_HOSTS ?? '')
    .split(',')
    .map((hostname) => hostname.trim().toLowerCase().replace(/\.$/, ''))
    .filter(Boolean);

for (const hostname of auditAllowedHosts) {
    let parsedHostname;

    try {
        parsedHostname = new URL(`https://${hostname}`);
    } catch {
        throw new Error(
            `AUDIT_ALLOWED_HOSTS contiene un hostname inválido: ${hostname}`
        );
    }

    if (
        parsedHostname.hostname !== hostname ||
        parsedHostname.pathname !== '/' ||
        parsedHostname.search ||
        parsedHostname.hash ||
        parsedHostname.port
    ) {
        throw new Error(
            `AUDIT_ALLOWED_HOSTS debe contener hostnames exactos: ${hostname}`
        );
    }
}

if (
    values.NODE_ENV === 'production' &&
    (!values.AUDIT_API_TOKEN || auditAllowedHosts.length === 0)
) {
    throw new Error(
        'Configuración de entorno inválida. Definí AUDIT_API_TOKEN y AUDIT_ALLOWED_HOSTS en producción.'
    );
}

const rawCorsOrigins =
    values.CORS_ORIGINS ?? values.CORS_ORIGIN ?? values.FRONTEND_URL ?? '';
const corsOrigins = rawCorsOrigins
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

if (values.NODE_ENV !== 'production' && corsOrigins.length === 0) {
    corsOrigins.push('http://localhost:3000');
}

if (values.NODE_ENV === 'production' && corsOrigins.length === 0) {
    throw new Error(
        'Configuración de entorno inválida. Definí CORS_ORIGINS en producción.'
    );
}

for (const origin of corsOrigins) {
    if (origin === '*') {
        throw new Error('CORS_ORIGINS no permite el comodín "*".');
    }

    let parsedOrigin;

    try {
        parsedOrigin = new URL(origin);
    } catch {
        throw new Error(`CORS_ORIGINS contiene un origen inválido: ${origin}`);
    }

    if (
        !['http:', 'https:'].includes(parsedOrigin.protocol) ||
        parsedOrigin.origin !== origin
    ) {
        throw new Error(`CORS_ORIGINS debe contener orígenes HTTP(S): ${origin}`);
    }
}

const parseTrustProxy = (value) => {
    if (!value || ['false', '0', 'no'].includes(value.toLowerCase())) {
        return false;
    }

    const proxyHops = Number(value);

    if (Number.isInteger(proxyHops) && proxyHops > 0) {
        return proxyHops;
    }

    if (['loopback', 'linklocal', 'uniquelocal'].includes(value.toLowerCase())) {
        return value.toLowerCase();
    }

    throw new Error(
        'TRUST_PROXY debe ser false, una cantidad de proxies o una subred predefinida.'
    );
};

export const env = Object.freeze({
    nodeEnv: values.NODE_ENV,
    isProduction: values.NODE_ENV === 'production',
    port: values.PORT,
    db: Object.freeze({
        host: values.DB_HOST,
        name: values.DB_NAME,
        user: values.DB_USER,
        password: values.DB_PASSWORD,
        port: values.DB_PORT,
        ssl: values.DB_SSL,
        sslRejectUnauthorized: values.DB_SSL_REJECT_UNAUTHORIZED,
        logging: values.DB_LOGGING
    }),
    corsOrigins: Object.freeze(corsOrigins),
    trustProxy: parseTrustProxy(values.TRUST_PROXY),
    apiRateLimitMax: values.API_RATE_LIMIT_MAX,
    contactRateLimitMax: values.CONTACT_RATE_LIMIT_MAX,
    contactRateLimitWindowMinutes: values.CONTACT_RATE_LIMIT_WINDOW_MINUTES,
    auditRateLimitMax: values.AUDIT_RATE_LIMIT_MAX,
    auditApiToken: values.AUDIT_API_TOKEN,
    auditAllowedHosts: Object.freeze([...new Set(auditAllowedHosts)]),
    pageSpeedApiKey: values.PAGESPEED_API_KEY
});

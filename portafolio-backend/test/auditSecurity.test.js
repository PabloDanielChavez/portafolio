import assert from 'node:assert/strict';
import test from 'node:test';

import { createActualizarAuditoriaPageSpeed } from '../controllers/apiController.js';
import { createRequireAuditToken } from '../middleware/security.js';
import { validateProjectAuditUrl } from '../services/auditSecurityService.js';

const TEST_TOKEN = 'audit-test-token-with-at-least-32-characters';
const PROJECT_URL = 'https://portfolio.example.com/project';

const runAuditAuth = (authorization) => {
    const responseHeaders = new Map();
    const req = {
        get: (name) =>
            name.toLowerCase() === 'authorization' ? authorization : undefined
    };
    const res = {
        set: (name, value) => {
            responseHeaders.set(name, value);
            return res;
        }
    };
    let nextError;
    let nextCalls = 0;

    createRequireAuditToken(TEST_TOKEN)(req, res, (error) => {
        nextCalls += 1;
        nextError = error;
    });

    return { nextCalls, nextError, responseHeaders };
};

const createAuditData = (id) => ({
    lighthouseResult: {
        id,
        categories: {
            performance: { score: 0.91 },
            accessibility: { score: 0.92 },
            'best-practices': { score: 0.93 },
            seo: { score: 0.94 }
        }
    }
});

const createResponse = () => {
    const res = {
        body: undefined,
        json: (body) => {
            res.body = body;
            return res;
        }
    };

    return res;
};

const createProjectModel = ({
    project = {
        id: 7,
        enlace_trabajo: PROJECT_URL,
        enlace_trabajoResumido: PROJECT_URL
    },
    affectedRows = 1
} = {}) => ({
    findByPk: async () => project,
    update: async () => [affectedRows]
});

test('auditoría rechaza solicitudes sin token con 401', () => {
    const result = runAuditAuth(undefined);

    assert.equal(result.nextCalls, 1);
    assert.equal(result.nextError.statusCode, 401);
    assert.equal(result.responseHeaders.get('WWW-Authenticate'), 'Bearer');
});

test('auditoría rechaza token inválido con 403', () => {
    const result = runAuditAuth('Bearer token-incorrecto');

    assert.equal(result.nextCalls, 1);
    assert.equal(result.nextError.statusCode, 403);
});

test('auditoría acepta un Bearer token válido', () => {
    const result = runAuditAuth(`Bearer ${TEST_TOKEN}`);

    assert.equal(result.nextCalls, 1);
    assert.equal(result.nextError, undefined);
});

test('auditoría rechaza una URL cuyo hostname no está permitido', () => {
    assert.throws(
        () =>
            validateProjectAuditUrl({
                requestedUrl: PROJECT_URL,
                project: {
                    enlace_trabajo: PROJECT_URL
                },
                allowedHosts: ['otro.example.com'],
                isProduction: true
            }),
        (error) =>
            error.statusCode === 403 &&
            error.message === 'La URL no pertenece a un host autorizado.'
    );
});

test('auditoría rechaza URLs locales, privadas, con credenciales o HTTP en producción', () => {
    const cases = [
        'https://localhost/project',
        'https://127.0.0.1/project',
        'https://10.0.0.8/project',
        'https://usuario:clave@portfolio.example.com/project',
        'http://portfolio.example.com/project',
        'https://portfolio.example.com:8443/project'
    ];

    for (const requestedUrl of cases) {
        assert.throws(
            () =>
                validateProjectAuditUrl({
                    requestedUrl,
                    project: {
                        enlace_trabajo: requestedUrl
                    },
                    allowedHosts: [
                        'localhost',
                        '127.0.0.1',
                        '10.0.0.8',
                        'portfolio.example.com'
                    ],
                    isProduction: true
                }),
            (error) => [400, 403].includes(error.statusCode),
            requestedUrl
        );
    }
});

test('auditoría rechaza una URL que no coincide con el proyecto', () => {
    assert.throws(
        () =>
            validateProjectAuditUrl({
                requestedUrl: 'https://portfolio.example.com/otro-proyecto',
                project: {
                    enlace_trabajo: PROJECT_URL
                },
                allowedHosts: ['portfolio.example.com'],
                isProduction: true
            }),
        (error) =>
            error.statusCode === 403 &&
            error.message ===
                'La URL no coincide con la registrada para el proyecto.'
    );
});

test('auditoría rechaza un proyecto inexistente antes de llamar a PageSpeed', async () => {
    let pageSpeedCalls = 0;
    const controller = createActualizarAuditoriaPageSpeed({
        projectModel: createProjectModel({ project: null }),
        pageSpeedFetcher: async () => {
            pageSpeedCalls += 1;
            return createAuditData('unused');
        },
        pageSpeedApiKey: 'test-key',
        allowedHosts: ['portfolio.example.com'],
        isProduction: true
    });

    await assert.rejects(
        () =>
            controller(
                {
                    validated: {
                        body: { id: 999, url: PROJECT_URL }
                    }
                },
                createResponse()
            ),
        (error) =>
            error.statusCode === 404 &&
            error.message === 'El proyecto solicitado no existe.'
    );
    assert.equal(pageSpeedCalls, 0);
});

test('auditoría devuelve un error controlado si Sequelize no actualiza filas', async () => {
    const controller = createActualizarAuditoriaPageSpeed({
        projectModel: createProjectModel({ affectedRows: 0 }),
        pageSpeedFetcher: async (url, strategy) =>
            createAuditData(`${strategy}-audit`),
        pageSpeedApiKey: 'test-key',
        allowedHosts: ['portfolio.example.com'],
        isProduction: true
    });

    await assert.rejects(
        () =>
            controller(
                {
                    validated: {
                        body: { id: 7, url: PROJECT_URL }
                    }
                },
                createResponse()
            ),
        (error) =>
            error.statusCode === 409 &&
            error.message ===
                'No se pudo actualizar la auditoría del proyecto.'
    );
});

test('auditoría conserva la respuesta exitosa actual', async () => {
    const strategies = [];
    const controller = createActualizarAuditoriaPageSpeed({
        projectModel: createProjectModel(),
        pageSpeedFetcher: async (url, strategy) => {
            strategies.push(strategy);
            return createAuditData(`${strategy}-audit`);
        },
        pageSpeedApiKey: 'test-key',
        allowedHosts: ['portfolio.example.com'],
        isProduction: true
    });
    const res = createResponse();

    await controller(
        {
            validated: {
                body: { id: 7, url: PROJECT_URL }
            }
        },
        res
    );

    assert.deepEqual(strategies.sort(), ['desktop', 'mobile']);
    assert.deepEqual(res.body, {
        success: true,
        mensaje:
            '¡Auditorías Mobile y Desktop sincronizadas en MySQL con éxito!',
        datosActualizados: {
            mobile: {
                perfMobile: 91,
                accessMobile: 92,
                practicesMobile: 93,
                seoMobile: 94,
                linkMobile:
                    'https://pagespeed.web.dev/analysis/https%3A%2F%2Fportfolio.example.com%2Fproject/mobile-audit?form_factor=mobile'
            },
            desktop: {
                perfDesktop: 91,
                accessDesktop: 92,
                practicesDesktop: 93,
                seoDesktop: 94,
                linkDesktop:
                    'https://pagespeed.web.dev/analysis/https%3A%2F%2Fportfolio.example.com%2Fproject/desktop-audit?form_factor=desktop'
            }
        }
    });
});

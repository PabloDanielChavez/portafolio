import assert from "node:assert/strict";
import test from "node:test";

import {
    createRevalidationPostHandler,
    methodNotAllowedHandler,
    validateRevalidationPath
} from "../src/lib/server/revalidationSecurity.mjs";

const TEST_TOKEN = "revalidation-test-token-with-32-characters";
const FIXED_NOW = 1_782_777_600_000;

const createRequest = ({
    authorization,
    body = { path: "/" },
    rawBody
} = {}) => {
    const headers = new Headers({
        "Content-Type": "application/json"
    });

    if (authorization) {
        headers.set("Authorization", authorization);
    }

    return new Request("http://localhost/api/revalidate", {
        method: "POST",
        headers,
        body: rawBody ?? JSON.stringify(body)
    });
};

const createHandler = ({
    expectedToken = TEST_TOKEN,
    revalidate = async () => {}
} = {}) =>
    createRevalidationPostHandler({
        getExpectedToken: () => expectedToken,
        revalidate,
        now: () => FIXED_NOW
    });

test("POST rechaza solicitudes sin token", async () => {
    const response = await createHandler()(createRequest());

    assert.equal(response.status, 401);
    assert.equal(response.headers.get("www-authenticate"), "Bearer");
    assert.equal(response.headers.get("cache-control"), "no-store");
});

test("POST rechaza un header Authorization malformado", async () => {
    for (const authorization of [
        "Basic credentials",
        "Bearer",
        "Bearer token adicional"
    ]) {
        const response = await createHandler()(
            createRequest({ authorization })
        );

        assert.equal(response.status, 401, authorization);
    }
});

test("POST rechaza un token inválido", async () => {
    const response = await createHandler()(
        createRequest({ authorization: "Bearer token-incorrecto" })
    );

    assert.equal(response.status, 403);
});

test("POST falla de forma cerrada si el token server-only no está configurado", async () => {
    const response = await createHandler({ expectedToken: null })(
        createRequest({ authorization: `Bearer ${TEST_TOKEN}` })
    );

    assert.equal(response.status, 503);
});

test("POST rechaza JSON inválido", async () => {
    const response = await createHandler()(
        createRequest({
            authorization: `Bearer ${TEST_TOKEN}`,
            rawBody: '{"path":'
        })
    );

    assert.equal(response.status, 400);
});

test("POST rechaza campos adicionales", async () => {
    const response = await createHandler()(
        createRequest({
            authorization: `Bearer ${TEST_TOKEN}`,
            body: { path: "/", extra: true }
        })
    );

    assert.equal(response.status, 400);
});

test("la allowlist acepta solo las rutas públicas previstas", () => {
    const allowedPaths = [
        "/",
        "/contacto",
        "/servicios",
        "/trabajos",
        "/trabajos/paginas-web-chavez",
        "/trabajos/plomada",
        "/trabajos/abc"
    ];

    for (const path of allowedPaths) {
        assert.equal(validateRevalidationPath(path), path);
    }
});

test("la allowlist rechaza URLs, query, fragmentos, traversal y dobles barras", () => {
    const rejectedPaths = [
        "https://example.com/trabajos",
        "/trabajos?preview=true",
        "/trabajos#proyectos",
        "/trabajos/../contacto",
        "//trabajos",
        "/trabajos//1",
        "/trabajos/%2e%2e/contacto",
        "/trabajos\\1"
    ];

    for (const path of rejectedPaths) {
        assert.throws(
            () => validateRevalidationPath(path),
            (error) => error.status === 400,
            path
        );
    }
});

test("la allowlist rechaza IDs y slugs inválidos", () => {
    const rejectedPaths = [
        "/trabajos/1",
        "/trabajos/987",
        "/trabajos/0",
        "/trabajos/-1",
        "/trabajos/01",
        "/trabajos/1.5",
        "/trabajos/Slug-Invalido",
        "/trabajos/slug_invalido",
        "/trabajos/paginas--web",
        "/trabajos/plomada-",
        "/trabajos/-plomada",
        `/trabajos/${"a".repeat(161)}`
    ];

    for (const path of rejectedPaths) {
        assert.throws(
            () => validateRevalidationPath(path),
            (error) => error.status === 400,
            path
        );
    }
});

test("POST revalida una sola vez y conserva la respuesta exitosa", async () => {
    const revalidatedPaths = [];
    const handler = createHandler({
        revalidate: async (path) => {
            revalidatedPaths.push(path);
        }
    });
    const response = await handler(
        createRequest({
            authorization: `Bearer ${TEST_TOKEN}`,
            body: { path: "/trabajos/plomada" }
        })
    );

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(revalidatedPaths, ["/trabajos/plomada"]);
    assert.deepEqual(await response.json(), {
        revalidated: true,
        now: FIXED_NOW
    });
});

test("POST no revalida cuando el token o el path son inválidos", async () => {
    let revalidationCalls = 0;
    const handler = createHandler({
        revalidate: async () => {
            revalidationCalls += 1;
        }
    });

    await handler(
        createRequest({
            authorization: "Bearer incorrecto",
            body: { path: "/" }
        })
    );
    await handler(
        createRequest({
            authorization: `Bearer ${TEST_TOKEN}`,
            body: { path: "/api/revalidate" }
        })
    );

    assert.equal(revalidationCalls, 0);
});

test("GET responde 405 y no permite mutaciones", async () => {
    const response = methodNotAllowedHandler();

    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "POST");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), {
        message: "Método no permitido."
    });
});

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const compileCommonJs = (source, fileName) =>
    ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2022
        },
        fileName
    }).outputText;

const evaluateCommonJs = (source, dependencies = {}) => {
    const module = { exports: {} };
    const requireDependency = (specifier) => {
        if (specifier in dependencies) return dependencies[specifier];

        throw new Error(`Dependencia de prueba no resuelta: ${specifier}`);
    };
    const executeModule = new Function(
        "require",
        "module",
        "exports",
        source
    );

    executeModule(requireDependency, module, module.exports);

    return module.exports;
};

const testDirectory = dirname(fileURLToPath(import.meta.url));
const frontendDirectory = join(testDirectory, "..");
const helpersSource = await readFile(
    join(
        frontendDirectory,
        "src",
        "components",
        "utils",
        "trabajos.helpers.ts"
    ),
    "utf8"
);
const fetchDataSource = await readFile(
    join(frontendDirectory, "src", "services", "fetchData.ts"),
    "utf8"
);
const workTypesSource = await readFile(
    join(frontendDirectory, "src", "types", "trabajos.ts"),
    "utf8"
);
const workCardSource = await readFile(
    join(
        frontendDirectory,
        "src",
        "components",
        "sub_components",
        "TrabajoCard.tsx"
    ),
    "utf8"
);
const slugPagePath = join(
    frontendDirectory,
    "src",
    "app",
    "trabajos",
    "[slug]",
    "page.tsx"
);
const idPagePath = join(
    frontendDirectory,
    "src",
    "app",
    "trabajos",
    "[id]",
    "page.tsx"
);
const slugPageSource = await readFile(slugPagePath, "utf8");

const helpers = evaluateCommonJs(
    compileCommonJs(helpersSource, "trabajos.helpers.ts")
);
const previousApiUrl = process.env.NEXT_PUBLIC_API_URL;
const previousFetch = globalThis.fetch;

process.env.NEXT_PUBLIC_API_URL = "http://api.example.test/api/";

const fetchData = evaluateCommonJs(
    compileCommonJs(fetchDataSource, "fetchData.ts"),
    {
        "@/components/utils/trabajos.helpers": helpers
    }
);

after(() => {
    globalThis.fetch = previousFetch;

    if (previousApiUrl === undefined) {
        delete process.env.NEXT_PUBLIC_API_URL;
    } else {
        process.env.NEXT_PUBLIC_API_URL = previousApiUrl;
    }
});

test("el contrato y el helper frontend validan slugs públicos", () => {
    assert.equal(workTypesSource.includes("slug: string;"), true);
    assert.equal(helpers.esSlugTrabajoValido("paginas-web-chavez"), true);
    assert.equal(helpers.esSlugTrabajoValido("elu"), true);
    assert.equal(helpers.esSlugTrabajoValido("1"), false);
    assert.equal(helpers.esSlugTrabajoValido("01"), false);
    assert.equal(helpers.esSlugTrabajoValido("Slug-Invalido"), false);
    assert.equal(helpers.esSlugTrabajoValido("paginas--web"), false);
    assert.equal(helpers.esSlugTrabajoValido("a".repeat(161)), false);
});

test("getTrabajoBySlug consulta el endpoint canónico", async () => {
    const expectedWork = {
        id: 2,
        slug: "plomada",
        nombre_trabajo: "Plomada"
    };

    globalThis.fetch = async (url, options) => {
        assert.equal(
            url,
            "http://api.example.test/api/trabajos/plomada"
        );
        assert.deepEqual(options, {
            next: { revalidate: 3600 }
        });

        return Response.json(expectedWork);
    };

    const result = await fetchData.getTrabajoBySlug("plomada");

    assert.deepEqual(result, expectedWork);
});

test("getTrabajoBySlug controla inválidos, 400 y 404", async () => {
    let fetchCalls = 0;
    globalThis.fetch = async () => {
        fetchCalls += 1;
        return new Response(null, { status: 404 });
    };

    assert.equal(await fetchData.getTrabajoBySlug("1"), null);
    assert.equal(fetchCalls, 0);
    assert.equal(
        await fetchData.getTrabajoBySlug("slug-inexistente"),
        null
    );
    assert.equal(fetchCalls, 1);

    globalThis.fetch = async () =>
        new Response(null, { status: 400 });

    assert.equal(
        await fetchData.getTrabajoBySlug("otro-inexistente"),
        null
    );
});

test("la ruta, tarjetas y metadata usan slug", async () => {
    assert.equal(
        workCardSource.includes("href={`/trabajos/${trabajo.slug}`}"),
        true
    );
    assert.equal(
        workCardSource.includes("href={`/trabajos/${trabajo.id}`}"),
        false
    );
    assert.equal(fetchDataSource.includes("getTrabajoById"), false);
    assert.equal(
        fetchDataSource.includes(
            "`${urlBase}trabajos/${encodeURIComponent(slug)}`"
        ),
        true
    );
    assert.equal(slugPageSource.includes("params: Promise<{"), true);
    assert.equal(slugPageSource.includes("slug: string;"), true);
    assert.equal(slugPageSource.includes("getTrabajoBySlug(slug)"), true);
    assert.equal(slugPageSource.includes("esSlugTrabajoValido(slug)"), true);
    assert.equal(slugPageSource.includes("notFound()"), true);
    assert.equal(
        slugPageSource.includes(
            "path: `${siteConfig.routes.projects}/${trabajo.slug}`"
        ),
        true
    );

    await access(slugPagePath);
    await assert.rejects(() => access(idPagePath));
});

test("next.config define los cinco redirects legacy con 301 exacto", async () => {
    const require = createRequire(import.meta.url);
    const nextConfig = require("../next.config.js");
    const redirects = await nextConfig.redirects();

    assert.deepEqual(redirects, [
        {
            source: "/trabajos/1",
            destination: "/trabajos/paginas-web-chavez",
            statusCode: 301
        },
        {
            source: "/trabajos/2",
            destination: "/trabajos/plomada",
            statusCode: 301
        },
        {
            source: "/trabajos/3",
            destination: "/trabajos/jardineria-montanez",
            statusCode: 301
        },
        {
            source: "/trabajos/4",
            destination: "/trabajos/elu",
            statusCode: 301
        },
        {
            source: "/trabajos/5",
            destination: "/trabajos/esperanza-de-vida",
            statusCode: 301
        }
    ]);
    assert.equal(
        redirects.some((redirect) => "permanent" in redirect),
        false
    );
});

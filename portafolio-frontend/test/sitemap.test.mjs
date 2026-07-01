import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
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

const sitemapSource = await readFile(
    new URL("../src/app/sitemap.ts", import.meta.url),
    "utf8"
);
const helpersSource = await readFile(
    new URL(
        "../src/components/utils/trabajos.helpers.ts",
        import.meta.url
    ),
    "utf8"
);
const siteConfigSource = await readFile(
    new URL("../src/config/site.ts", import.meta.url),
    "utf8"
);
const fetchDataSource = await readFile(
    new URL("../src/services/fetchData.ts", import.meta.url),
    "utf8"
);

const helpers = evaluateCommonJs(
    compileCommonJs(helpersSource, "trabajos.helpers.ts")
);
const config = evaluateCommonJs(
    compileCommonJs(siteConfigSource, "site.ts")
);
const sitemapModule = evaluateCommonJs(
    compileCommonJs(sitemapSource, "sitemap.ts"),
    {
        "@/components/utils/trabajos.helpers": helpers,
        "@/config/site": config,
        "@/services/fetchData": {
            getTrabajos: async () => []
        }
    }
);

const canonicalWorks = [
    { slug: "paginas-web-chavez" },
    { slug: "plomada" },
    { slug: "jardineria-montanez" },
    { slug: "elu" },
    { slug: "esperanza-de-vida" }
];
const staticPaths = [
    config.siteConfig.routes.home,
    config.siteConfig.routes.profile,
    config.siteConfig.routes.contact,
    config.siteConfig.routes.services,
    config.siteConfig.routes.projects,
    ...config.siteConfig.planRoutes
];

test("el sitemap conserva rutas estáticas y agrega trabajos por slug", () => {
    const entries = sitemapModule.buildSitemap(canonicalWorks);
    const urls = entries.map((entry) => entry.url);

    for (const path of staticPaths) {
        assert.equal(
            urls.includes(
                new URL(path, `${config.siteConfig.siteUrl}/`).toString()
            ),
            true,
            path
        );
    }

    for (const { slug } of canonicalWorks) {
        assert.equal(
            urls.includes(
                `${config.siteConfig.siteUrl}/trabajos/${slug}`
            ),
            true,
            slug
        );
    }
});

test("el sitemap excluye IDs, slugs inválidos, vacíos y duplicados", () => {
    const entries = sitemapModule.buildSitemap([
        ...canonicalWorks,
        { slug: "plomada" },
        { slug: "" },
        { slug: "1" },
        { slug: "Slug-Invalido" },
        { slug: "slug_invalido" },
        { slug: "paginas--web" }
    ]);
    const workUrls = entries
        .map((entry) => entry.url)
        .filter((url) => url.includes("/trabajos/"));

    assert.equal(workUrls.length, canonicalWorks.length);
    assert.equal(new Set(workUrls).size, workUrls.length);
    assert.equal(
        workUrls.some((url) => /\/trabajos\/\d+$/.test(url)),
        false
    );
});

test("todas las URLs usan el dominio canónico configurado", () => {
    const entries = sitemapModule.buildSitemap(canonicalWorks);

    for (const entry of entries) {
        assert.equal(
            entry.url.startsWith(`${config.siteConfig.siteUrl}/`),
            true,
            entry.url
        );
    }
});

test("un fallo de API conserva el sitemap estático", async () => {
    const originalConsoleError = console.error;
    const errors = [];
    console.error = (message) => errors.push(message);

    try {
        const entries = await sitemapModule.createSitemap(async () => {
            throw new Error("API no disponible");
        });
        const urls = entries.map((entry) => entry.url);

        assert.equal(entries.length, staticPaths.length);
        assert.equal(
            urls.includes(
                `${config.siteConfig.siteUrl}/trabajos`
            ),
            true
        );
        assert.equal(
            urls.some((url) => /\/trabajos\/[^/]+$/.test(url)),
            false
        );
        assert.deepEqual(errors, [
            "No se pudieron incluir los proyectos dinámicos en el sitemap."
        ]);
    } finally {
        console.error = originalConsoleError;
    }
});

test("el servicio obtiene el listado sin construir URLs desde IDs", () => {
    assert.equal(fetchDataSource.includes("export async function getTrabajos"), true);
    assert.equal(fetchDataSource.includes("fetch(`${urlBase}trabajos`"), true);
    assert.equal(sitemapSource.includes("trabajo.slug"), true);
    assert.equal(sitemapSource.includes("trabajo.id"), false);
});

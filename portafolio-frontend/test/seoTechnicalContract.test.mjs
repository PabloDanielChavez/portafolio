import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const frontendDirectory = new URL("../", import.meta.url);
const frontendPath = fileURLToPath(frontendDirectory);

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

const readFrontendFile = (relativePath) =>
    readFile(new URL(relativePath, frontendDirectory), "utf8");

const siteConfigSource = await readFrontendFile("src/config/site.ts");
const layoutSource = await readFrontendFile("src/app/layout.tsx");
const robotsSource = await readFrontendFile("src/app/robots.ts");
const slugPageSource = await readFrontendFile(
    "src/app/trabajos/[slug]/page.tsx"
);

const siteConfigModule = evaluateCommonJs(
    compileCommonJs(siteConfigSource, "site.ts")
);
const robotsModule = evaluateCommonJs(
    compileCommonJs(robotsSource, "robots.ts"),
    {
        "@/config/site": siteConfigModule
    }
);

const canonicalOrigin = "https://paginaswebchavez.netlify.app";

const routeMetadataContracts = [
    ["src/app/page.tsx", "path: siteConfig.routes.home"],
    ["src/app/perfil/page.tsx", "path: siteConfig.routes.profile"],
    ["src/app/contacto/page.tsx", "path: siteConfig.routes.contact"],
    ["src/app/servicios/page.tsx", "path: siteConfig.routes.services"],
    ["src/app/trabajos/page.tsx", "path: siteConfig.routes.projects"],
    [
        "src/app/servicios/planes/landing_page/page.tsx",
        "path: siteConfig.planRoutes[0]"
    ],
    [
        "src/app/servicios/planes/sitio_web/page.tsx",
        "path: siteConfig.planRoutes[1]"
    ],
    [
        "src/app/servicios/planes/desarrollo_web/page.tsx",
        "path: siteConfig.planRoutes[2]"
    ]
];

const productionCodeExtensions = new Set([
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".ts",
    ".tsx"
]);

const collectProductionCodeFiles = async (directory) => {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...await collectProductionCodeFiles(path));
            continue;
        }

        if (productionCodeExtensions.has(extname(entry.name))) {
            files.push(path);
        }
    }

    return files;
};

test("la configuración conserva el dominio canónico y metadataBase", () => {
    assert.equal(siteConfigModule.siteConfig.siteUrl, canonicalOrigin);
    assert.equal(
        layoutSource.includes(
            "metadataBase: new URL(siteConfig.siteUrl)"
        ),
        true
    );
});

test("el helper de metadata mantiene canonical, OpenGraph y Twitter", () => {
    const metadata = siteConfigModule.createPageMetadata({
        title: "Página de prueba",
        description: "Descripción de prueba",
        path: "/ruta-de-prueba",
        type: "article",
        image: "/img/prueba.png"
    });
    const expectedUrl = `${canonicalOrigin}/ruta-de-prueba`;
    const expectedImage = `${canonicalOrigin}/img/prueba.png`;

    assert.equal(metadata.alternates.canonical, expectedUrl);
    assert.equal(metadata.openGraph.url, expectedUrl);
    assert.equal(metadata.openGraph.siteName, siteConfigModule.siteConfig.siteName);
    assert.equal(metadata.openGraph.type, "article");
    assert.equal(metadata.openGraph.images[0].url, expectedImage);
    assert.equal(metadata.twitter.card, "summary_large_image");
    assert.deepEqual(metadata.twitter.images, [expectedImage]);
});

test("las rutas indexables usan el helper con su path canónico", async () => {
    for (const [relativePath, expectedPathSource] of routeMetadataContracts) {
        const source = await readFrontendFile(relativePath);

        assert.equal(
            source.includes("createPageMetadata({"),
            true,
            relativePath
        );
        assert.equal(
            source.includes(expectedPathSource),
            true,
            relativePath
        );
    }

    assert.equal(slugPageSource.includes("generateMetadata"), true);
    assert.equal(
        slugPageSource.includes(
            "path: `${siteConfig.routes.projects}/${trabajo.slug}`"
        ),
        true
    );
    assert.equal(
        slugPageSource.includes(
            "path: `${siteConfig.routes.projects}/${trabajo.id}`"
        ),
        false
    );
});

test("robots permite rastreo y referencia el sitemap canónico", () => {
    const robots = robotsModule.default();

    assert.deepEqual(robots.rules, {
        userAgent: "*",
        allow: "/"
    });
    assert.equal(robots.sitemap, `${canonicalOrigin}/sitemap.xml`);
    assert.equal(JSON.stringify(robots).includes("disallow"), false);
});

test("el código de producción no referencia el dominio anterior", async () => {
    const sourceDirectory = join(frontendPath, "src");
    const productionFiles = await collectProductionCodeFiles(sourceDirectory);
    productionFiles.push(join(frontendPath, "next.config.js"));

    for (const file of productionFiles) {
        const source = await readFile(file, "utf8");

        assert.equal(
            source.includes("portafolio-pc.netlify.app"),
            false,
            file.toString()
        );
    }
});

test("el JSON-LD global conserva un baseline canónico y serializable", () => {
    const jsonLdScripts =
        layoutSource.match(/type="application\/ld\+json"/g) ?? [];

    assert.equal(jsonLdScripts.length, 1);
    assert.equal(
        layoutSource.includes('"@context": "https://schema.org"'),
        true
    );
    assert.equal(layoutSource.includes("siteConfig.siteUrl"), true);
    assert.equal(layoutSource.includes("JSON.stringify(jsonLd)"), true);
});

test("la ruta de error y el manejo de slugs inválidos siguen activos", async () => {
    await access(new URL("src/app/not-found.tsx", frontendDirectory));
    assert.equal(slugPageSource.includes("esSlugTrabajoValido(slug)"), true);
    assert.equal(slugPageSource.includes("notFound()"), true);
    assert.equal(
        slugPageSource.includes(
            "const trabajo = await resolveTrabajo(slug)"
        ),
        true
    );
});

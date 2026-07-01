import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const frontendDirectory = new URL("../", import.meta.url);
const readFrontendFile = (relativePath) =>
    readFile(new URL(relativePath, frontendDirectory), "utf8");

const compileCommonJs = (source, fileName) =>
    ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2022
        },
        fileName
    }).outputText;

const evaluateCommonJs = (source) => {
    const module = { exports: {} };
    const executeModule = new Function(
        "require",
        "module",
        "exports",
        source
    );

    executeModule(() => {
        throw new Error("El contenido comercial no debe cargar dependencias.");
    }, module, module.exports);

    return module.exports;
};

const heroSource = await readFrontendFile("src/content/hero.content.ts");
const homeContentSource = await readFrontendFile(
    "src/content/home.content.ts"
);
const servicesContentSource = await readFrontendFile(
    "src/content/servicios-commercial.content.ts"
);
const homePageSource = await readFrontendFile("src/app/page.tsx");
const servicesPageSource = await readFrontendFile(
    "src/app/servicios/page.tsx"
);
const heroComponentSource = await readFrontendFile(
    "src/components/sections/Hero.tsx"
);
const servicesComponentSource = await readFrontendFile(
    "src/components/sections/Servicios.tsx"
);
const serviceCardSource = await readFrontendFile(
    "src/components/sub_components/ServicioCard.tsx"
);
const homeSectionsSource = await readFrontendFile(
    "src/components/sections/HomeSections.tsx"
);
const plansSource = await readFrontendFile(
    "src/components/utils/planes.data.ts"
);

const heroContent = evaluateCommonJs(
    compileCommonJs(heroSource, "hero.content.ts")
).heroContent;
const homeContent = evaluateCommonJs(
    compileCommonJs(homeContentSource, "home.content.ts")
).homeContent;
const servicesContentModule = evaluateCommonJs(
    compileCommonJs(
        servicesContentSource,
        "servicios-commercial.content.ts"
    )
);

test("el Hero prioriza la propuesta comercial y el acceso a planes", () => {
    assert.equal(heroContent.actions.primary, "Solicitar presupuesto");
    assert.equal(heroContent.actions.secondary, "Ver planes disponibles");
    assert.equal(heroComponentSource.includes('href="#planes"'), true);
    assert.equal(heroContent.description.includes("negocios de Argentina"), true);
    assert.equal(heroContent.note.includes("Te ayudo a definirla"), true);
});

test("Servicios traduce las capacidades técnicas a beneficios de negocio", () => {
    const entries = Object.values(
        servicesContentModule.servicioCommercialContentById
    );

    assert.equal(entries.length, 5);
    assert.equal(
        entries.some((entry) => entry.title.includes("Diseño profesional")),
        true
    );
    assert.equal(
        entries.some((entry) => entry.title.includes("Carga rápida")),
        true
    );
    assert.equal(
        serviceCardSource.includes("commercialContent.title"),
        true
    );
    assert.equal(
        serviceCardSource.includes("commercialContent.description"),
        true
    );
});

test("la guía diferencia las tres ofertas y enlaza sus planes", () => {
    const options =
        servicesContentModule.serviciosSectionContent.decisionGuide.options;

    assert.deepEqual(
        options.map(({ title, href }) => ({ title, href })),
        [
            {
                title: "Landing Page Profesional",
                href: "/servicios/planes/landing_page"
            },
            {
                title: "Sitio Web Profesional",
                href: "/servicios/planes/sitio_web"
            },
            {
                title: "Desarrollo Web a Medida",
                href: "/servicios/planes/desarrollo_web"
            }
        ]
    );
    assert.equal(
        servicesComponentSource.includes(
            "serviciosSectionContent.decisionGuide.options"
        ),
        true
    );
    assert.equal(
        servicesComponentSource.includes('aria-labelledby="servicios-title"'),
        true
    );
});

test("Home mantiene las rutas de conversión principales y secundarias", () => {
    const servicesIndex = homePageSource.indexOf("<Servicios");
    const plansIndex = homePageSource.indexOf("<Planes");
    const worksIndex = homePageSource.indexOf("<Trabajos");

    assert.equal(servicesIndex < plansIndex, true);
    assert.equal(plansIndex < worksIndex, true);
    assert.equal(homePageSource.includes("<FinalCta"), true);
    assert.equal(homeSectionsSource.includes('href="/contacto"'), true);
    assert.equal(homeSectionsSource.includes('href="/perfil"'), true);
    assert.equal(
        servicesContentModule.serviciosSectionContent.decisionGuide
            .servicesAction.href,
        "/servicios"
    );
});

test("el copy reduce objeciones sin afirmaciones comerciales no comprobadas", () => {
    const reviewedCopy = JSON.stringify({
        heroContent,
        homeContent,
        services:
            servicesContentModule.serviciosSectionContent,
        capabilities:
            servicesContentModule.servicioCommercialContentById
    }).toLowerCase();

    for (const expectedText of [
        "presupuesto claro",
        "cuánto puede tardar",
        "dominio, hosting",
        "plantilla genérica",
        "sin compromiso"
    ]) {
        assert.equal(reviewedCopy.includes(expectedText), true, expectedText);
    }

    for (const forbiddenText of [
        "ventas garantizadas",
        "primera posición",
        "resultados garantizados",
        "más elegido"
    ]) {
        assert.equal(reviewedCopy.includes(forbiddenText), false, forbiddenText);
    }

    assert.equal(plansSource.includes('"Más elegido"'), false);
    assert.equal(plansSource.includes('"Ideal para empezar"'), true);
});

test("Home y Servicios usan metadata comercial única", () => {
    assert.equal(
        homePageSource.includes(
            'title: "Páginas Web Profesionales para Negocios"'
        ),
        true
    );
    assert.equal(
        servicesPageSource.includes(
            "Landing Pages, Sitios Web y Desarrollo a Medida"
        ),
        true
    );
    assert.equal(
        homePageSource.includes("path: siteConfig.routes.home"),
        true
    );
    assert.equal(
        servicesPageSource.includes("path: siteConfig.routes.services"),
        true
    );
});

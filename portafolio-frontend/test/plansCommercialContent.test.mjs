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
        throw new Error("Los datos de planes no deben requerir dependencias.");
    }, module, module.exports);

    return module.exports;
};

const plansDataSource = await readFrontendFile(
    "src/components/utils/planes.data.ts"
);
const planCardSource = await readFrontendFile(
    "src/components/sub_components/PlanCard.tsx"
);
const plansSectionSource = await readFrontendFile(
    "src/components/sections/Planes.tsx"
);
const planDetailSource = await readFrontendFile(
    "src/components/PagPlan.tsx"
);
const plansStylesSource = await readFrontendFile(
    "src/styles/sections/planes.module.scss"
);
const planPages = await Promise.all([
    readFrontendFile("src/app/servicios/planes/landing_page/page.tsx"),
    readFrontendFile("src/app/servicios/planes/sitio_web/page.tsx"),
    readFrontendFile("src/app/servicios/planes/desarrollo_web/page.tsx")
]);

const plansModule = evaluateCommonJs(
    compileCommonJs(plansDataSource, "planes.data.ts")
);
const plans = plansModule.planes;

test("los precios tienen una única fuente de verdad", () => {
    assert.deepEqual(plansModule.planPrices, {
        landing_page: "Desde $150.000",
        sitio_web: "Desde $450.000",
        desarrollo_web: "A presupuestar"
    });

    for (const plan of plans) {
        assert.equal(plan.precio, plansModule.planPrices[plan.tag]);
    }

    assert.equal((plansDataSource.match(/\$150\.000/g) ?? []).length, 1);
    assert.equal((plansDataSource.match(/\$450\.000/g) ?? []).length, 1);
    assert.equal(
        (plansDataSource.match(/"A presupuestar"/g) ?? []).length,
        1
    );
});

test("los tres planes conservan precio y suman un contrato de decisión", () => {
    assert.deepEqual(
        plans.map(({ tag, precio }) => ({ tag, precio })),
        [
            { tag: "landing_page", precio: "Desde $150.000" },
            { tag: "sitio_web", precio: "Desde $450.000" },
            { tag: "desarrollo_web", precio: "A presupuestar" }
        ]
    );

    for (const plan of plans) {
        assert.ok(plan.cardIdeal, plan.tag);
        assert.ok(plan.problema, plan.tag);
        assert.ok(plan.impacto, plan.tag);
        assert.ok(plan.objetivo, plan.tag);
        assert.ok(plan.ctaLabel, plan.tag);
        assert.ok(plan.ctaMicrocopy, plan.tag);
        assert.ok(plan.relatedWork.href.startsWith("/trabajos/"), plan.tag);
        assert.equal(plan.cotizarAparte.length >= 4, true, plan.tag);
        assert.equal(plan.preguntas.length >= 7, true, plan.tag);
        assert.equal(plan.seoDescription.length <= 170, true, plan.tag);
    }
});

test("Landing Page queda como entrada honesta sin popularidad inventada", () => {
    const landing = plansModule.getPlanByTag("landing_page");
    const site = plansModule.getPlanByTag("sitio_web");

    assert.equal(landing.destacado, true);
    assert.equal(landing.etiqueta, "Ideal para empezar");
    assert.equal(site.destacado, false);

    for (const source of [
        plansDataSource,
        planCardSource,
        planDetailSource
    ]) {
        assert.equal(source.includes("Más elegido"), false);
        assert.equal(source.includes("Más popular"), false);
    }
});

test("las cards muestran decisión, precio, plazo y ayuda para elegir", () => {
    assert.equal(planCardSource.includes("planes.cardIdeal"), true);
    assert.equal(planCardSource.includes("planes.precio"), true);
    assert.equal(planCardSource.includes("planes.plazo"), true);
    assert.equal(
        planCardSource.includes("Ver plan y alcance"),
        true
    );
    assert.equal(plansSectionSource.includes('href="/contacto"'), true);
    assert.equal(
        plansSectionSource.includes(
            "Pedir recomendación sin compromiso"
        ),
        true
    );
});

test("badge, FAQ y jerarquía de CTAs quedan visualmente contenidos", () => {
    assert.equal(
        plansStylesSource.includes("&_card_badge {\n        position: absolute;"),
        true
    );
    assert.equal(plansStylesSource.includes("font-size: .64rem;"), true);
    assert.equal(
        planDetailSource.includes("styles.planes_detalle_faq_section"),
        true
    );
    assert.equal(plansStylesSource.includes("&_faq_section {"), true);
    assert.equal(
        plansStylesSource.includes("min-height: 44px;"),
        true
    );
    assert.equal(
        plansStylesSource.includes("background: transparent;"),
        true
    );
});

test("cada página presenta problema, alcance, CTA y enlaces para decidir", () => {
    for (const expectedSource of [
        "planSeleccionado.problema",
        "planSeleccionado.impacto",
        "planSeleccionado.objetivo",
        "planSeleccionado.cotizarAparte",
        "planSeleccionado.ctaLabel",
        "planSeleccionado.ctaMicrocopy",
        "planSeleccionado.relatedWork"
    ]) {
        assert.equal(planDetailSource.includes(expectedSource), true);
    }

    assert.equal(planDetailSource.includes('href="/contacto"'), true);
    assert.equal(planDetailSource.includes('href="/servicios#planes"'), true);
    assert.equal(planDetailSource.includes('href="/perfil"'), true);
});

test("las FAQ cubren inicio, materiales, costos, cambios y publicación", () => {
    const faqText = JSON.stringify(
        plans.map((plan) => plan.preguntas)
    ).toLowerCase();

    for (const expectedText of [
        "recién empiezo",
        "necesito enviarte",
        "dominio y hosting",
        "pedir cambios",
        "pagar",
        "después de publicar",
        "desarrollo a medida"
    ]) {
        assert.equal(faqText.includes(expectedText), true, expectedText);
    }
});

test("la metadata de los planes usa títulos y descriptions editoriales", () => {
    for (const source of planPages) {
        assert.equal(source.includes("title: plan?.seoTitle"), true);
        assert.equal(
            source.includes("description: plan?.seoDescription"),
            true
        );
    }

    assert.equal(new Set(plans.map((plan) => plan.seoTitle)).size, 3);
    assert.equal(new Set(plans.map((plan) => plan.seoDescription)).size, 3);
});

test("el copy evita garantías y presión comercial", () => {
    const reviewedCopy = JSON.stringify(plans).toLowerCase();

    for (const forbiddenText of [
        "ventas garantizadas",
        "resultados garantizados",
        "primera posición",
        "última oportunidad"
    ]) {
        assert.equal(reviewedCopy.includes(forbiddenText), false);
    }
});

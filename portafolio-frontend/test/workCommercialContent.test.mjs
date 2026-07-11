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

const evaluateCommonJs = (source) => {
    const module = { exports: {} };
    const executeModule = new Function(
        "require",
        "module",
        "exports",
        source
    );

    executeModule(() => {
        throw new Error("El módulo comercial no debe requerir dependencias.");
    }, module, module.exports);

    return module.exports;
};

const contentSource = await readFile(
    new URL(
        "../src/content/trabajos-commercial.content.ts",
        import.meta.url
    ),
    "utf8"
);
const commercialModule = evaluateCommonJs(
    compileCommonJs(contentSource, "trabajos-commercial.content.ts")
);
const metadataPageSource = await readFile(
    new URL("../src/app/trabajos/[slug]/page.tsx", import.meta.url),
    "utf8"
);
const cardSource = await readFile(
    new URL(
        "../src/components/sub_components/TrabajoCard.tsx",
        import.meta.url
    ),
    "utf8"
);
const detailSource = await readFile(
    new URL("../src/components/PagTrabajo.tsx", import.meta.url),
    "utf8"
);
const worksSectionSource = await readFile(
    new URL("../src/components/sections/Trabajos.tsx", import.meta.url),
    "utf8"
);

const expectedSlugs = [
    "paginas-web-chavez",
    "plomada",
    "jardineria-montanez",
    "elu",
    "esperanza-de-vida"
];

test("los cinco trabajos tienen contenido comercial completo", () => {
    assert.deepEqual(
        Object.keys(commercialModule.trabajoCommercialContentBySlug).sort(),
        [...expectedSlugs].sort()
    );

    for (const slug of expectedSlugs) {
        const content =
            commercialModule.trabajoCommercialContentBySlug[slug];

        assert.ok(content.displayName);
        assert.ok(content.category);
        assert.ok(content.seoTitle);
        assert.ok(content.seoDescription);
        assert.ok(content.commercialSummary);
        assert.ok(content.outcome);
        assert.equal(Number.isInteger(content.featuredPriority), true, slug);
        assert.equal(content.seoDescription.length <= 170, true, slug);
        assert.equal(content.primaryCta.href, "/contacto");
        assert.equal(content.relatedPlan.href.startsWith("/servicios"), true);
    }
});

test("Plomada y Esperanza de Vida no conservan textos provisorios", () => {
    const reviewedContent = JSON.stringify([
        commercialModule.trabajoCommercialContentBySlug.plomada,
        commercialModule.trabajoCommercialContentBySlug[
            "esperanza-de-vida"
        ]
    ]).toLowerCase();

    for (const forbiddenText of [
        "información más detallada",
        "informacion más detallada",
        "solo un ejemplo",
        "salmos 91"
    ]) {
        assert.equal(reviewedContent.includes(forbiddenText), false);
    }
});

test("la presentación normaliza nombres y categorías comerciales", () => {
    assert.equal(
        commercialModule.trabajoCommercialContentBySlug[
            "jardineria-montanez"
        ].displayName,
        "Jardinería Montañez"
    );
    assert.equal(
        commercialModule.trabajoCommercialContentBySlug.elu.displayName,
        "Creaciones ELU"
    );
    assert.equal(
        commercialModule.trabajoCommercialContentBySlug[
            "esperanza-de-vida"
        ].displayName,
        "Esperanza de Vida"
    );
});

test("el fallback SEO no depende del resumen largo del backend", () => {
    const fallback = commercialModule.getTrabajoCommercialContent({
        slug: "proyecto-futuro",
        nombre_trabajo: "Proyecto Futuro",
        categoria_trabajo: "Sitio web",
        resumen_trabajo: "Resumen potencialmente demasiado largo.",
        informacion_trabajo: "",
        reto_tecnico: "",
        opinion_trabajo: "opinión provisoria"
    });

    assert.equal(
        fallback.seoDescription.includes(
            "Resumen potencialmente demasiado largo"
        ),
        false
    );
    assert.equal(
        fallback.commercialSummary.includes(
            "Resumen potencialmente demasiado largo"
        ),
        false
    );
    assert.equal(
        contentSource.includes("outcome: trabajo.opinion_trabajo"),
        false
    );
    assert.equal(
        fallback.outcome.includes("opinión provisoria"),
        false
    );
    assert.equal(fallback.primaryCta.href, "/contacto");
    assert.equal(fallback.relatedPlan.href, "/servicios");
});

test("prefiere commercialContent de API cuando viene completo", () => {
    const resolved = commercialModule.getTrabajoCommercialContent({
        slug: "plomada",
        nombre_trabajo: "Plomada legacy",
        categoria_trabajo: "Categoría legacy",
        resumen_trabajo: "Resumen legacy no comercial",
        informacion_trabajo: "Información legacy",
        reto_tecnico: "Reto legacy",
        opinion_trabajo: "Opinión legacy",
        valoracion_trabajo: "Valoración legacy",
        commercialContent: {
            displayName: "Nombre desde API",
            category: "Categoría desde API",
            seoTitle: "SEO API",
            seoDescription: "Descripción API",
            commercialSummary: "Resumen API",
            information: "Información API",
            challenge: "Desafío API",
            outcome: "Resultado API",
            featuredPriority: 99,
            primaryCta: {
                label: "CTA API",
                href: "/contacto"
            },
            relatedPlan: {
                label: "Plan API",
                href: "/servicios"
            }
        }
    });

    assert.equal(resolved.displayName, "Nombre desde API");
    assert.equal(resolved.category, "Categoría desde API");
    assert.equal(resolved.seoTitle, "SEO API");
    assert.equal(resolved.seoDescription, "Descripción API");
    assert.equal(resolved.commercialSummary, "Resumen API");
    assert.equal(resolved.information, "Información API");
    assert.equal(resolved.challenge, "Desafío API");
    assert.equal(resolved.outcome, "Resultado API");
    assert.equal(resolved.featuredPriority, 99);
    assert.deepEqual(resolved.primaryCta, {
        label: "CTA API",
        href: "/contacto"
    });
    assert.deepEqual(resolved.relatedPlan, {
        label: "Plan API",
        href: "/servicios"
    });
});

test("si API trae campos vacios, usa fallback local campo por campo", () => {
    const local = commercialModule.trabajoCommercialContentBySlug.plomada;
    const resolved = commercialModule.getTrabajoCommercialContent({
        slug: "plomada",
        nombre_trabajo: "Plomada legacy",
        categoria_trabajo: "Categoría legacy",
        resumen_trabajo: "Resumen legacy no comercial",
        informacion_trabajo: "Información legacy",
        reto_tecnico: "Reto legacy",
        opinion_trabajo: "Opinión legacy",
        valoracion_trabajo: "Valoración legacy",
        commercialContent: {
            displayName: "   ",
            category: "",
            seoTitle: "",
            seoDescription: "",
            commercialSummary: "",
            information: "",
            challenge: "",
            outcome: "",
            featuredPriority: 1.5,
            primaryCta: {
                label: "",
                href: "https://example.com"
            },
            relatedPlan: {
                label: "",
                href: "//example.com"
            }
        }
    });

    assert.equal(resolved.displayName, local.displayName);
    assert.equal(resolved.category, local.category);
    assert.equal(resolved.seoTitle, local.seoTitle);
    assert.equal(resolved.seoDescription, local.seoDescription);
    assert.equal(resolved.commercialSummary, local.commercialSummary);
    assert.equal(resolved.information, local.information);
    assert.equal(resolved.challenge, local.challenge);
    assert.equal(resolved.outcome, local.outcome);
    assert.equal(resolved.featuredPriority, local.featuredPriority);
    assert.deepEqual(resolved.primaryCta, local.primaryCta);
    assert.deepEqual(resolved.relatedPlan, local.relatedPlan);
});

test("si API trae information y challenge nulos, resuelve campo por campo", () => {
    const resolved = commercialModule.getTrabajoCommercialContent({
        slug: "paginas-web-chavez",
        nombre_trabajo: "PaginasWebChavez",
        categoria_trabajo: "Sitio web",
        resumen_trabajo: "Resumen legacy no comercial",
        informacion_trabajo: "Informacion legacy permitida para detalle",
        reto_tecnico: "Reto legacy permitido para detalle",
        opinion_trabajo: "Opinion legacy prohibida",
        valoracion_trabajo: "Valoracion legacy prohibida",
        commercialContent: {
            displayName: "Nombre API",
            category: "Categoria API",
            seoTitle: "SEO API",
            seoDescription: "Descripcion API",
            commercialSummary: "Resumen API",
            information: null,
            challenge: null,
            outcome: "Resultado API",
            featuredPriority: 30,
            primaryCta: {
                label: "CTA API",
                href: "/contacto"
            },
            relatedPlan: {
                label: "Plan API",
                href: "/servicios"
            }
        }
    });

    assert.equal(resolved.displayName, "Nombre API");
    assert.equal(resolved.information, "Informacion legacy permitida para detalle");
    assert.equal(resolved.challenge, "Reto legacy permitido para detalle");
    assert.equal(resolved.outcome, "Resultado API");
    assert.equal(resolved.outcome.includes("Opinion legacy prohibida"), false);
});

test("el contrato local permite information y challenge opcionales", () => {
    for (const slug of [
        "paginas-web-chavez",
        "jardineria-montanez",
        "elu"
    ]) {
        const content = commercialModule.trabajoCommercialContentBySlug[slug];

        assert.equal("information" in content, false, slug);
        assert.equal("challenge" in content, false, slug);
        assert.ok(content.outcome, slug);
    }
});

test("si no hay API ni fallback local, usa fallback sobrio final", () => {
    const resolved = commercialModule.getTrabajoCommercialContent({
        slug: "proyecto-sin-contenido",
        nombre_trabajo: "",
        categoria_trabajo: "",
        resumen_trabajo: "No debe usarse",
        informacion_trabajo: "",
        reto_tecnico: "",
        opinion_trabajo: "No debe usarse como outcome",
        valoracion_trabajo: "No debe usarse como rating"
    });

    assert.equal(resolved.displayName, "Proyecto web");
    assert.equal(resolved.category, "Proyecto web");
    assert.equal(resolved.seoTitle, "Proyecto web — Proyecto web");
    assert.equal(
        resolved.commercialSummary,
        "Proyecto desarrollado para presentar la información principal de forma clara y facilitar el contacto."
    );
    assert.equal(
        resolved.challenge,
        "El desafío fue ordenar la información del proyecto sin sumar complejidad innecesaria."
    );
    assert.equal(
        resolved.outcome,
        "El resultado es una base clara y adaptable para comunicar la propuesta."
    );
    assert.equal(resolved.outcome.includes("No debe usarse"), false);
    assert.equal(resolved.featuredPriority, 0);
    assert.deepEqual(resolved.primaryCta, {
        label: "Consultar por un proyecto similar",
        href: "/contacto"
    });
    assert.deepEqual(resolved.relatedPlan, {
        label: "Ver servicios web",
        href: "/servicios"
    });
});

test("metadata, cards y detalle consumen la capa comercial", () => {
    assert.equal(
        metadataPageSource.includes("title: commercialContent.seoTitle"),
        true
    );
    assert.equal(
        metadataPageSource.includes(
            "description: commercialContent.seoDescription"
        ),
        true
    );
    assert.equal(
        metadataPageSource.includes("trabajo.resumen_trabajo ||"),
        false
    );
    assert.equal(
        metadataPageSource.includes("Cargando sección..."),
        false
    );
    assert.equal(metadataPageSource.includes("next/dynamic"), false);
    assert.equal(cardSource.includes("commercialContent.displayName"), true);
    assert.equal(
        cardSource.includes("commercialContent.commercialSummary"),
        true
    );
    assert.equal(
        detailSource.includes("commercialContent.primaryCta"),
        true
    );
    assert.equal(
        detailSource.includes("commercialContent.relatedPlan"),
        true
    );
    assert.equal(detailSource.includes("tra.valoracion_trabajo"), false);
    assert.equal(
        (
            detailSource.match(
                /\{commercialContent\.commercialSummary\}/g
            ) ?? []
        ).length,
        1
    );
    assert.equal(
        worksSectionSource.includes(".displayName"),
        false
    );
    assert.equal(
        worksSectionSource.includes(".featuredPriority"),
        true
    );
});

test("la capa comercial no limita los proyectos visibles en Home", () => {
    assert.equal(
        worksSectionSource.includes(".slice(0, 5)"),
        false
    );
    assert.equal(
        worksSectionSource.includes("if (!showFooter) return ordenados"),
        false
    );
    assert.equal(
        worksSectionSource.includes("return b.id - a.id"),
        true
    );
    assert.equal(
        worksSectionSource.includes(
            "getTrabajoCommercialContent(trabajo).featuredPriority"
        ),
        true
    );
});

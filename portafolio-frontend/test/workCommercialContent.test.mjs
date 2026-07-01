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

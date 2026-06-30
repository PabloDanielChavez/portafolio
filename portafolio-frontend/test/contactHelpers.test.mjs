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

const constantsSource = await readFile(
    new URL("../src/constants/contacto.constants.ts", import.meta.url),
    "utf8"
);
const helpersSource = await readFile(
    new URL("../src/components/utils/contacto.helpers.ts", import.meta.url),
    "utf8"
);
const constants = evaluateCommonJs(
    compileCommonJs(constantsSource, "contacto.constants.ts")
);
const helpers = evaluateCommonJs(
    compileCommonJs(helpersSource, "contacto.helpers.ts"),
    {
        "@/constants/contacto.constants": constants
    }
);

const validForm = {
    nombre: "pRUEBA",
    correo: "pablo@outlook.es",
    tipoProyecto: "Landing Page",
    presupuesto: "Hasta USD 200",
    plazo: "Lo antes posible",
    preferenciaContacto: "whatsapp",
    telefono: "+54 911 66621017",
    mensaje: "hOLA QUIERO UNA PAGINA SUPER LINDA DE PRUEBA LOCAL HOST",
    website: ""
};

test("normaliza campos sin alterar su significado", () => {
    const normalized = helpers.normalizeContactForm({
        ...validForm,
        nombre: "  María   López\u0000 ",
        correo: "  PERSONA@EXAMPLE.COM ",
        tipoProyecto: " Landing Page ",
        presupuesto: " Hasta USD 200 ",
        plazo: " Lo antes posible ",
        telefono: " +54   911 66621017 ",
        mensaje: "Hola,\r\n\r\n\r\nquiero una página   profesional."
    });

    assert.deepEqual(normalized, {
        ...validForm,
        nombre: "María López",
        correo: "persona@example.com",
        tipoProyecto: "Landing Page",
        presupuesto: "Hasta USD 200",
        plazo: "Lo antes posible",
        telefono: "+54 911 66621017",
        mensaje: "Hola,\n\nquiero una página profesional."
    });
});

test("acepta el caso válido protegido y los dos presupuestos inferiores", () => {
    for (const presupuesto of [
        "Hasta USD 200",
        "USD 200 a 1.000"
    ]) {
        const errors = helpers.validateContactForm({
            ...validForm,
            presupuesto
        });

        assert.deepEqual(errors, {}, presupuesto);
    }
});

test("mantiene errores requeridos de nombre, correo y mensaje", () => {
    const errors = helpers.validateContactForm({
        ...validForm,
        nombre: "",
        correo: "",
        mensaje: ""
    });

    assert.equal(
        errors.nombre,
        "Ingresá un nombre de al menos 2 caracteres."
    );
    assert.equal(
        errors.correo,
        "Ingresá un correo electrónico válido."
    );
    assert.equal(
        errors.mensaje,
        "Contanos un poco más: el mensaje debe tener al menos 20 caracteres."
    );
});

test("exige teléfono solo cuando la preferencia es whatsapp", () => {
    const whatsappErrors = helpers.validateContactForm({
        ...validForm,
        telefono: ""
    });
    const emailErrors = helpers.validateContactForm({
        ...validForm,
        preferenciaContacto: "email",
        telefono: ""
    });

    assert.equal(
        whatsappErrors.telefono,
        "Ingresá un número con código de país y área."
    );
    assert.equal(emailErrors.telefono, undefined);
});

test("detecta el contenido sospechoso vigente", () => {
    assert.equal(
        helpers.hasSuspiciousContent("<script>alert(1)</script>"),
        true
    );
    assert.equal(
        helpers.hasSuspiciousContent(
            "https://a.test https://b.test https://c.test https://d.test"
        ),
        true
    );
    assert.equal(helpers.hasSuspiciousContent("a".repeat(25)), true);
    assert.equal(
        helpers.hasSuspiciousContent("Quiero una página profesional."),
        false
    );
});

test("construye el payload protegido con origen y teléfono condicional", () => {
    const payload = helpers.buildContactPayload(
        validForm,
        "http://localhost:3000/contacto"
    );

    assert.deepEqual(payload, {
        nombre: "pRUEBA",
        correo: "pablo@outlook.es",
        mensaje: "hOLA QUIERO UNA PAGINA SUPER LINDA DE PRUEBA LOCAL HOST",
        origen_url: "http://localhost:3000/contacto",
        tipoProyecto: "Landing Page",
        presupuesto: "Hasta USD 200",
        plazo: "Lo antes posible",
        preferenciaContacto: "whatsapp",
        telefono: "+54 911 66621017",
        website: ""
    });
});

test("conserva undefined en opcionales y omite teléfono para email", () => {
    const payload = helpers.buildContactPayload(
        {
            ...validForm,
            tipoProyecto: "",
            presupuesto: "",
            plazo: "",
            preferenciaContacto: "email",
            telefono: ""
        },
        "http://localhost:3000/contacto"
    );

    assert.equal(payload.tipoProyecto, undefined);
    assert.equal(payload.presupuesto, undefined);
    assert.equal(payload.plazo, undefined);
    assert.equal(payload.telefono, undefined);
    assert.equal(payload.preferenciaContacto, "email");
});

test("mantiene honeypot y espera mínima de 2500 ms", () => {
    assert.equal(helpers.hasContactHoneypot(validForm), false);
    assert.equal(
        helpers.hasContactHoneypot({
            ...validForm,
            website: "https://spam.test"
        }),
        true
    );
    assert.equal(helpers.isContactSubmissionTooFast(0, 5000), true);
    assert.equal(helpers.isContactSubmissionTooFast(1000, 3499), true);
    assert.equal(helpers.isContactSubmissionTooFast(1000, 3500), false);
});

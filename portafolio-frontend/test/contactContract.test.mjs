import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contactoSource = await readFile(
    new URL("../src/components/sections/Contacto.tsx", import.meta.url),
    "utf8"
);
const fetchDataSource = await readFile(
    new URL("../src/services/fetchData.ts", import.meta.url),
    "utf8"
);
const contactConstantsSource = await readFile(
    new URL("../src/constants/contacto.constants.ts", import.meta.url),
    "utf8"
);
const contactTypesSource = await readFile(
    new URL("../src/types/contacto.ts", import.meta.url),
    "utf8"
);
const contactHelpersSource = await readFile(
    new URL("../src/components/utils/contacto.helpers.ts", import.meta.url),
    "utf8"
);

const assertIncludesAll = (source, expectedValues) => {
    for (const expectedValue of expectedValues) {
        assert.equal(
            source.includes(expectedValue),
            true,
            `No se encontró el contrato esperado: ${expectedValue}`
        );
    }
};

test("Contacto conserva los campos principales y el honeypot", () => {
    assertIncludesAll(
        contactoSource,
        [
            'name="nombre"',
            'name="correo"',
            'name="tipoProyecto"',
            'name="presupuesto"',
            'name="plazo"',
            'name="preferenciaContacto"',
            'name="telefono"',
            'name="mensaje"',
            'name="website"',
            'tabIndex={-1}'
        ]
    );

    assertIncludesAll(
        contactConstantsSource,
        [
            "preferenciaContacto: CONTACT_PREFERENCES.email",
            'tipoProyecto: ""',
            'presupuesto: ""',
            'plazo: ""',
            'telefono: ""',
            'website: ""'
        ]
    );
});

test("Contacto conserva las opciones cerradas vigentes", () => {
    assertIncludesAll(
        contactConstantsSource,
        [
            '"Landing Page"',
            '"Sitio Web Profesional"',
            '"Tienda Online"',
            '"Desarrollo a medida"',
            '"Otro"',
            '"Necesito orientación"',
            '"Hasta USD 200"',
            '"USD 200 a 1.000"',
            '"USD 1.000 a 2.500"',
            '"Más de USD 2.500"',
            '"Lo antes posible"',
            '"Durante el próximo mes"',
            '"En 1 a 3 meses"',
            '"Todavía no lo definí"',
            'email: "email"',
            'whatsapp: "whatsapp"'
        ]
    );

    assertIncludesAll(
        contactoSource,
        [
            "CONTACT_PROJECT_OPTIONS.map",
            "CONTACT_BUDGET_OPTIONS.map",
            "CONTACT_DEADLINE_OPTIONS.map",
            "CONTACT_PREFERENCES.email",
            "CONTACT_PREFERENCES.whatsapp"
        ]
    );

    assert.equal(contactConstantsSource.includes('"Hasta USD 500"'), false);
    assert.equal(contactConstantsSource.includes('"USD 500 a 1.000"'), false);
});

test("los tipos de Contacto están separados del servicio de fetch", () => {
    assertIncludesAll(
        contactTypesSource,
        [
            "export type TipoProyectoContacto",
            "export type PresupuestoContacto",
            "export type PlazoContacto",
            "export type PreferenciaContacto",
            "export type ContactFormValues",
            "export type ContactFieldErrors",
            "export type ContactSubmitStatus",
            "export type ContactPayload"
        ]
    );

    assertIncludesAll(
        fetchDataSource,
        [
            'import type { ContactPayload } from "@/types/contacto";',
            "datosDelFormulario: ContactPayload"
        ]
    );

    assert.equal(
        fetchDataSource.includes("export type TipoProyectoContacto"),
        false
    );
});

test("Contacto conserva el payload enviado al servicio", () => {
    assertIncludesAll(
        contactoSource,
        [
            "buildContactPayload(",
            "normalizedForm,",
            "window.location.href",
            "enviarMensajeContacto(payload)"
        ]
    );

    assertIncludesAll(
        contactHelpersSource,
        [
            "nombre: form.nombre",
            "correo: form.correo",
            "mensaje: form.mensaje",
            "origen_url: originUrl",
            "tipoProyecto: form.tipoProyecto || undefined",
            "presupuesto: form.presupuesto || undefined",
            "plazo: form.plazo || undefined",
            "preferenciaContacto: form.preferenciaContacto",
            "CONTACT_PREFERENCES.whatsapp",
            "website: form.website"
        ]
    );

    assertIncludesAll(
        fetchDataSource,
        [
            "`${urlBase}contacto`",
            "method: 'POST'",
            "'Content-Type': 'application/json'",
            "body: JSON.stringify(datosDelFormulario)"
        ]
    );
});

test("Contacto conserva éxito, errores y barreras anti-spam", () => {
    assertIncludesAll(
        contactConstantsSource,
        [
            "CONTACT_MINIMUM_SUBMIT_TIME_MS = 2500",
            "CONTACT_INITIAL_FORM",
            "CONTACT_INITIAL_STATUS"
        ]
    );

    assertIncludesAll(
        contactoSource,
        [
            "submissionLockRef.current || isSubmitting",
            "hasContactHoneypot(normalizedForm)",
            "isContactSubmissionTooFast(",
            "Hay algunos datos para revisar antes de enviar la consulta.",
            "Esperá unos segundos y volvé a enviar la consulta.",
            "No se pudo enviar la consulta. Probá nuevamente o usá uno de los canales directos.",
            "No se pudo conectar con el servidor. Probá nuevamente o escribime por WhatsApp o correo.",
            "¡Consulta enviada! Voy a revisar tu proyecto y responderte de forma personalizada."
        ]
    );
});

test("Contacto conserva los nombres de eventos de medición", () => {
    assertIncludesAll(
        contactoSource,
        [
            '"contact_faq_toggle"',
            '"contact_form_focus"',
            '"contact_form_submit"',
            '"contact_form_error"',
            '"contact_form_success"',
            '"contact_social_click"'
        ]
    );
});

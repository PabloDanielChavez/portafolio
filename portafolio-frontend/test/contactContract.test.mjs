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
        contactoSource,
        [
            'preferenciaContacto: "email"',
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
        contactoSource,
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
            'value="email"',
            'value="whatsapp"'
        ]
    );

    assert.equal(contactoSource.includes('"Hasta USD 500"'), false);
    assert.equal(contactoSource.includes('"USD 500 a 1.000"'), false);
});

test("Contacto conserva el payload enviado al servicio", () => {
    const payloadStart = contactoSource.indexOf(
        "await enviarMensajeContacto({"
    );
    const payloadEnd = contactoSource.indexOf(
        "});",
        payloadStart
    );

    assert.notEqual(payloadStart, -1);
    assert.notEqual(payloadEnd, -1);

    const payloadSource = contactoSource.slice(payloadStart, payloadEnd);

    assertIncludesAll(
        payloadSource,
        [
            "nombre: normalizedForm.nombre",
            "correo: normalizedForm.correo",
            "mensaje: normalizedForm.mensaje",
            "origen_url: window.location.href",
            "tipoProyecto: normalizedForm.tipoProyecto || undefined",
            "presupuesto: normalizedForm.presupuesto || undefined",
            "plazo: normalizedForm.plazo || undefined",
            "preferenciaContacto: normalizedForm.preferenciaContacto",
            'normalizedForm.preferenciaContacto === "whatsapp"',
            "telefono",
            "website: normalizedForm.website"
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
        contactoSource,
        [
            "const MINIMUM_SUBMIT_TIME_MS = 2500",
            "submissionLockRef.current || isSubmitting",
            "if (normalizedForm.website)",
            "elapsedTime < MINIMUM_SUBMIT_TIME_MS",
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

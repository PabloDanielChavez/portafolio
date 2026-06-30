import {
    CONTACT_MINIMUM_SUBMIT_TIME_MS,
    CONTACT_PREFERENCES,
    CONTACT_PROJECT_OPTIONS
} from "@/constants/contacto.constants";
import type {
    ContactFieldErrors,
    ContactFormValues,
    ContactPayload
} from "@/types/contacto";

const removeControlCharacters = (value: string) =>
    value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

export const normalizeSingleLine = (value: string) =>
    removeControlCharacters(value.normalize("NFKC"))
        .replace(/\s+/g, " ")
        .trim();

export const normalizeMultiline = (value: string) =>
    removeControlCharacters(value.normalize("NFKC"))
        .replace(/\r\n?/g, "\n")
        .replace(/[^\S\n]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

const normalizeOption = <T extends string>(value: T | "") =>
    normalizeSingleLine(value) as T | "";

export const hasSuspiciousContent = (value: string) => {
    const unsafeMarkup =
        /<\/?(?:script|iframe|object|embed|style)|javascript:|data:text\/html|on\w+\s*=/i;
    const urlCount = value.match(/(?:https?:\/\/|www\.)/gi)?.length ?? 0;
    const excessiveRepetition = /(.)\1{24,}/u;

    return (
        unsafeMarkup.test(value) ||
        urlCount > 3 ||
        excessiveRepetition.test(value)
    );
};

export const normalizeContactForm = (
    form: ContactFormValues
): ContactFormValues => ({
    nombre: normalizeSingleLine(form.nombre),
    correo: normalizeSingleLine(form.correo).toLowerCase(),
    tipoProyecto: normalizeOption(form.tipoProyecto),
    presupuesto: normalizeOption(form.presupuesto),
    plazo: normalizeOption(form.plazo),
    preferenciaContacto: form.preferenciaContacto,
    telefono: normalizeSingleLine(form.telefono),
    mensaje: normalizeMultiline(form.mensaje),
    website: normalizeSingleLine(form.website)
});

export const validateContactForm = (
    form: ContactFormValues
): ContactFieldErrors => {
    const errors: ContactFieldErrors = {};
    const validName = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (form.nombre.length < 2) {
        errors.nombre = "Ingresá un nombre de al menos 2 caracteres.";
    } else if (form.nombre.length > 80) {
        errors.nombre = "El nombre no puede superar los 80 caracteres.";
    } else if (!validName.test(form.nombre)) {
        errors.nombre = "Usá letras, espacios, apóstrofes o guiones.";
    } else if (hasSuspiciousContent(form.nombre)) {
        errors.nombre = "Revisá el nombre ingresado.";
    }

    if (form.correo.length > 120) {
        errors.correo = "El correo no puede superar los 120 caracteres.";
    } else if (!validEmail.test(form.correo)) {
        errors.correo = "Ingresá un correo electrónico válido.";
    } else if (hasSuspiciousContent(form.correo)) {
        errors.correo = "Revisá el correo ingresado.";
    }

    if (
        !form.tipoProyecto ||
        !CONTACT_PROJECT_OPTIONS.includes(form.tipoProyecto)
    ) {
        errors.tipoProyecto = "Seleccioná el tipo de proyecto.";
    }

    if (form.preferenciaContacto === CONTACT_PREFERENCES.whatsapp) {
        const phoneDigits = form.telefono.replace(/\D/g, "");
        const validPhoneCharacters = /^[+\d\s().-]+$/;

        if (
            form.telefono.length > 30 ||
            !validPhoneCharacters.test(form.telefono) ||
            phoneDigits.length < 8 ||
            phoneDigits.length > 15
        ) {
            errors.telefono =
                "Ingresá un número con código de país y área.";
        }
    }

    if (form.mensaje.length < 20) {
        errors.mensaje =
            "Contanos un poco más: el mensaje debe tener al menos 20 caracteres.";
    } else if (form.mensaje.length > 2000) {
        errors.mensaje =
            "El mensaje no puede superar los 2000 caracteres.";
    } else if (hasSuspiciousContent(form.mensaje)) {
        errors.mensaje =
            "El mensaje contiene contenido o demasiados enlaces para este formulario.";
    }

    return errors;
};

export const buildContactPayload = (
    form: ContactFormValues,
    originUrl: string
): ContactPayload => ({
    nombre: form.nombre,
    correo: form.correo,
    mensaje: form.mensaje,
    origen_url: originUrl,
    tipoProyecto: form.tipoProyecto || undefined,
    presupuesto: form.presupuesto || undefined,
    plazo: form.plazo || undefined,
    preferenciaContacto: form.preferenciaContacto,
    telefono:
        form.preferenciaContacto === CONTACT_PREFERENCES.whatsapp
            ? form.telefono
            : undefined,
    website: form.website
});

export const hasContactHoneypot = (form: ContactFormValues) =>
    Boolean(form.website);

export const isContactSubmissionTooFast = (
    startedAt: number,
    currentTime: number
) =>
    startedAt === 0 ||
    currentTime - startedAt < CONTACT_MINIMUM_SUBMIT_TIME_MS;

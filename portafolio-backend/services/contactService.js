import { normalizeSingleLine } from '../validation/schemas.js';

const sanitizeOrigin = (value) => {
    if (typeof value !== 'string') return null;

    const sanitizedValue = normalizeSingleLine(value)
        .replace(/[<>]/g, '')
        .slice(0, 2048);

    return sanitizedValue || null;
};

const addLegacySubject = (subject, message) =>
    subject ? `Asunto: ${subject}\n${message}` : message;

export const buildContactRecord = (
    contact,
    { requestOrigin = '', createdAt = new Date() } = {}
) => ({
    nombre: contact.nombre,
    correo: contact.correo,
    mensaje: addLegacySubject(contact.asunto, contact.mensaje),
    tipo_proyecto: contact.tipoProyecto ?? null,
    presupuesto: contact.presupuesto ?? null,
    plazo: contact.plazo ?? null,
    preferencia_contacto: contact.preferenciaContacto ?? null,
    telefono: contact.telefono || null,
    fecha: createdAt.toISOString(),
    origen_url: sanitizeOrigin(contact.origen_url || requestOrigin)
});

export const saveContact = (messageModel, contact, options) =>
    messageModel.create(buildContactRecord(contact, options));

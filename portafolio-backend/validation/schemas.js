import { z } from 'zod';

import {
    CONTACT_BUDGET_RANGES,
    CONTACT_PREFERENCES,
    CONTACT_PROJECT_TYPES,
    CONTACT_TIMELINES
} from '../constants/contactOptions.js';
import {
    WORK_SLUG_MAX_LENGTH,
    WORK_SLUG_PATTERN
} from '../constants/workSlugs.js';

const CONTROL_CHARACTERS =
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const SUSPICIOUS_CONTENT =
    /<[^>]*>|(?:javascript|vbscript)\s*:|data\s*:\s*text\/html|on\w+\s*=/iu;
const VALID_NAME = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’\u2010-\u2015-]*$/u;
const VALID_PHONE = /^[+\d\s().-]+$/;

export const normalizeSingleLine = (value) =>
    value
        .normalize('NFKC')
        .replace(CONTROL_CHARACTERS, '')
        .replace(/\s+/g, ' ')
        .trim();

export const normalizeMultiline = (value) =>
    value
        .normalize('NFKC')
        .replace(CONTROL_CHARACTERS, '')
        .replace(/\r\n?/g, '\n')
        .replace(/[^\S\n]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

const safeSingleLine = ({ min = 0, max }) =>
    z
        .string()
        .transform(normalizeSingleLine)
        .pipe(z.string().min(min).max(max))
        .refine((value) => !SUSPICIOUS_CONTENT.test(value));

const safeMultiline = ({ min = 0, max }) =>
    z
        .string()
        .transform(normalizeMultiline)
        .pipe(z.string().min(min).max(max))
        .refine((value) => !SUSPICIOUS_CONTENT.test(value));

const optionalSingleLine = (max) =>
    z
        .string()
        .transform(normalizeSingleLine)
        .pipe(z.string().max(max))
        .refine((value) => !SUSPICIOUS_CONTENT.test(value))
        .optional()
        .default('');

const optionalEnum = (values) =>
    z.preprocess((value) => {
        if (typeof value !== 'string') return value;

        const normalizedValue = normalizeSingleLine(value);

        return normalizedValue || undefined;
    }, z.enum(values).optional());

const emailSchema = z
    .string()
    .transform((value) => normalizeSingleLine(value).toLowerCase())
    .pipe(z.string().email().max(120))
    .refine((value) => !/[\r\n]/.test(value));

const optionalUrlSchema = z
    .string()
    .transform(normalizeSingleLine)
    .pipe(z.string().max(2048))
    .refine((value) => {
        if (!value) return true;

        try {
            return ['http:', 'https:'].includes(new URL(value).protocol);
        } catch {
            return false;
        }
    })
    .optional()
    .default('');

export const contactBodySchema = z
    .object({
        nombre: safeSingleLine({ min: 2, max: 80 }).refine((value) =>
            VALID_NAME.test(value)
        ),
        correo: emailSchema.optional(),
        email: emailSchema.optional(),
        telefono: optionalSingleLine(30).refine(
            (value) => !value || VALID_PHONE.test(value)
        ),
        asunto: optionalSingleLine(120),
        tipoProyecto: optionalEnum(CONTACT_PROJECT_TYPES),
        presupuesto: optionalEnum(CONTACT_BUDGET_RANGES),
        plazo: optionalEnum(CONTACT_TIMELINES),
        preferenciaContacto: optionalEnum(CONTACT_PREFERENCES),
        mensaje: safeMultiline({ min: 10, max: 2500 }),
        origen_url: optionalUrlSchema,
        website: optionalSingleLine(200)
    })
    .strict()
    .superRefine((value, context) => {
        if (!value.correo && !value.email) {
            context.addIssue({
                code: 'custom',
                path: ['correo'],
                message: 'El correo es obligatorio.'
            });
        }

        if (value.correo && value.email && value.correo !== value.email) {
            context.addIssue({
                code: 'custom',
                path: ['email'],
                message: 'Los correos no coinciden.'
            });
        }

        if (value.telefono) {
            const phoneDigits = value.telefono.replace(/\D/g, '');

            if (phoneDigits.length < 8 || phoneDigits.length > 15) {
                context.addIssue({
                    code: 'custom',
                    path: ['telefono'],
                    message: 'El teléfono no tiene una longitud válida.'
                });
            }
        }

        if (value.preferenciaContacto === 'whatsapp' && !value.telefono) {
            context.addIssue({
                code: 'custom',
                path: ['telefono'],
                message: 'El teléfono es obligatorio para WhatsApp.'
            });
        }
    })
    .transform(({ email, ...value }) => ({
        ...value,
        correo: value.correo ?? email
    }));

export const auditBodySchema = z
    .object({
        id: z.number().int().positive(),
        url: z
            .string()
            .trim()
            .max(2048)
            .url()
            .refine((value) => ['http:', 'https:'].includes(new URL(value).protocol))
    })
    .strict();

export const workSlugParamsSchema = z
    .object({
        slug: z
            .string()
            .min(1)
            .max(WORK_SLUG_MAX_LENGTH)
            .regex(WORK_SLUG_PATTERN)
            .refine((value) => /[a-z]/.test(value))
    })
    .strict();

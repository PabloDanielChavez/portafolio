import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FocusEvent,
    type FormEvent
} from "react";

import {
    CONTACT_INITIAL_FORM,
    CONTACT_INITIAL_STATUS,
    CONTACT_PREFERENCES
} from "@/constants/contacto.constants";
import { enviarMensajeContacto } from "@/services/fetchData";
import type {
    ContactFieldErrors,
    ContactFormValues,
    ContactSubmitStatus
} from "@/types/contacto";

import { trackEvent } from "@/components/utils/Analytics";
import {
    buildContactPayload,
    hasContactHoneypot,
    isContactSubmissionTooFast,
    normalizeContactForm,
    validateContactForm
} from "@/components/utils/contacto.helpers";

type UseContactoFormOptions = {
    getOriginUrl: () => string;
    onValidationError: () => void;
};

export function useContactoForm({
    getOriginUrl,
    onValidationError
}: UseContactoFormOptions) {
    const [form, setForm] = useState<ContactFormValues>(
        CONTACT_INITIAL_FORM
    );
    const [errors, setErrors] = useState<ContactFieldErrors>({});
    const [status, setStatus] =
        useState<ContactSubmitStatus>(CONTACT_INITIAL_STATUS);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formStartedAtRef = useRef(0);
    const submissionLockRef = useRef(false);
    const trackedFocusRef = useRef(false);

    useEffect(() => {
        formStartedAtRef.current = Date.now();
    }, []);

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const field = event.target.name as keyof ContactFormValues;
        const value = event.target.value;

        setForm((current) => ({
            ...current,
            [field]: value
        }));
        setErrors((current) => ({
            ...current,
            [field]: undefined,
            ...(field === "preferenciaContacto" &&
            value === CONTACT_PREFERENCES.email
                ? { telefono: undefined }
                : {})
        }));

        if (status.type !== "idle") {
            setStatus(CONTACT_INITIAL_STATUS);
        }
    };

    const handleFormFocus = (
        event: FocusEvent<HTMLFormElement, Element>
    ) => {
        if (formStartedAtRef.current === 0) {
            formStartedAtRef.current = Date.now();
        }

        if (trackedFocusRef.current) return;

        const target = event.target as unknown;

        if (
            !(
                target instanceof HTMLInputElement ||
                target instanceof HTMLSelectElement ||
                target instanceof HTMLTextAreaElement
            )
        ) {
            return;
        }

        const field = target.name;

        if (!field || field === "website") return;

        trackedFocusRef.current = true;
        trackEvent("contact_form_focus", {
            section: "contacto",
            field
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (submissionLockRef.current || isSubmitting) return;

        const normalizedForm = normalizeContactForm(form);

        // Controles de UX y primera barrera anti-spam. El backend debe repetir
        // validación, sanitización, rate limiting y protección contra abuso.
        if (hasContactHoneypot(normalizedForm)) {
            setStatus({
                type: "success",
                message:
                    "Gracias. Tu consulta fue recibida y será revisada."
            });
            return;
        }

        trackEvent("contact_form_submit", {
            section: "contacto",
            project_type: normalizedForm.tipoProyecto || "not_selected"
        });

        const validationErrors = validateContactForm(normalizedForm);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setStatus({
                type: "error",
                message:
                    "Hay algunos datos para revisar antes de enviar la consulta."
            });
            trackEvent("contact_form_error", {
                section: "contacto",
                reason: "validation",
                fields: Object.keys(validationErrors).join(",")
            });
            onValidationError();
            return;
        }

        if (
            isContactSubmissionTooFast(
                formStartedAtRef.current,
                Date.now()
            )
        ) {
            setStatus({
                type: "error",
                message:
                    "Esperá unos segundos y volvé a enviar la consulta."
            });
            trackEvent("contact_form_error", {
                section: "contacto",
                reason: "submission_too_fast"
            });
            return;
        }

        submissionLockRef.current = true;
        setIsSubmitting(true);
        setErrors({});
        setStatus(CONTACT_INITIAL_STATUS);

        try {
            const payload = buildContactPayload(
                normalizedForm,
                getOriginUrl()
            );
            const response = await enviarMensajeContacto(payload);

            if (!response.ok) {
                setStatus({
                    type: "error",
                    message:
                        response.mensaje ||
                        "No se pudo enviar la consulta. Probá nuevamente o usá uno de los canales directos."
                });
                trackEvent("contact_form_error", {
                    section: "contacto",
                    reason: "backend"
                });
                return;
            }

            setForm(CONTACT_INITIAL_FORM);
            setStatus({
                type: "success",
                message:
                    "¡Consulta enviada! Voy a revisar tu proyecto y responderte de forma personalizada."
            });
            formStartedAtRef.current = Date.now();

            trackEvent("contact_form_success", {
                section: "contacto",
                project_type: normalizedForm.tipoProyecto
            });
        } catch {
            setStatus({
                type: "error",
                message:
                    "No se pudo conectar con el servidor. Probá nuevamente o escribime por WhatsApp o correo."
            });
            trackEvent("contact_form_error", {
                section: "contacto",
                reason: "network"
            });
        } finally {
            submissionLockRef.current = false;
            setIsSubmitting(false);
        }
    };

    return {
        form,
        errors,
        status,
        isSubmitting,
        handleChange,
        handleFormFocus,
        handleSubmit
    };
}

"use client";

import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    FaArrowRight,
    FaCheck,
    FaGithubSquare,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp,
    MdOutlineEmail
} from "@/components/utils/Iconos";
import { 
    mensajeEmail,
    mensajeWSP } from "@/components/utils/variables"
import {
    CONTACT_BUDGET_OPTIONS,
    CONTACT_DEADLINE_OPTIONS,
    CONTACT_PREFERENCES,
    CONTACT_PROJECT_OPTIONS,
} from "@/constants/contacto.constants";
import { useContactoForm } from "@/hooks/useContactoForm";
import style from "@/styles/sections/contacto.module.scss";
import type { PerfilType } from "@/types/perfil";

import ContactoCanales, {
    type ContactoCanalData
} from "../sub_components/ContactoCanales";
import ContactoFaq, {
    type ContactoFaqItemData
} from "../sub_components/ContactoFaq";
import SectionHeader from "../sub_components/SectionHeader";
import { trackEvent } from "../utils/Analytics";

interface Props {
    perfil: PerfilType[];
}

const CONTACT_EMAIL = "pablo_daniel_chavez@outlook.es";
const getCurrentLocationHref = () => window.location.href;

const indicadoresConfianza = [
    "Trato directo con Pablo Chavez",
    "Alcance definido según el proyecto",
    "Canales de contacto según necesidad"
];

const preguntasFrecuentes: ContactoFaqItemData[] = [
    {
        id: "inversion",
        pregunta: "¿Cómo se define el presupuesto de un proyecto?",
        respuesta:
            "El presupuesto depende del alcance, las páginas, las funciones, las integraciones y las dependencias de cada proyecto. Antes de avanzar se revisa qué corresponde incluir y qué aspectos requieren evaluación por separado."
    },
    {
        id: "tipo-sitio",
        pregunta:
            "¿Qué tipo de desarrollo web puede corresponder a mi negocio?",
        respuesta:
            "Una Landing Page Profesional puede corresponder cuando necesitás presentar una propuesta concreta. Un Sitio Web Profesional permite ordenar varios servicios o contenidos. Una Aplicación Web a Medida se evalúa cuando intervienen procesos, datos, usuarios o tareas con lógica propia."
    },
    {
        id: "seo-rendimiento",
        pregunta:
            "¿Se trabajan SEO técnico, rendimiento y diseño adaptable?",
        respuesta:
            "Estos aspectos se trabajan según las necesidades y prioridades de cada proyecto. El SEO técnico y el rendimiento no implican promesas de posiciones, tráfico ni resultados comerciales."
    },
    {
        id: "tiempos",
        pregunta: "¿Cuánto tiempo puede llevar un proyecto web?",
        respuesta:
            "Una Landing Page Profesional tiene un plazo orientativo de 5 a 10 días hábiles desde la aprobación del alcance y la recepción completa del material. Un Sitio Web Profesional puede llevar entre 20 y 35 días hábiles según el alcance y los tiempos de respuesta. Una Aplicación Web a Medida define su cronograma por etapas después del relevamiento."
    },
    {
        id: "material",
        pregunta: "¿Necesito tener listos los textos y las imágenes?",
        respuesta:
            "No necesariamente. Podemos revisar el material disponible, ordenar la información y definir qué contenidos hacen falta para avanzar."
    },
    {
        id: "publicacion",
        pregunta: "¿Qué ocurre después de publicar la web?",
        respuesta:
            "Se revisa la entrega o publicación acordada dentro del alcance del proyecto. Mantenimiento, soporte, nuevas secciones o futuras etapas pueden evaluarse por separado."
    }
];

const createProfileUrl = (
    value: string | undefined,
    baseUrl: string,
    allowedHost: string
) => {
    const cleanValue = value?.trim();

    if (!cleanValue) return null;

    if (/^https?:\/\//i.test(cleanValue)) {
        try {
            const parsedUrl = new URL(cleanValue);
            const isAllowedHost =
                parsedUrl.hostname === allowedHost ||
                parsedUrl.hostname.endsWith(`.${allowedHost}`);

            return parsedUrl.protocol === "https:" && isAllowedHost
                ? parsedUrl.toString()
                : null;
        } catch {
            return null;
        }
    }

    const handle = cleanValue.replace(/^@/, "").replace(/^\/+|\/+$/g, "");

    return /^[\w.-]+$/u.test(handle)
        ? `${baseUrl}${encodeURIComponent(handle)}`
        : null;
};

const getProfileLabel = (value: string | undefined, fallback: string) => {
    const cleanValue = value?.trim();

    if (!cleanValue) return fallback;

    if (/^https?:\/\//i.test(cleanValue)) {
        try {
            const path = new URL(cleanValue).pathname
                .split("/")
                .filter(Boolean)
                .at(-1);

            return path ? `@${path}` : fallback;
        } catch {
            return fallback;
        }
    }

    return `@${cleanValue.replace(/^@/, "")}`;
};

export default function Contacto({ perfil }: Props) {
    const [isVisible, setIsVisible] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const focusFirstError = () => {
        window.requestAnimationFrame(() => {
            formRef.current
                ?.querySelector<HTMLElement>('[aria-invalid="true"]')
                ?.focus();
        });
    };

    const {
        form,
        errors,
        status,
        isSubmitting,
        handleChange,
        handleFormFocus,
        handleSubmit
    } = useContactoForm({
        getOriginUrl: getCurrentLocationHref,
        onValidationError: focusFirstError
    });

    const user = perfil?.[0];
    const whatsappNumber = String(user?.numero_whatsapp ?? "").replace(
        /\D/g,
        ""
    );

    useEffect(() => {
        const currentSection = sectionRef.current;

        if (!currentSection || typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.12
            }
        );

        observer.observe(currentSection);

        return () => observer.disconnect();
    }, []);

    const socialLinks: ContactoCanalData[] = [
        ...(whatsappNumber.length >= 8
            ? [
                  {
                      id: "whatsapp",
                      titulo: "WhatsApp",
                      detalle: "Conversación directa",
                      url: `https://wa.me/${whatsappNumber}?text=${mensajeWSP}`,
                      icon: <FaWhatsapp aria-hidden="true" />
                  }
              ]
            : []),
        {
            id: "email",
            titulo: "Correo",
            detalle: CONTACT_EMAIL,
            url: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "Consulta desde PaginasWebChavez"
            )}&body=${mensajeEmail}`,
            icon: <MdOutlineEmail aria-hidden="true" />
        },
        ...(() => {
            const url = createProfileUrl(
                user?.nombre_linkedin,
                "https://www.linkedin.com/in/",
                "linkedin.com"
            );

            return url
                ? [
                      {
                          id: "linkedin",
                          titulo: "LinkedIn",
                          detalle: getProfileLabel(
                              user?.nombre_linkedin,
                              "Perfil profesional"
                          ),
                          url,
                          icon: <FaLinkedin aria-hidden="true" />
                      }
                  ]
                : [];
        })(),
        ...(() => {
            const url = createProfileUrl(
                user?.nombre_github,
                "https://github.com/",
                "github.com"
            );

            return url
                ? [
                      {
                          id: "github",
                          titulo: "GitHub",
                          detalle: getProfileLabel(
                              user?.nombre_github,
                              "Proyectos y código"
                          ),
                          url,
                          icon: <FaGithubSquare aria-hidden="true" />
                      }
                  ]
                : [];
        })(),
        ...(() => {
            const url = createProfileUrl(
                user?.nombre_instagram,
                "https://www.instagram.com/",
                "instagram.com"
            );

            return url
                ? [
                      {
                          id: "instagram",
                          titulo: "Instagram",
                          detalle: getProfileLabel(
                              user?.nombre_instagram,
                              "Novedades"
                          ),
                          url,
                          icon: <FaInstagram aria-hidden="true" />
                      }
                  ]
                : [];
        })()
    ];

    const handleSocialClick = (network: string) => {
        trackEvent("contact_social_click", {
            section: "contacto",
            network
        });
    };

    return (
        <section
            ref={sectionRef}
            id="contacto"
            className={`${style.contacto} ${style.contacto_piloto_conversion} ${
                isVisible ? style.contacto_visible : ""
            }`}
            aria-label="Contacto para proyectos de desarrollo web"
        >
            <div className={style.contacto_layout}>
                <header
                    className={`${style.contacto_header} ${style.contacto_reveal}`}
                >
                    <SectionHeader
                        icon={<MdOutlineEmail aria-hidden="true" />}
                        title="Hablemos de tu proyecto web"
                        description="Contame qué necesitás comunicar, ordenar o desarrollar. Podemos revisar si corresponde una Landing Page Profesional, un Sitio Web Profesional o una Aplicación Web a Medida."
                        headingLevel="h1"
                    />

                    <div className={style.contacto_value_bar}>
                        <span>
                            <FaCheck aria-hidden="true" />
                            Trato directo con Pablo Chavez
                        </span>
                        <span>
                            <FaCheck aria-hidden="true" />
                            Alcance definido según el proyecto
                        </span>
                        <span>
                            <FaCheck aria-hidden="true" />
                            Canales de contacto según necesidad
                        </span>
                    </div>
                </header>

                <div className={style.contacto_main_grid}>
                    <form
                        ref={formRef}
                        className={`${style.contacto_form} ${style.contacto_reveal} ${style.contacto_reveal_delay_one}`}
                        noValidate
                        aria-labelledby="contact-form-title"
                        aria-describedby="contact-form-intro contact-form-status"
                        onFocusCapture={handleFormFocus}
                        onSubmit={handleSubmit}
                    >
                        <div className={style.contacto_form_header}>
                            <span className={style.contacto_eyebrow}>
                                Tu consulta
                            </span>
                            <h2 id="contact-form-title">
                                Contame qué necesitás
                            </h2>
                            <p id="contact-form-intro">
                                Con estos datos puedo revisar tu consulta y
                                responder por el medio que indiques.
                            </p>
                        </div>

                        <div
                            className={style.contacto_honeypot}
                            aria-hidden="true"
                        >
                            <label htmlFor="contact-website">
                                Dejá este campo vacío
                            </label>
                            <input
                                id="contact-website"
                                name="website"
                                type="text"
                                value={form.website}
                                tabIndex={-1}
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </div>

                        <div className={style.contacto_form_row}>
                            <div className={style.contacto_field}>
                                <label htmlFor="contact-nombre">Nombre</label>
                                <input
                                    id="contact-nombre"
                                    name="nombre"
                                    type="text"
                                    value={form.nombre}
                                    minLength={2}
                                    maxLength={80}
                                    autoComplete="name"
                                    placeholder="Tu nombre"
                                    aria-invalid={Boolean(errors.nombre)}
                                    aria-describedby={
                                        errors.nombre
                                            ? "contact-nombre-error"
                                            : undefined
                                    }
                                    className={
                                        errors.nombre
                                            ? style.contacto_field_invalid
                                            : undefined
                                    }
                                    onChange={handleChange}
                                />
                                {errors.nombre && (
                                    <span
                                        id="contact-nombre-error"
                                        className={style.contacto_field_error}
                                    >
                                        {errors.nombre}
                                    </span>
                                )}
                            </div>

                            <div className={style.contacto_field}>
                                <label htmlFor="contact-correo">
                                    Correo electrónico
                                </label>
                                <input
                                    id="contact-correo"
                                    name="correo"
                                    type="email"
                                    value={form.correo}
                                    maxLength={120}
                                    inputMode="email"
                                    autoComplete="email"
                                    placeholder="nombre@empresa.com"
                                    aria-invalid={Boolean(errors.correo)}
                                    aria-describedby={
                                        errors.correo
                                            ? "contact-correo-error"
                                            : undefined
                                    }
                                    className={
                                        errors.correo
                                            ? style.contacto_field_invalid
                                            : undefined
                                    }
                                    onChange={handleChange}
                                />
                                {errors.correo && (
                                    <span
                                        id="contact-correo-error"
                                        className={style.contacto_field_error}
                                    >
                                        {errors.correo}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={style.contacto_form_row}>
                            <div className={style.contacto_field}>
                                <label htmlFor="contact-tipo-proyecto">
                                    Tipo de proyecto
                                </label>
                                <select
                                    id="contact-tipo-proyecto"
                                    name="tipoProyecto"
                                    value={form.tipoProyecto}
                                    aria-invalid={Boolean(
                                        errors.tipoProyecto
                                    )}
                                    aria-describedby={
                                        errors.tipoProyecto
                                            ? "contact-tipo-proyecto-error"
                                            : undefined
                                    }
                                    className={
                                        errors.tipoProyecto
                                            ? style.contacto_field_invalid
                                            : undefined
                                    }
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Seleccioná una opción
                                    </option>
                                    {CONTACT_PROJECT_OPTIONS.map((tipo) => (
                                        <option key={tipo} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                                {errors.tipoProyecto && (
                                    <span
                                        id="contact-tipo-proyecto-error"
                                        className={style.contacto_field_error}
                                    >
                                        {errors.tipoProyecto}
                                    </span>
                                )}
                            </div>

                            <div className={style.contacto_field}>
                                <label htmlFor="contact-presupuesto">
                                    Presupuesto estimado
                                    <span>Opcional</span>
                                </label>
                                <select
                                    id="contact-presupuesto"
                                    name="presupuesto"
                                    value={form.presupuesto}
                                    onChange={handleChange}
                                >
                                    <option value="">Sin definir</option>
                                    {CONTACT_BUDGET_OPTIONS.map((rango) => (
                                        <option key={rango} value={rango}>
                                            {rango}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={style.contacto_form_row}>
                            <div className={style.contacto_field}>
                                <label htmlFor="contact-plazo">
                                    Plazo aproximado
                                    <span>Opcional</span>
                                </label>
                                <select
                                    id="contact-plazo"
                                    name="plazo"
                                    value={form.plazo}
                                    onChange={handleChange}
                                >
                                    <option value="">Sin definir</option>
                                    {CONTACT_DEADLINE_OPTIONS.map((plazo) => (
                                        <option key={plazo} value={plazo}>
                                            {plazo}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <fieldset
                                className={style.contacto_contact_preference}
                            >
                                <legend>¿Cómo preferís la respuesta?</legend>
                                <div>
                                    <label>
                                        <input
                                            name="preferenciaContacto"
                                            type="radio"
                                            value={CONTACT_PREFERENCES.email}
                                            checked={
                                                form.preferenciaContacto ===
                                                CONTACT_PREFERENCES.email
                                            }
                                            onChange={handleChange}
                                        />
                                        <span>Email</span>
                                    </label>
                                    <label>
                                        <input
                                            name="preferenciaContacto"
                                            type="radio"
                                            value={
                                                CONTACT_PREFERENCES.whatsapp
                                            }
                                            checked={
                                                form.preferenciaContacto ===
                                                CONTACT_PREFERENCES.whatsapp
                                            }
                                            onChange={handleChange}
                                        />
                                        <span>WhatsApp</span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        {form.preferenciaContacto ===
                            CONTACT_PREFERENCES.whatsapp && (
                            <div className={style.contacto_field}>
                                <label htmlFor="contact-telefono">
                                    Tu número de WhatsApp
                                </label>
                                <input
                                    id="contact-telefono"
                                    name="telefono"
                                    type="tel"
                                    value={form.telefono}
                                    maxLength={30}
                                    inputMode="tel"
                                    autoComplete="tel"
                                    placeholder="+54 9 11 1234 5678"
                                    aria-invalid={Boolean(errors.telefono)}
                                    aria-describedby={
                                        errors.telefono
                                            ? "contact-telefono-error"
                                            : "contact-telefono-help"
                                    }
                                    className={
                                        errors.telefono
                                            ? style.contacto_field_invalid
                                            : undefined
                                    }
                                    onChange={handleChange}
                                />
                                <span
                                    id="contact-telefono-help"
                                    className={style.contacto_field_help}
                                >
                                    Incluí código de país y área.
                                </span>
                                {errors.telefono && (
                                    <span
                                        id="contact-telefono-error"
                                        className={style.contacto_field_error}
                                    >
                                        {errors.telefono}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className={style.contacto_field}>
                            <label htmlFor="contact-mensaje">
                                Sobre el proyecto
                            </label>
                            <textarea
                                id="contact-mensaje"
                                name="mensaje"
                                rows={7}
                                value={form.mensaje}
                                minLength={20}
                                maxLength={2000}
                                autoComplete="off"
                                placeholder="Contame sobre tu negocio, qué querés lograr con el sitio y si ya tenés contenido o una web actual."
                                aria-invalid={Boolean(errors.mensaje)}
                                aria-describedby={`contact-mensaje-help${
                                    errors.mensaje
                                        ? " contact-mensaje-error"
                                        : ""
                                }`}
                                className={
                                    errors.mensaje
                                        ? style.contacto_field_invalid
                                        : undefined
                                }
                                onChange={handleChange}
                            />
                            <div className={style.contacto_field_meta}>
                                <span
                                    id="contact-mensaje-help"
                                    className={style.contacto_field_help}
                                >
                                    No incluyas contraseñas ni datos sensibles.
                                </span>
                                <span aria-label="Caracteres utilizados">
                                    {form.mensaje.length}/2000
                                </span>
                            </div>
                            {errors.mensaje && (
                                <span
                                    id="contact-mensaje-error"
                                    className={style.contacto_field_error}
                                >
                                    {errors.mensaje}
                                </span>
                            )}
                        </div>

                        <div
                            id="contact-form-status"
                            className={`${style.contacto_status} ${
                                status.type === "success"
                                    ? style.contacto_status_success
                                    : ""
                            } ${
                                status.type === "error"
                                    ? style.contacto_status_error
                                    : ""
                            }`}
                            role={
                                status.type === "error" ? "alert" : "status"
                            }
                            aria-live={
                                status.type === "error"
                                    ? "assertive"
                                    : "polite"
                            }
                        >
                            {status.message}
                        </div>

                        <button
                            type="submit"
                            className={style.contacto_submit}
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                        >
                            {isSubmitting && (
                                <span
                                    className={style.contacto_spinner}
                                    aria-hidden="true"
                                />
                            )}
                            {isSubmitting
                                ? "Enviando consulta..."
                                : "Enviar consulta"}
                            {!isSubmitting && (
                                <FaArrowRight aria-hidden="true" />
                            )}
                        </button>

                        <p className={style.contacto_privacy}>
                            Tus datos se utilizarán para responder esta
                            consulta por el medio indicado.
                        </p>
                    </form>

                    <ContactoCanales
                        indicadores={indicadoresConfianza}
                        canales={socialLinks}
                        onSocialClick={handleSocialClick}
                    />
                </div>

                <ContactoFaq items={preguntasFrecuentes} />
            </div>
        </section>
    );
}

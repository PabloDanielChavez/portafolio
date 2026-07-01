"use client";

import {
    useEffect,
    useRef,
    useState,
    type ReactNode
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
    CONTACT_BUDGET_OPTIONS,
    CONTACT_DEADLINE_OPTIONS,
    CONTACT_PREFERENCES,
    CONTACT_PROJECT_OPTIONS
} from "@/constants/contacto.constants";
import { useContactoForm } from "@/hooks/useContactoForm";
import style from "@/styles/sections/contacto.module.scss";
import type { PerfilType } from "@/types/perfil";

import ContactoFaq, {
    type ContactoFaqItemData
} from "../sub_components/ContactoFaq";
import SectionHeader from "../sub_components/SectionHeader";
import { trackEvent } from "../utils/Analytics";

interface Props {
    perfil: PerfilType[];
}

type SocialLink = {
    id: string;
    titulo: string;
    detalle: string;
    url: string;
    icon: ReactNode;
};

const CONTACT_EMAIL = "pablo_daniel_chavez@outlook.es";
const getCurrentLocationHref = () => window.location.href;

const indicadoresConfianza = [
    "Respuesta clara y personalizada",
    "Diseño responsive",
    "SEO técnico desde la base",
    "Optimización de rendimiento",
    "Integración con WhatsApp",
    "Sitios enfocados en generar consultas"
];

const preguntasFrecuentes: ContactoFaqItemData[] = [
    {
        id: "inversion",
        pregunta: "¿Cuánto cuesta desarrollar una página web profesional?",
        respuesta:
            "La inversión depende del alcance, la cantidad de secciones, las integraciones y los objetivos comerciales. Después de analizar tu consulta recibirás una propuesta clara, sin costos ocultos y adaptada a las necesidades reales del proyecto."
    },
    {
        id: "tipo-sitio",
        pregunta: "¿Qué tipo de sitio web necesita mi negocio?",
        respuesta:
            "Una landing page funciona muy bien para una campaña o servicio puntual; un sitio web profesional presenta una empresa de forma integral; y una tienda online permite vender productos. En el análisis inicial definimos la alternativa con mejor relación entre inversión y objetivos."
    },
    {
        id: "seo-rendimiento",
        pregunta: "¿El desarrollo incluye SEO, velocidad y diseño responsive?",
        respuesta:
            "Sí. Cada proyecto se construye con estructura semántica, SEO técnico, adaptación a celulares y buenas prácticas de rendimiento. El objetivo es lograr una experiencia rápida, clara y preparada para convertir visitas en oportunidades."
    },
    {
        id: "tiempos",
        pregunta: "¿Cuánto tiempo demora un proyecto web?",
        respuesta:
            "Una landing page puede resolverse en pocas semanas, mientras que una tienda online o un desarrollo a medida requiere más planificación. Antes de comenzar acordamos alcance, etapas y un cronograma realista."
    },
    {
        id: "material",
        pregunta: "¿Necesito tener listos los textos y las imágenes?",
        respuesta:
            "No necesariamente. Podemos ordenar el contenido existente y definir qué materiales hacen falta. También recibirás orientación para que cada texto, llamada a la acción e imagen ayude a comunicar mejor el valor de tu negocio."
    },
    {
        id: "publicacion",
        pregunta: "¿Qué sucede después de publicar el sitio?",
        respuesta:
            "El sitio queda configurado y listo para operar. Según el proyecto, también podemos planificar mantenimiento, medición con Analytics, mejoras SEO, nuevas secciones y optimizaciones basadas en resultados reales."
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

    const socialLinks: SocialLink[] = [
        ...(whatsappNumber.length >= 8
            ? [
                  {
                      id: "whatsapp",
                      titulo: "WhatsApp",
                      detalle: "Conversación directa",
                      url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                          "Hola Pablo, vi tu portfolio y me gustaría conversar sobre un proyecto web."
                      )}`,
                      icon: <FaWhatsapp aria-hidden="true" />
                  }
              ]
            : []),
        {
            id: "email",
            titulo: "Correo",
            detalle: CONTACT_EMAIL,
            url: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "Consulta desde el portfolio"
            )}`,
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

    return (
        <section
            ref={sectionRef}
            id="contacto"
            className={`${style.contacto} ${
                isVisible ? style.contacto_visible : ""
            }`}
            aria-label="Solicitar presupuesto de desarrollo web"
        >
            <div className={style.contacto_layout}>
                <header
                    className={`${style.contacto_header} ${style.contacto_reveal}`}
                >
                    <SectionHeader
                        icon={<MdOutlineEmail aria-hidden="true" />}
                        title="Hablemos de tu próximo proyecto web"
                        description="Solicitá un presupuesto o una primera orientación para crear una landing page, un sitio web profesional, una tienda online o un desarrollo a medida."
                        headingLevel="h1"
                    />

                    <div className={style.contacto_value_bar}>
                        <span>
                            <FaCheck aria-hidden="true" />
                            Análisis inicial sin compromiso
                        </span>
                        <span>
                            <FaCheck aria-hidden="true" />
                            Respuesta clara y personalizada
                        </span>
                        <span>
                            <FaCheck aria-hidden="true" />
                            Foco en rendimiento, SEO y conversión
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
                            <h3 id="contact-form-title">
                                Contame qué necesitás
                            </h3>
                            <p id="contact-form-intro">
                                Con estos datos puedo darte una primera
                                respuesta más útil, concreta y alineada con tu
                                negocio.
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
                                    <option value="">Seleccioná una opción</option>
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

                        {form.preferenciaContacto === CONTACT_PREFERENCES.whatsapp && (
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
                                : "Solicitar una primera orientación"}
                            {!isSubmitting && (
                                <FaArrowRight aria-hidden="true" />
                            )}
                        </button>

                        <p className={style.contacto_privacy}>
                            Tus datos se usan únicamente para responder esta
                            consulta. No se comparten ni se utilizan para enviar
                            publicidad.
                        </p>
                    </form>

                    <aside
                        className={`${style.contacto_sidebar} ${style.contacto_reveal} ${style.contacto_reveal_delay_two}`}
                        aria-label="Garantías y canales de contacto"
                    >
                        <div className={style.contacto_trust_panel}>
                            <span className={style.contacto_eyebrow}>
                                Una solución pensada para tu negocio
                            </span>
                            <h3>Más que una web visualmente atractiva</h3>
                            <p>
                                Cada decisión de diseño y desarrollo busca que
                                tu sitio sea fácil de usar, rápido y capaz de
                                convertir visitas en consultas reales.
                            </p>
                            <ul className={style.contacto_trust_grid}>
                                {indicadoresConfianza.map((indicador) => (
                                    <li key={indicador}>
                                        <FaCheck aria-hidden="true" />
                                        <span>{indicador}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={style.contacto_channels_panel}>
                            <div className={style.contacto_panel_heading}>
                                <div>
                                    <span className={style.contacto_eyebrow}>
                                        Canales directos
                                    </span>
                                    <h3>Elegí cómo conversar</h3>
                                </div>
                                <span className={style.contacto_availability}>
                                    Disponible para nuevos proyectos
                                </span>
                            </div>

                            <div className={style.contacto_social_grid}>
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={style.contacto_social_card}
                                        aria-label={`Contactar por ${social.titulo}`}
                                        onClick={() =>
                                            trackEvent(
                                                "contact_social_click",
                                                {
                                                    section: "contacto",
                                                    network: social.id
                                                }
                                            )
                                        }
                                    >
                                        <span
                                            className={
                                                style.contacto_social_icon
                                            }
                                        >
                                            {social.icon}
                                        </span>
                                        <span
                                            className={
                                                style.contacto_social_info
                                            }
                                        >
                                            <strong>{social.titulo}</strong>
                                            <small>{social.detalle}</small>
                                        </span>
                                        <FaArrowRight
                                            className={
                                                style.contacto_social_arrow
                                            }
                                            aria-hidden="true"
                                        />
                                    </a>
                                ))}
                            </div>

                            <p className={style.contacto_response_note}>
                                Sin mensajes automáticos ni
                                propuestas genéricas.
                            </p>
                        </div>
                    </aside>
                </div>

                <ContactoFaq items={preguntasFrecuentes} />
            </div>
        </section>
    );
}

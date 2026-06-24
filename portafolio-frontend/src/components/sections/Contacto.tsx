"use client";

import { ReactNode, useState } from "react"; // <-- Agregamos useState
import style from "@/styles/sections/contacto.module.scss";
import SectionHeader from "../sub_components/SectionHeader";
import { PerfilType } from "@/types/perfil";
import { enviarMensajeContacto } from "@/services/fetchData";
import Link from "next/link";
import { FaArrowRight, FaGithubSquare, FaInstagram, FaLinkedin, FaMinus, FaPlus, FaWhatsapp, MdOutlineEmail, BsQuestionCircle } from "@/components/utils/Iconos";
import { trackEvent } from "../utils/Analytics";

interface Props {
    perfil: PerfilType[];
}

// Define la estructura de tu objeto de pregunta
interface Pregunta {
    id: number | string;
    pregunta: string;
    respuesta: string;
}

// Define las props que recibe tu componente
interface FaqItemProps {
    pf: Pregunta;
    style: {
        [key: string]: string; // Esto acepta cualquier nombre de clase que venga del módulo CSS
    };
}

export default function Contacto({ perfil }: Props) {
    const user = perfil?.[0];

    // ================= ESTADOS DEL FORMULARIO =================
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // ================= LÓGICA DE ENVÍO =================
    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        const datosDelFormulario = {
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            origen_url: window.location.href 
        };
        
        const respuesta = await enviarMensajeContacto(datosDelFormulario);

        if (respuesta.ok) {
            alert(respuesta.mensaje);
            setNombre("");
            setCorreo("");
            setMensaje("");
        } else {
            alert("Hubo un problema: " + respuesta.mensaje);
        }
    };
    
    const redesSociales = [
        { name: "whatsapp", icon: <FaWhatsapp size={22}/>, url: `https://wa.me/${user?.numero_whatsapp}`, titulo: "WhatsApp", dato: `${user?.numero_whatsapp}` },
        { name: "Linkedin", icon: <FaLinkedin size={22}/>, url: `https://www.linkedin.com/in/${user?.nombre_linkedin}`, titulo: "LinkedIn", dato: `${user?.nombre_linkedin}` },
        { name: "Github", icon: <FaGithubSquare size={22}/>, url: `https://github.com/${user?.nombre_github}`, titulo: "GitHub", dato: `${user?.nombre_github}` },
        { name: "Instagram", icon: <FaInstagram size={22}/>, url: `https://www.instagram.com/${user?.nombre_instagram}`, titulo: "Instagram", dato: `${user?.nombre_instagram}` },
    ];

    const preguntasFrecuentes = [
        {id: "1",pregunta: "¿Cómo puede un sitio web profesional ayudar a conseguir más clientes?",respuesta: `Un sitio web profesional funciona como una herramienta de ventas disponible las 24 horas. Permite mostrar tus servicios, transmitir confianza, destacar frente a la competencia y convertir visitantes en potenciales clientes mediante una experiencia optimizada para la conversión.`},
        {id: "2",pregunta: "¿Qué tipo de página web necesita mi negocio?",respuesta: `Depende de tus objetivos. Una Landing Page es ideal para promocionar un servicio o campaña específica. Un Sitio Web Profesional permite presentar tu empresa de forma completa y fortalecer tu presencia digital. Si necesitas procesos personalizados, automatizaciones o sistemas específicos, el Desarrollo Web a Medida es la mejor opción.`},
        {id: "3",pregunta: "¿Mi sitio web estará optimizado para aparecer en Google?",respuesta: `Sí. Todos los proyectos incluyen optimización SEO técnica, estructura semántica, tiempos de carga optimizados, URLs amigables y configuración de herramientas como Google Analytics y Google Search Console para mejorar la visibilidad en los motores de búsqueda.`},
        {id: "4",pregunta: "¿Desarrollas sitios web adaptados a celulares y dispositivos móviles?",respuesta: `Sí. Cada proyecto cuenta con diseño responsive para garantizar una experiencia fluida en computadoras, tablets y smartphones. Esto no solo mejora la experiencia del usuario, sino que también es un factor importante para el posicionamiento en Google.`},
        {id: "5",pregunta: "¿Qué diferencia existe entre una página web económica y un sitio web profesional?",respuesta: `Un sitio web profesional no se enfoca únicamente en el diseño visual. Se desarrolla considerando rendimiento, posicionamiento SEO, experiencia de usuario, velocidad de carga, medición de resultados y estrategias orientadas a generar oportunidades de negocio.`},
        {id: "6",pregunta: "¿Cuánto tiempo demora el desarrollo de una página web?",respuesta: `El tiempo varía según la complejidad del proyecto. Una Landing Page puede completarse en pocos días, mientras que un sitio corporativo o un desarrollo a medida requiere una planificación más extensa. Antes de comenzar recibirás un cronograma claro con cada etapa del proceso.`},
        {id: "7",pregunta: "¿Puedo integrar WhatsApp, formularios, reservas o sistemas personalizados?",respuesta: `Sí. Es posible integrar WhatsApp, formularios avanzados, sistemas de reservas, paneles de administración, bases de datos, APIs externas y otras funcionalidades diseñadas para optimizar procesos y mejorar la comunicación con tus clientes.`},
        {id: "8",pregunta: "¿Qué sucede después de publicar mi sitio web?",respuesta: `Una vez publicado, tu sitio puede seguir evolucionando. Ofrezco soporte, mantenimiento, optimización continua, análisis de métricas y mejoras orientadas a aumentar el rendimiento, la seguridad y los resultados de tu presencia digital.`},
        {id: "9",pregunta: "¿Cómo es el proceso de creación de una página web?",respuesta: `El proceso comienza con una reunión para comprender los objetivos de tu negocio. Luego se desarrolla una propuesta visual, se construye la solución web y finalmente se publica el proyecto completamente configurado y listo para recibir visitantes y potenciales clientes.`}
    ];
        

    
    const mitad = Math.ceil(preguntasFrecuentes.length / 2);
    const col1 = preguntasFrecuentes.slice(0, mitad);
    const col2 = preguntasFrecuentes.slice(mitad);

    const FaqItem = ({ pf, style }: FaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

        return (
            <article className={style.contacto_faq_article}>
                <div 
                    className={style.contacto_faq_header} 
                    onClick={() => {
                        setIsOpen(!isOpen)
                        trackEvent(`click_WhatsApp`, {
                            section: "contacto"
                        })
                    }}
                >
                    <span className={style.contacto_faq_pregunta}>{pf.pregunta}</span>
                    <button aria-label="Alternar preguntas frecuentes" aria-describedby={`titulo-${pf.pregunta}`} type="button" className={style.contacto_faq_btn_toggle}>
                        {isOpen ? <FaMinus size={22} /> : <FaPlus size={22} />}
                    </button>
                </div>
                <div
                    className={`
                        ${style.contacto_faq_article_footer}
                        ${isOpen ? style.contacto_faq_abierto : ""}
                    `}
                >
                    <p className={style.contacto_faq_parrafo}>{pf.respuesta}</p>
                </div>
            </article>
        );
    };

    return (
        <section className={style.contacto}>
            <div className={style.contacto_layout}>
                <article className={style.contacto_header}>
                    <SectionHeader 
                        icon={<MdOutlineEmail />} 
                        title="Contacto" 
                        description="Conéctate conmigo hoy. ¡Creemos algo asombroso juntos!" 
                    />
                    <div className={style.contacto_contenido_box}>
                        <div className={style.contacto_contenido_box_layout}>
                            <form className={style.contacto_form} onSubmit={manejarEnvio}>
                                <div className={style.contacto_form_group_row}>
                                    <input 
                                        type="text" 
                                        placeholder="Nombre" 
                                        className={style.contacto_form_input} 
                                        required 
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        onClick={() => 
                                            trackEvent(`click_formulario_nombre`, {
                                                section: "contacto"
                                            })
                                        }
                                        
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Correo electrónico" 
                                        className={style.contacto_form_input} 
                                        required 
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        onClick={() => 
                                            trackEvent(`click_formulario_correo`, {
                                                section: "contacto"
                                            })
                                        }
                                    />
                                </div>
                                <div className={style.contacto_form_group}>
                                    <textarea 
                                        placeholder="Mensaje" 
                                        className={style.contacto_form_textarea} 
                                        rows={6}
                                        required 
                                        value={mensaje} 
                                        onChange={(e) => setMensaje(e.target.value)}
                                        onClick={() => 
                                            trackEvent(`click_formulario_mensaje`, {
                                                section: "contacto"
                                            })
                                        }
                                    />
                                </div>
                                <button type="submit" className={style.contacto_form_submit}>
                                    Enviar tu Mensaje
                                </button>
                                <div className={style.contacto_action_buttons}>
                                    <Link 
                                        href="mailto:pablo_daniel_chavez@outlook.es?subject=Contacto%20desde%20el%20Portafolio&body=Hola%20Pablo,%0A%0AVi%20tu%20portafolio%20y%20me%20gustaría%20que%20hablemos%20sobre%20un%20proyecto..." 
                                        className={style.contacto_btn_action} 
                                        aria-label="Enviar correo electrónico"
                                        onClick={() => 
                                            trackEvent("social_click", {
                                                section: "contacto",
                                                network: "correo"
                                            })
                                        }
                                    >
                                        <MdOutlineEmail size={18} />
                                        <span>CORREO</span>
                                    </Link>
                                    <Link 
                                        href="https://wa.me/5491164095414?text=*Contacto%20desde%20el%20Portafolio*%0A%0AHola%20Pablo%2C%0A%0AVi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20que%20hablemos%20sobre%20un%20proyecto..." 
                                        className={style.contacto_btn_action} 
                                        aria-label="Chatear por WhatsApp"
                                        onClick={() => 
                                            trackEvent("social_click", {
                                                section: "contacto",
                                                network: "whatsapp"
                                            })
                                        }
                                    >
                                        <FaWhatsapp size={18} />
                                        <span>WHATSAPP</span>
                                    </Link>
                                </div>
                                <p className={style.contacto_form_parrafo}>Para asegurar un funcionamiento óptimo y proteger la integridad de este sitio, se procesan datos técnicos básicos (dispositivo, navegador y momento del envío) durante el contacto.</p>
                            </form>
                            <div className={style.contacto_social_grid}>
                                {redesSociales && redesSociales.map((red) => (
                                    <Link 
                                        key={red.name} 
                                        href={red.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={style.contacto_social_card}
                                        aria-label={`Síguenos en ${red.titulo}`}
                                        onClick={() => 
                                            trackEvent("social_click", {
                                                section: "contacto",
                                                network: `${red.name}`
                                            })
                                        }
                                    >
                                        <div className={style.contacto_social_card_left}>
                                            <div className={style.contacto_social_icon}>
                                                {red.icon}
                                            </div>
                                            <div className={style.contacto_social_info}>
                                                <span className={style.contacto_social_count}>{red.dato}</span>
                                            </div>
                                        </div>
                                        <div className={style.contacto_social_arrow}>
                                            <FaArrowRight />
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>
                </article>
                <hr className={style.contacto_divider} />
                <article className={style.contacto_faqs_section}>
                    <SectionHeader 
                        icon={<BsQuestionCircle />} 
                        title="Consultas comunes" 
                        description="Obtenga respuestas a preguntas Frecuentes sobre Diseño y Desarrollo Web" 
                    />

                    <div className={style.contacto_faqs_layout}>
                        <div className={style.contacto_faqs_columna}>
                            {col1.map((pf) => (
                                <FaqItem key={pf.id} pf={pf} style={style} />
                            ))}
                        </div>
                        <div className={style.contacto_faqs_columna}>
                            {col2.map((pf) => (
                                <FaqItem key={pf.id} pf={pf} style={style} />
                            ))}
                        </div>
                    </div>
                </article>

            </div>
        </section>
    );
}
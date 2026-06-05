"use client";

import { ReactNode, useState } from "react"; // <-- Agregamos useState
import style_contacto from "@/styles/sections/contacto.module.scss";
import { FaArrowRight, FaPlus, FaInstagram, FaLinkedin, FaDribbble, FaWhatsapp, FaGithubSquare, FaFacebookSquare, FaMinus } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import { MdOutlineEmail, MdCall } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import SectionHeader from "../sub_components/SectionHeader";
import { PerfilType } from "@/types/perfil";
import { enviarMensajeContacto } from "@/services/fetchData";
import Link from "next/link";
import { UAParser } from 'ua-parser-js';

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
        { id:"1", pregunta: "¿Puedes trabajar con clientes de forma remota?", respuesta: `¡absolutamente! Tengo experiencia trabajando con clientes de todo el mundo. A través de canales de comunicación eficaces, como correo electrónico, videollamadas y herramientas de gestión de proyectos, garantizo una colaboración perfecta independientemente de la ubicación geográfica.` },
        { id:"2", pregunta: "¿mi sitio web será compatible con dispositivos móviles?", respuesta: `¡absolutamente! La capacidad de respuesta móvil es una prioridad absoluta en el panorama digital actual. Diseño y desarrollo sitios web que respondan completamente y se adapten perfectamente a diversos dispositivos y tamaños de pantalla. Su sitio web proporcionará una experiencia de usuario óptima, ya sea que se acceda desde computadoras de escritorio, teléfonos inteligentes o tabletas.` },
        { id:"3", pregunta: "¿Cuánto tiempo suele tardar en completar un proyecto?", respuesta: `El cronograma de cada proyecto varía según su alcance y complejidad. Factores como la cantidad de páginas, las funcionalidades requeridas y el proceso de comentarios de los clientes pueden afectar la línea de tiempo. Al analizar los requisitos de su proyecto, le proporcionaré un cronograma realista y lo mantendré actualizado durante todo el proceso.` },
        { id:"4", pregunta: "¿Puedes integrar herramientas de terceros en mi sitio web?", respuesta: `Valoro sus aportes y colaboración durante todo el proceso de diseño. Al completar el diseño inicial, le brindo la oportunidad de revisar y brindar comentarios. Incorporo sus sugerencias y revisiones para garantizar que el producto final se alinee con su visión.` },
        { id:"5", pregunta: "¿Ofrecen mantenimiento del sitio web?", respuesta: `Sí, ofrezco servicios de mantenimiento de sitios web para garantizar que su sitio web se mantenga actualizado, seguro y optimizado. Desde actualizaciones de contenido y correcciones de errores hasta optimización del rendimiento y mejoras de seguridad, puedo brindar soporte continuo para mantener su sitio web funcionando sin problemas.` },
        { id:"6", pregunta: "¿Cómo maneja las revisiones del sitio web?", respuesta: `Los términos de pago pueden variar según el alcance y la duración del proyecto. Generalmente, necesito un porcentaje del costo total del proyecto como depósito inicial antes de comenzar el trabajo.` },
        { id:"7", pregunta: "¿Puedes optimizar mi sitio web?", respuesta: `¡ciertamente! Incorporo las mejores prácticas de optimización de motores de búsqueda (SEO) en mi proceso de diseño web. Esto incluye el uso de palabras clave relevantes, la optimización de metaetiquetas, la creación de URL compatibles con los motores de búsqueda y garantizar que su sitio web tenga una base sólida para una mejor visibilidad de los motores de búsqueda.` },
        { id:"8", pregunta: "¿Cuáles son sus condiciones de pago?", respuesta: `Los términos de pago pueden variar según el alcance y la duración del proyecto. Generalmente, necesito un porcentaje del costo total del proyecto como depósito inicial antes de comenzar el trabajo.` }
    ];
    
    const mitad = Math.ceil(preguntasFrecuentes.length / 2);
    const col1 = preguntasFrecuentes.slice(0, mitad);
    const col2 = preguntasFrecuentes.slice(mitad);

    const FaqItem = ({ pf, style }: FaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

        return (
            <article className={style.contacto_faq_article}>
                <div 
                    className={style.contacto_faq_article_header} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={style.contacto_faq_pregunta}>{pf.pregunta}</span>
                    <button aria-label="Alternar preguntas frecuentes" aria-describedby={`titulo-${pf.pregunta}`} type="button" className={style.contacto_faq_btn_toggle}>
                        {isOpen ? <FaMinus size={22} /> : <FaPlus size={22} />}
                    </button>
                </div>
                <div className={`${style.contacto_faq_article_footer} ${isOpen ? style.abierto : ''}`}>
                    <p className={style.contacto_faq_parrafo}>{pf.respuesta}</p>
                </div>
            </article>
        );
    };

    return (
        <section className={style_contacto.contacto}>
            <div className={style_contacto.contacto_layout}>
                <article className={style_contacto.contacto_header}>
                    <SectionHeader 
                        icon={<MdOutlineEmail />} 
                        title="Contacto" 
                        description="Conéctate conmigo hoy. ¡Creemos algo asombroso juntos!" 
                    />
                    <div className={style_contacto.contacto_contenido_box}>
                        <div className={style_contacto.contacto_contenido_box_layout}>
                            <form className={style_contacto.contacto_form} onSubmit={manejarEnvio}>
                                <div className={style_contacto.contacto_form_group_row}>
                                    <input 
                                        type="text" 
                                        placeholder="Nombre" 
                                        className={style_contacto.contacto_form_input} 
                                        required 
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Correo electrónico" 
                                        className={style_contacto.contacto_form_input} 
                                        required 
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>
                                <div className={style_contacto.contacto_form_group}>
                                    <textarea 
                                        placeholder="Mensaje" 
                                        className={style_contacto.contacto_form_textarea} 
                                        rows={6}
                                        required 
                                        value={mensaje} 
                                        onChange={(e) => setMensaje(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className={style_contacto.contacto_form_submit}>
                                    Enviar tu Mensaje
                                </button>
                                <div className={style_contacto.contacto_action_buttons}>
                                    <Link href="mailto:pablo_daniel_chavez@outlook.es?subject=Contacto%20desde%20el%20Portafolio&body=Hola%20Pablo,%0A%0AVi%20tu%20portafolio%20y%20me%20gustaría%20que%20hablemos%20sobre%20un%20proyecto..." className={style_contacto.contacto_btn_action}>
                                        <MdOutlineEmail size={18} />
                                        <span>CORREO</span>
                                    </Link>
                                    <Link href="https://wa.me/5491164095414?text=*Contacto%20desde%20el%20Portafolio*%0A%0AHola%20Pablo%2C%0A%0AVi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20que%20hablemos%20sobre%20un%20proyecto..." className={style_contacto.contacto_btn_action}>
                                        <FaWhatsapp size={18} />
                                        <span>WHATSAPP</span>
                                    </Link>
                                </div>
                                <p className={style_contacto.contacto_form_parrafo}>Para asegurar un funcionamiento óptimo y proteger la integridad de este sitio, se procesan datos técnicos básicos (dispositivo, navegador y momento del envío) durante el contacto.</p>
                            </form>
                            <div className={style_contacto.contacto_social_grid}>
                                {redesSociales && redesSociales.map((red) => (
                                    <Link 
                                        key={red.name} 
                                        href={red.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={style_contacto.contacto_social_card}
                                    >
                                        <div className={style_contacto.contacto_social_card_left}>
                                            <div className={style_contacto.contacto_social_icon}>
                                                {red.icon}
                                            </div>
                                            <div className={style_contacto.contacto_social_info}>
                                                <h4 className={style_contacto.contacto_social_count}>{red.dato}</h4>
                                            </div>
                                        </div>
                                        <div className={style_contacto.contacto_social_arrow}>
                                            <FaArrowRight />
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>
                </article>
                <hr className={style_contacto.contacto_divider} />
                <article className={style_contacto.contacto_faqs_section}>
                    <SectionHeader 
                        icon={<BsQuestionCircle />} 
                        title="Consultas comunes" 
                        description="Obtenga respuestas a consultas comunes." 
                    />

                    <div className={style_contacto.contacto_faqs_layout}>
                        <div className={style_contacto.contacto_faqs_columna}>
                            {col1.map((pf) => (
                                <FaqItem key={pf.id} pf={pf} style={style_contacto} />
                            ))}
                        </div>
                        <div className={style_contacto.contacto_faqs_columna}>
                            {col2.map((pf) => (
                                <FaqItem key={pf.id} pf={pf} style={style_contacto} />
                            ))}
                        </div>
                    </div>
                </article>

            </div>
        </section>
    );
}
"use client";

import { ReactNode, useState } from "react"; // <-- Agregamos useState
import style_contacto from "@/styles/sections/contacto.module.scss";
import { FaArrowRight, FaPlus, FaInstagram, FaLinkedin, FaDribbble, FaWhatsapp, FaGithubSquare, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import { MdOutlineEmail, MdCall } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import SectionHeader from "./sub_components/SectionHeader";
import { PerfilType } from "@/types/perfil";
import { enviarMensajeContacto } from "@/services/fetchData";
import Link from "next/link";

interface Props {
    perfil: PerfilType[];
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
            mensaje: mensaje
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
        { name: "whatsapp", icon: <FaWhatsapp />, url: `https://wa.me/${user?.numero_whatsapp}`, seguidores: 10 },
        { name: "Linkedin", icon: <FaLinkedin />, url: `https://www.linkedin.com/in/${user?.nombre_linkedin}`, seguidores: 10 },
        { name: "Github", icon: <FaGithubSquare />, url: `https://github.com/${user?.nombre_github}`, seguidores: 10 },
        { name: "Facebook", icon: <FaFacebookSquare />, url: `https://www.facebook.com/${user?.nombre_facebook}`, seguidores: 10 },
        { name: "Instagram", icon: <FaInstagram />, url: `https://www.instagram.com/${user?.nombre_instagram}` , seguidores: 10},
    ];

    return (
        <section className={style_contacto.contacto}>
            <div className={style_contacto.contacto_layout}>
                
                {/* ================= SECCIÓN CONTACTO ================= */}
                <article className={style_contacto.contacto_header}>
                    <SectionHeader 
                        icon={<MdOutlineEmail />} 
                        title="Me encanta que estes aquí." 
                        description="Conéctate conmigo hoy. ¡Creemos algo asombroso juntos!" 
                    />
                    
                    {/* Botones de acción rápida superiores */}
                    <div className={style_contacto.contacto_action_buttons}>
                        <Link href="mailto:pablo_daniel_chavez@outlook.es?subject=Contacto%20desde%20el%20Portafolio&body=Hola%20Pablo,%0A%0AVi%20tu%20portafolio%20y%20me%20gustaría%20que%20hablemos%20sobre%20un%20proyecto..." className={style_contacto.contacto_btn_action}>
                            <MdOutlineEmail size={18} />
                            <span>ENVÍAME UN CORREO</span>
                        </Link>
                        <Link href="https://wa.me/5491154096414?text=*Contacto%20desde%20el%20Portafolio*%0A%0AHola%20Pablo%2C%0A%0AVi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20que%20hablemos%20sobre%20un%20proyecto..." className={style_contacto.contacto_btn_action}>
                            <FaWhatsapp size={18} />
                            <span>ENVÍAME UN MENSAJE</span>
                        </Link>
                    </div>

                    {/* Caja contenedora del Formulario + Redes */}
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
                                        value={correo} // <-- Conectado al estado
                                        onChange={(e) => setCorreo(e.target.value)} // <-- Actualiza el estado
                                    />
                                </div>
                                <div className={style_contacto.contacto_form_group}>
                                    <textarea 
                                        placeholder="Mensaje" 
                                        className={style_contacto.contacto_form_textarea} 
                                        rows={6}
                                        required 
                                        value={mensaje} // <-- Conectado al estado
                                        onChange={(e) => setMensaje(e.target.value)} // <-- Actualiza el estado
                                    />
                                </div>
                                <button type="submit" className={style_contacto.contacto_form_submit}>
                                    Enviar tu Mensaje
                                </button>
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
                                                <h4 className={style_contacto.contacto_social_count}>{red.seguidores}</h4>
                                                <span className={style_contacto.contacto_social_label}>Seguidores</span>
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

                {/* ================= SECCIÓN CONSULTAS COMUNES (FAQs) ================= */}
                <article className={style_contacto.contacto_faqs_section}>
                    <SectionHeader 
                        icon={<BsQuestionCircle />} 
                        title="Consultas comunes" 
                        description="Obtenga respuestas a consultas comunes. Sus preguntas, abordadas simplemente." 
                    />

                    <div className={style_contacto.contacto_faqs_grid}>
                        
                        {/* {faqs && faqs.map((faq) => (
                            <div key={faq.id} className={style_contacto.contacto_faq_item}>
                                <span className={style_contacto.contacto_faq_pregunta}>{faq.pregunta}</span>
                                <button type="button" className={style_contacto.contacto_faq_btn_toggle}>
                                    <FaPlus />
                                </button>
                            </div>
                        ))} */}
                    </div>
                </article>

            </div>
        </section>
    );
}
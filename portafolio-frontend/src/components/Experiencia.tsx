"use client";

import { ReactNode } from "react";
import style_experiencia from "@/styles/sections/experiencia.module.scss"
import { 
    FaWhatsapp, 
    FaLinkedin
} from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SiCodefactor } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { BiBriefcase } from "react-icons/bi";

export default function Experiencia() {

  return (
    <article className={style_experiencia.experiencia}>
        <div className={style_experiencia.experiencia_layout}>
            <article className={style_experiencia.experiencia_header}>
                <div className={style_experiencia.experiencia_header_box}>
                    <div className={style_experiencia.experiencia_header_box_informacion_titulo}>
                        <span className={style_experiencia.experiencia_header_span}>
                            <BiBriefcase></BiBriefcase>
                        </span>
                        <h2 className={style_experiencia.experiencia_header_h2}>My Experience</h2>
                    </div>
                    <div className={style_experiencia.experiencia_header_box_informacion_texto}>
                        <p>Navigating diverse environments with adaptability and expertise for holistic solutions.</p>
                    </div>
                </div>
                <div className={style_experiencia.experiencia_contenido_box}>
                    <div className={style_experiencia.experiencia_contenido_box_layout}>
                        <article className={style_experiencia.experiencia_contenido_article}>
                            <div className={style_experiencia.experiencia_contenido_article_header_layout}>
                                <div className={style_experiencia.experiencia_contenido_article_header_emp}>
                                    <div className={style_experiencia.experiencia_contenido_article_header_icono}>
                                        <img src="/img/Logotipos PDC PNG/110 x 110.png" alt="img" />
                                    </div>
                                    <div className={style_experiencia.experiencia_contenido_article_header_nombre}>
                                        <h3 className={style_experiencia.experiencia_contenido_article_header_nombre_h3}>Portafolio</h3>
                                        <a className={style_experiencia.experiencia_contenido_article_header_nombre_enlace} href="https://portafolio-ajb1.onrender.com">render.com</a>
                                    </div>
                                    <div className={style_experiencia.experiencia_contenido_article_header_categoria}>
                                        <div className={style_experiencia.experiencia_contenido_article_header_categoria_nombre}>Empresa de Tecnología</div>
                                    </div>
                                </div>
                                <div className={style_experiencia.experiencia_contenido_article_header_fecha}>
                                    <p className={style_experiencia.experiencia_contenido_article_header_fecha_p}>2025<span className={style_experiencia.experiencia_contenido_article_header_fecha_span}>-</span>Actualidad</p>
                                </div>
                            </div>
                            <div className={style_experiencia.experiencia_contenido_article_contenido_layout}>
                                <h3 className={style_experiencia.experiencia_contenido_article_contenido_puesto_h3}>Desarrollador Web Full Stack</h3>
                                <p className={style_experiencia.experiencia_contenido_article_contenido_puesto_p_informacion}>Desarrollé y mantuve una aplicaciones web full stack utilizando React, Next.js y Node.js, implementando APIs REST, integrando bases de datos con Sequelize y desplegado en Render.</p>
                            </div>
                        </article>

                        <article className={style_experiencia.experiencia_contenido_article}>
                            <div className={style_experiencia.experiencia_contenido_article_header_layout}>
                                <div className={style_experiencia.experiencia_contenido_article_header_emp}>
                                    <div className={style_experiencia.experiencia_contenido_article_header_icono}>
                                        <img src="/img/Logotipos PDC PNG/110 x 110.png" alt="img" />
                                    </div>
                                    <div className={style_experiencia.experiencia_contenido_article_header_nombre}>
                                        <h3 className={style_experiencia.experiencia_contenido_article_header_nombre_h3}>Esperanza De Vida</h3>
                                        <a className={style_experiencia.experiencia_contenido_article_header_nombre_enlace} href="https://www.instagram.com/esperanzadevidaargentina?igsh=MWkwdXdsMDR0OTRlOA==">instagram.com</a>
                                    </div>
                                    <div className={style_experiencia.experiencia_contenido_article_header_categoria}>
                                        <div className={style_experiencia.experiencia_contenido_article_header_categoria_nombre}>Ministerio Cristiano</div>
                                    </div>
                                </div>
                                <div className={style_experiencia.experiencia_contenido_article_header_fecha}>
                                    <p className={style_experiencia.experiencia_contenido_article_header_fecha_p}>2025<span className={style_experiencia.experiencia_contenido_article_header_fecha_span}>-</span>Actualidad</p>
                                </div>
                            </div>
                            <div className={style_experiencia.experiencia_contenido_article_contenido_layout}>
                                <h3 className={style_experiencia.experiencia_contenido_article_contenido_puesto_h3}>Encargado de Transmisión y Marketing Digital</h3>
                                <p className={style_experiencia.experiencia_contenido_article_contenido_puesto_p_informacion}>Lidero la producción y gestión de transmisión en vivo utilizando OBS, diseñando la estética visual delos directos. Produzco y edito el contenido audiovisual con Adobe Premiere Pro, y diseño elementos graficos con Canva y Adobe Photoshop. Por otro lado, desarrollo guiones y contenido para redes sociales, participando en el área de marketing y comunicación institucional en un rol voluntario.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </article>
        </div>
    </article>
  );
}
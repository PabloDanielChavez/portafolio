"use client";

import { ReactNode } from "react";
import style_habilidades from "@/styles/sections/habilidades.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { PiStack } from "react-icons/pi";
import { MdWeb } from "react-icons/md";

export default function Stacks() {

  return (
    <article className={style_habilidades.habilidades}>
        <div className={style_habilidades.habilidades_layout}>
            <article className={style_habilidades.habilidades_header}>
                <div className={style_habilidades.habilidades_header_box}>
                    <div className={style_habilidades.habilidades_header_box_informacion_titulo}>
                        <span className={style_habilidades.habilidades_header_span}>
                            <PiStack/>
                        </span>
                        <h2 className={style_habilidades.habilidades_header_h2}>Mis Habilidades</h2>
                    </div>
                    <div className={style_habilidades.habilidades_header_box_informacion_texto}>
                        <p>Comprometido a mantenerne al día con las tecnologias y herramientas de desarrollo</p>
                    </div>
                </div>
                <div className={style_habilidades.habilidades_contenido_box}>
                    <div className={style_habilidades.habilidades_contenido_box_layout}>

                        <article className={style_habilidades.habilidades_contenido_article}> 
                            <div className={style_habilidades.habilidades_contenido_article_header_layout}> 
                                <div className={style_habilidades.habilidades_contenido_article_header_emp}> 
                                    <div className={style_habilidades.habilidades_contenido_article_header_icono}> 
                                        <img src="img/Logotipo_Portafolio_PDC/Logo_Web_Design/Logo_Web_Design_48x48px.png" alt="img" /> 
                                    </div> 
                                    <div className={style_habilidades.habilidades_contenido_article_header_nombre}> 
                                        <h3 className={style_habilidades.habilidades_contenido_article_header_nombre_h3}>Html, Css y Sass</h3> 
                                        <a className={style_habilidades.habilidades_contenido_article_header_nombre_enlace} href="#">Web Design</a> 
                                    </div> 
                                </div> 
                                <div className={style_habilidades.habilidades_contenido_article_header_flecha}> 
                                    <p className={style_habilidades.habilidades_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                        </article>

                        <article className={style_habilidades.habilidades_contenido_article}>
                            <div className={style_habilidades.habilidades_contenido_article_header_layout}>
                                <div className={style_habilidades.habilidades_contenido_article_header_emp}>
                                    <div className={style_habilidades.habilidades_contenido_article_header_icono}>
                                        <img src="img/Logotipo_Portafolio_PDC/Logo_FrontEnd_Development/Logo_FrontEnd_Development_48x48px.png" alt="img" />
                                    </div>
                                    <div className={style_habilidades.habilidades_contenido_article_header_nombre}>
                                        <h3 className={style_habilidades.habilidades_contenido_article_header_nombre_h3}>
                                            JavaScript, React y Next.js
                                        </h3>
                                        <a className={style_habilidades.habilidades_contenido_article_header_nombre_enlace} href="#">
                                            Frontend Development
                                        </a>
                                    </div>
                                </div>
                                <div className={style_habilidades.habilidades_contenido_article_header_flecha}>
                                    <p className={style_habilidades.habilidades_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div>
                            </div>
                        </article>

                        <article className={style_habilidades.habilidades_contenido_article}>
                            <div className={style_habilidades.habilidades_contenido_article_header_layout}>
                                <div className={style_habilidades.habilidades_contenido_article_header_emp}>
                                    <div className={style_habilidades.habilidades_contenido_article_header_icono}>
                                        <img src="img/Logotipo_Portafolio_PDC/Logo_BackEnd_Development/Logo_BackEnd_Development_48x48px.png" alt="img" />
                                    </div>
                                    <div className={style_habilidades.habilidades_contenido_article_header_nombre}>
                                        <h3 className={style_habilidades.habilidades_contenido_article_header_nombre_h3}>
                                            Node.js y Sequelize
                                        </h3>
                                        <a className={style_habilidades.habilidades_contenido_article_header_nombre_enlace} href="#">
                                            Backend Development
                                        </a>
                                    </div>
                                </div>
                                <div className={style_habilidades.habilidades_contenido_article_header_flecha}>
                                    <p className={style_habilidades.habilidades_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div>
                            </div>
                        </article>

                        <article className={style_habilidades.habilidades_contenido_article}>
                            <div className={style_habilidades.habilidades_contenido_article_header_layout}>
                                <div className={style_habilidades.habilidades_contenido_article_header_emp}>
                                    <div className={style_habilidades.habilidades_contenido_article_header_icono}>
                                        <img src="img/Logotipo_Portafolio_PDC/Logo_Database_Management/Logo_Database_Management_48x48px.png" alt="img" />
                                    </div>
                                    <div className={style_habilidades.habilidades_contenido_article_header_nombre}>
                                        <h3 className={style_habilidades.habilidades_contenido_article_header_nombre_h3}>
                                            MySQL
                                        </h3>
                                        <a className={style_habilidades.habilidades_contenido_article_header_nombre_enlace} href="#">
                                            Database Management
                                        </a>
                                    </div>
                                </div>
                                <div className={style_habilidades.habilidades_contenido_article_header_flecha}>
                                    <p className={style_habilidades.habilidades_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div>
                            </div>
                        </article>

                        <article className={style_habilidades.habilidades_contenido_article}>
                            <div className={style_habilidades.habilidades_contenido_article_header_layout}>
                                <div className={style_habilidades.habilidades_contenido_article_header_emp}>
                                    <div className={style_habilidades.habilidades_contenido_article_header_icono}>
                                        <img src="img/Logotipo_Portafolio_PDC/Logo_Multimedia_&_Content_Design/Logo_Multimedia_&_Content_Design_48x48px.png" alt="img" />
                                    </div>
                                    <div className={style_habilidades.habilidades_contenido_article_header_nombre}>
                                        <h3 className={style_habilidades.habilidades_contenido_article_header_nombre_h3}>
                                            Photoshop, Premiere Pro y Canva
                                        </h3>
                                        <a className={style_habilidades.habilidades_contenido_article_header_nombre_enlace} href="#">
                                            Multimedia & Content Design
                                        </a>
                                    </div>
                                </div>
                                <div className={style_habilidades.habilidades_contenido_article_header_flecha}>
                                    <p className={style_habilidades.habilidades_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </article>
        </div>
    </article>
  );
}
"use client";

import { ReactNode } from "react";
import style_servicios from "@/styles/sections/servicios.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { PiPaintBrushBold } from "react-icons/pi";

export default function servicios() {

  return (
    <article className={style_servicios.servicios}>
        <div className={style_servicios.servicios_layout}>
            <article className={style_servicios.servicios_header}>
                <div className={style_servicios.servicios_header_box}>
                    <div className={style_servicios.servicios_header_box_informacion_titulo}>
                        <span className={style_servicios.servicios_header_span}>
                            <AiTwotoneSchedule />
                        </span>
                        <h2 className={style_servicios.servicios_header_h2}>Mi Servicios</h2>
                    </div>
                    <div className={style_servicios.servicios_header_box_informacion_texto}>
                        <p>Formular estrategias integrales para alcanzar sus objetivos de diseño y superar las expectativas.</p>
                    </div>
                </div>
                <div className={style_servicios.servicios_contenido_box}>
                    <div className={style_servicios.servicios_contenido_box_layout}>
                        <article className={style_servicios.servicios_contenido_article}> 
                            <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                    <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                        <MdOutlineWeb />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>Web Design</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Crafting visually captivating and user-friendly websites for online success.</p>
                            </div>
                        </article>
                        
                        <article className={style_servicios.servicios_contenido_article}> 
                            <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                    <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                        <TbWorld />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>Web Development</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Bringing ideas to life with robust and scalable web solutions.</p>
                            </div>
                        </article>
                        
                        <article className={style_servicios.servicios_contenido_article}> 
                            <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                    <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                        <PiPaintBrushBold />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>Graphic Design</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Creating visually stunning designs that captivate and engage audiences.</p>
                            </div>
                        </article>
                        
                        <article className={style_servicios.servicios_contenido_article}> 
                            <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                    <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                        <PiPaintBrushBold />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>SEO</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Elevating online visibility and driving organic traffic through strategies.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </article>
        </div>
    </article>
  );
}
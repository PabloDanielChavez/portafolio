"use client";

import { ReactNode } from "react";
import style_servicios from "@/styles/sections/servicios.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { TbChartBarPopular, TbWorld } from "react-icons/tb";
import { PiPaintBrushBold, PiPalette } from "react-icons/pi";
import { LuMonitorSmartphone } from "react-icons/lu";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { FiDatabase } from "react-icons/fi";

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
                                        <LuMonitorSmartphone />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>Diseño Web</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Creamos sitios web visualmente atractivos, rápidos y fáciles de usar para lograr el éxito en línea.</p>
                            </div>
                        </article>
                        
                        <article className={style_servicios.servicios_contenido_article}> 
                            <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                    <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                        <HiOutlineCodeBracket />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>Desarrollo Web y Apps</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Damos vida a tus ideas con soluciones robustas, escalables y aplicaciones de alto rendimiento desarrolladas a medida.</p>
                            </div>
                        </article>
                        
                        <article className={style_servicios.servicios_contenido_article}> 
                            <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                    <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                        <PiPalette />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>Diseño Gráfico y Multimedia</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Creamos piezas visualmente impactantes y contenido en video que cautivan y atraen a tu público objetivo.</p>
                            </div>
                        </article>
                        
                        <article className={style_servicios.servicios_contenido_article}> 
                            <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                    <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                        <TbChartBarPopular />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>SEO Técnico y Performance</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Mejoramos tu visibilidad mediante estrategias efectivas y optimización de carga para un posicionamiento orgánico superior.</p>
                            </div>
                        </article>
                        
                        <article className={style_servicios.servicios_contenido_article}> 
                            <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                    <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                        <FiDatabase />
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                        <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>Gestión de Datos y E-commerce</h3>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                    <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                </div> 
                            </div> 
                            <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>Estructuramos bases de datos seguras y desarrollamos tiendas online personalizadas que potencian tus ventas.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </article>
        </div>
    </article>
  );
}
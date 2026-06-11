"use client";

import { useState, useEffect } from "react";
import style_trabajos from "@/styles/sections/trabajos.module.scss";
import { IoIosRocket, IoMdArrowBack } from "react-icons/io";
import { TrabajosType } from "@/types/trabajos";
import SectionHeader from "../sub_components/SectionHeader";
import Link from "next/link";
import { ContadorAnimadoAuditoria } from "../sub_components/ContadorAnimado";
import { ImagenComponent } from "../sub_components/ImagenM";
import { FaArrowRight } from "react-icons/fa";
import { trackEvent } from "../utils/Analytics";

type Props = {
    trabajos: TrabajosType[];
    showFooter?: boolean;
};

export default function Trabajos({ trabajos, showFooter }: Props) {
    const [estrategia, setEstrategia] = useState<"mobile" | "desktop" | null>(null);
    const [idCargando, setIdCargando] = useState<number | null>(null);

    useEffect(() => {setEstrategia("mobile")}, []);
    const estrategiaActual = estrategia || "mobile";
    const esActivo = (opcion: string) => estrategiaActual === opcion;

    return (
        <section className={style_trabajos.trabajos}>
            <div className={style_trabajos.trabajos_layout}>
                {!showFooter && (
                    <Link 
                        href="/" 
                        className={style_trabajos.pagTrabajo_LINK} 
                        aria-label="Volver a Inicio"
                    >
                        <IoMdArrowBack /> Volver al Portafolio
                    </Link>
                )}
                <div className={style_trabajos.trabajos_header}>
                    <SectionHeader 
                        icon={<IoIosRocket />} 
                        title="Trabajos Realizados" 
                        description="Descubre una colección de mis trabajos de diseño más innovadores." 
                    />
                    <div className={style_trabajos.pagTrabajo_tabs_container} style={{ marginBottom: '20px' }}>
                        <button 
                            type="button"
                            onClick={() => {
                                setEstrategia("mobile")
                                trackEvent(`click_Trabajos_auditoria`, {
                                    section: "Trabajos"
                                })
                            }}
                            className={`${style_trabajos.pagTrabajo_tab_btn} ${
                                estrategia === "mobile" 
                                ? style_trabajos.pagTrabajo_tab_btn_activo 
                                : style_trabajos.pagTrabajo_tab_btn_desactivado
                            }`}>Telefono</button>
                        <button 
                            type="button"
                            onClick={() => {
                                setEstrategia("desktop")
                                trackEvent(`click_Trabajos_auditoria`, {
                                    section: "Trabajos"
                                })
                            }}
                            className={`${style_trabajos.pagTrabajo_tab_btn} ${
                                estrategia === "desktop" 
                                ? style_trabajos.pagTrabajo_tab_btn_activo 
                                : style_trabajos.pagTrabajo_tab_btn_desactivado
                            }`}>Escritorio</button>
                    </div>
                    
                    <div className={style_trabajos.trabajos_contenido_box}>
                        <div className={style_trabajos.trabajos_contenido_box_layout}>
                            {trabajos && trabajos.map((tra, index) => {
                                const estaCargando = idCargando === tra.id;
                                const esOculto = showFooter && index >= 2;
                                const metricas = [
                                    { valor: estrategia === "mobile" ? tra.performance_mobile : tra.performance_desktop, etiqueta: "Rendimiento" },
                                    { valor: estrategia === "mobile" ? tra.practices_mobile : tra.practices_desktop, etiqueta: "Prácticas" },
                                    { valor: estrategia === "mobile" ? tra.accessibility_mobile : tra.accessibility_desktop, etiqueta: "Accesibilidad" },
                                    { valor: estrategia === "mobile" ? tra.seo_mobile : tra.seo_desktop, etiqueta: "SEO" },
                                ];
                                return (
                                    <Link 
                                        key={tra.id} 
                                        className={`${style_trabajos.trabajos_LINK} ${esOculto ? style_trabajos.oculto : ''}`} 
                                        href={`/trabajos/${tra.id}`}
                                        onClick={() => 
                                            trackEvent(`click_trabajo`, {
                                                section: "Trabajos",
                                                network: `${tra.nombre_trabajo}`
                                            })
                                        }
                                    >
                                        <article className={style_trabajos.trabajos_card}>
                                            <div className={style_trabajos.trabajos_card_img}>
                                                <ImagenComponent 
                                                    style={style_trabajos.ha}
                                                    url={`/img/Logotipo_Portafolio_PDC/${tra?.nombre_archivo}/${tra?.nombre_imagen}.${tra?.formato_imagen}`}
                                                    alt={tra?.nombre_imagen || "Imagen del proyecto"}
                                                    widthE={500}
                                                    heightE={500}
                                                    priority=""
                                                />
                                            </div>
                                            <div className={style_trabajos.trabajos_card_info}>
                                                <div className={style_trabajos.trabajos_card_header}>
                                                    <h3>{tra?.nombre_trabajo}</h3>
                                                    <div className={style_trabajos.trabajos_card_link}>
                                                        {tra?.enlace_trabajoResumido}
                                                    </div>
                                                </div>
                                                <div className={style_trabajos.trabajos_card_meta}>
                                                    <span>{tra?.complejidad_trabajo}</span>
                                                    <span>•</span>
                                                    <span>{tra?.numero_pagina} Páginas</span>
                                                    <span>•</span>
                                                    <span>{tra?.tiempo_trabajo}</span>
                                                </div>
                                                <p className={style_trabajos.trabajos_card_desc}>{tra?.resumen_trabajo}</p>
                                                <div className={style_trabajos.pagTrabajo_card_metrics}>
                                                    {metricas.map((stat, idx) => (
                                                        <div key={idx} className={style_trabajos.pagTrabajo_layout_metrics}>
                                                            <ContadorAnimadoAuditoria 
                                                                valorFinal={stat.valor || 0} 
                                                                classNameBase={style_trabajos.pagTrabajo_card_metrics_puntaje}
                                                                clasesColor={{ verde: style_trabajos.verde, amarillo: style_trabajos.amarillo, rojo: style_trabajos.rojo }}
                                                                tiempo={1000}
                                                            />
                                                            <span className={style_trabajos.pagTrabajo_card_metrics_titulo}>{stat.etiqueta}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {showFooter && (
                    <div className={style_trabajos.trabajos_card_footer}>
                        <Link 
                            href={`/trabajos`} 
                            className={style_trabajos.trabajos_LINK}
                            aria-label="Ver todos los trabajos"
                            onClick={() => 
                                trackEvent(`click_trabajos`, {
                                    section: "Trabajos"
                                })
                            }
                        >
                            <button 
                                className={style_trabajos.trabajos_card_btn} 
                                aria-label="Ver todas las trabajos"
                            >
                                Más Proyectos <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
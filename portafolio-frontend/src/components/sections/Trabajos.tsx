"use client";

import style_trabajos from "@/styles/sections/trabajos.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { TrabajosType } from "@/types/trabajos";
import SectionHeader from "../sub_components/SectionHeader";
import { ImagenComponent } from "../sub_components/ImagenM";
import Link from "next/link";



type Props = {
    trabajos: TrabajosType[];
    showFooter?: boolean 
};

export default function Trabajos({ trabajos, showFooter }: Props) {
    return (
        <article className={style_trabajos.trabajos}>
            <div className={style_trabajos.trabajos_layout}>
                <article className={style_trabajos.trabajos_header}>
                    <SectionHeader 
                        icon={<IoIosRocket />} 
                        title="Trabajos Realizados" 
                        description="Descubre una colección de mis trabajos de diseño más innovadores y visualmente impactantes." 
                    />
                    <div className={style_trabajos.trabajos_contenido_box}>
                        <div className={style_trabajos.trabajos_contenido_box_layout}>
                            {trabajos && (
                                <>
                                    {trabajos.slice(0, !showFooter ? trabajos.length : 2).map((tra) => (
                                        <Link 
                                            key={tra.id}
                                            className={style_trabajos.trabajos_LINK} 
                                            href={`/trabajos/${tra.id}`}
                                            aria-label={`Ver detalles de ${tra?.nombre_trabajo}`}
                                        >
                                            <article key={tra.id} className={style_trabajos.trabajos_card}>
                                                <div className={style_trabajos.trabajos_card_img}>
                                                    <ImagenComponent 
                                                        style={style_trabajos.ha}
                                                        url={`/img/Logotipo_Portafolio_PDC/${tra?.nombre_archivo}/${tra?.nombre_imagen}.${tra?.formato_imagen}`}
                                                        alt={tra?.nombre_imagen}
                                                        widthE={500}
                                                        heightE={500}
                                                        priority=""
                                                    />
                                                </div>
                                                <div className={style_trabajos.trabajos_card_info}>
                                                    <div className={style_trabajos.trabajos_card_header}>
                                                        <h3>
                                                            {tra?.nombre_trabajo}
                                                        </h3>
                                                        <div className={style_trabajos.trabajos_card_link}>
                                                            {tra?.enlace_trabajoResumido}
                                                        </div>
                                                    </div>
                                                    <div className={style_trabajos.trabajos_card_meta}>
                                                        <span>{tra?.complejidad_trabajo}</span>
                                                        <span>•</span>
                                                        <span>{tra?.numero_pagina} Paginas</span>
                                                        <span>•</span>
                                                        <span>{tra?.tiempo_trabajo}</span>
                                                    </div>
                                                    <p className={style_trabajos.trabajos_card_desc}>{tra?.resumen_trabajo}</p>
                                                    <div className={style_trabajos.trabajos_card_metrics}>
                                                        {[
                                                            { valor: tra?.performance, etiqueta: "Performance" },
                                                            { valor: tra?.practices, etiqueta: "Best Practiques" },
                                                            { valor: tra?.accessibility, etiqueta: "Accessibility" },
                                                            { valor: tra?.seo, etiqueta: "SEO" },
                                                        ].map((stat, idx) => (
                                                            <article key={idx} className={`${style_trabajos.trabajos_layout_metrics}`}> 
                                                                <span className={`${style_trabajos.trabajos_card_metrics_puntaje} ${stat.valor >= 90 ? style_trabajos.verde : stat.valor >= 50 ? style_trabajos.amarillo : style_trabajos.rojo}`} title={stat.etiqueta}>{stat.valor}</span>
                                                                <span className={style_trabajos.trabajos_card_metrics_titulo} title={stat.etiqueta}>{stat.etiqueta}</span>
                                                            </article>
                                                        ))}
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                    {showFooter && (
                                        <div className={style_trabajos.trabajos_card_footer}>
                                            <Link 
                                                href={`/trabajos`} 
                                                className={style_trabajos.trabajos_card_btn}
                                                aria-label="Ver todos los trabajos"
                                            >
                                                <button className={style_trabajos.trabajos_card_btn}>Más Proyectos <FaArrowRight /></button>
                                            </Link>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </article>
    );
}
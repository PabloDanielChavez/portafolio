"use client";

import { useState } from "react";
import style_trabajos from "@/styles/sections/trabajos.module.scss";

import Link from "next/link";
import { ImagenComponent } from "./sub_components/ImagenM";
import { TrabajosType } from "@/types/trabajos";
import { tra_tecnologiaType } from "@/types/tra_tecnologia";
import { FaGithub, FaLink, IoMdArrowBack, SiNextdotjs, SiNodedotjs, SiReact, SiSass } from "@/components/utils/Iconos";


import { ContadorAnimadoAuditoria } from "./sub_components/ContadorAnimado";


import { trackEvent } from "./utils/Analytics";

type Props = {
    tra: TrabajosType;
    tra_tecnologia: tra_tecnologiaType;
};

const coloresTech: Record<string, string> = {
    SASS: "#CC6699",
    Node: "#339933",
    Next: "#FFFFFF",
    React: "#61DAFB",
};

export default function PagTrabajoDetalle({ tra, tra_tecnologia }: Props) {
    const [estrategia, setEstrategia] = useState<"mobile" | "desktop">("mobile");
    
    if (!tra) return <p>Cargando detalles...</p>;

    const registroTech = tra_tecnologia.find((t) => t.tra_id === tra.id);
    const deconstruirTecnologias = registroTech
    ? Object.keys(registroTech).filter((key): key is keyof typeof coloresTech => {
        const esTecnologiaValida = key in coloresTech;
        const valorEnBaseDatos = registroTech[key as keyof typeof registroTech] as unknown;
        const esActivo = valorEnBaseDatos === 1 || valorEnBaseDatos === true;
        return esTecnologiaValida && esActivo;
    })
    : [];

    const iconosTech: Record<keyof typeof coloresTech, React.ReactNode> = {
        SASS: <SiSass size={24} aria-label="SASS" style={{ color: coloresTech.SASS }} />,
        Node: <SiNodedotjs size={24} aria-label="Node" style={{ color: coloresTech.Node }} />,
        Next: <SiNextdotjs size={24} aria-label="Next" style={{ color: coloresTech.Next }} />,
        React: <SiReact size={24} aria-label="React" style={{ color: coloresTech.React }} />,
    };

    const metricasActivas = [
        { valor: (estrategia === "mobile" ? tra.performance_mobile : tra.performance_desktop) || 0, etiqueta: "Rendimiento" },
        { valor: (estrategia === "mobile" ? tra.practices_mobile : tra.practices_desktop) || 0, etiqueta: "Prácticas" },
        { valor: (estrategia === "mobile" ? tra.accessibility_mobile : tra.accessibility_desktop) || 0, etiqueta: "Accesibilidad" },
        { valor: (estrategia === "mobile" ? tra.seo_mobile : tra.seo_desktop) || 0, etiqueta: "SEO" },
    ];

    return (
        <div className={style_trabajos.pagTrabajo_detalle_container}>
            <div className={style_trabajos.pagTrabajo_layout}>
                <Link 
                    href="/" 
                    className={style_trabajos.pagTrabajo_LINK} 
                    aria-label="Volver a Inicio"
                    onClick={() => {
                        trackEvent(`click_PagTrabajos_VolverPortafolio`, {
                            section: "PagTrabajos"
                        })
                    }} 
                >
                    <IoMdArrowBack /> Volver al Portafolio
                </Link>
                <header className={style_trabajos.pagTrabajo_detalle_hero}>
                    <h1 className={style_trabajos.pagTrabajo_detalle_h1}>{tra.nombre_trabajo}</h1>
                    <div className={style_trabajos.pagTrabajo_flexRepo}>
                        <Link 
                            href={tra.enlace_repositorio || ""} 
                            target="_blank" 
                            rel="noreferrer" 
                            className={style_trabajos.pagTrabajo_detalle_link}
                            aria-label={`Ir al trabajo: ${tra.enlace_repositorio}`}  
                            onClick={() => {
                                trackEvent(`click_PagTrabajos_enlace_github`, {
                                    section: "PagTrabajos"
                                })
                            }} 
                        >
                            <FaGithub size={28}/>
                        </Link>
                        <Link 
                            href={tra.enlace_trabajo || ""} 
                            target="_blank" 
                            rel="noreferrer" 
                            className={style_trabajos.pagTrabajo_detalle_link}
                            aria-label={`Ir al trabajo: ${tra.enlace_trabajo}`}
                            onClick={() => {
                                trackEvent(`click_PagTrabajos_enlace_pagina`, {
                                    section: "PagTrabajos"
                                })
                            }} 
                        >
                            <FaLink size={28} />
                        </Link>
                    </div>
                </header>
                <div className={style_trabajos.pagTrabajo_grid}>
                    <aside>
                        <ImagenComponent 
                            style={style_trabajos.pagTrabajo_detalle_img_main}
                            url={`/img/Logotipo_Portafolio_PDC/${tra?.nombre_archivo}/${tra?.nombre_imagen}.${tra?.formato_imagen}`}
                            alt={tra?.nombre_trabajo}
                            widthE={800}
                            heightE={500}
                            priority=""
                        />
                        <div className={style_trabajos.pagTrabajo_tabs_container}>
                            <button 
                                type="button"
                                onClick={() => {
                                    setEstrategia("mobile")
                                    trackEvent(`click_Trabajos_MostrarAuditoria_mobile`, {
                                        section: "PagTrabajos"
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
                                    trackEvent(`click_Trabajos_MostrarAuditoria_desktop`, {
                                        section: "PagTrabajos"
                                    })
                                }} 
                                className={`${style_trabajos.pagTrabajo_tab_btn} ${
                                    estrategia === "desktop" 
                                    ? style_trabajos.pagTrabajo_tab_btn_activo 
                                    : style_trabajos.pagTrabajo_tab_btn_desactivado
                                }`}>Escritorio</button>
                        </div>

                        <div className={style_trabajos.pagTrabajo_card_metrics}>
                            {metricasActivas.map((stat, idx) => (
                                <article 
                                    key={idx} 
                                    className={style_trabajos.pagTrabajo_layout_metrics}
                                >
                                    <ContadorAnimadoAuditoria 
                                        valorFinal={stat.valor} 
                                        classNameBase={style_trabajos.pagTrabajo_card_metrics_puntaje}
                                        clasesColor={{
                                            verde: style_trabajos.verde,
                                            amarillo: style_trabajos.amarillo,
                                            rojo: style_trabajos.rojo
                                        }}
                                        tiempo={1500}
                                    />
                                    <span className={style_trabajos.pagTrabajo_card_metrics_titulo}>{stat.etiqueta}</span>
                                </article>
                            ))}
                        </div>
                    </aside>
                    
                    <section className={style_trabajos.pagTrabajo_detalle_contenido}>
                        <h3>Resumen De Trabajo</h3>
                        <p>{tra.resumen_trabajo}</p>
                        
                        <h3>Tecnologías</h3>
                        <ul className={style_trabajos.pagTrabajo_ul}>
                            {deconstruirTecnologias.map((tech) => (
                                <li 
                                    key={tech} 
                                    className={style_trabajos.pagTrabajo_li}
                                    onClick={() => {
                                        trackEvent(`click_PagTrabajos_enlace_auditoria`, {
                                            section: "PagTrabajos"
                                        })
                                    }}  
                                >
                                    <span className={style_trabajos.pagTrabajo_span}>
                                        {iconosTech[tech]}
                                        <strong style={{ color: coloresTech[tech], fontSize: '13px' }}>{tech}</strong>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <h3>Detalle</h3>
                        <div className={style_trabajos.pagTrabajo_detalle_specs}>
                            <span className={style_trabajos.pagTrabajo_detalle_spanDe}><strong>Páginas:</strong> {tra.numero_pagina}</span>
                            <span className={style_trabajos.pagTrabajo_detalle_spanDe}><strong>Tiempo:</strong> {tra.tiempo_trabajo}</span>
                            <span className={style_trabajos.pagTrabajo_detalle_spanDe}><strong>Complejidad:</strong> {tra.complejidad_trabajo}</span>
                            <span className={style_trabajos.pagTrabajo_detalle_spanDe}><strong>Rol:</strong> {tra.rol}</span>
                            <span className={style_trabajos.pagTrabajo_detalle_spanDe}><strong>Cliente:</strong> {tra.categoría_cliente}</span>
                        </div>
                        {tra.reto_tecnico && (
                            <div className={style_trabajos.pagTrabajo_detalle_reto}>
                                <h4 className={style_trabajos.pagTrabajo_h4}>El Reto Técnico</h4>
                                <p className={style_trabajos.pagTrabajo_parrafo}>
                                    {tra.reto_tecnico}
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
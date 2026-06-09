"use client";

import { useState } from "react";
import style_trabajos from "@/styles/sections/trabajos.module.scss";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { ImagenComponent } from "./sub_components/ImagenM";
import { TrabajosType } from "@/types/trabajos";
import { tra_tecnologiaType } from "@/types/tra_tecnologia";
import { SiNextdotjs, SiNodedotjs, SiReact, SiSass } from "react-icons/si";
import { IoAttachOutline } from "react-icons/io5";
import { ContadorAnimadoAuditoria } from "./sub_components/ContadorAnimado";

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
        { valor: (estrategia === "mobile" ? tra.practices_mobile : tra.practices_desktop) || 0, etiqueta: "Buenas Prácticas" },
        { valor: (estrategia === "mobile" ? tra.accessibility_mobile : tra.accessibility_desktop) || 0, etiqueta: "Accesibilidad" },
        { valor: (estrategia === "mobile" ? tra.seo_mobile : tra.seo_desktop) || 0, etiqueta: "SEO" },
    ];

    const enlaceAuditoriaActivo = estrategia === "mobile" ? tra.enlace_auditoria_mobile : tra.enlace_auditoria_desktop;

    return (
        <div className={style_trabajos.pagTrabajo_detalle_container}>
            <div className={style_trabajos.pagTrabajo_layout}>
                <Link 
                    href="/" 
                    className={style_trabajos.pagTrabajo_LINK} 
                    aria-label="Volver a Inicio"
                >
                    <IoMdArrowBack /> Volver al Portafolio
                </Link>
                <header className={style_trabajos.pagTrabajo_detalle_hero}>
                    <h1 className={style_trabajos.pagTrabajo_detalle_h1}>{tra.nombre_trabajo}</h1>
                    <Link 
                        href={tra.enlace_trabajo || "#"} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={style_trabajos.pagTrabajo_detalle_link}
                        aria-label={`Ir al trabajo: ${tra.enlace_trabajoResumido}`}
                    >
                        {tra.enlace_trabajoResumido}
                    </Link>
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
                                onClick={() => setEstrategia("mobile")} 
                                className={`${style_trabajos.pagTrabajo_tab_btn} ${
                                    estrategia === "mobile" 
                                    ? style_trabajos.pagTrabajo_tab_btn_activo 
                                    : style_trabajos.pagTrabajo_tab_btn_desactivado
                                }`}>Telefono</button>
                            <button 
                                type="button"
                                onClick={() => setEstrategia("desktop")} 
                                className={`${style_trabajos.pagTrabajo_tab_btn} ${
                                    estrategia === "desktop" 
                                    ? style_trabajos.pagTrabajo_tab_btn_activo 
                                    : style_trabajos.pagTrabajo_tab_btn_desactivado
                                }`}>Escritorio</button>
                        </div>

                        <div className={style_trabajos.pagTrabajo_card_metrics}>
                            {metricasActivas.map((stat, idx) => (
                                <article key={idx} className={style_trabajos.pagTrabajo_layout_metrics}>
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
                        
                        {enlaceAuditoriaActivo && (
                            <Link 
                                href={enlaceAuditoriaActivo}
                                target="_blank" 
                                rel="noreferrer"
                                className={`${style_trabajos.pagTrabajo_LINK} ${style_trabajos.pagTrabajo_auditoria}`}
                            >
                                <IoAttachOutline size={24} style={{ "transform": "rotate(25deg)"}}/>
                                <span>Reporte Completo ({estrategia === "mobile" ? "Móvil" : "Escritorio"})</span>
                            </Link>
                        )}
                    </aside>
                    
                    <section className={style_trabajos.pagTrabajo_detalle_contenido}>
                        <h3>Resumen De Trabajo</h3>
                        <p>{tra.resumen_trabajo}</p>
                        
                        <h3>Tecnologías</h3>
                        <ul className={style_trabajos.pagTrabajo_ul}>
                            {deconstruirTecnologias.map((tech) => (
                                <li key={tech} className={style_trabajos.pagTrabajo_li}>
                                    <span className={style_trabajos.pagTrabajo_span}>
                                        {iconosTech[tech]}
                                        <strong style={{ color: coloresTech[tech], fontSize: '13px' }}>{tech}</strong>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        
                        <h3>Rol y Responsabilidades</h3>
                        <div className={style_trabajos.pagTrabajo_detalle_specs}>
                            <span><strong>Páginas:</strong> {tra.numero_pagina}</span>
                            <span><strong>Tiempo:</strong> {tra.tiempo_trabajo}</span>
                            <span><strong>Complejidad:</strong> {tra.complejidad_trabajo}</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
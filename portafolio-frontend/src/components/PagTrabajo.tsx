"use client";

import { TrabajosType } from "@/types/trabajos";
import style_trabajos from "@/styles/sections/pagTrabajo.module.scss";
import { BiCodeAlt, BiTrophy, BiLayer, BiGlobe } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { ImagenComponent } from "./sub_components/ImagenM";

type Props = {
    tra: TrabajosType;
};

export default function PagTrabajoDetalle({ tra }: Props) {
    if (!tra) return <p>Cargando detalles...</p>;

    return (
        // Fondo aplicado directamente al contenedor principal (sin aspecto de card)
        <article className={style_trabajos.pagTrabajo_detalle_container}>
            <div className={style_trabajos.pagTrabajo_layout}>
                <Link 
                    href="/" 
                    className={style_trabajos.pagTrabajo_LINK} 
                    aria-label="Volver a Inicio"
                >
                    <IoMdArrowBack /> Volver al Portafolio
                </Link>
                <header className={style_trabajos.pagTrabajo_detalle_hero}>
                    <h1>{tra.nombre_trabajo}</h1>
                    <Link 
                        href={tra.enlace_trabajo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={style_trabajos.pagTrabajo_detalle_link}
                        aria-label={`Ir al trabajo: ${tra.enlace_trabajoResumido}`}
                    >
                        {tra.enlace_trabajo}
                    </Link>
                </header>
                <div className={style_trabajos.pagTrabajo_detalle_grid}>
                    <aside className={style_trabajos.pagTrabajo_detalle_aside}>
                        <ImagenComponent 
                            style={style_trabajos.pagTrabajo_detalle_img_main}
                            url={`/img/Logotipo_Portafolio_PDC/${tra?.nombre_archivo}/${tra?.nombre_imagen}.${tra?.formato_imagen}`}
                            alt={tra?.nombre_trabajo}
                            widthE={800}
                            heightE={500}
                            priority=""
                        />
                        
                        <div className={style_trabajos.pagTrabajo_card_metrics} style={{marginTop: '2rem'}}>
                            {[
                                { valor: tra?.performance, etiqueta: "Performance", icon: <BiCodeAlt /> },
                                { valor: tra?.practices, etiqueta: "Best Practices", icon: <BiTrophy /> },
                                { valor: tra?.accessibility, etiqueta: "Accessibility", icon: <BiLayer /> },
                                { valor: tra?.seo, etiqueta: "SEO", icon: <BiGlobe /> },
                            ].map((stat, idx) => (
                                <article key={idx} className={style_trabajos.pagTrabajo_layout_metrics}> 
                                    <span className={`${style_trabajos.pagTrabajo_card_metrics_puntaje} ${stat.valor >= 90 ? style_trabajos.verde : stat.valor >= 50 ? style_trabajos.amarillo : style_trabajos.rojo}`}>
                                        {stat.valor}
                                    </span>
                                    <span className={style_trabajos.pagTrabajo_card_metrics_titulo}>{stat.etiqueta}</span>
                                </article>
                            ))}
                        </div>
                    </aside>
                    <section className={style_trabajos.pagTrabajo_detalle_contenido}>
                        <h3>Resumen Ejecutivo</h3>
                        <p>{tra.resumen_trabajo}</p>
                        <h3>Rol y Responsabilidades</h3>
                        <div className={style_trabajos.pagTrabajo_detalle_specs}>
                            <span><strong>Páginas:</strong> {tra.numero_pagina}</span>
                            <span><strong>Tiempo:</strong> {tra.tiempo_trabajo}</span>
                            <span><strong>Complejidad:</strong> {tra.complejidad_trabajo}</span>
                        </div>
                    </section>
                </div>
            </div>
        </article>
    );
}
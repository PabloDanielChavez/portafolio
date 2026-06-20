"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import style_trabajos from "@/styles/sections/trabajos.module.scss";

import { TrabajosType } from "@/types/trabajos";

import { ImagenComponent } from "./ImagenM";
import { ContadorAnimadoAuditoria } from "./ContadorAnimado";

import { trackEvent } from "../utils/Analytics";

type Props = {
    trabajo: TrabajosType;
    estrategia: "mobile" | "desktop";
    esOculto: boolean;
    index: number;
};

export default function TrabajoCard({
    trabajo,
    estrategia,
    esOculto,
    index
}: Props) {

    const [visible, setVisible] = useState(false);

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }

            },
            {
                threshold: 0.2
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();

    }, []);

    const metricas = [
        {
            valor:
                estrategia === "mobile"
                    ? trabajo.performance_mobile
                    : trabajo.performance_desktop,
            etiqueta: "Rendimiento"
        },
        {
            valor:
                estrategia === "mobile"
                    ? trabajo.practices_mobile
                    : trabajo.practices_desktop,
            etiqueta: "Prácticas"
        },
        {
            valor:
                estrategia === "mobile"
                    ? trabajo.accessibility_mobile
                    : trabajo.accessibility_desktop,
            etiqueta: "Accesibilidad"
        },
        {
            valor:
                estrategia === "mobile"
                    ? trabajo.seo_mobile
                    : trabajo.seo_desktop,
            etiqueta: "SEO"
        }
    ];

    return (
        <Link
            href={`/trabajos/${trabajo.id}`}
            className={`${style_trabajos.trabajos_LINK}
            ${esOculto ? style_trabajos.oculto : ""}`}
            onClick={() =>
                trackEvent("click_trabajo", {
                    section: "Trabajos",
                    project_name: trabajo.nombre_trabajo
                })
            }
        >
            <article
                ref={ref}
                className={`${style_trabajos.trabajos_card}
                ${visible ? style_trabajos.view : ""}`}
                style={{
                    transitionDelay: `${index * 120}ms`
                }}
            >

                <div className={style_trabajos.trabajos_card_img}>
                    <ImagenComponent
                        style={style_trabajos.trabajos_img}
                        url={`/img/Logotipo_Portafolio_PDC/${trabajo.nombre_archivo}/${trabajo.nombre_imagen}.${trabajo.formato_imagen}`}
                        alt={trabajo.nombre_imagen || "Imagen del proyecto"}
                        widthE={500}
                        heightE={500}
                        priority=""
                    />
                </div>

                <div className={style_trabajos.trabajos_card_info}>

                    <div className={style_trabajos.trabajos_card_header}>
                        <h3>{trabajo.nombre_trabajo}</h3>

                        <div className={style_trabajos.trabajos_card_link}>
                            {trabajo.enlace_trabajoResumido}
                        </div>
                    </div>

                    <div className={style_trabajos.trabajos_card_meta}>
                        <span>{trabajo.complejidad_trabajo}</span>
                        <span>•</span>
                        <span>{trabajo.numero_pagina} Páginas</span>
                        <span>•</span>
                        <span>{trabajo.tiempo_trabajo}</span>
                    </div>

                    <p className={style_trabajos.trabajos_card_desc}>
                        {trabajo.resumen_trabajo}
                    </p>

                    <div className={style_trabajos.trabajos_card_metrics}>
                        {metricas.map((stat, idx) => (
                            <div
                                key={idx}
                                className={style_trabajos.trabajos_layout_metrics}
                            >
                                <ContadorAnimadoAuditoria
                                    valorFinal={stat.valor || 0}
                                    classNameBase={
                                        style_trabajos.trabajos_card_metrics_puntaje
                                    }
                                    clasesColor={{
                                        verde: style_trabajos.verde,
                                        amarillo: style_trabajos.amarillo,
                                        rojo: style_trabajos.rojo
                                    }}
                                    tiempo={1000}
                                />

                                <span
                                    className={
                                        style_trabajos.trabajos_card_metrics_titulo
                                    }
                                >
                                    {stat.etiqueta}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </article>
        </Link>
    );
}
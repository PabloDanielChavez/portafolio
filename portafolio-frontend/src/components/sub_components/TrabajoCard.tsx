"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "@/styles/sections/trabajos.module.scss";
import type { TrabajosType } from "@/types/trabajos";

import { ImagenComponent } from "./ImagenM";
import { ContadorAnimadoAuditoria } from "./ContadorAnimado";
import { trackEvent } from "../utils/Analytics";

import {
    esTrabajoDestacado,
    getEstadoProyecto,
    getFechaProyecto,
    getImagenTrabajo,
    getMetricasAuditoria,
    getPromedioAuditoria,
    type AuditoriaDispositivo
} from "../utils/trabajos.helpers";
import Image from "next/image";

type TrabajoCardProps = {
    trabajo: TrabajosType;
    dispositivo: AuditoriaDispositivo;
    index: number;
    modoResumen?: boolean;
};

export default function TrabajoCard({
    trabajo,
    dispositivo,
    index,
    modoResumen = false
}: TrabajoCardProps) {
    const [visible, setVisible] = useState(false);
    const cardRef = useRef<HTMLElement>(null);

    const metricas = getMetricasAuditoria(trabajo, dispositivo);
    const promedio = getPromedioAuditoria(trabajo, dispositivo);
    const estado = getEstadoProyecto(trabajo.estado_proyecto);
    const fecha = getFechaProyecto(trabajo.fecha_finalizacion);
    const imagenUrl = getImagenTrabajo(trabajo);
    const destacado = esTrabajoDestacado(trabajo);

    useEffect(() => {
        const currentCard = cardRef.current;

        if (!currentCard) return;

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

        observer.observe(currentCard);

        return () => observer.disconnect();
    }, []);

    const handleClickTrabajo = () => {
        trackEvent("click_trabajo", {
            section: "Trabajos",
            project_name: trabajo.nombre_trabajo,
            project_category: trabajo.categoria_trabajo,
            device: dispositivo
        });
    };

    return (
        <article
            ref={cardRef}
            className={`${styles.trabajos_card} ${
                visible ? styles.view : ""
            } ${destacado ? styles.trabajos_card_destacado : ""}`}
            style={{
                transitionDelay: `${index * 120}ms`
            }}
        >
            <Link
                href={`/trabajos/${trabajo.id}`}
                className={styles.trabajos_card_link_wrapper}
                aria-label={`Ver caso de estudio de ${trabajo.nombre_trabajo}`}
                onClick={handleClickTrabajo}
            >
                <div className={styles.trabajos_card_media}>
                    <Image
                        className={styles.trabajos_img}
                        src={imagenUrl}
                        alt={`Vista previa del proyecto ${trabajo.nombre_trabajo}`}
                        width={700}
                        height={520}
                        priority
                    ></Image>

                    <div className={styles.trabajos_card_media_badges}>
                        {destacado && (
                            <span className={styles.trabajos_card_badge}>
                                Proyecto destacado
                            </span>
                        )}

                        <span className={styles.trabajos_card_estado}>
                            {estado}
                        </span>
                    </div>
                </div>

                <div className={styles.trabajos_card_info}>
                    <div className={styles.trabajos_card_top}>
                        <span className={styles.trabajos_card_categoria}>
                            {trabajo.categoria_trabajo}
                        </span>

                        <span className={styles.trabajos_card_promedio}>
                            {promedio}/100
                        </span>
                    </div>

                    <header className={styles.trabajos_card_header}>
                        <h3 className={styles.trabajos_card_titulo}>
                            {trabajo.nombre_trabajo}
                        </h3>

                        <span className={styles.trabajos_card_url}>
                            {trabajo.enlace_trabajoResumido}
                        </span>
                    </header>

                    <div className={styles.trabajos_card_meta}>
                        <span>{trabajo.rol}</span>
                        <span>•</span>
                        <span>{trabajo.categoria_cliente}</span>
                        <span>•</span>
                        <span>{trabajo.numero_pagina} página{trabajo.numero_pagina > 1 ? "s" : ""}</span>
                    </div>

                    <p className={styles.trabajos_card_desc}>
                        {trabajo.resumen_trabajo}
                    </p>

                    {!modoResumen && trabajo.reto_tecnico && (
                        <div className={styles.trabajos_card_challenge}>
                            <span className={styles.trabajos_card_challenge_label}>
                                Reto técnico
                            </span>

                            <p>{trabajo.reto_tecnico}</p>
                        </div>
                    )}

                    <div className={styles.trabajos_card_details}>
                        <span>{trabajo.complejidad_trabajo}</span>
                        <span>{trabajo.style_trabajo}</span>
                        <span>{trabajo.tiempo_trabajo}</span>
                        <span>{fecha}</span>
                    </div>

                    <div
                        className={styles.trabajos_card_metrics}
                        aria-label={`Métricas Lighthouse en ${dispositivo === "mobile" ? "teléfono" : "escritorio"}`}
                    >
                        {metricas.map((stat) => (
                            <div
                                key={stat.id}
                                className={styles.trabajos_layout_metrics}
                            >
                                <ContadorAnimadoAuditoria
                                    valorFinal={stat.valor}
                                    classNameBase={
                                        styles.trabajos_card_metrics_puntaje
                                    }
                                    clasesColor={{
                                        verde: styles.verde,
                                        amarillo: styles.amarillo,
                                        rojo: styles.rojo
                                    }}
                                    tiempo={1000}
                                />

                                <span
                                    className={
                                        styles.trabajos_card_metrics_titulo
                                    }
                                >
                                    {stat.etiqueta}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Link>
        </article>
    );
}
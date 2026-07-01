"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { getTrabajoCommercialContent } from "@/content/trabajos-commercial.content";
import styles from "@/styles/sections/trabajos.module.scss";
import type { TrabajosType } from "@/types/trabajos";

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
    headingLevel: "h2" | "h3";
};

export default function TrabajoCard({
    trabajo,
    dispositivo,
    index,
    modoResumen = false,
    headingLevel
}: TrabajoCardProps) {
    const [visible, setVisible] = useState(false);
    const cardRef = useRef<HTMLElement>(null);
    const Heading = headingLevel;

    const metricas = getMetricasAuditoria(trabajo, dispositivo);
    const promedio = getPromedioAuditoria(trabajo, dispositivo);
    const estado = getEstadoProyecto(trabajo.estado_proyecto);
    const fecha = getFechaProyecto(trabajo.fecha_finalizacion);
    const imagenUrl = getImagenTrabajo(trabajo);
    const destacado = esTrabajoDestacado(trabajo);
    const commercialContent = getTrabajoCommercialContent(trabajo);

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
            project_name: commercialContent.displayName,
            project_category: commercialContent.category,
            device: dispositivo
        });
    };

    if (modoResumen) {
        return (
            <article
                ref={cardRef}
                className={`${styles.trabajos_card_resumen} ${
                    index === 0 ? styles.trabajos_card_principal : ""
                } ${visible ? styles.view : ""}`}
                style={{ transitionDelay: `${index * 90}ms` }}
            >
                <Link
                    href={`/trabajos/${trabajo.slug}`}
                    className={styles.trabajos_card_resumen_link}
                    aria-label={`Ver proyecto ${commercialContent.displayName}`}
                    onClick={handleClickTrabajo}
                >
                    <Image
                        className={styles.trabajos_card_resumen_img}
                        src={imagenUrl}
                        alt={`Vista previa del proyecto ${commercialContent.displayName}`}
                        fill
                        priority={index === 0}
                        sizes={index === 0
                            ? "(min-width: 974px) 1180px, 100vw"
                            : "(min-width: 974px) 33vw, (min-width: 696px) 50vw, 100vw"}
                    />

                    <div className={styles.trabajos_card_resumen_badges}>
                        {index === 0 && (
                            <span className={styles.trabajos_card_badge}>Destacado</span>
                        )}
                        <span className={styles.trabajos_card_estado}>{estado}</span>
                    </div>

                    <div className={styles.trabajos_card_overlay}>
                        <div>
                            <span className={styles.trabajos_card_categoria}>
                                {commercialContent.category}
                            </span>
                            <Heading>{commercialContent.displayName}</Heading>
                        </div>

                        <div className={styles.trabajos_card_resumen_meta}>
                            <span><strong>{promedio}</strong> Lighthouse</span>
                            <span>{trabajo.rol}</span>
                        </div>

                        <span className={styles.trabajos_card_resumen_cta}>
                            Ver proyecto
                        </span>
                    </div>
                </Link>
            </article>
        );
    }

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
                href={`/trabajos/${trabajo.slug}`}
                className={styles.trabajos_card_link_wrapper}
                aria-label={`Ver caso de estudio de ${commercialContent.displayName}`}
                onClick={handleClickTrabajo}
            >
                <div className={styles.trabajos_card_media}>
                    <Image
                        className={styles.trabajos_img}
                        src={imagenUrl}
                        alt={`Vista previa del proyecto ${commercialContent.displayName}`}
                        width={700}
                        height={520}
                        priority={index === 0}
                        sizes="(min-width: 1218px) 520px, (min-width: 696px) 42vw, 100vw"
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
                            {commercialContent.category}
                        </span>

                        <span className={styles.trabajos_card_promedio}>
                            {promedio}/100
                        </span>
                    </div>

                    <header className={styles.trabajos_card_header}>
                        <Heading className={styles.trabajos_card_titulo}>
                            {commercialContent.displayName}
                        </Heading>

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
                        {commercialContent.commercialSummary}
                    </p>

                    {!modoResumen && commercialContent.challenge && (
                        <div className={styles.trabajos_card_challenge}>
                            <span className={styles.trabajos_card_challenge_label}>
                                Desafío del proyecto
                            </span>

                            <p>{commercialContent.challenge}</p>
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

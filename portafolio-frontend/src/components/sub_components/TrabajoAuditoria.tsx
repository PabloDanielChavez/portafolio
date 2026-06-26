"use client";

import { useState } from "react";

import style_trabajos from "@/styles/sections/trabajos.module.scss";
import type { TrabajosType } from "@/types/trabajos";

import { ContadorAnimadoAuditoria } from "./ContadorAnimado";
import { trackEvent } from "../utils/Analytics";

import {
    auditoriaTabs,
    getMetricasAuditoria,
    getPromedioAuditoria,
    type AuditoriaDispositivo
} from "../utils/trabajos.helpers";

type TrabajoAuditoriaProps = {
    trabajo: TrabajosType;
};

export default function TrabajoAuditoria({ trabajo }: TrabajoAuditoriaProps) {
    const [dispositivo, setDispositivo] = useState<AuditoriaDispositivo>("mobile");

    const metricas = getMetricasAuditoria(trabajo, dispositivo);
    const promedio = getPromedioAuditoria(trabajo, dispositivo);

    const handleChangeDispositivo = (nuevoDispositivo: AuditoriaDispositivo) => {
        setDispositivo(nuevoDispositivo);

        trackEvent("click_PagTrabajos_auditoria", {
            section: "PagTrabajoDetalle",
            project_name: trabajo.nombre_trabajo,
            device: nuevoDispositivo
        });
    };

    return (
        <section
            className={style_trabajos.pagTrabajo_auditoria}
            aria-labelledby="auditoria-title"
        >
            <header className={style_trabajos.pagTrabajo_section_header}>
                <span className={style_trabajos.pagTrabajo_section_label}>
                    Auditoría Lighthouse
                </span>

                <h2
                    id="auditoria-title"
                    className={style_trabajos.pagTrabajo_h2}
                >
                    Rendimiento del proyecto
                </h2>

                <p className={style_trabajos.pagTrabajo_parrafo}>
                    Métricas medidas para analizar rendimiento, accesibilidad,
                    buenas prácticas y SEO técnico.
                </p>
            </header>

            <div className={style_trabajos.pagTrabajo_auditoria_top}>
                <div className={style_trabajos.pagTrabajo_promedio}>
                    <span className={style_trabajos.pagTrabajo_promedio_numero}>
                        {promedio}
                    </span>
                    <span className={style_trabajos.pagTrabajo_promedio_texto}>
                        Promedio general en {dispositivo === "mobile" ? "teléfono" : "escritorio"}
                    </span>
                </div>

                <div
                    className={style_trabajos.pagTrabajo_tabs_container}
                    role="tablist"
                    aria-label="Seleccionar dispositivo de auditoría"
                >
                    {auditoriaTabs.map((tab) => {
                        const isActive = dispositivo === tab.id;

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-pressed={isActive}
                                title={tab.description}
                                onClick={() => handleChangeDispositivo(tab.id)}
                                className={`${style_trabajos.pagTrabajo_tab_btn} ${
                                    isActive
                                        ? style_trabajos.pagTrabajo_tab_btn_activo
                                        : style_trabajos.pagTrabajo_tab_btn_desactivado
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div
                className={style_trabajos.pagTrabajo_card_metrics}
                aria-label={`Métricas Lighthouse en ${dispositivo === "mobile" ? "teléfono" : "escritorio"}`}
            >
                {metricas.map((stat) => (
                    <article
                        key={stat.id}
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

                        <span className={style_trabajos.pagTrabajo_card_metrics_titulo}>
                            {stat.etiqueta}
                        </span>
                    </article>
                ))}
            </div>
        </section>
    );
}
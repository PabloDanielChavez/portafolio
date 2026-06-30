"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IoIosRocket, IoMdArrowBack } from "react-icons/io";

import style_trabajos from "@/styles/sections/trabajos.module.scss";
import type { TrabajosType } from "@/types/trabajos";

import SectionHeader from "../sub_components/SectionHeader";
import TrabajoCard from "../sub_components/TrabajoCard";
import { trackEvent } from "../utils/Analytics";

import {
    auditoriaTabs,
    ordenarTrabajos,
    type AuditoriaDispositivo
} from "../utils/trabajos.helpers";

type TrabajosProps = {
    trabajos: TrabajosType[];
    showFooter?: boolean;
    headingLevel?: "h1" | "h2";
};

export default function Trabajos({
    trabajos,
    showFooter = false,
    headingLevel = "h2"
}: TrabajosProps) {
    const [dispositivo, setDispositivo] = useState<AuditoriaDispositivo>("mobile");

    const trabajosOrdenados = useMemo(() => {
        const ordenados = ordenarTrabajos(trabajos);

        if (!showFooter) return ordenados;

        const prioridadComercial = (nombre: string) => {
            const normalizado = nombre
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

            if (normalizado.includes("jardineria montanez")) return 2;
            if (normalizado.includes("plomada")) return 1;
            return 0;
        };

        return [...ordenados]
            .sort(
                (a, b) =>
                    prioridadComercial(b.nombre_trabajo) -
                    prioridadComercial(a.nombre_trabajo)
            )
            .slice(0, 5);
    }, [trabajos, showFooter]);

    const handleChangeDispositivo = (nuevoDispositivo: AuditoriaDispositivo) => {
        setDispositivo(nuevoDispositivo);

        trackEvent("click_Trabajos_auditoria", {
            section: "Trabajos",
            device: nuevoDispositivo
        });
    };

    return (
        <section
            className={`${style_trabajos.trabajos} ${
                showFooter ? style_trabajos.trabajos_resumen : ""
            }`}
            id="trabajos"
            aria-label="Proyectos web realizados"
        >
            <div className={style_trabajos.trabajos_layout}>
                {!showFooter && (
                    <Link
                        href="/"
                        className={style_trabajos.pagTrabajo_LINK}
                        aria-label="Volver al inicio del portafolio"
                    >
                        <IoMdArrowBack aria-hidden="true" />
                        Volver al Portafolio
                    </Link>
                )}

                <header className={style_trabajos.trabajos_header}>
                    <SectionHeader
                        icon={<IoIosRocket />}
                        title="Trabajos que convierten ideas en presencia digital"
                        description="Una selección de proyectos reales, resueltos con foco en claridad, rendimiento y experiencia de usuario."
                        headingLevel={headingLevel}
                    />

                    {!showFooter && <div className={style_trabajos.trabajos_auditoria}>
                        <div className={style_trabajos.trabajos_auditoria_info}>
                            <span className={style_trabajos.trabajos_auditoria_label}>
                                Métricas Lighthouse
                            </span>

                            <p className={style_trabajos.trabajos_auditoria_texto}>
                                Cambiá entre auditoría móvil y escritorio para ver el rendimiento de cada proyecto.
                            </p>
                        </div>

                        <div
                            className={style_trabajos.pagTrabajo_tabs_container}
                            role="tablist"
                            aria-label="Seleccionar tipo de auditoría"
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
                    </div>}
                </header>

                <div className={style_trabajos.trabajos_contenido_box}>
                    <div className={style_trabajos.trabajos_contenido_box_layout}>
                        {trabajosOrdenados.map((trabajo, index) => (
                            <TrabajoCard
                                key={trabajo.id}
                                trabajo={trabajo}
                                dispositivo={dispositivo}
                                index={index}
                                modoResumen={showFooter}
                            />
                        ))}
                    </div>
                </div>

                {showFooter && (
                    <footer className={style_trabajos.trabajos_card_footer}>
                        <Link
                            href="/trabajos"
                            className={style_trabajos.trabajos_card_btn}
                            aria-label="Ver todos los proyectos realizados"
                            onClick={() =>
                                trackEvent("click_trabajos", {
                                    section: "Trabajos"
                                })
                            }
                        >
                            Más proyectos
                            <FaArrowRight aria-hidden="true" />
                        </Link>
                    </footer>
                )}
            </div>
        </section>
    );
}

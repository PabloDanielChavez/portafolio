"use client";

import Link from "next/link";

import style_trabajos from "@/styles/sections/trabajos.module.scss";
import { FaGithub, FaLink, IoMdArrowBack } from "@/components/utils/Iconos";
import type { TrabajosType } from "@/types/trabajos";

import { trackEvent } from "../utils/Analytics";

type TrabajoDetalleActionsProps = {
    trabajo: TrabajosType;
};

export default function TrabajoDetalleActions({ trabajo }: TrabajoDetalleActionsProps) {
    return (
        <div className={style_trabajos.pagTrabajo_actions}>
            <Link
                href="/"
                className={style_trabajos.pagTrabajo_LINK}
                aria-label="Volver al inicio del portafolio"
                onClick={() => {
                    trackEvent("click_PagTrabajos_VolverPortafolio", {
                        section: "PagTrabajoDetalle",
                        project_name: trabajo.nombre_trabajo
                    });
                }}
            >
                <IoMdArrowBack aria-hidden="true" />
                Volver al Portafolio
            </Link>

            <div className={style_trabajos.pagTrabajo_external_links}>
                {trabajo.enlace_repositorio && (
                    <a
                        href={trabajo.enlace_repositorio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style_trabajos.pagTrabajo_detalle_link}
                        aria-label={`Ver repositorio de ${trabajo.nombre_trabajo} en GitHub`}
                        onClick={() => {
                            trackEvent("click_PagTrabajos_enlace_github", {
                                section: "PagTrabajoDetalle",
                                project_name: trabajo.nombre_trabajo
                            });
                        }}
                    >
                        <FaGithub aria-hidden="true" />
                        <span>Repositorio</span>
                    </a>
                )}

                {trabajo.enlace_trabajo && (
                    <a
                        href={trabajo.enlace_trabajo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style_trabajos.pagTrabajo_detalle_link}
                        aria-label={`Visitar proyecto ${trabajo.nombre_trabajo}`}
                        onClick={() => {
                            trackEvent("click_PagTrabajos_enlace_pagina", {
                                section: "PagTrabajoDetalle",
                                project_name: trabajo.nombre_trabajo
                            });
                        }}
                    >
                        <FaLink aria-hidden="true" />
                        <span>Ver sitio</span>
                    </a>
                )}
            </div>
        </div>
    );
}
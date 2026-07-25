"use client";

import { ReactNode } from "react";
import styles_seccionHeader from "@/styles/sections/SectionHeader.module.scss";

export type VarianteEncabezadoSeccion =
    | "compacto"
    | "orientacion"
    | "evidencia"
    | "comparacion"
    | "proceso"
    | "soporte"
    | "humano";

interface SectionHeaderProps {
    icon: ReactNode;
    title: string;
    description: string;
    headingLevel?: "h1" | "h2";
    headingId?: string;
    variante?: VarianteEncabezadoSeccion;
}

const clasesPorVariante: Record<VarianteEncabezadoSeccion, string> = {
    compacto: styles_seccionHeader.header_box_compacto,
    orientacion: styles_seccionHeader.header_box_orientacion,
    evidencia: styles_seccionHeader.header_box_evidencia,
    comparacion: styles_seccionHeader.header_box_comparacion,
    proceso: styles_seccionHeader.header_box_proceso,
    soporte: styles_seccionHeader.header_box_soporte,
    humano: styles_seccionHeader.header_box_humano
};

export default function SectionHeader({
    icon,
    title,
    description,
    headingLevel = "h2",
    headingId,
    variante
}: SectionHeaderProps) {
    const Heading = headingLevel;
    const claseVariante = variante ? clasesPorVariante[variante] : "";

    return (
    <div className={`${styles_seccionHeader.header_box}${claseVariante ? ` ${claseVariante}` : ""}`}>
        <div className={styles_seccionHeader.header_title_marco}>
            <div className={styles_seccionHeader.header_title_group}>
                <span className={styles_seccionHeader.header_icon}>
                    {icon}
                </span>
                <Heading
                    id={headingId}
                    className={styles_seccionHeader.header_title}
                >
                    {title}
                </Heading>
            </div>
        </div>
        <div className={styles_seccionHeader.header_description}>
            <p className={styles_seccionHeader.header_description_p}>{description}</p>
        </div>
    </div>
    );
}

"use client";

import Link from "next/link";

import {
    AiTwotoneSchedule,
    FiDatabase,
    FiTool,
    HiOutlineCodeBracket,
    IoMdArrowBack,
    LuCircleGauge,
    LuGauge,
    LuMonitorSmartphone
} from "@/components/utils/Iconos";
import styles from "@/styles/sections/servicios.module.scss";
import type { ServiciosType } from "@/types/servicios";

import SectionHeader from "../sub_components/SectionHeader";
import ServicioCard from "../sub_components/ServicioCard";

type Props = {
    servicios: ServiciosType[];
    showBackLink?: boolean;
    headingLevel?: "h1" | "h2";
};

export default function Servicios({
    servicios,
    showBackLink = true,
    headingLevel = "h2"
}: Props) {
    const renderIcono = (nombre: string) => {
        if (nombre === "LuMonitorSmartphone") return <LuMonitorSmartphone />;
        if (nombre === "HiOutlineCodeBracket") return <HiOutlineCodeBracket />;
        if (nombre === "LuGauge") return <LuGauge />;
        if (nombre === "FiTool") return <FiTool />;
        if (nombre === "TbPlugConnected") return <LuCircleGauge />;
        return <FiDatabase />;
    };

    return (
        <section className={styles.servicios} id="servicios">
            <div className={styles.servicios_layout}>
                {showBackLink && (
                    <Link href="/" className={styles.servicios_LINK}>
                        <IoMdArrowBack aria-hidden="true" />
                        Volver al portafolio
                    </Link>
                )}

                <SectionHeader
                    icon={<AiTwotoneSchedule />}
                    title="Servicios web para hacer crecer tu negocio"
                    description="Soluciones concretas, explicadas sin tecnicismos y enfocadas en que tu presencia digital sea clara, rápida y confiable."
                    headingLevel={headingLevel}
                />

                <div className={styles.servicios_contenido_box_layout}>
                    {servicios?.map((servicio) => (
                        <ServicioCard
                            key={servicio.id}
                            servicio={servicio}
                            icono={renderIcono(servicio.reactIcon)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

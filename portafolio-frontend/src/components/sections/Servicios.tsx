"use client";

import styles from "@/styles/sections/servicios.module.scss";
import {
    AiTwotoneSchedule,
    FiDatabase,
    HiOutlineCodeBracket,
    LuMonitorSmartphone,
    PiPalette,
    TbChartBarPopular
} from "@/components/utils/Iconos";

import { ServiciosType } from "@/types/servicios";
import SectionHeader from "../sub_components/SectionHeader";
import ServicioCard from "../sub_components/ServicioCard";

type Props = {
    servicios: ServiciosType[];
};

export default function Servicios({ servicios }: Props) {

    const renderIcono = (nombreString: string) => {
        if (nombreString === "LuMonitorSmartphone") return <LuMonitorSmartphone />;
        if (nombreString === "HiOutlineCodeBracket") return <HiOutlineCodeBracket />;
        if (nombreString === "PiPalette") return <PiPalette />;
        if (nombreString === "TbChartBarPopular") return <TbChartBarPopular />;
        if (nombreString === "FiDatabase") return <FiDatabase />;

        return <FiDatabase />;
    };

    return (
        <section className={styles.servicios}>
            <div className={styles.servicios_layout}>
                <div className={styles.servicios_header}>
                    <SectionHeader
                        icon={<AiTwotoneSchedule />}
                        title="Mis Servicios"
                        description="Formular estrategias integrales para alcanzar sus objetivos de diseño y superar las expectativas."
                    />

                    <div className={styles.servicios_contenido_box}>
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
                </div>
            </div>
        </section>
    );
}
"use client";

import styles from "@/styles/sections/servicios.module.scss";
import { AiTwotoneSchedule, FiDatabase, FiTool, HiOutlineCodeBracket, IoMdArrowBack, LuCircleGauge, LuGauge, LuMonitorSmartphone} from "@/components/utils/Iconos";

import { ServiciosType } from "@/types/servicios";
import SectionHeader from "../sub_components/SectionHeader";
import ServicioCard from "../sub_components/ServicioCard";
import Link from "next/link";

type Props = {
    servicios: ServiciosType[];
};

export default function Servicios({ servicios }: Props) {

    const renderIcono = (nombreString: string) => {
        if (nombreString === "LuMonitorSmartphone") return <LuMonitorSmartphone />;
        if (nombreString === "HiOutlineCodeBracket") return <HiOutlineCodeBracket />;
        if (nombreString === "LuGauge") return <LuGauge />;
        if (nombreString === "FiTool") return <FiTool />;
        if (nombreString === "TbPlugConnected") return <LuCircleGauge />;

        return <FiDatabase />;
    };

    return (
        <section className={styles.servicios}>
            <div className={styles.servicios_layout}>
                <Link
                    href="/"
                    className={styles.servicios_LINK}
                    aria-label="Volver a Inicio"
                >
                    <IoMdArrowBack />
                    Volver al Portafolio
                </Link>
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
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
import { serviciosSectionContent } from "@/content/servicios-commercial.content";
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
    const cardHeadingLevel = headingLevel === "h1" ? "h2" : "h3";
    const DecisionHeading = headingLevel === "h1" ? "h2" : "h3";

    const renderIcono = (nombre: string) => {
        if (nombre === "LuMonitorSmartphone") return <LuMonitorSmartphone />;
        if (nombre === "HiOutlineCodeBracket") return <HiOutlineCodeBracket />;
        if (nombre === "LuGauge") return <LuGauge />;
        if (nombre === "FiTool") return <FiTool />;
        if (nombre === "TbPlugConnected") return <LuCircleGauge />;
        return <FiDatabase />;
    };

    return (
        <section
            className={styles.servicios}
            id="servicios"
            aria-labelledby="servicios-title"
        >
            <div className={styles.servicios_layout}>
                {showBackLink && (
                    <Link href="/" className={styles.servicios_LINK}>
                        <IoMdArrowBack aria-hidden="true" />
                        Volver al portafolio
                    </Link>
                )}

                <SectionHeader
                    icon={<AiTwotoneSchedule />}
                    title={serviciosSectionContent.title}
                    description={serviciosSectionContent.description}
                    headingLevel={headingLevel}
                    headingId="servicios-title"
                />

                <div className={styles.servicios_contenido_box_layout}>
                    {servicios?.map((servicio) => (
                        <ServicioCard
                            key={servicio.id}
                            servicio={servicio}
                            icono={renderIcono(servicio.reactIcon)}
                            headingLevel={cardHeadingLevel}
                        />
                    ))}
                </div>

                <div className={styles.servicios_decision}>
                    <div className={styles.servicios_decision_header}>
                        <span>
                            {serviciosSectionContent.decisionGuide.eyebrow}
                        </span>
                        <DecisionHeading>
                            {serviciosSectionContent.decisionGuide.title}
                        </DecisionHeading>
                        <p>
                            {serviciosSectionContent.decisionGuide.description}
                        </p>
                    </div>

                    <ul className={styles.servicios_decision_options}>
                        {serviciosSectionContent.decisionGuide.options.map(
                            (option) => (
                                <li key={option.href}>
                                    <Link href={option.href}>
                                        <strong>{option.title}</strong>
                                        <span>{option.description}</span>
                                        <small>{option.linkLabel}</small>
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>

                    <div className={styles.servicios_decision_actions}>
                        <Link
                            href={
                                serviciosSectionContent.decisionGuide
                                    .primaryAction.href
                            }
                            className={styles.servicios_decision_primary}
                        >
                            {
                                serviciosSectionContent.decisionGuide
                                    .primaryAction.label
                            }
                        </Link>
                        <Link
                            href={
                                serviciosSectionContent.decisionGuide
                                    .contactAction.href
                            }
                            className={styles.servicios_decision_secondary}
                        >
                            {
                                serviciosSectionContent.decisionGuide
                                    .contactAction.label
                            }
                        </Link>
                        {!showBackLink && (
                            <Link
                                href={
                                    serviciosSectionContent.decisionGuide
                                        .servicesAction.href
                                }
                                className={styles.servicios_decision_text_link}
                            >
                                {
                                    serviciosSectionContent.decisionGuide
                                        .servicesAction.label
                                }
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

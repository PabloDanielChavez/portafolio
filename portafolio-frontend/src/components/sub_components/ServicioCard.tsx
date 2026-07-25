import type { ReactNode } from "react";

import { getServicioCommercialContent } from "@/content/servicios-commercial.content";
import styles from "@/styles/sections/servicios.module.scss";
import type { ServiciosType } from "@/types/servicios";

type Props = {
    servicio: ServiciosType;
    icono: ReactNode;
    headingLevel: "h2" | "h3";
};

export default function ServicioCard({
    servicio,
    icono,
    headingLevel
}: Props) {
    const Heading = headingLevel;
    const commercialContent = getServicioCommercialContent(servicio);

    return (
        <article className={styles.servicios_card}>
            <span className={styles.servicios_card_icon} aria-hidden="true">
                {icono}
            </span>
            <Heading>{commercialContent.title}</Heading>
            <p>{commercialContent.description}</p>
        </article>
    );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
    const [debeAnimarse, establecerDebeAnimarse] = useState(false);
    const ref = useRef<HTMLElement>(null);
    const Heading = headingLevel;
    const commercialContent = getServicioCommercialContent(servicio);

    useEffect(() => {
        const card = ref.current;

        if (!card || typeof IntersectionObserver === "undefined") {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    establecerDebeAnimarse(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <article
            ref={ref}
            className={`${styles.servicios_card} ${debeAnimarse ? styles.servicios_card_animada : ""}`}
        >
            <span className={styles.servicios_card_icon} aria-hidden="true">
                {icono}
            </span>
            <Heading>{commercialContent.title}</Heading>
            <p>{commercialContent.description}</p>
        </article>
    );
}

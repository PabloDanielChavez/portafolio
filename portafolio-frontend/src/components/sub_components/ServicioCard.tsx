"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);
    const Heading = headingLevel;

    useEffect(() => {
        const card = ref.current;

        if (!card || typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
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
            className={`${styles.servicios_card} ${visible ? styles.servicios_card_visible : ""}`}
        >
            <span className={styles.servicios_card_icon} aria-hidden="true">
                {icono}
            </span>
            <Heading>{servicio.nombre_servicio}</Heading>
            <p>{servicio.informacion_servicio}</p>
        </article>
    );
}

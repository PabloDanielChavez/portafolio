"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import styles from "@/styles/sections/servicios.module.scss";
import { ServiciosType } from "@/types/servicios";
import { FaArrowRight } from "react-icons/fa6";
import { trackEvent } from "../utils/Analytics";

type Props = {
    servicio: ServiciosType;
    icono: ReactNode;
};

export default function ServicioCard({
    servicio,
    icono
}: Props) {

    const [visible, setVisible] = useState(false);

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }

            },
            {
                threshold: 0.15
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();

    }, []);

    return (
        <article
            ref={ref}
            className={`
                ${styles.servicios_contenido_article}
                ${
                    visible
                        ? styles.servicios_contenido_article_visible
                        : ""
                }
            `}
            onClick={() =>
                trackEvent("click_servicio", {
                    section: "Servicios",
                    servicio: servicio.nombre_servicio
                })
            }
        >
            <div className={styles.servicios_contenido_article_header_layout}>

                <div className={styles.servicios_contenido_article_header_emp}>

                    <div className={styles.servicios_contenido_article_header_icono}>
                        {icono}
                    </div>

                    <div className={styles.servicios_contenido_article_header_nombre}>
                        <h3
                            className={
                                styles.servicios_contenido_article_header_nombre_h3
                            }
                        >
                            {servicio.nombre_servicio}
                        </h3>
                    </div>

                </div>

                <div className={styles.servicios_contenido_article_header_flecha}>
                    <p
                        className={
                            styles.servicios_contenido_article_header_flecha_p
                        }
                    >
                        <FaArrowRight />
                    </p>
                </div>

            </div>

            <div
                className={
                    styles.servicios_contenido_article_contenido_layout
                }
            >
                <p
                    className={
                        styles.servicios_contenido_article_contenido_puesto_p_informacion
                    }
                >
                    {servicio.informacion_servicio}
                </p>
            </div>
        </article>
    );
}
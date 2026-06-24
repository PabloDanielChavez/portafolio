"use client";

import styles from "@/styles/sections/planes.module.scss";
import Link from "next/link";

type Props = {
    plan: {
        id: number;
        destacado: boolean;
        titulo: string;
        ideal: string;
        objetivo: string;
        descripcion: string;
        items: string[];
    }
};

export default function PlanCard({ plan }: Props) {
    const getPlanPath = (id: number) => {
        switch (id) {
            case 1: return "/servicios/planes/landing_page";
            case 2: return "/servicios/planes/sitio_web";
            case 3: return "/servicios/planes/desarrollo_web";
            default: return "/";
        }
    };
    return (
        <Link className={styles.planes_LINK} href={getPlanPath(plan.id)}>
            <article className={` ${styles.planes_card} ${plan.destacado ? styles.planes_card_destacado : ""}`}>
                {plan.destacado && (<span className={styles.planes_card_badge}>Más Elegido</span>)}
                <h3 className={styles.planes_card_titulo}>{plan.titulo}</h3>
                <p className={styles.planes_card_descripcion}>{plan.descripcion}</p>
                <ul className={styles.planes_card_lista}>
                    {plan.items.map((item) => (
                        <li key={item} className={styles.planes_card_item} >
                                <span className={styles.planes_card_texto}>{item}</span>
                        </li>
                    ))}
                </ul>
                <button className={styles.planes_boton}>Solicitar presupuesto</button>
            </article>
        </Link>
    );
}
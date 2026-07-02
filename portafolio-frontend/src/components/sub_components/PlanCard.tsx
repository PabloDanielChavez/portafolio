import Link from "next/link";
import styles from "@/styles/sections/planes.module.scss";
import { Plan } from "@/types/plan";

type PlanCardProps = {
    planes: Plan;
};

export default function PlanCard({ planes }: PlanCardProps) {
    return (
        <article className={`${styles.planes_card} ${ planes.destacado ? styles.planes_card_destacado : ""}`}>
            <Link
                className={styles.planes_card_link}
                href={planes.href}
                aria-label={`Ver detalles del plan ${planes.titulo}`}
            >
                {planes.destacado && (
                    <span className={styles.planes_card_badge}>
                        {planes.etiqueta}
                    </span>
                )}
                <h3 className={styles.planes_card_titulo}>{planes.titulo}</h3>
                <p className={styles.planes_card_descripcion}>{planes.descripcion}</p>
                <p className={styles.planes_card_ideal}>
                    <strong>Te conviene si:</strong> {planes.cardIdeal}
                </p>
                <p className={styles.planes_card_precio}>{planes.precio}</p>
                <p className={styles.planes_card_plazo}>{planes.plazo}</p>
                <ul className={styles.planes_card_lista}>
                    {planes.items.slice(0, 5).map((item) => (
                        <li key={`${planes.id}-${item}`} className={styles.planes_card_item}>
                            <span className={styles.planes_card_texto}>
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
                <span className={styles.planes_boton}>
                    Ver plan y alcance
                </span>
            </Link>
        </article>
    );
}

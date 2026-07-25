import Link from "next/link";

import styles from "@/styles/sections/planes.module.scss";
import { TbChartBarPopular } from "@/components/utils/Iconos";

import SectionHeader from "../sub_components/SectionHeader";
import PlanCard from "../sub_components/PlanCard";
import { planes } from "@/components/utils/planes.data";

type VariantePlanes = "comparacion";

type Props = {
    variante?: VariantePlanes;
};

export default function Planes({ variante }: Props) {
    const esComparacion = variante === "comparacion";

    return (
        <section
            className={`${styles.planes} ${
                esComparacion ? styles.planes_comparacion : ""
            }`}
            id="planes"
            aria-labelledby="planes-title"
        >
            <div className={styles.planes_layout}>
                <SectionHeader
                    icon={<TbChartBarPopular />}
                    title="Elegí el desarrollo web adecuado para tu proyecto"
                    description="Compará para qué sirve cada desarrollo, qué variables definen su alcance y cómo se establece el presupuesto. Si todavía no sabés por dónde empezar, revisamos juntos qué necesitás resolver."
                    headingId="planes-title"
                    variante={esComparacion ? "comparacion" : undefined}
                />

                <div className={styles.planes_content}>
                    <div className={styles.planes_grid}>
                        {planes.map((plan) => (
                            <PlanCard key={plan.id} planes={plan} />
                        ))}
                    </div>
                </div>

                <div className={styles.planes_help}>
                    <div>
                        <h3>¿No sabés qué servicio elegir?</h3>
                        <p>
                            Contame qué hace tu negocio y qué necesitás resolver. Revisamos el contexto y te oriento sobre el punto de partida más adecuado antes de definir el alcance y el presupuesto.
                        </p>
                    </div>
                    <Link href="/contacto">
                        Contame tu proyecto
                    </Link>
                </div>
            </div>
        </section>
    );
}

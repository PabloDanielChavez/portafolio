import Link from "next/link";

import styles from "@/styles/sections/planes.module.scss";
import { TbChartBarPopular } from "@/components/utils/Iconos";

import SectionHeader from "../sub_components/SectionHeader";
import PlanCard from "../sub_components/PlanCard";
import { planes } from "@/components/utils/planes.data";

export default function Planes() {
    return (
        <section className={styles.planes} id="planes" aria-labelledby="planes-title">
            <div className={styles.planes_layout}>
                <SectionHeader
                    icon={<TbChartBarPopular />}
                    title="Elegí la web adecuada para tu próximo paso"
                    description="Compará el alcance, el precio orientativo y el plazo de cada opción. Elegimos una base y la ajustamos a las necesidades reales de tu negocio, sin costos ocultos."
                    headingId="planes-title"
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
                        <h3>¿No sabés qué plan elegir?</h3>
                        <p>
                            Contame qué hace tu negocio y qué necesitás resolver.
                            Te recomiendo la opción más lógica antes de preparar
                            cualquier presupuesto.
                        </p>
                    </div>
                    <Link href="/contacto">
                        Pedir recomendación sin compromiso
                    </Link>
                </div>
            </div>
        </section>
    );
}

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
                    title="Planes claros para cada etapa"
                    description="Elegí una base y la ajustamos a las necesidades reales de tu negocio. Sin costos ocultos ni funciones que no vas a usar."
                />

                <div className={styles.planes_content}>
                    <div className={styles.planes_grid}>
                        {planes.map((plan) => (
                            <PlanCard key={plan.id} planes={plan} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

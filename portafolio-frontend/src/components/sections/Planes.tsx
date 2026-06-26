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
                    title="Planes para páginas web profesionales"
                    description="Elegí el tipo de proyecto que mejor se adapta a tu negocio. Cada plan está pensado para generar confianza, mejorar tu presencia online y aumentar las consultas de potenciales clientes."
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
"use client";
import { AiTwotoneSchedule } from "@/components/utils/Iconos";
import styles from "@/styles/sections/clientes.module.scss";
import { ClientesType } from "@/types/clientes";
import { ClienteCard } from "@/components/sub_components/ClienteCard";
import SectionHeader from "../sub_components/SectionHeader";

type Props = {
    clientes: ClientesType[];
};

export default function Clientes({ clientes }: Props) {
    if (!clientes || clientes.length === 0) return null;

    return (
        <article className={styles.clientes}>
            <div className={styles.clientes_layout}>
                <SectionHeader 
                    icon={<AiTwotoneSchedule />} 
                    title="Opiniones de clientes" 
                    description="Descubre lo que opinan mis clientes satisfechos sobre su experiencia trabajando conmigo." 
                />
                <div className={styles.clientes_box}>
                    <div className={styles.clientes_box_layout}>
                        {clientes.map((cli) => (
                            <ClienteCard key={cli.id} cli={cli} />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
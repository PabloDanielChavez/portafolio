import { AiTwotoneSchedule } from "react-icons/ai";
import style_clientes from "@/styles/sections/clientes.module.scss";
import { ClientesType } from "@/types/clientes";
import { ClienteCard } from "@/components/sub_components/ClienteCard";
import SectionHeader from "./sub_components/SectionHeader";

type Props = {
    clientes: ClientesType[];
};

export default function Clientes({ clientes }: Props) {
    if (!clientes || clientes.length === 0) return null;

    return (
        <article className={style_clientes.clientes}>
            <div className={style_clientes.clientes_layout}>
                <SectionHeader 
                    icon={<AiTwotoneSchedule />} 
                    title="Opiniones de clientes" 
                    description="Descubre lo que opinan mis clientes satisfechos sobre su experiencia trabajando conmigo." 
                />
                <div className={style_clientes.clientes_contenido_box}>
                    <div className={style_clientes.clientes_contenido_box_layout}>
                        {clientes.map((cli) => (
                            <ClienteCard key={cli.id} cli={cli} />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
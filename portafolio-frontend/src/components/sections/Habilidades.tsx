import style_habilidades from "@/styles/sections/habilidades.module.scss"
import { HabilidadesType } from "@/types/habilidades";
import SectionHeader from "../sub_components/SectionHeader";
import { FaCss3Alt, PiStack, SiCanva, SiHtml5, SiMysql, SiNextdotjs, SiNodedotjs, SiReact, SiSass, SiSequelize, TbBrandAdobePhotoshop, TbBrandAdobePremier } from "@/components/utils/Iconos";

const coloresTech: Record<string, string> = {
    HTML: "#E34F26", CSS: "#1572B6", SASS: "#CC6699", REACT: "#61DAFB",
    Next: "#FFFFFF", Node: "#339933", Sequelize: "#52B0E7", MySQL: "#4479A1",
    Photoshop: "#31A8FF", PremierePro: "#9999FF", Canva: "#00C4CC",
};

const iconosTech: Record<string, React.ReactNode> = {
    HTML: <SiHtml5 size={24} style={{ color: coloresTech.HTML }} />,
    CSS: <FaCss3Alt size={24} style={{ color: coloresTech.CSS }} />,
    SASS: <SiSass size={24} style={{ color: coloresTech.SASS }} />,
    REACT: <SiReact size={24} style={{ color: coloresTech.REACT }} />,
    NEXT: <SiNextdotjs size={24} style={{ color: coloresTech.Next }} />,
    NODE: <SiNodedotjs size={24} style={{ color: coloresTech.Node }} />,
    SEQUELIZE: <SiSequelize size={24} style={{ color: coloresTech.Sequelize }} />,
    MySQL: <SiMysql size={24} style={{ color: coloresTech.MySQL }} />,
    PHOTOSHOP: <TbBrandAdobePhotoshop size={24} style={{ color: coloresTech.Photoshop }} />,
    PREMIEREPRO: <TbBrandAdobePremier size={24} style={{ color: coloresTech.PremierePro }} />,
    CANVA: <SiCanva size={24} style={{ color: coloresTech.Canva }} />,
};

type Props = {
    habilidades: HabilidadesType[];
};  

export default function Habilidades({ habilidades }: Props) {
    const habilidadesPorCategoria = habilidades.reduce((acc, hab) => {
        if (!acc[hab.categoria_habilidad]) acc[hab.categoria_habilidad] = [];
        acc[hab.categoria_habilidad].push(hab);
        return acc;
    }, {} as Record<string, HabilidadesType[]>);
    return (
        <article className={style_habilidades.habilidades}>
            <div className={style_habilidades.habilidades_layout}>
                <SectionHeader 
                    icon={<PiStack />} 
                    title="Mis Habilidades" 
                    description="Comprometido a mantenerme al día con las tecnologías y herramientas de desarrollo" 
                />
                <div className={style_habilidades.habilidades_contenido_box}>
                    {Object.entries(habilidadesPorCategoria).map(([categoria, lista]) => (
                        <div key={categoria} className={style_habilidades.habilidades_categoria_box}>
                            <h4 style={{ color: "#888", marginBottom: "10px" }}>{categoria}</h4>
                            <ul className={style_habilidades.habilidades_ul}>
                                {lista.map((tech) => {
                                    const key = tech.nombre_habilidad.replace(/\s+/g, '');
                                    return (
                                        <li key={tech.id} className={style_habilidades.habilidades_li}>
                                            <span className={style_habilidades.habilidades_span}>
                                                {iconosTech[key]}
                                                <strong style={{ color: coloresTech[key] || "#fff", fontSize: '13px' }}>
                                                    {tech.nombre_habilidad}
                                                </strong>
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}
"use client";


import { ExperienciaType } from "@/types/experiencia";
import { ReactNode } from "react";
import style_experiencia from "@/styles/sections/experiencia.module.scss"
import { 
    FaWhatsapp, 
    FaLinkedin
} from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SiCodefactor } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { BiBriefcase } from "react-icons/bi";
import SectionHeader from "./sub_components/SectionHeader";
import Image from "next/image";


type Props = {
    experiencia: ExperienciaType[];
};

export default function Experiencia({ experiencia }: Props) {

  return (
    <article className={style_experiencia.experiencia}>
        <div className={style_experiencia.experiencia_layout}>
            <article className={style_experiencia.experiencia_header}>
                <SectionHeader 
                    icon={<BiBriefcase />} 
                    title={"Experiencia"} 
                    description={"Navega por entornos diversos con adaptabilidad y experiencia..."}
                />
                <div className={style_experiencia.experiencia_contenido_box}>
                    <div className={style_experiencia.experiencia_contenido_box_layout}>
                        {experiencia && experiencia.map(exp => {
                            return (
                                <article key={exp.id} className={style_experiencia.experiencia_contenido_article}>
                                    <div className={style_experiencia.experiencia_contenido_article_header_layout}>
                                        <div className={style_experiencia.experiencia_contenido_article_header_emp}>
                                            <div className={style_experiencia.experiencia_contenido_article_header_icono}>
                                                <Image 
                                                    src={`/img/Logotipo_Portafolio_PDC/Logo/${exp?.empresa_imagen}.${exp?.empresa_imagenFormato}`} 
                                                    alt={exp?.nombre_empresa} 
                                                    width={50} 
                                                    height={50}
                                                    className={style_experiencia.avatar_img}
                                                />
                                            </div>
                                            <div className={style_experiencia.experiencia_contenido_article_header_nombre}>
                                                <h3 className={style_experiencia.experiencia_contenido_article_header_nombre_h3}>{exp?.nombre_empresa}</h3>
                                                <a className={style_experiencia.experiencia_contenido_article_header_nombre_enlace} href={exp?.enlace_empresa}>{exp?.enlace_trabajoResumido}</a>
                                            </div>
                                            <div className={style_experiencia.experiencia_contenido_article_header_categoria}>
                                                <div className={style_experiencia.experiencia_contenido_article_header_categoria_nombre}>{exp?.tipo_empresa}</div>
                                            </div>
                                        </div>
                                        <div className={style_experiencia.experiencia_contenido_article_header_fecha}>
                                            <p className={style_experiencia.experiencia_contenido_article_header_fecha_p}>{exp?.tiempo_inicio}<span className={style_experiencia.experiencia_contenido_article_header_fecha_span}>-</span>{exp?.tiempo_final}</p>
                                        </div>
                                    </div>
                                    <div className={style_experiencia.experiencia_contenido_article_contenido_layout}>
                                        <h3 className={style_experiencia.experiencia_contenido_article_contenido_puesto_h3}>{exp?.puesto_empresa}</h3>
                                        <p className={style_experiencia.experiencia_contenido_article_contenido_puesto_p_informacion}>{exp?.detalle_puesto}</p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </article>
        </div>
    </article>
  );
}
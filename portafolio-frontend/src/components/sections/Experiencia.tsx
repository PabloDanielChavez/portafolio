"use client";

import { ExperienciaType } from "@/types/experiencia";
import style_experiencia from "@/styles/sections/experiencia.module.scss"
import SectionHeader from "../sub_components/SectionHeader";
import Link from "next/link";
import { ImagenComponent } from "../sub_components/ImagenM";

import { BiBriefcase, FaArrowRight} from "@/components/utils/Iconos";
import { trackEvent } from "../utils/Analytics";


type Props = {
    experiencia: ExperienciaType[];
    showFooter?: boolean; 
};

export default function Experiencia({ experiencia, showFooter }: Props) {

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
                        {experiencia && (
                            <>
                                {experiencia.slice(0, !showFooter ? experiencia.length : 2).map((exp) => (
                                    <Link 
                                        key={exp.id}
                                        className={style_experiencia.experiencia_LINK} 
                                        href={`/experiencia/${exp.id}`}
                                        aria-label={`Más sobre ${exp.nombre_empresa}`}
                                        onClick={() => 
                                            trackEvent(`click_experiencia_${exp.nombre_empresa}`, {
                                                section: "Experiencia"
                                            })
                                        }
                                    >
                                        <article key={exp.id} className={style_experiencia.experiencia_contenido_article}>
                                            <div className={style_experiencia.experiencia_contenido_article_header_layout}>
                                                <div className={style_experiencia.experiencia_contenido_article_header_emp}>
                                                    <div className={style_experiencia.experiencia_contenido_article_header_icono}>
                                                        <ImagenComponent 
                                                            style={style_experiencia.avatar_img}
                                                            url={`/img/Logotipo_Portafolio_PDC/Logo/${exp?.empresa_imagen}.${exp?.empresa_imagenFormato}`}
                                                            alt={exp?.nombre_empresa}
                                                            widthE={50}
                                                            heightE={50}
                                                            priority=""
                                                        />
                                                    </div>
                                                    <div className={style_experiencia.experiencia_contenido_article_header_nombre}>
                                                        <h3 className={style_experiencia.experiencia_contenido_article_header_nombre_h3}>
                                                                {exp.nombre_empresa}
                                                        </h3>                                                    
                                                        {/* <Link 
                                                            key={exp.id}
                                                            className={style_experiencia.experiencia_contenido_article_header_nombre_enlace} 
                                                            href={`${exp?.enlace_empresa}`}
                                                        >
                                                            {exp?.enlace_trabajoResumido}
                                                        </Link> */}
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
                                    </Link>
                                ))}
                            </>
                        )} 
                        {showFooter && (    
                            <div className={style_experiencia.experiencia_card_footer}>
                                <Link 
                                    href={`/experiencia`} 
                                    className={style_experiencia.experiencia_card_link}
                                    aria-label="Ver toda la experiencia"
                                    onClick={() => 
                                        trackEvent(`click_experiencia_mas`, {
                                            section: "experiencia"
                                        })
                                    }
                                >
                                    <button 
                                        className={style_experiencia.experiencia_card_btn} 
                                        aria-label="Ver todas las experiencias"
                                    >
                                        Más Expereriencia <FaArrowRight />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </article> 
        </div>
    </article>
  );
}
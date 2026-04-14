"use client";

import { ReactNode } from "react";
import style_habilidades from "@/styles/sections/habilidades.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { PiStack } from "react-icons/pi";
import { MdWeb } from "react-icons/md";

type Habilidades = {
    id:number;
    nombre_habilidad:string;
    categoria_habilidad:string;
    tiempo_habilidad:string;
    experiencia_habilidad:string;
    nombre_archivo:string;
    nombre_imagen:string;
    formato_imagen:string;
};

type Props = {
    habilidades: Habilidades[];
};


export default function Habilidades({ habilidades }: Props) {

  return (
    <article className={style_habilidades.habilidades}>
        <div className={style_habilidades.habilidades_layout}>
            <article className={style_habilidades.habilidades_header}>
                <div className={style_habilidades.habilidades_header_box}>
                    <div className={style_habilidades.habilidades_header_box_informacion_titulo}>
                        <span className={style_habilidades.habilidades_header_span}>
                            <PiStack/>
                        </span>
                        <h2 className={style_habilidades.habilidades_header_h2}>Mis Habilidades</h2>
                    </div>
                    <div className={style_habilidades.habilidades_header_box_informacion_texto}>
                        <p>Comprometido a mantenerne al día con las tecnologias y herramientas de desarrollo</p>
                    </div>
                </div>
                <div className={style_habilidades.habilidades_contenido_box}>
                    <div className={style_habilidades.habilidades_contenido_box_layout}>
                        {habilidades && habilidades.map(hab => {
                            return (
                                <article key={hab.id} className={style_habilidades.habilidades_contenido_article}> 
                                    <div className={style_habilidades.habilidades_contenido_article_header_layout}> 
                                        <div className={style_habilidades.habilidades_contenido_article_header_emp}> 
                                            <div className={style_habilidades.habilidades_contenido_article_header_icono}> 
                                                <img src={`img/Logotipo_Portafolio_PDC/${hab?.nombre_archivo}/${hab?.nombre_imagen}.${hab?.formato_imagen}`} alt="img" />
                                            </div> 
                                            <div className={style_habilidades.habilidades_contenido_article_header_nombre}> 
                                                <h3 className={style_habilidades.habilidades_contenido_article_header_nombre_h3}>{hab?.nombre_habilidad}</h3> 
                                                <a className={style_habilidades.habilidades_contenido_article_header_nombre_enlace} href="#">{hab?.categoria_habilidad}</a> 
                                            </div> 
                                        </div> 
                                        <div className={style_habilidades.habilidades_contenido_article_header_flecha}> 
                                            <p className={style_habilidades.habilidades_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                        </div> 
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
"use client";

import { ReactNode } from "react";
import style_habilidades from "@/styles/sections/habilidades.module.scss"
import { HabilidadesType } from "@/types/habilidades";
import SectionHeader from "../sub_components/SectionHeader";
import Image from "next/image";
import { ImagenComponent } from "../sub_components/ImagenM";
import {  FaArrowRight, PiStack } from "@/components/utils/Iconos";



type Props = {
    habilidades: HabilidadesType[];
};


export default function Habilidades({ habilidades }: Props) {

    return (
        <article className={style_habilidades.habilidades}>
            <div className={style_habilidades.habilidades_layout}>
                <article className={style_habilidades.habilidades_header}>
                    <SectionHeader 
                        icon={<PiStack />} 
                        title="Mis Habilidades" 
                        description="Comprometido a mantenerne al día con las tecnologias y herramientas de desarrollo" 
                    />
                    <div className={style_habilidades.habilidades_contenido_box}>
                        <div className={style_habilidades.habilidades_contenido_box_layout}>
                            {habilidades && habilidades.map(hab => {
                                return (
                                    <article key={hab.id} className={style_habilidades.habilidades_contenido_article}> 
                                        <div className={style_habilidades.habilidades_contenido_article_header_layout}> 
                                            <div className={style_habilidades.habilidades_contenido_article_header_emp}> 
                                                <div className={style_habilidades.habilidades_contenido_article_header_icono}>
                                                    <Image 
                                                        className={style_habilidades.ha}
                                                        src={`/img/Logotipo_Portafolio_PDC/Logo/Logo_48x48px.avif`} 
                                                        alt={"LOGOTIPO"}
                                                        title={"LOGOTIPO"}
                                                        width={50} 
                                                        height={50}
                                                        sizes="50px"
                                                    />
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
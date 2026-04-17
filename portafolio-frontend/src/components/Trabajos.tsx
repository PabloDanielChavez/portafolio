"use client";

import { ReactNode } from "react";
import style_trabajos from "@/styles/sections/trabajos.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { PiPaintBrushBold } from "react-icons/pi";
import { IoIosRocket } from "react-icons/io";
import { TrabajosType } from "@/types/trabajos";
import SectionHeader from "./sub_components/SectionHeader";
import Image from "next/image";



type Props = {
    trabajos: TrabajosType[];
};

export default function Trabajos({ trabajos }: Props) {
    return (
        <article className={style_trabajos.trabajos}>
            <div className={style_trabajos.trabajos_layout}>
                <article className={style_trabajos.trabajos_header}>
                    <SectionHeader 
                        icon={<IoIosRocket />} 
                        title="Trabajos Realizados" 
                        description="Descubre una colección de mis trabajos de diseño más innovadores y visualmente impactantes." 
                    />
                    <div className={style_trabajos.trabajos_contenido_box}>
                        <div className={style_trabajos.trabajos_contenido_box_layout}>
                            {trabajos && trabajos?.map(tra => {
                                return (
                                    <article key={tra.id} className={style_trabajos.trabajos_card}>
                                        <div className={style_trabajos.trabajos_card_img}>
                                            <Image 
                                                src={`/img/Logotipo_Portafolio_PDC/${tra?.nombre_archivo}/${tra?.nombre_imagen}.${tra?.formato_imagen}`} 
                                                width={500} 
                                                height={500}
                                                alt={tra?.nombre_imagen}
                                            />
                                        </div>
                                        <div className={style_trabajos.trabajos_card_info}>
                                            <div className={style_trabajos.trabajos_card_header}>
                                                <h3>{tra?.nombre_trabajo}</h3>
                                                <a href={tra?.enlace_trabajo} className={style_trabajos.trabajos_card_link}>{tra?.enlace_trabajoResumido}</a>
                                            </div>
                                            <div className={style_trabajos.trabajos_card_meta}>
                                                <span>{tra?.complejidad_trabajo}</span>
                                                <span>•</span>
                                                <span>{tra?.numero_pagina} Paginas</span>
                                                <span>•</span>
                                                <span>{tra?.tiempo_trabajo}</span>
                                            </div>
                                            <p className={style_trabajos.trabajos_card_desc}>{tra?.resumen_trabajo}</p>
                                        </div>
                                    </article>
                                )
                            })}
                            
                            <div className={style_trabajos.trabajos_card_footer}>
                                <button className={style_trabajos.trabajos_card_btn}>Más Proyectos <FaArrowRight /></button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </article>
    );
}
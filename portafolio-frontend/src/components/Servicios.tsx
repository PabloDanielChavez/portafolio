"use client";

import { ReactNode } from "react";
import style_servicios from "@/styles/sections/servicios.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { TbChartBarPopular, TbWorld } from "react-icons/tb";
import { PiPaintBrushBold, PiPalette } from "react-icons/pi";
import { LuMonitorSmartphone } from "react-icons/lu";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { FiDatabase } from "react-icons/fi";

type Servicios = {
    id:number;
    nombre_servicio:string;
    informacion_servicio:string;
    reactIcon:string;
};

type Props = {
    servicios: Servicios[];
};

export default function servicios({ servicios }: Props) {

  return (
    <article className={style_servicios.servicios}>
        <div className={style_servicios.servicios_layout}>
            <article className={style_servicios.servicios_header}>
                <div className={style_servicios.servicios_header_box}>
                    <div className={style_servicios.servicios_header_box_informacion_titulo}>
                        <span className={style_servicios.servicios_header_span}>
                            <AiTwotoneSchedule />
                        </span>
                        <h2 className={style_servicios.servicios_header_h2}>Mi Servicios</h2>
                    </div>
                    <div className={style_servicios.servicios_header_box_informacion_texto}>
                        <p>Formular estrategias integrales para alcanzar sus objetivos de diseño y superar las expectativas.</p>
                    </div>
                </div>
                <div className={style_servicios.servicios_contenido_box}>
                    <div className={style_servicios.servicios_contenido_box_layout}>
                        {servicios.map(ser => {
                            const renderIcono = (nombreString: string) => {
                                if (nombreString === "LuMonitorSmartphone") return <LuMonitorSmartphone />;
                                if (nombreString === "HiOutlineCodeBracket") return <HiOutlineCodeBracket />;
                                if (nombreString === "PiPalette") return <PiPalette />;
                                if (nombreString === "TbChartBarPopular") return <TbChartBarPopular />;
                                if (nombreString === "FiDatabase") return <FiDatabase />;
                                
                                return <FiDatabase />; // Un icono por defecto
                            };
                            return (
                            <article key={ser.id} className={style_servicios.servicios_contenido_article}> 
                                <div className={style_servicios.servicios_contenido_article_header_layout}> 
                                    <div className={style_servicios.servicios_contenido_article_header_emp}> 
                                        <div className={style_servicios.servicios_contenido_article_header_icono}> 
                                            {renderIcono(ser.reactIcon)}
                                        </div> 
                                        <div className={style_servicios.servicios_contenido_article_header_nombre}> 
                                            <h3 className={style_servicios.servicios_contenido_article_header_nombre_h3}>{ser?.nombre_servicio}</h3>
                                        </div> 
                                    </div> 
                                    <div className={style_servicios.servicios_contenido_article_header_flecha}> 
                                        <p className={style_servicios.servicios_contenido_article_header_flecha_p}><FaArrowRight /></p>
                                    </div> 
                                </div> 
                                <div className={style_servicios.servicios_contenido_article_contenido_layout}>
                                    <p className={style_servicios.servicios_contenido_article_contenido_puesto_p_informacion}>{ser?.informacion_servicio}</p>
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
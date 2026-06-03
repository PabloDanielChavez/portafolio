"use client";

import { ExperienciaType } from "@/types/experiencia";
import style_experiencia from "@/styles/sections/experiencia.module.scss";
import Image from "next/image";
import { BiBriefcase, BiCodeAlt, BiTrophy, BiExtension } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import SectionHeader from "./sub_components/SectionHeader";
import Link from "next/link";
import { ImagenComponent } from "./sub_components/ImagenM";
import { exp_desafioType } from "@/types/exp_desafio";
import { exp_tecnologiaType } from "@/types/exp_tecnologia";

type Props = {
    exp: ExperienciaType;
    exp_desafio: exp_desafioType;
    exp_tecnologia: exp_tecnologiaType;
};

export default function PagExperienciaDetalle({ exp, exp_desafio, exp_tecnologia }: Props) {
    if (!exp) return <p>Cargando detalles de la experiencia...</p>;
    const desafiosFiltrados = (exp_desafio as any[]).filter(d => d.exp_id === exp.id);
    const tecnologiasFiltradas = (exp_tecnologia as any[]).filter(t => t.exp_id === exp.id).map(t => t.exp_tecnologia);
    return (
        <article className={style_experiencia.experiencia}>
            <div className={style_experiencia.experiencia_layout}>
                <Link href="/" className={style_experiencia.experiencia_LINK}>
                    <IoMdArrowBack /> Volver al Inicio
                </Link>
                <header className={style_experiencia.experiencia_header}>
                    <SectionHeader 
                        icon={<BiBriefcase />} 
                        title={exp.puesto_empresa} 
                        description={`Caso de estudio y detalles técnicos en ${exp.nombre_empresa}`}
                    />
                    
                    <div className={style_experiencia.experiencia_contenido_box}>
                        <div className={style_experiencia.experiencia_contenido_box_layout}>
                            <article className={style_experiencia.experiencia_contenido_article}>
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
                                            <h3 className={style_experiencia.experiencia_contenido_article_header_nombre_h3}>{exp?.nombre_empresa}</h3>
                                            <a className={style_experiencia.experiencia_contenido_article_header_nombre_enlace} href={exp?.enlace_empresa} target="_blank" rel="noreferrer">
                                                {exp?.enlace_trabajoResumido}
                                            </a>
                                        </div>
                                        <div className={style_experiencia.experiencia_contenido_article_header_categoria}>
                                            <div className={style_experiencia.experiencia_contenido_article_header_categoria_nombre}>{exp?.tipo_empresa}</div>
                                        </div>
                                    </div>
                                    <div className={style_experiencia.experiencia_contenido_article_header_fecha}>
                                        <p className={style_experiencia.experiencia_contenido_article_header_fecha_p}>
                                            {exp?.tiempo_inicio}
                                            <span className={style_experiencia.experiencia_contenido_article_header_fecha_span}>-</span>
                                            {exp?.tiempo_final}
                                        </p>
                                    </div>
                                </div>

                                <div className={style_experiencia.experiencia_contenido_article_contenido_layout}>
                                    <h3 className={style_experiencia.experiencia_contenido_article_contenido_puesto_h3}>Resumen del Puesto</h3>
                                    <p className={style_experiencia.experiencia_contenido_article_contenido_puesto_p_informacion}>{exp?.detalle_puesto}</p>
                                </div>
                            </article>
                            <article className={style_experiencia.experiencia_contenido_article}>
                                <div className={style_experiencia.experiencia_contenido_article_contenido_layout}>
                                    <h3 className={style_experiencia.experiencia_contenido_article_contenido_puesto_h3}>
                                        Mi Rol y Responsabilidades Extensas
                                    </h3>
                                    <p className={style_experiencia.experiencia_contenido_article_contenido_puesto_p_informacion}>
                                        {exp.rol_descripcion_larga || exp.detalle_puesto}
                                    </p>
                                </div>
                            </article>
                            {desafiosFiltrados && desafiosFiltrados.length > 0 && (
                                <article className={style_experiencia.experiencia_contenido_article}>
                                    <div className={style_experiencia.experiencia_contenido_article_contenido_layout}>
                                        <h3 className={style_experiencia.experiencia_contenido_article_contenido_puesto_h3}>
                                            <BiExtension /> Desafíos Técnicos Superados
                                        </h3>
                                        <div className={style_experiencia.experiencia_detalle_desafios_grid}>
                                            {desafiosFiltrados.map((item, index) => (
                                                <div key={index} className={style_experiencia.experiencia_detalle_desafio_card}>
                                                    <span className={style_experiencia.experiencia_detalle_tag_problema}>Problema</span>
                                                    <p className={style_experiencia.experiencia_contenido_article_contenido_puesto_p_informacion}>{item.exp_desafio}</p>
                                                    <span className={style_experiencia.experiencia_detalle_tag_solucion}>Solución</span>
                                                    <p className={style_experiencia.experiencia_contenido_article_contenido_puesto_p_informacion}>{item.exp_solucion}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            )}
                            <div className={style_experiencia.experiencia_detalle_columnas}>
                                {tecnologiasFiltradas && tecnologiasFiltradas.length > 0 && (
                                    <article className={style_experiencia.experiencia_contenido_article}>
                                        <div className={style_experiencia.experiencia_contenido_article_contenido_layout}>
                                            <h3 className={style_experiencia.experiencia_contenido_article_contenido_puesto_h3}>
                                                <BiCodeAlt /> Tecnologías Aplicadas
                                            </h3>
                                            <div className={style_experiencia.experiencia_detalle_tech_badges}>
                                                {tecnologiasFiltradas.map((tech) => (
                                                    <span key={tech} className={style_experiencia.experiencia_detalle_tech_tag}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </article>
                                )}
                                {/* {exp.logros && (
                                    <article className={style_experiencia.experiencia_contenido_article}>
                                        <div className={style_experiencia.experiencia_contenido_article_contenido_layout}>
                                            <h3 className={style_experiencia.experiencia_contenido_article_contenido_puesto_h3}>
                                                <BiTrophy /> Logros Clave
                                            </h3>
                                            <ul className={style_experiencia.experiencia_detalle_logros_lista}>
                                                {exp.logros.map((logro, index) => (
                                                    <li key={index} className={style_experiencia.experiencia_contenido_article_contenido_puesto_p_informacion}>
                                                        {logro}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                )} */}
                            </div>

                        </div>
                    </div>
                </header>
            </div>
        </article>
    );
}
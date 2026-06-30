import style_trabajos from "@/styles/sections/trabajos.module.scss";
import type { TrabajosType } from "@/types/trabajos";
import type { tra_tecnologiaType } from "@/types/tra_tecnologia";
import TrabajoAuditoria from "./sub_components/TrabajoAuditoria";
import TrabajoDetalleActions from "./sub_components/TrabajoDetalleActions";

import {
    esTrabajoDestacado,
    getEstadoProyecto,
    getFechaProyecto,
    getImagenTrabajo,
    getTecnologiasTrabajo,
    type TecnologiaNombre
} from "./utils/trabajos.helpers";

import {
    SiExpress,
    SiGoogleanalytics,
    SiGoogletagmanager,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiReact,
    SiSass,
    SiSequelize
} from "@/components/utils/Iconos";
import Image from "next/image";

type PagTrabajoDetalleProps = {
    tra: TrabajosType;
    tra_tecnologia: tra_tecnologiaType;
};

const tecnologiaIconos: Record<TecnologiaNombre, React.ReactNode> = {
    SASS: <SiSass aria-hidden="true" />,
    Node: <SiNodedotjs aria-hidden="true" />,
    Next: <SiNextdotjs aria-hidden="true" />,
    React: <SiReact aria-hidden="true" />,
    GoogleTagManager: <SiGoogletagmanager aria-hidden="true" />,
    GoogleAnalytics: <SiGoogleanalytics aria-hidden="true" />,
    Sequelize: <SiSequelize aria-hidden="true" />,
    MySQL: <SiMysql aria-hidden="true" />,
    Express: <SiExpress aria-hidden="true" />
};

export default function PagTrabajoDetalle({
    tra,
    tra_tecnologia
}: PagTrabajoDetalleProps) {
    const tecnologias = getTecnologiasTrabajo(tra.id, tra_tecnologia);
    const imagenUrl = getImagenTrabajo(tra);
    const estado = getEstadoProyecto(tra.estado_proyecto);
    const fecha = getFechaProyecto(tra.fecha_finalizacion);
    const destacado = esTrabajoDestacado(tra);

    return (
        <article className={style_trabajos.pagTrabajo_detalle_container}>
            <div className={style_trabajos.pagTrabajo_layout}>
                <TrabajoDetalleActions trabajo={tra} />
                <section className={style_trabajos.pagTrabajo_hero} aria-labelledby="trabajo-title">
                    <div className={style_trabajos.pagTrabajo_hero_content}>
                        <div className={style_trabajos.pagTrabajo_hero_badges}>
                            {destacado && (
                                <span className={style_trabajos.pagTrabajo_badge_destacado}>
                                    Proyecto destacado
                                </span>
                            )}
                            <span className={style_trabajos.pagTrabajo_badge}>{tra.categoria_trabajo}</span>
                            <span className={style_trabajos.pagTrabajo_badge}>{estado}</span>
                        </div>
                        <h1 id="trabajo-title" className={style_trabajos.pagTrabajo_detalle_h1}>{tra.nombre_trabajo}</h1>
                        <p className={style_trabajos.pagTrabajo_hero_intro}>{tra.resumen_trabajo}</p>
                        <div className={style_trabajos.pagTrabajo_hero_meta}>
                            <span>{tra.rol}</span>
                            <span>{tra.categoria_cliente}</span>
                            <span>{tra.numero_pagina} página{tra.numero_pagina > 1 ? "s" : ""}</span>
                            <span>{tra.tiempo_trabajo}</span>
                        </div>
                    </div>
                    <aside className={style_trabajos.pagTrabajo_hero_panel} aria-label="Resumen rápido del proyecto">
                        <span className={style_trabajos.pagTrabajo_panel_label}>Proyecto</span>
                        <div className={style_trabajos.pagTrabajo_panel_item}>
                            <strong>Tipo</strong>
                            <span>{tra.categoria_trabajo}</span>
                        </div>

                        <div className={style_trabajos.pagTrabajo_panel_item}>
                            <strong>Complejidad</strong>
                            <span>{tra.complejidad_trabajo}</span>
                        </div>

                        <div className={style_trabajos.pagTrabajo_panel_item}>
                            <strong>Estilo</strong>
                            <span>{tra.style_trabajo}</span>
                        </div>

                        <div className={style_trabajos.pagTrabajo_panel_item}>
                            <strong>Finalización</strong>
                            <span>{fecha}</span>
                        </div>
                    </aside>
                </section>
                <section className={style_trabajos.pagTrabajo_preview}>
                    <Image
                        className={style_trabajos.pagTrabajo_detalle_img_main}
                        src={imagenUrl}
                        alt={`Vista previa del proyecto ${tra.nombre_trabajo}`}
                        width={1100}
                        height={720}
                        priority
                    ></Image>
                </section>
                <div className={style_trabajos.pagTrabajo_content_grid}>
                    <article className={style_trabajos.pagTrabajo_case_content}>
                        <section className={style_trabajos.pagTrabajo_section} aria-labelledby="resumen-title">
                            <span className={style_trabajos.pagTrabajo_section_label}>Resumen</span>
                            <h2 id="resumen-title" className={style_trabajos.pagTrabajo_h2}>Qué se buscó resolver</h2>
                            <p className={style_trabajos.pagTrabajo_parrafo}>{tra.resumen_trabajo}</p>
                            {tra.informacion_trabajo && (
                                <p className={style_trabajos.pagTrabajo_parrafo}>
                                    {tra.informacion_trabajo}
                                </p>
                            )}
                        </section>
                        {tra.reto_tecnico && (
                            <section className={style_trabajos.pagTrabajo_section} aria-labelledby="reto-title">
                                <span className={style_trabajos.pagTrabajo_section_label}>Reto técnico</span>
                                <h2 id="reto-title" className={style_trabajos.pagTrabajo_h2}>Principal desafío del desarrollo</h2>
                                <p className={style_trabajos.pagTrabajo_parrafo}>{tra.reto_tecnico}</p>
                            </section>
                        )}
                        {tra.opinion_trabajo && (
                            <section className={style_trabajos.pagTrabajo_section} aria-labelledby="opinion-title">
                                <span className={style_trabajos.pagTrabajo_section_label}>Evaluación</span>
                                <h2 id="opinion-title" className={style_trabajos.pagTrabajo_h2}>Resultado y valoración</h2>
                                <p className={style_trabajos.pagTrabajo_parrafo}>{tra.opinion_trabajo}</p>
                                {tra.valoracion_trabajo && (
                                    <blockquote className={style_trabajos.pagTrabajo_quote}>
                                        {tra.valoracion_trabajo}
                                    </blockquote>
                                )}
                            </section>
                        )}
                    </article>
                    <aside className={style_trabajos.pagTrabajo_sidebar}>
                        <section className={style_trabajos.pagTrabajo_sidebar_card} aria-labelledby="tecnologias-title">
                            <span className={style_trabajos.pagTrabajo_section_label}>Stack</span>
                            <h2 id="tecnologias-title" className={style_trabajos.pagTrabajo_h2}>Tecnologías utilizadas</h2>
                            {tecnologias.length > 0 ? (
                                <ul className={style_trabajos.pagTrabajo_ul}>
                                    {tecnologias.map((tech) => (
                                        <li key={tech} className={style_trabajos.pagTrabajo_li}>
                                            <span className={style_trabajos.pagTrabajo_span}>
                                                {tecnologiaIconos[tech]}
                                                <strong>{tech}</strong>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={style_trabajos.pagTrabajo_parrafo}>Tecnologías no registradas.</p>
                            )}
                        </section>
                        <section className={style_trabajos.pagTrabajo_sidebar_card} aria-labelledby="detalles-title">
                            <span className={style_trabajos.pagTrabajo_section_label}>Detalles</span>
                            <h2 id="detalles-title" className={style_trabajos.pagTrabajo_h2}>Información del proyecto</h2>
                            <dl className={style_trabajos.pagTrabajo_specs}>
                                <div className={style_trabajos.pagTrabajo_spec_item}>
                                    <dt>Páginas</dt>
                                    <dd>{tra.numero_pagina}</dd>
                                </div>
                                <div className={style_trabajos.pagTrabajo_spec_item}>
                                    <dt>Tiempo</dt>
                                    <dd>{tra.tiempo_trabajo}</dd>
                                </div>
                                <div className={style_trabajos.pagTrabajo_spec_item}>
                                    <dt>Complejidad</dt>
                                    <dd>{tra.complejidad_trabajo}</dd>
                                </div>
                                <div className={style_trabajos.pagTrabajo_spec_item}>
                                    <dt>Rol</dt>
                                    <dd>{tra.rol}</dd>
                                </div>
                                <div className={style_trabajos.pagTrabajo_spec_item}>
                                    <dt>Cliente</dt>
                                    <dd>{tra.categoria_cliente}</dd>
                                </div>
                                <div className={style_trabajos.pagTrabajo_spec_item}>
                                    <dt>Estado</dt>
                                    <dd>{estado}</dd>
                                </div>
                            </dl>
                        </section>
                    </aside>
                </div>

                <TrabajoAuditoria trabajo={tra} />
            </div>
        </article>
    );
}

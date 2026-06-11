import style_skeleton from "@/styles/sections/skeleton/skeleton_trabajos.module.scss";

export default function SkeletonTrabajoDetalle() {
    return (
        <article className={style_skeleton.skeleton_trabajo_detalle}>
            <div className={style_skeleton.skeleton_layout}>
                {/* Header: Título y enlaces */}
                <header className={style_skeleton.skeleton_hero}>
                    <div className={`${style_skeleton.skeleton_titulo} ${style_skeleton.skeleton}`} />
                    <div className={style_skeleton.skeleton_iconos}>
                        <div className={`${style_skeleton.skeleton_icono_link} ${style_skeleton.skeleton}`} />
                        <div className={`${style_skeleton.skeleton_icono_link} ${style_skeleton.skeleton}`} />
                    </div>
                </header>

                <div className={style_skeleton.skeleton_grid}>
                    {/* Sidebar: Imagen, tabs y métricas */}
                    <aside className={style_skeleton.skeleton_sidebar}>
                        <div className={`${style_skeleton.skeleton_img_main} ${style_skeleton.skeleton}`} />
                        <div className={style_skeleton.skeleton_tabs}>
                            <div className={`${style_skeleton.skeleton_tab} ${style_skeleton.skeleton}`} />
                            <div className={`${style_skeleton.skeleton_tab} ${style_skeleton.skeleton}`} />
                        </div>
                        <div className={style_skeleton.skeleton_stats}>
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className={`${style_skeleton.skeleton_stat} ${style_skeleton.skeleton}`} />
                            ))}
                        </div>
                    </aside>

                    {/* Contenido: Resumen y techs */}
                    <section className={style_skeleton.skeleton_contenido}>
                        <div className={`${style_skeleton.skeleton_h3} ${style_skeleton.skeleton}`} />
                        <div className={`${style_skeleton.skeleton_parrafo} ${style_skeleton.skeleton}`} />
                        <div className={`${style_skeleton.skeleton_h3} ${style_skeleton.skeleton}`} />
                        <div className={style_skeleton.skeleton_techs}>
                            {[1, 2, 3].map((item) => (
                                <div key={item} className={`${style_skeleton.skeleton_tech_item} ${style_skeleton.skeleton}`} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </article>
    );
}
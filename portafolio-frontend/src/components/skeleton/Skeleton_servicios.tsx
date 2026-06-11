import style_skeleton from "@/styles/sections/skeleton/skeleton_servicios.module.scss";

export default function SkeletonServicios() {
    return (
        <article className={style_skeleton.skeleton_servicios}>
            <div className={style_skeleton.skeleton_layout}>
                <div className={style_skeleton.skeleton_header}>
                    <div className={`${style_skeleton.skeleton_title} ${style_skeleton.skeleton}`} />
                    <div className={`${style_skeleton.skeleton_description} ${style_skeleton.skeleton}`} />
                </div>
                
                <div className={style_skeleton.skeleton_contenido_box}>
                    <div className={style_skeleton.skeleton_grid}>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className={style_skeleton.skeleton_article}>
                                <div className={style_skeleton.skeleton_article_header}>
                                    <div className={`${style_skeleton.skeleton_icono} ${style_skeleton.skeleton}`} />
                                    <div className={`${style_skeleton.skeleton_nombre} ${style_skeleton.skeleton}`} />
                                </div>
                                <div className={`${style_skeleton.skeleton_informacion} ${style_skeleton.skeleton}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
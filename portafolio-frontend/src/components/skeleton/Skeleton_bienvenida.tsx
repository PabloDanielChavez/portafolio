import style_skeleton from "@/styles/sections/skeleton/skeleton_bienvenida.module.scss";

export default function SkeletonBienvenida() {
    return (
        <article className={style_skeleton.skeleton_bienvenida}>
            <div className={style_skeleton.skeleton_layout}>
                <div className={style_skeleton.skeleton_header}>
                <div className={`${style_skeleton.skeleton_imagen} ${style_skeleton.skeleton}`}/>
                <div className={style_skeleton.skeleton_info}>
                    <div className={`${style_skeleton.skeleton_soy} ${style_skeleton.skeleton}`}/>
                    <div className={`${style_skeleton.skeleton_nombre} ${style_skeleton.skeleton}`}/>
                    <div className={`${style_skeleton.skeleton_descripcion} ${style_skeleton.skeleton}`}/>
                    <div className={style_skeleton.skeleton_botones}>
                    {[1, 2, 3].map((item) => (
                        <div
                        key={item}
                        className={`${style_skeleton.skeleton_btn} ${style_skeleton.skeleton}`}
                        />
                    ))}
                    </div>
                </div>
                </div>
                <div className={`${style_skeleton.skeleton_social} ${style_skeleton.skeleton}`}/>
                <div className={style_skeleton.skeleton_stats}>
                {[1, 2, 3, 4].map((item) => (
                    <div
                    key={item}
                    className={`${style_skeleton.skeleton_stat} ${style_skeleton.skeleton}`}
                    />
                ))}
                </div>
            </div>
        </article>
    );
}
import style from "@/styles/sections/skeleton/skeleton_habilidades.module.scss";

export default function SkeletonHabilidades() {
    return (
        <div className={style.skeleton_wrapper}>
        {[1, 2, 3, 4].map((i) => (
            <article key={i} className={style.skeleton_item}>
            <div className={style.skeleton_icono} />
            <div className={style.skeleton_text_group}>
                <div className={style.skeleton_titulo} />
                <div className={style.skeleton_subtitulo} />
            </div>
            </article>
        ))}
        </div>
    );
}
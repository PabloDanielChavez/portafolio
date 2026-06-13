import style_skeleton from "@/styles/sections/skeleton/skeleton_footer.module.scss";

export default function SkeletonFooter() {
        return (
        <footer className={style_skeleton.skeleton_footer_grid_principal}>
        {/* Logo */}
        <div className={style_skeleton.skeleton_box_logo}>
            <div className={`${style_skeleton.skeleton_imagen_logo} ${style_skeleton.skeleton}`} />
        </div>

        {/* Grid de Enlaces */}
        <div className={style_skeleton.skeleton_grid_enlaces}>
            {[1, 2, 3].map((col) => (
            <div key={col} className={style_skeleton.skeleton_box}>
                <div className={`${style_skeleton.skeleton_h2} ${style_skeleton.skeleton}`} />
                <div className={style_skeleton.skeleton_ul}>
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className={`${style_skeleton.skeleton_li} ${style_skeleton.skeleton}`} />
                ))}
                </div>
            </div>
            ))}
        </div>

        {/* Copyright */}
        <div className={style_skeleton.skeleton_box_copy}>
            <div className={`${style_skeleton.skeleton_copy_p} ${style_skeleton.skeleton}`} />
        </div>
        </footer>
    );
}
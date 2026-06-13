import style_skeleton from "@/styles/sections/skeleton/skeleton_trabajos.module.scss";

export default function SkeletonTrabajos() {
  return (
    <section className={style_skeleton.skeleton_section}>
      <div className={style_skeleton.skeleton_layout}>
        <div className={style_skeleton.skeleton_header}>
            <div className={`${style_skeleton.skeleton_title} ${style_skeleton.skeleton}`} />
            <div className={style_skeleton.skeleton_tabs}>
                <div className={`${style_skeleton.skeleton_tab} ${style_skeleton.skeleton}`} />
                <div className={`${style_skeleton.skeleton_tab} ${style_skeleton.skeleton}`} />
            </div>
        </div>

        <div className={style_skeleton.skeleton_grid}>
          {[1, 2, 3].map((item) => (
            <div key={item} className={style_skeleton.skeleton_card}>
              <div className={`${style_skeleton.skeleton_img} ${style_skeleton.skeleton}`} />
              <div className={style_skeleton.skeleton_info}>
                <div className={`${style_skeleton.skeleton_line} ${style_skeleton.skeleton}`} />
                <div className={`${style_skeleton.skeleton_line_small} ${style_skeleton.skeleton}`} />
                <div className={style_skeleton.skeleton_metrics}>
                    {[1,2,3,4].map(i => (
                        <div key={i} className={`${style_skeleton.skeleton_metric} ${style_skeleton.skeleton}`} />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
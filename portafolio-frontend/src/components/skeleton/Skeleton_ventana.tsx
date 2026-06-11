import style from "@/styles/sections/skeleton/skeleton_ventana.module.scss";

export default function SkeletonVentana({ children }: { children: React.ReactNode }) {
  return (
    <main className={style.skeleton_ventana}>
      <nav className={style.skeleton_layout}>
        <div className={`${style.skeleton_sidebar} ${style.sidebar_izq}`}>
          <div className={`${style.skeleton_logo} ${style.skeleton_pulse}`} />
          <div className={style.skeleton_nav_items}>
            {[1, 2, 3, 4].map((i) => <div key={i} className={`${style.skeleton_nav_item} ${style.skeleton_pulse}`} />)}
          </div>
        </div>
        <div className={style.skeleton_central}>
          <div className={`${style.skeleton_header_fake} ${style.skeleton_pulse}`} />
            {children}
          <div className={`${style.skeleton_content_fake} ${style.skeleton_pulse}`} />
        </div>
        <div className={`${style.skeleton_sidebar} ${style.sidebar_der}`}>
            <div className={style.skeleton_nav_items}>
                {[1, 2, 3].map((i) => <div key={i} className={`${style.skeleton_nav_item} ${style.skeleton_pulse}`} />)}
            </div>
        </div>
      </nav>
    </main>
  );
}
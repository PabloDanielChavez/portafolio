import style_skeleton from "@/styles/sections/skeleton/skeleton_contacto.module.scss";

export default function SkeletonContacto() {
    return (
        <section className={style_skeleton.skeleton_contacto}>
            <div className={style_skeleton.skeleton_layout}>
                {/* Header Section */}
                <div className={`${style_skeleton.skeleton_header} ${style_skeleton.skeleton}`} />
                
                {/* Contenido principal: Formulario y Redes */}
                <div className={style_skeleton.skeleton_contenido_box}>
                    <div className={`${style_skeleton.skeleton_form} ${style_skeleton.skeleton}`} />
                    <div className={style_skeleton.skeleton_social_grid}>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className={`${style_skeleton.skeleton_social_card} ${style_skeleton.skeleton}`} />
                        ))}
                    </div>
                </div>

                {/* FAQs Section */}
                <div className={`${style_skeleton.skeleton_header} ${style_skeleton.skeleton}`} />
                <div className={style_skeleton.skeleton_faqs}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className={`${style_skeleton.skeleton_faq_item} ${style_skeleton.skeleton}`} />
                    ))}
                </div>
            </div>
        </section>
    );
}
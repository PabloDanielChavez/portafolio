"use client";

import Image from "next/image";
import styles from "@/styles/sections/hero.module.scss";
import { FaWhatsapp, FaArrowDown, FaCheck, FaLinkedin, FaGithubSquare, FaFacebookSquare, FaInstagram} from "@/components/utils/Iconos";
import Link from "next/link";
import { PerfilType } from "@/types/perfil";
import { mensajePresupuesto } from "../utils/variables";

interface Props {
    perfil: PerfilType[];
}

export default function Hero({ perfil }: Props) {

    const scrollToSection = (targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.hero_contenedor}>
                <div className={styles.hero_layout}>
                    <div className={styles.hero_box}>
                        <span className={styles.hero_span_tag}>Argentina</span>
                        <h1 className={styles.hero_h1_titulo}>
                            Potencia tus ventas con un <strong className={styles.hero_h1_resaltado}>Sitio Web Profesional</strong> diseñado a medida<strong className={styles.hero_h1_resaltado}>.</strong>
                        </h1>
                        <p className={styles.hero_p_descripcion}>Ayudo a negocios y profesionales a tener una presencia digital, <strong className={styles.hero_p_resaltado}>destacando</strong> en Google, <strong className={styles.hero_p_resaltado}></strong>transmitiendo <strong className={styles.hero_p_resaltado}>profesionalismo</strong> y <strong className={styles.hero_p_resaltado}>convertir</strong> visitantes en <strong className={styles.hero_p_resaltado}>potenciales clientes</strong>.</p>
                        <div className={styles.hero_box_btn}>
                            <button 
                                onClick={() => scrollToSection("trabajos")}  
                                className={styles.hero_btn}
                            >
                                Ver trabajos
                                <FaArrowDown className={`${styles.hero_icono_secun}`}/>
                            </button>
                            <Link href={`https://wa.me/${perfil[0]?.numero_whatsapp}?text=${mensajePresupuesto}`} className={`${styles.hero_btn} ${styles.hero_btn_alt}`}>
                                <FaWhatsapp  className={`${styles.hero_icono}`}/>
                                Solicitar presupuesto
                            </Link>
                        </div>
                        <ul className={styles.hero_ul} aria-label="Beneficios principales">
                            <li className={styles.hero_li}>
                                <FaCheck className={styles.hero_icon_check} />
                                <span className={styles.hero_span_check}>Diseño orientado a ventas</span>
                            </li>
                            <li className={styles.hero_li}>
                                <FaCheck className={styles.hero_icon_check} />
                                <span className={styles.hero_span_check}>SEO y rendimiento medible</span>
                            </li>
                            <li className={styles.hero_li}>
                                <FaCheck className={styles.hero_icon_check} />
                                <span className={styles.hero_span_check}>Entrega clara y acompañamiento</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.scrollIndicator}>
                    <span></span>
                </div>
            </div>
        </section>
    );
}

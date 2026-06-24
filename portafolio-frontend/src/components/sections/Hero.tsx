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
                        <h1 className={styles.hero_h1_titulo}> Diseño y Desarrollo de <strong className={styles.hero_h1_resaltado}> Páginas Web Profesionales </strong> para Empresas, Negocios y Emprendedores </h1>
                        <h2 className={styles.hero_p_descripcion}> Creo <strong className={styles.hero_p_resaltado}>páginas web modernas</strong>, optimizadas para <strong className={styles.hero_p_resaltado}>Google</strong>, enfocadas en generar <strong className={styles.hero_p_resaltado}>más consultas</strong>, transmitir <strong className={styles.hero_p_resaltado}>confianza</strong> y convertir visitantes en <strong className={styles.hero_p_resaltado}>clientes</strong>. </h2>
                        <div className={styles.hero_box_btn}>
                            <button 
                                onClick={() => scrollToSection("proyectos")}  
                                className={styles.hero_btn}
                            >
                                Ver Web
                                <FaArrowDown className={`${styles.hero_icono_secun}`}/>
                            </button>
                            <Link href={`https://wa.me/${perfil[0]?.numero_whatsapp}?text=${mensajePresupuesto}`} className={`${styles.hero_btn} ${styles.hero_btn_alt}`}>
                                <FaWhatsapp  className={`${styles.hero_icono}`}/>
                                Contactar
                            </Link>
                        </div>
                        {/* <ul className={styles.hero_ul} aria-label="Beneficios principales">
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
                        </ul> */}
                    </div>
                </div>
                <div className={styles.scrollIndicator}>
                    <span></span>
                </div>
            </div>
        </section>
    );
}
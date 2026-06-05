"use client";

import Image from "next/image";
import { PerfilType } from "@/types/perfil";
import style_bienvenida from "@/styles/sections/bienvenida.module.scss";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaGithubSquare, FaFacebookSquare, FaGithub} from "@/components/utils/Iconos";
import Link from "next/link";
import { ImagenComponent } from "../sub_components/ImagenM";

interface Props {
    perfil: PerfilType[];
}

export default function Bienvenida({ perfil }: Props) {
    const user = perfil?.[0];

    const redesSociales = [
        { name: "whatsapp", icon: <FaWhatsapp />, url: `https://wa.me/${user?.numero_whatsapp}` },
        { name: "Linkedin", icon: <FaLinkedin />, url: `https://www.linkedin.com/in/${user?.nombre_linkedin}` },
        { name: "Github", icon: <FaGithubSquare />, url: `https://github.com/${user?.nombre_github}` },
        { name: "Facebook", icon: <FaFacebookSquare />, url: `https://www.facebook.com/${user?.nombre_facebook}` },
        { name: "Instagram", icon: <FaInstagram />, url: `https://www.instagram.com/${user?.nombre_instagram}` },
    ];

    return (
        <article className={style_bienvenida.bienvenida}>
            <div className={style_bienvenida.bienvenida_layout}>
                <article className={style_bienvenida.bienvenida_header}>
                    <div className={style_bienvenida.bienvenida_header_box_imagen}>
                        <Image 
                            className={style_bienvenida.bienvenida_header_imagen_perfil}
                            src={"/img/Logotipo_Portafolio_PDC/Persona/Pablo.jpg"} 
                            alt={"LOGOTIPO"}
                            title={"LOGOTIPO"}
                            width={150} 
                            height={150}
                            priority
                        />
                    </div>
                    <div className={style_bienvenida.bienvenida_header_box_informacion}>
                        <h1 className={style_bienvenida.bienvenida_header_h1_nombre}>
                            <div className={style_bienvenida.bienvenida_header_box_soy}>
                                <span className={style_bienvenida.bienvenida_header_soy_span}>✋</span>
                                <span className={style_bienvenida.bienvenida_header_soy_h3}>hola, Soy</span>
                            </div>
                            {user?.nombre} {user?.apellido}
                        </h1>
                        <p className={style_bienvenida.bienvenida_header_p_descripcion}>
                            {user?.profesion} de Buenos Aires, Argentina.
                        </p>
                        <div className={style_bienvenida.bienvenida_header_btn_layout}>
                            <Link
                                className={style_bienvenida.bienvenida_header_btn} 
                                href={`https://www.linkedin.com/in/${user?.nombre_linkedin}/`}
                                aria-label={`Síguenos en ${user?.nombre_linkedin}`}
                            > 
                                <FaLinkedin size={20} /> 
                                <span className={style_bienvenida.bienvenida_header_btn_span}>Linkedin</span>
                            </Link>
                            <Link
                                className={style_bienvenida.bienvenida_header_btn} 
                                href={`https://github.com/${user?.nombre_github}`}
                                aria-label={`Síguenos en ${user?.nombre_linkedin}`}
                            >
                                <FaGithub size={20} /> 
                                <span className={style_bienvenida.bienvenida_header_btn_span}>GitHub</span>
                            </Link>
                            <Link
                                className={style_bienvenida.bienvenida_header_btn} 
                                href={`https://wa.me/${user?.numero_whatsapp}`}
                                aria-label={`Síguenos en ${user?.nombre_linkedin}`}
                            >
                                <FaWhatsapp size={20} /> 
                                <span className={style_bienvenida.bienvenida_header_btn_span}>Whatsapp</span>
                            </Link>
                        </div>
                    </div>
                </article>
                <article className={style_bienvenida.bienvenida_center}>
                    <div className={style_bienvenida.bienvenida_track}>
                        {[1, 2].map((i) => ( 
                            <ul key={i} className={style_bienvenida.bienvenida_center_layout}>
                                {redesSociales.map((red) => (
                                    <li key={red.name}>
                                        <Link 
                                            href={red.url} 
                                            className={style_bienvenida.bienvenida_center_box_redsocial}
                                            aria-label={`Síguenos en ${red.name}`}
                                        >
                                            {red.icon}
                                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>{red.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </article>
                <article className={style_bienvenida.bienvenida_footer}>
                    <div className={style_bienvenida.bienvenida_footer_layout}>
                        {[
                            { valor: user?.clientes_felices, etiqueta: "Clientes felices" },
                            { valor: `${user?.tiempo_experiencia} año`, etiqueta: "De Experiencia" },
                            { valor: user?.trabajos_completos, etiqueta: "Trabajos completos" },
                            { valor: user?.opiniones_recibidas, etiqueta: "Premios recibidos" },
                        ].map((stat, idx) => (
                            <article key={idx} className={style_bienvenida.bienvenida_footer_box}>
                                <span className={style_bienvenida.bienvenida_footer_h3}>{stat.valor}</span>
                                <span className={style_bienvenida.bienvenida_footer_span}>{stat.etiqueta}</span>
                            </article>
                        ))}
                    </div>
                </article>
            </div>
        </article>
    );
}
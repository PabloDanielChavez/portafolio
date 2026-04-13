"use client";

import { ReactNode } from "react";
import style_bienvenida from "@/styles/sections/bienvenida.module.scss"
import { 
    FaInstagram, 
    FaWhatsapp, 
    FaLinkedin,
    FaGithubSquare,
    FaFacebookSquare
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";

type Perfil = {
    id: number;
    nombre: string;
    apellido: string;
    edad:number;
    fecha_nacimiento:string;
    ubicacion:string;
    nombre_instagram:string;
    nombre_facebook:string;
    nombre_linkedin:string;
    nombre_github:string;
    numero_whatsapp:string;
    informacion_resumida:string;
    informacion_detallada:string;
    foto_perfil:string;
    profesion:string;
    clientes_felices:number;
    tiempo_experiencia:number;
    trabajos_completos:number;
    opiniones_recibidas:number;
};

type Props = {
  perfil: Perfil[];
};

export default function Bienvenida({ perfil }: Props) {
    return (
        <article className={style_bienvenida.bienvenida}>
            <div className={style_bienvenida.bienvenida_layout}>
                <article className={style_bienvenida.bienvenida_header}>
                    <div className={style_bienvenida.bienvenida_header_box_imagen}>
                        <img className={style_bienvenida.bienvenida_header_imagen_perfil} src="img/Logotipo_Portafolio_PDC/Logo/Logo_500x500px.png" alt="LOGOTIPO"/>
                    </div>
                    <div className={style_bienvenida.bienvenida_header_box_informacion}>
                        
                        <h1 className={style_bienvenida.bienvenida_header_h1_nombre}>
                            <div className={style_bienvenida.bienvenida_header_box_soy}>
                                <span className={style_bienvenida.bienvenida_header_soy_span}>✋</span>
                                <h3 className={style_bienvenida.bienvenida_header_soy_h3}>hola, Soy</h3>
                            </div>
                            {perfil?.[0]?.nombre} {perfil?.[0]?.apellido}
                        </h1>
                        <p className={style_bienvenida.bienvenida_header_p_descripcion}>Desarrollador web Full Stack de Buenos Aires, Argntina, con pasión por crear experiencias digitales con un historial comprobado.</p>
                        <div className={style_bienvenida.bienvenida_header_btn_layout}>
                            <button className={style_bienvenida.bienvenida_header_btn} type="button">
                                <MdOutlineEmail size={20}></MdOutlineEmail>
                                <span className={style_bienvenida.bienvenida_header_btn_span}>enviar correo</span>
                            </button>
                            <button className={style_bienvenida.bienvenida_header_btn} type="button">
                                <FaWhatsapp size={20}></FaWhatsapp>
                                <span className={style_bienvenida.bienvenida_header_btn_span}>enviar whatsapp</span>
                            </button>
                        </div>
                    </div>
                </article>
                <article className={style_bienvenida.bienvenida_center}>
                    <div className={style_bienvenida.bienvenida_track}>
                        <ul className={style_bienvenida.bienvenida_center_layout}>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://wa.me/${perfil?.[0]?.numero_whatsapp}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaWhatsapp></FaWhatsapp>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>whatsapp</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://www.linkedin.com/in/${perfil?.[0]?.nombre_linkedin}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaLinkedin></FaLinkedin>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Linkedin</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://github.com/${perfil?.[0]?.nombre_github}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaGithubSquare></FaGithubSquare>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Github</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://www.facebook.com/${perfil?.[0]?.nombre_facebook}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaFacebookSquare></FaFacebookSquare>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Facebook</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://www.instagram.com/${perfil?.[0]?.nombre_instagram}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaInstagram></FaInstagram>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Instagram</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={"#"} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <PiMicrosoftOutlookLogo ></PiMicrosoftOutlookLogo>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Outlook</span>
                                </a>
                            </li>
                        </ul>
                        <ul className={style_bienvenida.bienvenida_center_layout}>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://wa.me/${perfil?.[0]?.numero_whatsapp}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaWhatsapp></FaWhatsapp>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>whatsapp</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://www.linkedin.com/in/${perfil?.[0]?.nombre_linkedin}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaLinkedin></FaLinkedin>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Linkedin</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://github.com/${perfil?.[0]?.nombre_github}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaGithubSquare></FaGithubSquare>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Github</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://www.facebook.com/${perfil?.[0]?.nombre_facebook}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaFacebookSquare></FaFacebookSquare>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Facebook</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={`https://www.instagram.com/${perfil?.[0]?.nombre_instagram}`} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <FaInstagram></FaInstagram>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Instagram</span>
                                </a>
                            </li>
                            <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                                <a href={"#"} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                    <PiMicrosoftOutlookLogo ></PiMicrosoftOutlookLogo>
                                    <span className={style_bienvenida.bienvenida_center_redsocial_span}>Outlook</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </article>
                <article className={style_bienvenida.bienvenida_footer}>
                    <div className={style_bienvenida.bienvenida_footer_layout}>
                        <article className={style_bienvenida.bienvenida_footer_box}>
                            <h3 className={style_bienvenida.bienvenida_footer_h3}>{perfil?.[0]?.clientes_felices}</h3>
                            <span className={style_bienvenida.bienvenida_footer_span}>Clientes felices</span>
                        </article>
                        <article className={style_bienvenida.bienvenida_footer_box}>
                            <h3 className={style_bienvenida.bienvenida_footer_h3}>{perfil?.[0]?.tiempo_experiencia} año</h3>
                            <span className={style_bienvenida.bienvenida_footer_span}>De Experiencia</span>
                        </article>
                        <article className={style_bienvenida.bienvenida_footer_box}>
                            <h3 className={style_bienvenida.bienvenida_footer_h3}>{perfil?.[0]?.trabajos_completos}</h3>
                            <span className={style_bienvenida.bienvenida_footer_span}>Trabajos completos</span>
                        </article>
                        <article className={style_bienvenida.bienvenida_footer_box}>
                            <h3 className={style_bienvenida.bienvenida_footer_h3}>{perfil?.[0]?.opiniones_recibidas}</h3>
                            <span className={style_bienvenida.bienvenida_footer_span}>Premios recibidos</span>
                        </article>
                    </div>
                </article>
            </div>
        </article>
    );
}
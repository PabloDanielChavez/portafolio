"use client";

import { ReactNode } from "react";
import style_bienvenida from "@/styles/sections/bienvenida.module.scss"
import { 
    FaInstagram, 
    FaWhatsapp, 
    FaLinkedin,
    FaEnvelope, 
    FaBriefcase,
    FaArrowUp, 
    FaGithubSquare,
    FaFacebookSquare
} from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SiCodefactor } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";

export default function Bienvenida() {

  return (
    <article className={style_bienvenida.bienvenida}>
        <div className={style_bienvenida.bienvenida_layout}>
            <article className={style_bienvenida.bienvenida_header}>
                <div className={style_bienvenida.bienvenida_header_box_imagen}>
                    <img className={style_bienvenida.bienvenida_header_imagen_perfil} src="/img/Pablo-y-Bici.jpeg" alt="Pablo con bici"/>
                </div>
                <div className={style_bienvenida.bienvenida_header_box_informacion}>
                    <div className={style_bienvenida.bienvenida_header_box_soy}>
                        <span className={style_bienvenida.bienvenida_header_soy_span}>✋</span>
                        <h3 className={style_bienvenida.bienvenida_header_soy_h3}>hola, Soy</h3>
                    </div>
                    <h1 className={style_bienvenida.bienvenida_header_h1_nombre}>pablo Daniel Chavez</h1>
                    <p className={style_bienvenida.bienvenida_header_p_descripcion}>Desarrollador web de Buenos Aires, Argntina, con pasión por crear experiencias digitales fluidas y un historial comprobado.</p>
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
                            <FaWhatsapp></FaWhatsapp>
                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>whatsapp</span>
                        </li>
                        <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                            <FaLinkedin></FaLinkedin>
                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>Linkedin</span>
                        </li>
                        <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                            <FaGithubSquare></FaGithubSquare>
                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>Github</span>
                        </li>
                        <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                            <FaFacebookSquare></FaFacebookSquare>
                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>Facebook</span>
                        </li>
                    </ul>
                    <ul className={style_bienvenida.bienvenida_center_layout}>
                        <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                            <FaWhatsapp></FaWhatsapp>
                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>whatsapp</span>
                        </li>
                        <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                            <FaLinkedin></FaLinkedin>
                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>Linkedin</span>
                        </li>
                        <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                            <FaGithubSquare></FaGithubSquare>
                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>Github</span>
                        </li>
                        <li className={style_bienvenida.bienvenida_center_box_redsocial}>
                            <FaFacebookSquare></FaFacebookSquare>
                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>Facebook</span>
                        </li>
                    </ul>
                </div>
            </article>
            <article className={style_bienvenida.bienvenida_footer}>
                <div className={style_bienvenida.bienvenida_footer_layout}>
                    <article className={style_bienvenida.bienvenida_footer_box}>
                        <h3 className={style_bienvenida.bienvenida_footer_h3}>1+</h3>
                        <span className={style_bienvenida.bienvenida_footer_span}>Clientes felices</span>
                    </article>
                    <article className={style_bienvenida.bienvenida_footer_box}>
                        <h3 className={style_bienvenida.bienvenida_footer_h3}>1 año</h3>
                        <span className={style_bienvenida.bienvenida_footer_span}>De Experiencia</span>
                    </article>
                    <article className={style_bienvenida.bienvenida_footer_box}>
                        <h3 className={style_bienvenida.bienvenida_footer_h3}>1+</h3>
                        <span className={style_bienvenida.bienvenida_footer_span}>Trabajos completos</span>
                    </article>
                    <article className={style_bienvenida.bienvenida_footer_box}>
                        <h3 className={style_bienvenida.bienvenida_footer_h3}>0</h3>
                        <span className={style_bienvenida.bienvenida_footer_span}>Premios recibidos</span>
                    </article>
                </div>
            </article>
        </div>
    </article>
  );
}
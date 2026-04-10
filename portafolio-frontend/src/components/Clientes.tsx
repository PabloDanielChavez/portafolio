"use client";

import { ReactNode } from "react";
import style_clientes from "@/styles/sections/clientes.module.scss"
import { FaArrowRight, FaFacebook, FaInstagram } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { PiPaintBrushBold } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function clientes() {

  return (
    <article className={style_clientes.clientes}>
        <div className={style_clientes.clientes_layout}>
            <article className={style_clientes.clientes_header}>
            <div className={style_clientes.clientes_header_box}>
                <div className={style_clientes.clientes_header_box_informacion_titulo}>
                <span className={style_clientes.clientes_header_span}>
                    <AiTwotoneSchedule />
                </span>
                <h2 className={style_clientes.clientes_header_h2}>Opiniones de clientes</h2>
                </div>
                <div className={style_clientes.clientes_header_box_informacion_texto}>
                    <p className={style_clientes.clientes_header_box_informacion_texto_p}>Descubre lo que opinan mis clientes satisfechos sobre su experiencia trabajando conmigo.</p>
                </div>

            </div>

            <div className={style_clientes.clientes_contenido_box}>
                <div className={style_clientes.clientes_contenido_box_layout}>

                    <article className={style_clientes.clientes_card}>
                        <div className={style_clientes.clientes_card_header}>
                        <div className={style_clientes.clientes_card_user}>
                            <div className={style_clientes.clientes_card_avatar}>
                            <img src="img/Pablo-y-Bici.jpeg" alt="John Anderson" />
                            </div>
                            <div className={style_clientes.clientes_card_info}>
                            <h3>Queso Rallado</h3>
                            <span>Tierra de la Leche, Argentina.</span>
                            </div>
                        </div>
                        <button className={style_clientes.clientes_card_btn}><FaInstagram /></button>
                        </div>

                        <div className={style_clientes.clientes_card_body}>
                            <p className={style_clientes.clientes_header_box_informacion_texto_p}>Trabajar con Pablo supuso un punto de inflexión para mi negocio online. Sus habilidades en diseño web son excepcionales.</p>
                        </div>
                    </article>

                    <article className={style_clientes.clientes_card}>
                        <div className={style_clientes.clientes_card_header}>
                        <div className={style_clientes.clientes_card_user}>
                            <div className={style_clientes.clientes_card_avatar}>
                            <img src="img/Pablo-y-Bici.jpeg" alt="John Anderson" />
                            </div>
                            <div className={style_clientes.clientes_card_info}>
                            <h3>John Anderson</h3>
                            <span>Montevideo, Uruguay.</span>
                            </div>
                        </div>
                        <button className={style_clientes.clientes_card_btn}><FaInstagram /></button>
                        </div>

                        <div className={style_clientes.clientes_card_body}>
                            <p className={style_clientes.clientes_header_box_informacion_texto_p}>Trabajar con Pablo supuso un punto de inflexión para mi negocio online. Sus habilidades en diseño web son excepcionales.</p>
                        </div>
                    </article>

                    <article className={style_clientes.clientes_card}>
                        <div className={style_clientes.clientes_card_header}>
                        <div className={style_clientes.clientes_card_user}>
                            <div className={style_clientes.clientes_card_avatar}>
                            <img src="img/Pablo-y-Bici.jpeg" alt="Calvo" />
                            </div>
                            <div className={style_clientes.clientes_card_info}>
                            <h3>Calvo</h3>
                            <span>Monte, Pais</span>
                            </div>
                        </div>
                        <button className={style_clientes.clientes_card_btn}><FaSquareXTwitter /></button>
                        </div>

                        <div className={style_clientes.clientes_card_body}>
                            <p className={style_clientes.clientes_header_box_informacion_texto_p}>Trabajar con Pablo supuso un punto de inflexión para mi negocio online. Sus habilidades en diseño web son excepcionales.</p>
                        </div>
                    </article>
                    

                    <article className={style_clientes.clientes_card}>
                        <div className={style_clientes.clientes_card_header}>
                        <div className={style_clientes.clientes_card_user}>
                            <div className={style_clientes.clientes_card_avatar}>
                            <img src="img/Pablo-y-Bici.jpeg" alt="John Anderson" />
                            </div>
                            <div className={style_clientes.clientes_card_info}>
                            <h3>Queso Rallado</h3>
                            <span>Tierra de la Leche, Argentina.</span>
                            </div>
                        </div>
                        <button className={style_clientes.clientes_card_btn}><FaInstagram /></button>
                        </div>

                        <div className={style_clientes.clientes_card_body}>
                            <p className={style_clientes.clientes_header_box_informacion_texto_p}>Trabajar con Pablo supuso un punto de inflexión para mi negocio online. Sus habilidades en diseño web son excepcionales.</p>
                        </div>
                    </article>

                    <article className={style_clientes.clientes_card}>
                        <div className={style_clientes.clientes_card_header}>
                        <div className={style_clientes.clientes_card_user}>
                            <div className={style_clientes.clientes_card_avatar}>
                            <img src="img/Pablo-y-Bici.jpeg" alt="John Anderson" />
                            </div>
                            <div className={style_clientes.clientes_card_info}>
                            <h3>John Anderson</h3>
                            <span>Montevideo, Uruguay.</span>
                            </div>
                        </div>
                        <button className={style_clientes.clientes_card_btn}><FaInstagram /></button>
                        </div>

                        <div className={style_clientes.clientes_card_body}>
                            <p className={style_clientes.clientes_header_box_informacion_texto_p}>Trabajar con Pablo supuso un punto de inflexión para mi negocio online. Sus habilidades en diseño web son excepcionales.</p>
                        </div>
                    </article>

                    <article className={style_clientes.clientes_card}>
                        <div className={style_clientes.clientes_card_header}>
                        <div className={style_clientes.clientes_card_user}>
                            <div className={style_clientes.clientes_card_avatar}>
                            <img src="img/Pablo-y-Bici.jpeg" alt="Calvo" />
                            </div>
                            <div className={style_clientes.clientes_card_info}>
                            <h3>Calvo</h3>
                            <span>Monte, Pais</span>
                            </div>
                        </div>
                        <button className={style_clientes.clientes_card_btn}><FaSquareXTwitter /></button>
                        </div>

                        <div className={style_clientes.clientes_card_body}>
                            <p className={style_clientes.clientes_header_box_informacion_texto_p}>Trabajar con Pablo supuso un punto de inflexión para mi negocio online. Sus habilidades en diseño web son excepcionales.</p>
                        </div>
                    </article>
                    
                </div>
            </div>

            </article>
        </div>
        </article>
  );
}
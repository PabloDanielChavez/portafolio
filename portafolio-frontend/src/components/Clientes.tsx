"use client";

import { ReactNode } from "react";
import style_clientes from "@/styles/sections/clientes.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { PiPaintBrushBold } from "react-icons/pi";

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
                <h2 className={style_clientes.clientes_header_h2}>Opiniones de clientes satisfechos</h2>
                </div>
                <div className={style_clientes.clientes_header_box_informacion_texto}>
                    <p>Descubre lo que opinan mis clientes satisfechos sobre su experiencia trabajando conmigo.</p>
                </div>

            </div>

            {/* CONTENIDO */}
            <div className={style_clientes.clientes_contenido_box}>
                <div className={style_clientes.clientes_contenido_box_layout}>

                {/* CARD */}
                <article className={style_clientes.clientes_card}>

                    {/* HEADER */}
                    <div className={style_clientes.clientes_card_header}>
                    
                    <div className={style_clientes.clientes_card_user}>
                        
                        <div className={style_clientes.clientes_card_avatar}>
                        <img src="img/Pablo-y-Bici.jpeg" alt="Sarah Thompson" />
                        </div>

                        <div className={style_clientes.clientes_card_info}>
                        <h3>Sarah Thompson</h3>
                        <span>New York City, USA.</span>
                        </div>

                    </div>

                    <button className={style_clientes.clientes_card_btn}>
                        ✕
                    </button>

                    </div>

                    {/* TEXTO */}
                    <div className={style_clientes.clientes_card_body}>
                        <p>Estoy encantado con la página web de mi negocio. Su habilidad para plasmar mi visión en un diseño visualmente impresionante...</p>
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
                        <span>Sydney, Australia.</span>
                        </div>
                    </div>
                    <button className={style_clientes.clientes_card_btn}>✕</button>
                    </div>

                    <div className={style_clientes.clientes_card_body}>
                    <p>Trabajar con Charlie supuso un punto de inflexión para mi negocio online. Sus habilidades en diseño web son excepcionales.</p>
                    </div>
                </article>

                </div>
            </div>

            </article>
        </div>
        </article>
  );
}
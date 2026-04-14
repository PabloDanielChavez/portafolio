"use client";

import { ReactNode } from "react";
import style_clientes from "@/styles/sections/clientes.module.scss"
import { FaArrowRight, FaFacebook, FaInstagram } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { PiPaintBrushBold } from "react-icons/pi";
import { FaSquareXTwitter } from "react-icons/fa6";

type Clientes = {
    id:number;
    nombre_cliente:string;
    opinion_cliente:string;
    valoracion_cliente:string;
    ubicacion_cliente:string;
    nombre_archivo:string;
    nombre_imagen:string;
    formato_imagen:string;
};

type Props = {
    clientes: Clientes[];
};

export default function clientes({ clientes }: Props) {


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
                        {clientes && clientes.map((cli) => (
                            <article key={cli.id} className={style_clientes.clientes_card}>
                                <div className={style_clientes.clientes_card_header}>
                                    <div className={style_clientes.clientes_card_user}>
                                        <div className={style_clientes.clientes_card_avatar}>
                                            <img src={`/img/Logotipo_Portafolio_PDC/${cli?.nombre_archivo}/${cli?.nombre_imagen}.${cli?.formato_imagen}`} alt={cli?.nombre_imagen} />
                                        </div>
                                        <div className={style_clientes.clientes_card_info}>
                                            <h3>{cli.nombre_cliente}</h3>
                                            <span>{cli.ubicacion_cliente}</span>
                                        </div>
                                    </div>
                                    <button className={style_clientes.clientes_card_btn}>
                                        <FaInstagram />
                                    </button>
                                </div>
                                <div className={style_clientes.clientes_card_body}>
                                    <p className={style_clientes.clientes_header_box_informacion_texto_p}>{cli.opinion_cliente}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                </article>
            </div>
            </article>
    );
}
"use client";

import { ReactNode } from "react";
import style_trabajos from "@/styles/sections/trabajos.module.scss"
import { FaArrowRight } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { PiPaintBrushBold } from "react-icons/pi";
import { IoIosRocket } from "react-icons/io";

export default function Trabajos() {

  return (
    <article className={style_trabajos.trabajos}>
        <div className={style_trabajos.trabajos_layout}>
            <article className={style_trabajos.trabajos_header}>
                <div className={style_trabajos.trabajos_header_box}>
                    <div className={style_trabajos.trabajos_header_box_informacion_titulo}>
                    <span className={style_trabajos.trabajos_header_span}>
                        <IoIosRocket />
                    </span>
                    <h2 className={style_trabajos.trabajos_header_h2}>Trabajos Realizados</h2>
                    </div>
                    <div className={style_trabajos.trabajos_header_box_informacion_texto}>
                        <p>Descubre una colección de mis trabajos de diseño más innovadores y visualmente impactantes.</p>
                    </div>
                </div>
                <div className={style_trabajos.trabajos_contenido_box}>
                    <div className={style_trabajos.trabajos_contenido_box_layout}>
                        <article className={style_trabajos.trabajos_card}>
                            <div className={style_trabajos.trabajos_card_img}>
                                <img src="https://framerusercontent.com/images/34CNONDmkqhYuIXHQCjxqCbWjDQ.png?scale-down-to=512" alt="Devcraft" />
                            </div>
                            <div className={style_trabajos.trabajos_card_info}>
                                <div className={style_trabajos.trabajos_card_header}>
                                    <h3>Devcraft</h3>
                                    <a href="#" className={style_trabajos.trabajos_card_link}>devcraft.com</a>
                                </div>
                                <div className={style_trabajos.trabajos_card_meta}>
                                    <span>Portfolio</span>
                                    <span>•</span>
                                    <span>4 Pages</span>
                                    <span>•</span>
                                    <span>Dark Theme</span>
                                </div>
                                <p className={style_trabajos.trabajos_card_desc}>Demostrando experiencia, pasión e innovación en el ámbito del desarrollo.</p>
                            </div>
                        </article>

                        <article className={style_trabajos.trabajos_card}>
                            <div className={style_trabajos.trabajos_card_img}>
                                <img src="https://framerusercontent.com/images/2BMySs6ve9g9IU6tbFt5J4r58o.jpg?scale-down-to=512&width=811&height=504" alt="Zenith Gym" />
                            </div>
                            <div className={style_trabajos.trabajos_card_info}>
                                <div className={style_trabajos.trabajos_card_header}>
                                    <h3>Zenith Gym</h3>
                                    <a href="#" className={style_trabajos.trabajos_card_link}>zenith.com</a>
                                </div>
                                <div className={style_trabajos.trabajos_card_meta}>
                                    <span>Fitness</span>
                                    <span>•</span>
                                    <span>5 Pages</span>
                                    <span>•</span>
                                    <span>Light Theme</span>
                                </div>
                                <p className={style_trabajos.trabajos_card_desc}>Brindando a los entusiastas del fitness una experiencia online inmersiva.</p>
                            </div>
                        </article>
                        
                        <div className={style_trabajos.trabajos_card_footer}>
                            <button className={style_trabajos.trabajos_card_btn}>VIEW ALL PROJECTS →</button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </article>
  );
}
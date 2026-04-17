"use client";
import Header from "@/components/Header";
import { ReactNode, useState } from "react";
import style_ventana from "@/styles/sections/ventana.module.scss"
import style_global from "@/styles/base/global.module.scss"
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaLinkedin,
  FaEnvelope, 
  FaBriefcase,
  FaArrowUp 
} from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SiCodefactor } from "react-icons/si";
import { IconType } from "react-icons";

interface SelectorItemProps {
  href: string;
  Icon: IconType; // Usamos IconType para que acepte componentes de react-icons
  label: string;
}
export const SelectorItem = ({ href, Icon, label }: SelectorItemProps) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <article className={style_ventana.ventana_header_selector_box}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className={style_ventana.ventana_header_selector_opcion}>
                <a href={href} className={style_ventana.ventana_header_link}>
                    <Icon className={style_ventana.ventana_header_link} 
                        style={{ 
                        color: isHovered ? "white" : "#555", 
                        transition: 'color 0.3s ease',
                    }}/>
                </a>
            </div>
            <div 
                className={style_ventana.ventana_header_selector_nombre_box}
                style={{ 
                opacity: isHovered ? 1 : 0, 
                transition: 'opacity 0.3s ease',
                color:  'white'
                }}
            >
                <span className={style_ventana.ventana_header_selector_nombre_span}>
                    {label}
                </span>
            </div>
        </article>
    );
};

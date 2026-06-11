"use client";
import { useState } from "react";
import style_ventana from "@/styles/sections/ventana.module.scss";
import style_global from "@/styles/base/global.module.scss";
import { IconType } from "react-icons";
import Link from "next/link";
import { trackEvent } from "../utils/Analytics";

interface SelectorItemProps {
    li: boolean;
    href: string;
    Icon: IconType;
    label: string;
    lado?: "izq" | "der";
}

export const SelectorItem = ({ li, href, Icon, label, lado = "der" }: SelectorItemProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const claseNombreBox = lado === "izq" 
        ? style_ventana.ventana_header_selector_nombre_box_izq 
        : style_ventana.ventana_header_selector_nombre_box_der;

    return (
        <div 
            className={style_ventana.ventana_header_selector_box}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={style_ventana.ventana_header_selector_opcion}>
                {li && (
                    <Link 
                    href={href} className={`${style_ventana.ventana_header_link} ${style_global.animacion_btn}`}
                    aria-label={`Link a ${label}`}
                    onClick={() => {
                        trackEvent(`click_${label}`, {
                            section: "ventana"
                        })
                    }}
                    >
                        <Icon 
                            className={style_ventana.ventana_header_link} 
                            style={{ 
                            color: isHovered ? "white" : "#555", 
                            transition: 'color 0.3s ease',
                            }}
                            aria-hidden="true"
                        />
                    </Link>
                )}
                {!li && (
                    <Icon 
                        className={style_ventana.ventana_header_link} 
                        style={{ 
                        color: isHovered ? "white" : "#555", 
                        transition: 'color 0.3s ease',
                        }}
                        aria-hidden="true"
                    />
                )}
                
            </div>
            <div 
                className={claseNombreBox}
                style={{ 
                opacity: isHovered ? 1 : 0, 
                transition: 'opacity 0.3s ease',
                color: 'white'
                }}
            >
                <span className={style_ventana.ventana_header_selector_nombre_span}>
                    {label}
                </span>
            </div>
        </div>
    );
};
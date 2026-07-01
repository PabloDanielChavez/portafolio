import type { ReactNode } from "react";

import {
    FaArrowRight,
    FaCheck
} from "@/components/utils/Iconos";
import style from "@/styles/sections/contacto.module.scss";

export type ContactoCanalData = {
    id: string;
    titulo: string;
    detalle: string;
    url: string;
    icon: ReactNode;
};

type ContactoCanalesProps = {
    indicadores: readonly string[];
    canales: readonly ContactoCanalData[];
    onSocialClick: (network: string) => void;
};

export default function ContactoCanales({
    indicadores,
    canales,
    onSocialClick
}: ContactoCanalesProps) {
    return (
        <aside
            className={`${style.contacto_sidebar} ${style.contacto_reveal} ${style.contacto_reveal_delay_two}`}
            aria-label="Garantías y canales de contacto"
        >
            <div className={style.contacto_trust_panel}>
                <span className={style.contacto_eyebrow}>
                    Una solución pensada para tu negocio
                </span>
                <h2>Más que una web visualmente atractiva</h2>
                <p>
                    Cada decisión de diseño y desarrollo busca que tu sitio
                    sea fácil de usar, rápido y capaz de convertir visitas
                    en consultas reales.
                </p>
                <ul className={style.contacto_trust_grid}>
                    {indicadores.map((indicador) => (
                        <li key={indicador}>
                            <FaCheck aria-hidden="true" />
                            <span>{indicador}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={style.contacto_channels_panel}>
                <div className={style.contacto_panel_heading}>
                    <div>
                        <span className={style.contacto_eyebrow}>
                            Canales directos
                        </span>
                        <h2>Elegí cómo conversar</h2>
                    </div>
                    <span className={style.contacto_availability}>
                        Disponible para nuevos proyectos
                    </span>
                </div>

                <div className={style.contacto_social_grid}>
                    {canales.map((social) => (
                        <a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={style.contacto_social_card}
                            aria-label={`Contactar por ${social.titulo}`}
                            onClick={() => onSocialClick(social.id)}
                        >
                            <span className={style.contacto_social_icon}>
                                {social.icon}
                            </span>
                            <span className={style.contacto_social_info}>
                                <strong>{social.titulo}</strong>
                                <small>{social.detalle}</small>
                            </span>
                            <FaArrowRight
                                className={style.contacto_social_arrow}
                                aria-hidden="true"
                            />
                        </a>
                    ))}
                </div>

                <p className={style.contacto_response_note}>
                    Sin mensajes automáticos ni propuestas genéricas.
                </p>
            </div>
        </aside>
    );
}

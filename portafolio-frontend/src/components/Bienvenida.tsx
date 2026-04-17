import Image from "next/image";
import { PerfilType } from "@/types/perfil";
import style_bienvenida from "@/styles/sections/bienvenida.module.scss";
import { 
    FaInstagram, FaWhatsapp, FaLinkedin, 
    FaGithubSquare, FaFacebookSquare 
} from "react-icons/fa";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";

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
                            src="/img/Logotipo_Portafolio_PDC/Persona/Pablo.jpg" 
                            alt="LOGOTIPO"
                            width={150}
                            height={150}
                        />
                    </div>
                    <div className={style_bienvenida.bienvenida_header_box_informacion}>
                        <h1 className={style_bienvenida.bienvenida_header_h1_nombre}>
                            <div className={style_bienvenida.bienvenida_header_box_soy}>
                                <span className={style_bienvenida.bienvenida_header_soy_span}>✋</span>
                                <h3 className={style_bienvenida.bienvenida_header_soy_h3}>hola, Soy</h3>
                            </div>
                            {user?.nombre} {user?.apellido}
                        </h1>
                        <p className={style_bienvenida.bienvenida_header_p_descripcion}>
                            {user?.profesion} de Buenos Aires, Argentina.
                        </p>
                        <div className={style_bienvenida.bienvenida_header_btn_layout}>
                            <a href={`https://wa.me/${user?.numero_whatsapp}`} className={style_bienvenida.bienvenida_header_btn}>
                                <FaWhatsapp size={20} />
                                <span className={style_bienvenida.bienvenida_header_btn_span}>enviar whatsapp</span>
                            </a>
                        </div>
                    </div>
                </article>
                <article className={style_bienvenida.bienvenida_center}>
                    <div className={style_bienvenida.bienvenida_track}>
                        {[1, 2].map((i) => ( 
                            <ul key={i} className={style_bienvenida.bienvenida_center_layout}>
                                {redesSociales.map((red) => (
                                    <li key={red.name}>
                                        <a href={red.url} className={style_bienvenida.bienvenida_center_box_redsocial}>
                                            {red.icon}
                                            <span className={style_bienvenida.bienvenida_center_redsocial_span}>{red.name}</span>
                                        </a>
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
                                <h3 className={style_bienvenida.bienvenida_footer_h3}>{stat.valor}</h3>
                                <span className={style_bienvenida.bienvenida_footer_span}>{stat.etiqueta}</span>
                            </article>
                        ))}
                    </div>
                </article>
            </div>
        </article>
    );
}
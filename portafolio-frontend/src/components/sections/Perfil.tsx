"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/sections/perfil.module.scss";

import { FaInstagram, FaWhatsapp, FaLinkedin, FaGithubSquare, FaFacebookSquare, FaGithub } from "@/components/utils/Iconos";
import { trackEvent } from "../utils/Analytics";
import { mensajeWSP } from "../utils/variables";

export default function Perfil() {

    const redesSociales = [
        {
            name: "Whatsapp",
            icon: <FaWhatsapp />,
            url: `https://wa.me/5491164095914?text=${mensajeWSP}`
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedin />,
            url: "https://www.linkedin.com/in/pablo-daniel-chavez-4a57a2277/"
        },
        {
            name: "GitHub",
            icon: <FaGithubSquare />,
            url: "https://github.com/PabloDanielChavez"
        },
        {
            name: "Instagram",
            icon: <FaInstagram />,
            url: "https://www.instagram.com/paginasweb.chavez/"
        }
    ];

    const tecnologias = [
        "React",
        "Next.js",
        "TypeScript",
        "Sass",
        "MySQL",
        "Node.js"
    ];

    const metricas = [
        {
            valor: "4+",
            etiqueta: "Proyectos desarrollados"
        },
        {
            valor: "99",
            etiqueta: "Performance promedio"
        },
        {
            valor: "100",
            etiqueta: "SEO"
        },
        {
            valor: "100",
            etiqueta: "Accesibilidad"
        }
    ];

    return (
        <article className={styles.perfil}>
            <div className={styles.perfil_layout}>
                <section className={styles.perfil_header}>
                    <div className={styles.perfil_header_box_imagen}>
                        <Image
                            src="/img/Logotipo_Portafolio_PDC/Persona/Pablo.jpg"
                            alt="Pablo Daniel Chavez - Desarrollador Web Full Stack"
                            width={180}
                            height={180}
                            priority
                            className={styles.perfil_header_imagen_perfil}
                        />
                    </div>
                    <div className={styles.perfil_header_box_informacion}>
                        <span className={styles.perfil_header_span_tag}>
                            PaginasWebChavez · Buenos Aires, Argentina
                        </span>

                        <h1 className={styles.perfil_header_h1_nombre}>
                            Pablo Chavez
                        </h1>

                        <p className={styles.perfil_header_p_descripcion}>
                            Dirijo PaginasWebChavez y trabajo directamente en el análisis,
                            diseño y desarrollo de cada proyecto. Antes de construir, busco
                            entender el contexto, ordenar la información y definir un alcance claro.
                        </p>
                        <div className={styles.perfil_header_btn_layout}>
                            <Link
                                href="https://www.linkedin.com/in/pablo-daniel-chavez-4a57a2277/"
                                className={styles.perfil_header_btn}
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                                LinkedIn
                            </Link>
                            <Link
                                href="https://github.com/PabloDanielChavez"
                                className={styles.perfil_header_btn}
                                rel="noopener noreferrer"
                            >
                                <FaGithub />
                                GitHub
                            </Link>
                            <Link
                                href={`https://wa.me/5491164095914?text=${mensajeWSP}`}
                                className={styles.perfil_header_btn}
                            >
                                <FaWhatsapp />
                                Whatsapp
                            </Link>
                        </div>
                    </div>
                </section>
                <section className={styles.perfil_historia}>
                    <h2 className={styles.perfil_filosofia_h2}>
                    Cómo trabajo
                </h2>

                <p className={styles.perfil_filosofia_p}>
                    Cada proyecto parte de entender qué necesita resolver, qué
                    información existe y qué conviene priorizar antes de definir el
                    desarrollo.
                </p>

                <p className={styles.perfil_filosofia_p}>
                    Trabajo la estructura, el diseño y la base técnica según el alcance
                    acordado. El rendimiento, el SEO técnico, las integraciones y las
                    herramientas de medición se evalúan cuando corresponden al proyecto.
                </p>
                </section>
                <section className={styles.perfil_tecnologias}>
                    <h2 className={styles.perfil_tecnologias_h2}>
                        Trabajo principalmente con las siguientes tecnologías:
                    </h2>
                    <div className={styles.perfil_tecnologias_layout}>
                        {tecnologias.map((tech) => (
                            <span
                                key={tech}
                                className={styles.perfil_tecnologias_item}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>
                <section className={styles.perfil_filosofia}>
                    <h2 className={styles.perfil_filosofia_h2}>
                        Mi Filosofía de Trabajo
                    </h2>
                    <p className={styles.perfil_filosofia_p}>
                        Mi trabajo integra desarrollo web Full Stack, optimización de sitios, experiencia de usuario y performance web. Desarrollo con foco en <strong className={styles.destacadoPrimary}>alto rendimiento</strong>, 
                        buscando siempre resultados concretos para el negocio.
                    </p>
                    <p className={styles.perfil_filosofia_p}>
                        Para lograrlo, integro herramientas como Google Analytics, Tag Manager y estrategias 
                        de <strong className={styles.destacadoPrimary}>SEO</strong>, asegurando que cada sitio sea atractivo, eficiente, 
                        medible y preparado para destacar en los resultados de búsqueda.
                    </p>
                </section>
                <section className={styles.perfil_redes}>
                    <h2 className={styles.perfil_redes_h2}>
                        Redes Sociales
                    </h2>
                    <div className={styles.perfil_redes_layout}>
                        {redesSociales.map((red) => (
                            <Link
                                key={red.name}
                                href={red.url}
                                className={styles.perfil_redes_item}
                                onClick={() =>
                                    trackEvent("social_click", {
                                        section: "perfil",
                                        network: red.name
                                    })
                                }
                            >
                                {red.icon}
                                <span>{red.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>
                <section className={styles.perfil_contacto}>
                    <h2 className={styles.perfil_contacto_h2}>
                        ¿Querés revisar tu proyecto?
                    </h2>

                    <p className={styles.perfil_contacto_p}>
                        Podés contarme qué necesitás resolver y qué información ya tenés.
                        A partir de ahí, revisamos el contexto y definimos el próximo paso.
                    </p>

                    <Link href="/contacto" className={styles.perfil_contacto_btn}>
                        Contame tu proyecto
                    </Link>
                </section>
            </div>
        </article>
    );
}







// "use client";

// import Image from "next/image";
// import { PerfilType } from "@/types/perfil";
// import styles from "@/styles/sections/perfil.module.scss";
// import { FaInstagram, FaWhatsapp, FaLinkedin, FaGithubSquare, FaFacebookSquare, FaGithub} from "@/components/utils/Iconos";
// import Link from "next/link";
// import { trackEvent } from "../utils/Analytics";

// interface Props {
//     perfil: PerfilType[];
// }

// export default function Perfil({ perfil }: Props) {
//     const user = perfil?.[0];

//     const redesSociales = [
//         { name: "whatsapp", icon: <FaWhatsapp />, url: `https://wa.me/${user?.numero_whatsapp}` },
//         { name: "Linkedin", icon: <FaLinkedin />, url: `https://www.linkedin.com/in/${user?.nombre_linkedin}` },
//         { name: "Github", icon: <FaGithubSquare />, url: `https://github.com/${user?.nombre_github}` },
//         { name: "Facebook", icon: <FaFacebookSquare />, url: `https://www.facebook.com/${user?.nombre_facebook}` },
//         { name: "Instagram", icon: <FaInstagram />, url: `https://www.instagram.com/${user?.nombre_instagram}` },
//     ];

//     return (
//         <article className={styles.perfil}>
//             <div className={styles.perfil_layout}>
//                 <article className={styles.perfil_header}>
//                     <div className={styles.perfil_header_box_imagen}>
//                         <Image 
//                             className={styles.perfil_header_imagen_perfil}
//                             src={"/img/Logotipo_Portafolio_PDC/Persona/Pablo.jpg"} 
//                             alt={"LOGOTIPO"}
//                             title={"LOGOTIPO"}
//                             width={140} 
//                             height={140}
//                             sizes="150px"
//                             priority
//                             fetchPriority="high"
//                         />
//                     </div>
//                     <div className={styles.perfil_header_box_informacion}>
//                         <h1 className={styles.perfil_header_h1_nombre}>
//                             <div className={styles.perfil_header_box_soy}>
//                                 <span className={styles.perfil_header_soy_span}>✋</span>
//                                 <span className={styles.perfil_header_soy_h3}>hola, Soy</span>
//                             </div>
//                             {user?.nombre} {user?.apellido}
//                         </h1>
//                         <p className={styles.perfil_header_p_descripcion}>
//                             {user?.profesion} de Buenos Aires, Argentina.
//                         </p>
//                         <div className={styles.perfil_header_btn_layout}>
//                             <Link
//                                 className={styles.perfil_header_btn} 
//                                 href={`https://www.linkedin.com/in/${user?.nombre_linkedin}/`}
//                                 aria-label={`Ir a mi LinkedIn ${user?.nombre_linkedin}`}
//                                 onClick={() => 
//                                     trackEvent("social_click", {
//                                         section: "perfil",
//                                         network: "linkedin"
//                                     })
//                                 }
//                             > 
//                                 <FaLinkedin size={20} /> 
//                                 <span className={styles.perfil_header_btn_span}>Linkedin</span>
//                             </Link>
//                             <Link
//                                 className={styles.perfil_header_btn} 
//                                 href={`https://github.com/${user?.nombre_github}`}
//                                 aria-label={`Ir a mi GitHub  ${user?.nombre_github}`}
//                                 onClick={() => 
//                                     trackEvent("social_click", {
//                                         section: "perfil",
//                                         network: "github"
//                                     })
//                                 }
//                             >
//                                 <FaGithub size={20} /> 
//                                 <span className={styles.perfil_header_btn_span}>GitHub</span>
//                             </Link>
//                             <Link
//                                 className={styles.perfil_header_btn} 
//                                 href={`https://wa.me/${user?.numero_whatsapp}`}
//                                 aria-label={`Ir a mi Whatsapp ${user?.numero_whatsapp}`}
//                                 onClick={() => 
//                                     trackEvent("social_click", {
//                                         section: "perfil",
//                                         network: "whatsapp"
//                                     })
//                                 }
//                             >
//                                 <FaWhatsapp size={20} /> 
//                                 <span className={styles.perfil_header_btn_span}>Whatsapp</span>
//                             </Link>
//                         </div>
//                     </div>
//                 </article>
//                 <article className={styles.perfil_center}>
//                     <div className={styles.perfil_track}>
//                         {[1, 2].map((i) => ( 
//                             <ul key={i} className={styles.perfil_center_layout}>
//                                 {redesSociales.map((red) => (
//                                     <li key={red.name}>
//                                         <Link 
//                                             href={red.url} 
//                                             className={styles.perfil_center_box_redsocial}
//                                             aria-label={`Síguenos en ${red.name}`}
//                                             onClick={() => 
//                                                 trackEvent("social_click", {
//                                                     section: "perfil",
//                                                     network:`${red.name}`
//                                                 })
//                                             }
//                                         >
//                                             {red.icon}
//                                             <span className={styles.perfil_center_redsocial_span}>{red.name}</span>
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ))}
//                     </div>
//                 </article>
//                 <article className={styles.perfil_footer}>
//                     <div className={styles.perfil_footer_layout}>
//                         {[
//                             { valor: 4, etiqueta: "Proyectos desarrollados" },
//                             { valor: `${user?.tiempo_experiencia} año`, etiqueta: "De Experiencia" },
//                             { valor: user?.trabajos_completos, etiqueta: "Trabajos completos" },
//                             { valor: 4, etiqueta: "Tecnologías dominadas" },
//                         ].map((stat, idx) => (
//                             <article key={idx} className={styles.perfil_footer_box}>
//                                 <span className={styles.perfil_footer_h3}>{stat.valor}</span>
//                                 <span className={styles.perfil_footer_span}>{stat.etiqueta}</span>
//                             </article>
//                         ))}
//                     </div>
//                 </article>
//             </div>
//         </article>
//     );
// }

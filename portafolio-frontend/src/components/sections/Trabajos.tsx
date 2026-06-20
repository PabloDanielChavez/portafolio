"use client";

import { useState } from "react";
import style_trabajos from "@/styles/sections/trabajos.module.scss";
import { IoIosRocket, IoMdArrowBack } from "react-icons/io";
import { TrabajosType } from "@/types/trabajos";
import SectionHeader from "../sub_components/SectionHeader";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { trackEvent } from "../utils/Analytics";
import TrabajoCard from "../sub_components/TrabajoCard";

type Props = {
    trabajos: TrabajosType[];
    showFooter?: boolean;
};

export default function Trabajos({
    trabajos,
    showFooter = false
}: Props) {

    const [estrategia, setEstrategia] = useState<"mobile" | "desktop">("mobile");

    return (
        <section className={style_trabajos.trabajos}>
            <div className={style_trabajos.trabajos_layout}>
                {!showFooter && (
                    <Link
                        href="/"
                        className={style_trabajos.pagTrabajo_LINK}
                        aria-label="Volver a Inicio"
                    >
                        <IoMdArrowBack />
                        Volver al Portafolio
                    </Link>
                )}
                <div className={style_trabajos.trabajos_header}>
                    <SectionHeader
                        icon={<IoIosRocket />}
                        title="Trabajos Realizados"
                        description="Descubre una colección de mis trabajos de diseño más innovadores."
                    />
                    <div
                        className={style_trabajos.pagTrabajo_tabs_container}
                        style={{ marginBottom: "20px" }}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setEstrategia("mobile");
                                trackEvent("click_Trabajos_auditoria", {
                                    section: "Trabajos"
                                });
                            }}
                            className={`${style_trabajos.pagTrabajo_tab_btn}
                            ${
                                estrategia === "mobile"
                                    ? style_trabajos.pagTrabajo_tab_btn_activo
                                    : style_trabajos.pagTrabajo_tab_btn_desactivado
                            }`}
                        >
                            Teléfono
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEstrategia("desktop");
                                trackEvent("click_Trabajos_auditoria", {
                                    section: "Trabajos"
                                });
                            }}
                            className={`${style_trabajos.pagTrabajo_tab_btn}
                            ${
                                estrategia === "desktop"
                                    ? style_trabajos.pagTrabajo_tab_btn_activo
                                    : style_trabajos.pagTrabajo_tab_btn_desactivado
                            }`}
                        >
                            Escritorio
                        </button>
                    </div>

                    <div className={style_trabajos.trabajos_contenido_box}>
                        <div className={style_trabajos.trabajos_contenido_box_layout}>
                            {trabajos.map((trabajo, index) => (
                                <TrabajoCard
                                    key={trabajo.id}
                                    trabajo={trabajo}
                                    estrategia={estrategia}
                                    esOculto={showFooter && index >= 2}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {showFooter && (
                    <div className={style_trabajos.trabajos_card_footer}>
                        <Link
                            href="/trabajos"
                            className={style_trabajos.trabajos_LINK}
                            aria-label="Ver todos los trabajos"
                            onClick={() =>
                                trackEvent("click_trabajos", {
                                    section: "Trabajos"
                                })
                            }
                        >
                            <button
                                className={style_trabajos.trabajos_card_btn}
                                aria-label="Ver todos los trabajos"
                            >
                                Más Proyectos
                                <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
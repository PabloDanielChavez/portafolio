"use client";

import { useState } from "react";

import {
    BsQuestionCircle,
    FaMinus,
    FaPlus
} from "@/components/utils/Iconos";
import style from "@/styles/sections/contacto.module.scss";

import SectionHeader from "./SectionHeader";
import { trackEvent } from "../utils/Analytics";

export type ContactoFaqItemData = {
    id: string;
    pregunta: string;
    respuesta: string;
};

type ContactoFaqProps = {
    items: readonly ContactoFaqItemData[];
};

function FaqItem({ item }: { item: ContactoFaqItemData }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonId = `contact-faq-question-${item.id}`;
    const answerId = `contact-faq-answer-${item.id}`;

    const toggleFaq = () => {
        const nextState = !isOpen;
        setIsOpen(nextState);

        trackEvent("contact_faq_toggle", {
            section: "contacto",
            faq_id: item.id,
            state: nextState ? "open" : "closed"
        });
    };

    return (
        <article
            className={`${style.contacto_faq_article} ${
                isOpen ? style.contacto_faq_article_open : ""
            }`}
        >
            <h3 className={style.contacto_faq_heading}>
                <button
                    id={buttonId}
                    type="button"
                    className={style.contacto_faq_button}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={toggleFaq}
                >
                    <span>{item.pregunta}</span>
                    <span
                        className={style.contacto_faq_icon}
                        aria-hidden="true"
                    >
                        {isOpen ? <FaMinus /> : <FaPlus />}
                    </span>
                </button>
            </h3>
            <div
                id={answerId}
                className={style.contacto_faq_answer}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
            >
                <div>
                    <p>{item.respuesta}</p>
                </div>
            </div>
        </article>
    );
}

export default function ContactoFaq({ items }: ContactoFaqProps) {
    const firstFaqColumn = items.slice(
        0,
        Math.ceil(items.length / 2)
    );
    const secondFaqColumn = items.slice(Math.ceil(items.length / 2));

    return (
        <div
            className={`${style.contacto_faq_section} ${style.contacto_reveal} ${style.contacto_reveal_delay_three}`}
        >
            <SectionHeader
                icon={<BsQuestionCircle aria-hidden="true" />}
                title="Preguntas frecuentes sobre desarrollo web"
                description="Respuestas simples para ayudarte a evaluar tu próxima landing page, sitio profesional, tienda online o desarrollo a medida."
            />

            <div className={style.contacto_faq_layout}>
                <div className={style.contacto_faq_column}>
                    {firstFaqColumn.map((item) => (
                        <FaqItem key={item.id} item={item} />
                    ))}
                </div>
                <div className={style.contacto_faq_column}>
                    {secondFaqColumn.map((item) => (
                        <FaqItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import { ReactNode } from "react";
import styles_seccionHeader from "@/styles/sections/SectionHeader.module.scss";

interface SectionHeaderProps {
    icon: ReactNode;
    title: string;
    description: string;
    headingLevel?: "h1" | "h2";
}

export default function SectionHeader({
    icon,
    title,
    description,
    headingLevel = "h2"
}: SectionHeaderProps) {
    const Heading = headingLevel;

    return (
    <div className={styles_seccionHeader.header_box}>
        <div className={styles_seccionHeader.header_title_group}>
            <span className={styles_seccionHeader.header_icon}>
                {icon}
            </span>
            <Heading className={styles_seccionHeader.header_title}>{title}</Heading>
        </div>
        <div className={styles_seccionHeader.header_description}>
            <p className={styles_seccionHeader.header_description_p}>{description}</p>
        </div>
    </div>
    );
}

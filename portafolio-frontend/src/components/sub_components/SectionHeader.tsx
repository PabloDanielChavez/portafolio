import { ReactNode } from "react";
import styles_seccionHeader from "@/styles/sections/SectionHeader.module.scss";

interface SectionHeaderProps {
    icon: ReactNode;    
    title: string;      
    description: string; 
}

export default function SectionHeader({ icon, title, description }: SectionHeaderProps) {
    return (
    <div className={styles_seccionHeader.header_box}>
        <div className={styles_seccionHeader.header_title_group}>
            <span className={styles_seccionHeader.header_icon}>
                {icon}
            </span>
            <h2 className={styles_seccionHeader.header_title}>{title}</h2>
        </div>
        <div className={styles_seccionHeader.header_description}>
            <p className={styles_seccionHeader.header_description__p}>{description}</p>
        </div>
    </div>
    );
}
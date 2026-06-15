"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles_header from '@/styles/sections/header.module.scss';
import { BiBriefcase, BiCog, BiHomeAlt2, BiMenu, BiX } from 'react-icons/bi';
import { MdInfoOutline  } from 'react-icons/md';
import { usePathname } from 'next/navigation'; // Útil para verificar si estás en inicio o detalle
import Image from 'next/image';

export default function Header() {
    return (
        <header className={`${styles_header.header}`}>
            <div className={styles_header.header_container}>
                <Link href="/" className={styles_header.header_logo} aria-label="Ir a inicio">
                    <div className={styles_header.header_icono_box}>
                        <Image 
                            className={styles_header.header_icono_img}
                            src={`/img/Logotipo_Portafolio_PDC/Logo/logo_PW.png`} 
                            alt={"LOGOTIPO"}
                            title={"LOGOTIPO"}
                            width={50} 
                            height={50}
                            sizes="50px"
                        />
                    </div> 
                </Link>
                <BiX size={32} aria-label='Botoncito hermoso'/>
            </div>
        </header>
    );
}
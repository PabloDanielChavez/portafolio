'use client';

import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import style from "@/styles/sections/home_error.module.scss"; 

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className={style.error_container}>
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 0
            }} />
            
            <div className={style.error_content} style={{ zIndex: 1, textAlign: 'center', position: 'relative' }}>
                <h2 style={{ fontSize: '3rem', margin: '0 0 16px', fontWeight: 800, color: '#fff' }}>
                    Error de carga
                </h2>
                
                <p style={{ color: '#8b8b8b', maxWidth: '400px', marginBottom: '30px', marginInline: 'auto' }}>
                    No pudimos recuperar la información del portafolio. Por favor, intenta refrescar la página o vuelve más tarde.
                </p>
                <button 
                    onClick={() => reset()}
                    className={style.btn_accion}
                >
                    Intentar de nuevo
                </button>

                <br />

                <Link href="/" className={style.link_boton}>
                    <IoMdArrowBack /> Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
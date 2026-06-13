import style_trabajos from "@/styles/sections/trabajos.module.scss";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

export const EstadoVacio = () => (
    <div className={style_trabajos.pagTrabajo_detalle_container}>
        <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
        }} />
        
        <div className={style_trabajos.pagTrabajo_error_container}>
            <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>404</h2>
            <p style={{ color: '#8b8b8b', maxWidth: '400px' }}>
                Parece que el proyecto que buscas ha sido trasladado o no se encuentra disponible.
            </p>
            <Link href="/trabajos" className={style_trabajos.pagTrabajo_LINK}>
                <IoMdArrowBack /> Volver al Portafolio
            </Link>
        </div>
    </div>
);
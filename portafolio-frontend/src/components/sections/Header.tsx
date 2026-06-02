
"use client";
import styles_header from '../styles/sections/header.module.scss';
import { useState, useEffect } from 'react';

export default function Header() {
  const [hora, setHora] = useState('');

  useEffect(() => {
    const obtenerHora = () => {
      return new Date().toLocaleTimeString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour12: false
      });
    };

    setHora(obtenerHora());

    const intervalo = setInterval(() => {
      setHora(obtenerHora());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);
  return (
    <header className={styles_header.header}>
      <div className={styles_header.header_box}>
        <div className={styles_header.header_layout}>
          <article className={styles_header.header_box_available}>
            <span className={styles_header.header_circle_box}>
              <span className={styles_header.header_circle}></span>
              <span className={styles_header.header_circle_animacion}></span>
            </span>
            <span className={styles_header.header_available}>Disponible para trabajar</span>
          </article>
          <article className={styles_header.header_box_time}>
            <p className={styles_header.header_p_time}>Hora local (ARG)</p>
            <div className={styles_header.header_time}>
              <span className={styles_header.header_span_time}>{hora}</span>
            </div>
          </article>
        </div>
      </div>
    </header>
  );
}

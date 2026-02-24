import Link from 'next/link';
import styles from '../styles/sections/catalogo.module.scss';

interface IterCatalogoProps {
  catalogoPaginas: any[];
}


export default function IterCatalogo({catalogoPaginas}: IterCatalogoProps) {
  return (
    Array.isArray(catalogoPaginas) && catalogoPaginas.map((pagina) => (
      <Link href={`/paginas/${pagina.slug}`} key={pagina.id}>
        <article  data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" data-aos-once="false" id={pagina.id} className={styles.catalogo__productoBox}>
          <div className={styles.catalogo__ventanaImagenes}> 
              <div className={styles.catalogo__flexImagenes}>
                <img
                  className={styles.catalogo__productoImg}
                  src={pagina.imagen}
                  alt={`Imagen de ${pagina.nombre}`}
                />
              </div>
            </div>
          <div className={styles.catalogo__infoBox}>
            <header className={styles.catalogo__header}>
              <h4 className={styles.catalogo__h4}>{pagina.nombre}</h4>
              <span className={styles.catalogo__tipo}>{pagina.tipo_pagina}</span>
            </header>
            <span className={styles.catalogo__spanPrecio}>
              <span className={styles.centavos}>,{pagina.precio}</span>
            </span>
          </div>
        </article>
      </Link>
    ))
  );
}
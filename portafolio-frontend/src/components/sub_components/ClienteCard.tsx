"use client";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { ClientesType } from "@/types/clientes";
import styles from "@/styles/sections/clientes.module.scss";
import { ImagenComponent } from "./ImagenM";
import Link from "next/link";

export const ClienteCard = ({ cli }: { cli: ClientesType }) => {
  return (
    <article className={styles.clientes_card}>
      <div className={styles.clientes_header}>
        <div className={styles.clientes_user}>
          <div className={styles.clientes_avatar}>
            <ImagenComponent 
                style={styles.avatar_img}
                url={`/img/Logotipo_Portafolio_PDC/${cli?.nombre_archivo}/${cli?.nombre_imagen}.${cli?.formato_imagen}`}
                alt={cli?.nombre_cliente}
                widthE={50}
                heightE={50}
                priority=""
            />
          </div>
          <div className={styles.clientes_info}>
            <h3 className={styles.clientes_h3}>{cli.nombre_cliente}</h3>
            <span className={styles.clientes_span}>{cli.ubicacion_cliente}</span>
          </div>
        </div>
        <Link 
          href={"https://www.instagram.com/paginasweb.chavez/"} 
          target="_blank" 
          className={styles.clientes_btn} 
          aria-label={`${cli.nombre_cliente} en Instagram`}
        >
          <FaInstagram />
        </Link>
      </div>
      <div className={styles.clientes_body}>
        <p className={styles.clientes_parrafo}>{cli.opinion_cliente}</p>
      </div>
    </article>
  );
}
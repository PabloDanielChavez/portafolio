"use client";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { ClientesType } from "@/types/clientes";
import style from "@/styles/sections/clientes.module.scss";
import { ImagenComponent } from "./ImagenM";
import Link from "next/link";

export const ClienteCard = ({ cli }: { cli: ClientesType }) => (
  <article className={style.clientes_card}>
    <div className={style.clientes_card_header}>
      <div className={style.clientes_card_user}>
        <div className={style.clientes_card_avatar}>
          <ImagenComponent 
              style={style.avatar_img}
              url={`/img/Logotipo_Portafolio_PDC/${cli?.nombre_archivo}/${cli?.nombre_imagen}.${cli?.formato_imagen}`}
              alt={cli?.nombre_cliente}
              widthE={50}
              heightE={50}
              priority=""
          />
        </div>
        <div className={style.clientes_card_info}>
          <h3>{cli.nombre_cliente}</h3>
          <span>{cli.ubicacion_cliente}</span>
        </div>
      </div>
      <Link href={"https://www.instagram.com/paginasweb.chavez/"} target="_blank" className={style.clientes_card_btn}>
        <FaInstagram />
      </Link>
    </div>
    <div className={style.clientes_card_body}>
      <p>{cli.opinion_cliente}</p>
    </div>
  </article>
);
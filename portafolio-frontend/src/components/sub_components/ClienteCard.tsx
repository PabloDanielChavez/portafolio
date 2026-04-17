// Componente interno para la Tarjeta
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { ClientesType } from "@/types/clientes";
import style from "@/styles/sections/clientes.module.scss";

export const ClienteCard = ({ cli }: { cli: ClientesType }) => (
  <article className={style.clientes_card}>
    <div className={style.clientes_card_header}>
      <div className={style.clientes_card_user}>
        <div className={style.clientes_card_avatar}>
          <Image 
            src={`/img/Logotipo_Portafolio_PDC/${cli?.nombre_archivo}/${cli?.nombre_imagen}.${cli?.formato_imagen}`}
            alt={cli?.nombre_cliente}
            width={50}
            height={50}
            className={style.avatar_img}
          />
        </div>
        <div className={style.clientes_card_info}>
          <h3>{cli.nombre_cliente}</h3>
          <span>{cli.ubicacion_cliente}</span>
        </div>
      </div>
      <a href={"#"/*cli.enlace_instagram*/} target="_blank" className={style.clientes_card_btn}>
        <FaInstagram />
      </a>
    </div>
    <div className={style.clientes_card_body}>
      <p>{cli.opinion_cliente}</p>
    </div>
  </article>
);
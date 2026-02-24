
"use client";
import styles from '../styles/sections/bienvenida.module.scss';
// import stylesGlobal from '../styles/base/global.module.scss';

// export default function Bienvenida() {
//   return (
//     <main className={styles.bienvenida}>
//       <div className={styles.bienvenida__principalBox} id="bienvenida__principalBox">
//         <div className={styles.bienvenida__borderPrincipal}>
//           <div className={styles.bienvenida__fotoperfilBorde}>
//             <div className={styles.bienvenida__fotoperfilPrincipal}></div>
//           </div>
//           <div className={styles.bienvenida__tituloBienvenida}>
//             <h3 className={styles.bienvenida__nombreH2}>Pablo Daniel Chavez<span className={styles.bienvenida__ocupacion}>Desarrollador Web Full Stack</span></h3>
//           </div>
//           <form className={styles.bienvenida__formulario} id="formulario">
//             <div className={styles.bienvenida__boxForm}>
//               <input className={styles.bienvenida__inputForm} id="input__nombre" type="text" placeholder="Nombre"/>
//             </div>
//             <div className={styles.bienvenida__boxForm}>
//               <input className={styles.bienvenida__inputForm} id="input__correo" type="email" placeholder="Correo"/>
//             </div>
//             <div className={styles.bienvenida__boxForm}>
//               <textarea className={styles.bienvenida__textareaForm} id="input__asunto" name="asunto" placeholder="Asunto"></textarea>
//             </div>
//             <button className={styles.bienvenida__contacto} id="btnEnviar" type="submit">Enviar</button>
//           </form>
//           <button className={styles.bienvenida__contacto} id="btnContacto" type="submit">Contactar</button>
//           <nav className={styles.bienvenida__navegacion}>
//             <a className={styles.bienvenida__linkBienvenida} id="link__instagram" href="https://www.instagram.com/Pablo_grid/">
//               <picture>
//                 <source srcSet="img/iconos/icono-instagram-white.avif" type="image/avif"/>
//                 <source srcSet="img/iconos/icono-instagram-white.webp" type="image/webp"/>
//                 <source srcSet="img/iconos/icono-instagram-white.jpg" type="image/jpg"/>
//                 <img
//                   className={styles.bienvenida__redsocialImg}
//                   loading="lazy"
//                   decoding="async"
//                   src="/img/iconos/icono-instagram-white.jpg"
//                   alt="icono instagram white"
//                 />
//               </picture>
//             </a>
//             <a className={styles.bienvenida__linkBienvenida} id="link__whatsapp" href="https://wa.me/5491125457659">
//               <picture>
//                 <source srcSet="img/iconos/icono-whatsapp-white.avif" type="image/avif"/>
//                 <source srcSet="img/iconos/icono-whatsapp-white.webp" type="image/webp"/>
//                 <source srcSet="img/iconos/icono-whatsapp-white.jpg" type="image/jpg"/>
//                 <img
//                   className={styles.bienvenida__redsocialImg}
//                   loading="lazy"
//                   decoding="async"
//                   src="/img/iconos/icono-whatsapp-white.jpg"
//                   alt="icono whatsapp white"
//                 />
//               </picture>
//             </a>
//             <a className={styles.bienvenida__linkBienvenida} id="link__youtube" href="https://www.youtube.com/channel/UCDKL4JLgdmVmmBAJPRGx0Eg/featured">
//               <picture>
//                 <source srcSet="img/iconos/icono-youtube-white.avif" type="image/avif"/>
//                 <source srcSet="img/iconos/icono-youtube-white.webp" type="image/webp"/>
//                 <source srcSet="img/iconos/icono-youtube-white.jpg" type="image/jpg"/>
//                 <img
//                   className={styles.bienvenida__redsocialImg}
//                   loading="lazy"
//                   decoding="async"
//                   src="/img/iconos/icono-youtube-white.jpg"
//                   alt="icono youtube white"
//                 />
//               </picture>
//             </a>
//           </nav>
//         </div>
//       </div>
//     </main>
//   );
// }
export default function Bienvenida() {
  return (
    <main className={styles.bienvenida}>
      <div className={styles.bienvenida__principalBox} id="bienvenida__principalBox">
        <h2 className={styles.bienvenida__H2}>Creamos páginas web pensadas para generar resultados reales. No se trata solo de “estar en internet”, sino de tener una herramienta digital que represente tu marca, transmita profesionalismo y acompañe el crecimiento de tu negocio.</h2>
        <p className={styles.bienvenida__Parrafo}>Diseño personalizado según el impacto que quieras generar</p>
      </div>
    </main>
  );
}

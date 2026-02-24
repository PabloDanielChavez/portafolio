"use client";
import styles from '../styles/sections/footer.module.scss';
import stylesGlobal from '../styles/base/global.module.scss';

export default function Footer() {
  return (
    <section id="footerSeccion" className={styles.footer}>
      <div className={styles.footer__grid}>
        <h1 id="footer" className={styles.footer__H1}>
          U<span className={stylesGlobal.colorUno}>MAMI</span>
        </h1>
        <article className={stylesGlobal.redes}>
          <a href="#" className={stylesGlobal.redes__boxRedSocial}>
            <span className="fa fa-whatsapp" />
          </a>
          <a href="#" className={stylesGlobal.redes__boxRedSocial}>
            <span className="fa fa-twitter" />
          </a>
          <a href="#" className={stylesGlobal.redes__boxRedSocial}>
            <span className="fa fa-github" />
          </a>
          <a href="#" className={stylesGlobal.redes__boxRedSocial}>
            <span className="fa fa-linkedin" />
          </a>
        </article>
        <p className={stylesGlobal.Copyright}>
          Copyright &copy;{' '}
          <a
            href="https://portafolio-pdc.netlify.app/"
            className={stylesGlobal.aCopy}
            target="_blank"
            rel="noopener noreferrer"
          >
            Portafolio-pdc.netlify.app
          </a>{' '}
          2025. Todos los derechos reservados.
        </p>
      </div>
    </section>
  );
}

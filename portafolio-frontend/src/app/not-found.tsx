import Link from "next/link";

import styles from "@/styles/sections/notFound.module.scss";

const usefulLinks = [
  { href: "/", label: "Volver al inicio" },
  { href: "/trabajos", label: "Ver trabajos" },
  { href: "/servicios", label: "Ver servicios" },
  { href: "/contacto", label: "Hablemos" },
] as const;

export default function NotFound() {
  return (
    <section
      className={styles.notFound}
      aria-labelledby="not-found-title"
    >
      <div className={styles.notFound_layout}>
        <div className={styles.notFound_card}>
          <span className={styles.notFound_code} aria-hidden="true">
            404
          </span>
          <h1 id="not-found-title" className={styles.notFound_title}>
            Esta página no está disponible
          </h1>
          <p className={styles.notFound_description}>
            Es posible que la dirección sea incorrecta o que el contenido haya
            sido movido. Podés continuar desde alguna de estas secciones.
          </p>
          <nav
            className={styles.notFound_actions}
            aria-label="Opciones para continuar navegando"
          >
            <Link
              href={usefulLinks[0].href}
              className={styles.notFound_primaryLink}
            >
              {usefulLinks[0].label}
            </Link>
            <div className={styles.notFound_enlacesSecundarios}>
              {usefulLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.notFound_link}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

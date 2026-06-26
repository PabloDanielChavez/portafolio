import styles from "@/styles/sections/loading.module.scss";

export default function Loading() {
  return (
    <section
      className={styles.loading}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.loading_card}>
        <div className={styles.loading_spinner} aria-hidden="true" />

        <div className={styles.loading_content}>
          <p className={styles.loading_label}>PaginasWebChavez</p>
          <h2 className={styles.loading_title}>Cargando experiencia web</h2>
          <span className={styles.loading_text}>
            Preparando contenido optimizado
          </span>
        </div>
        <div className={styles.loading_bar} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
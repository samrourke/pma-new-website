import styles from "./Contact.module.css";
import Header from "../../Header/Header";

export default function Contact() {
  return (
    <section className={styles.cta} data-nav-theme="dark">
      <Header
        title="Launching a project?"
        textColor="var(--london)"
        align="flex-start"
        number="04"
        paddingT={0}
        textAlign="left"
      />
      <div className={styles.inner}>
        <div className={styles.text}>
          {" "}
          <h2 className={styles.title}>
            Get in touch. <span>&rarr;</span>
          </h2>
          <p className={styles.sub}>
            PMA works across press, creative and post production for film and
            television campaigns worldwide.
          </p>
        </div>
        <div className={styles.email}>
          <a href="mailto:info@pmafilmtv.com" className={styles.link}>
            info@pmafilmtv.com
          </a>
        </div>
      </div>
    </section>
  );
}

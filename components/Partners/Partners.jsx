import styles from "./Partners.module.css";
import Image from "next/image";
import Header from "../Header/Header";

import { partners } from "@/data/partners";

export default function Partners() {
  return (
    <section className={styles.partners} data-nav-theme="light">
      <Header
        textColor="var(--offWhite)"
        number="03"
        align="center"
        title="who we work with"
        textAlign="center"
      />

      <div className={styles.description}>
        <p className={styles.copy}>
          We're proud to be partners with some of the largest film and tv
          studios around the world.
        </p>
      </div>

      <div className={styles.logoGrid}>
        {partners.map((logo, i) => (
          <img key={i} src={logo} className={styles.logo} />
        ))}
      </div>
    </section>
  );
}

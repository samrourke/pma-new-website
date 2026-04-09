import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/images/pma-white.png"
          width={446}
          height={176}
          alt="PMA Logo"
        />
        <div className={styles.tag}>
          <h1 className={styles.tagline}>
            <span>Core Values</span>
            <span>Branded Content</span>
            <span>Growing Audiences.</span>
          </h1>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.locations}>
          <div className={styles.location}>
            <h3>LONDON</h3>
            <p>22-24 Ely Place</p>
            <p>3rd Floor</p>
            <p>London</p>
            <p>EC1N 6TE</p>
          </div>
          <div className={styles.location}>
            <h3>PARIS</h3>
            <p>38 Rue Charlot</p>
            <p>75003</p>
            <p>Paris</p>
            <p>France</p>
          </div>
        </div>
        <div className={styles.socialDiv}>
          <a
            className={styles.socialLink}
            href="https://vimeo.com/pmafilmtv"
            target="_blank"
            rel="noreferrer"
          >
            <img className={styles.socialImg} src="/images/socials/vimeo.png" />
          </a>

          <a
            className={styles.socialLink}
            href="https://www.instagram.com/pmafilms/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={styles.socialImg} src="/images/socials/insta.png" />
          </a>
          <a
            className={styles.socialLink}
            href="https://uk.linkedin.com/company/pma-film-television"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={styles.socialImg}
              src="/images/socials/linkedIn.png"
            />
          </a>
        </div>
      </div>
      <div className={styles.bottomMeta}>
        <div className={styles.legal}>
          <Link href="/privacy-policy" className={styles.legalLink}>
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className={styles.legalLink}>
            Cookie Policy
          </Link>
        </div>
        <p className={styles.meta}>© PMA Film & TV</p>
      </div>
    </footer>
  );
}

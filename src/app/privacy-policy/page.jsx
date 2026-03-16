import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Privacy Policy | PMA Film & TV",
  description: "Privacy policy for PMA Film & TV.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Legal</p>

        <h1 className={styles.title}>Privacy Policy</h1>

        <section className={styles.section}>
          <h2>Who we are</h2>
          <p>
            We are PMA Production Services Limited and our website address is:
            https://pmafilmtv.com.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What personal data we collect and why we collect it</h2>

          <div className={styles.subSection}>
            <h3>Cookies</h3>
            <p>
              For information on what cookies we use and to control your consent
              please see our{" "}
              <Link href="/cookie-policy" className={styles.link}>
                cookie policy
              </Link>
              .
            </p>
          </div>

          <div className={styles.subSection}>
            <h3>Embedded content from other websites</h3>
            <p>
              Pages on this site may include embedded content (e.g. videos,
              images, etc.). Embedded content from other websites behaves in the
              exact same way as if the visitor has visited the other website.
            </p>
            <p>
              These websites may collect data about you, use cookies, embed
              additional third-party tracking, and monitor your interaction with
              that embedded content, including tracking your interaction with
              that embedded content if you have an account and are logged in to
              that website.
            </p>
          </div>

          <div className={styles.subSection}>
            <h3>Analytics</h3>
            <p>
              We do not collect analytic or tracking data on visitors to our
              website.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Who we share your data with</h2>
          <p>
            We use Vimeo to host embedded videos on our website. When you press
            play Vimeo will drop third party cookies to enable the the video to
            play and to collect analytics data such as how long a viewer has
            watched the video. These cookies do not track individuals. For more
            information please see{" "}
            <a
              href="https://vimeo.com/privacy"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              Vimeo’s privacy policy
            </a>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2>How long we retain your data</h2>
          <p>
            We do not retain any data on visitors to our website. For more
            information on cookies our website stores in your browsers, see our{" "}
            <Link href="/cookie-policy" className={styles.link}>
              cookie policy
            </Link>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2>What rights you have over your data</h2>
          <p>
            If you have an account on this site, you can request to receive an
            exported file of the personal data we hold about you, including any
            data you have provided to us. You can also request that we erase any
            personal data we hold about you. This does not include any data we
            are obliged to keep for administrative, legal, or security purposes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Our contact information</h2>

          <div className={styles.contactBlock}>
            <a href="mailto:info@pmafilmtv.com" className={styles.link}>
              info@pmafilmtv.com
            </a>
            <a href="tel:+442074944433" className={styles.link}>
              +44 (0) 207 494 4433
            </a>
          </div>

          <address className={styles.address}>
            <span>PMA Production Services Ltd.</span>
            <span>22-24 Ely Place</span>
            <span>3rd Floor</span>
            <span>London</span>
            <span>EC1N 6TE</span>
            <span>United Kingdom</span>
          </address>
        </section>
      </div>
    </main>
  );
}

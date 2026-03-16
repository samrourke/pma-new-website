import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../../components/Header/Header";

const offices = [
  {
    city: "London",
    label: "United Kingdom",
    address: ["22–24 Ely Place", "3rd Floor", "London", "EC1N 6TE"],
    email: "info@pmafilmtv.com",
    titleId: "styles.london",

    mapImage: "/images/contact/london-map.png",
    mapsUrl: "https://maps.google.com/?q=22-24+Ely+Place+London+EC1N+6TE",
    theme: "london",
  },
  {
    city: "Paris",
    label: "France",
    address: ["38 Rue Charlot", "75003", "Paris", "France"],
    email: "info@pmafilmtv.com",

    mapImage: "/images/contact/paris-map.png",
    mapsUrl: "https://maps.google.com/?q=38+Rue+Charlot+75003+Paris",
    theme: "paris",
  },
];

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Header
          title="Get In Touch"
          textColor="var(--ink)"
          align="flex-start"
          paddingT={0}
          textAlign="left"
        />
        {/* <p className={styles.eyebrow}>Contact</p>
        <h1 className={styles.title}>Get in touch</h1> */}
        <p className={styles.intro}>
          For press, junkets, screenings, Q&amp;As and behind-the-scenes
          production enquiries, contact our London or Paris office.
        </p>
        <div className={styles.email}>
          <a href="mailto:info@pmafilmtv.com" className={styles.emailLink}>
            info@pmafilmtv.com
          </a>
        </div>
      </section>

      <section className={styles.offices}>
        {offices.map((office) => (
          <article
            key={office.city}
            className={`${styles.officeCard} ${styles[office.theme]}`}
          >
            <div className={styles.officeCopy}>
              <div className={styles.officeMeta}>
                <p className={styles.officeLabel}>{office.label}</p>
                <h2 id={`${styles[office.theme]}`}>{office.city}</h2>
              </div>

              <address className={styles.address}>
                {office.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>

              <div className={styles.links}>
                <a href={`mailto:${office.email}`} className={styles.link}>
                  {office.email}
                </a>
                <a href={`tel:${office.phone}`} className={styles.link}>
                  {office.phone}
                </a>
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkSecondary}
                >
                  Open in Maps
                </a>
              </div>
            </div>

            <div className={styles.mapWrap}>
              <a href={office.mapsUrl} target="_blank" rel="noreferrer">
                <img src={office.mapImage} alt={`${office.city} office map`} />
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

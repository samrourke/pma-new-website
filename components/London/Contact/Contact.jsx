import styles from "./Contact.module.css";
import Header from "../../Header/Header";

const contactRoutes = [
  {
    label: "General",
    email: "info@pmafilmtv.com",
    description: "General enquiries and new business",
  },
  {
    label: "Junkets",
    email: "junkets@pmafilmtv.com",
    description: "Press junkets and publicity bookings",
  },
  {
    label: "Production",
    email: "production@pmafilmtv.com",
    description: "Creative production enquiries",
  },
  {
    label: "Post",
    email: "post@pmafilmtv.com",
    description: "Post production and delivery enquiries",
  },
  {
    label: "Paris",
    email: "paris-email@pmafilmtv.com",
    description: "For all enquiries for our Paris office.",
  },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.contact} data-nav-theme="dark">
      <Header
        title="Get In Touch"
        textColor="var(--london)"
        align="flex-start"
        number="04"
        paddingT={0}
        textAlign="left"
      />

      <div className={styles.inner}>
        <div className={styles.intro}>
          {/* <p className={styles.kicker}>London</p> */}

          <p className={styles.copy}>
            PMA works across creative, publicity and post production for film
            and television campaigns worldwide.
          </p>

          <p className={styles.copy}>
            We are always excited to work with new people so if you're launching
            a campaign, let's talk.
          </p>
        </div>

        <div className={styles.routes}>
          {contactRoutes.map((route) => (
            <div key={route.email} className={styles.route}>
              <div className={styles.routeMeta}>
                <p className={styles.routeLabel}>{route.label}</p>
                <p className={styles.routeDescription}>{route.description}</p>
              </div>

              <a href={`mailto:${route.email}`} className={styles.link}>
                {route.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

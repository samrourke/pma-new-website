import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Cookie Policy | PMA Film & TV",
  description: "Cookie policy for PMA Film & TV.",
};

const cookieGroups = [
  {
    title: "Necessary",
    description:
      "Necessary cookies are absolutely essential for the website to function properly. These cookies ensure basic functionalities and security features of the website, anonymously.",
    cookies: [
      {
        name: "cookielawinfo-checkbox-advertisement",
        duration: "1 year",
        description:
          'Records the user consent for cookies in the "Advertisement" category.',
      },
      {
        name: "cookielawinfo-checkbox-others",
        duration: "1 year",
        description:
          'Stores the user consent for cookies in the "Others" category.',
      },
      {
        name: "cookielawinfo-checkbox-necessary",
        duration: "1 year",
        description:
          'Stores the user consent for cookies in the "Necessary" category.',
      },
      {
        name: "cookielawinfo-checkbox-performance",
        duration: "1 year",
        description:
          'Stores the user consent for cookies in the "Performance" category.',
      },
      {
        name: "cookielawinfo-checkbox-analytics",
        duration: "1 year",
        description:
          'Stores the user consent for cookies in the "Analytics" category.',
      },
    ],
  },
  {
    title: "Functional",
    description:
      "Functional cookies help perform certain functionalities, including embedded third-party features such as video playback.",
    cookies: [
      {
        name: "aka_debug",
        duration: "Session",
        description:
          "Set by Vimeo and used in connection with video playback functionality.",
      },
    ],
  },
  {
    title: "Analytics",
    description:
      "Analytical cookies are used to understand how visitors interact with the website, including metrics such as visitor numbers, traffic source and site usage.",
    cookies: [
      {
        name: "vuid",
        duration: "2 years",
        description:
          "Owned by Vimeo and used to collect tracking information for embedded videos.",
      },
      {
        name: "_ga_KNRPSXM5F2",
        duration: "2 years",
        description: "Installed by Google Analytics.",
      },
      {
        name: "_ga",
        duration: "2 years",
        description:
          "Used by Google Analytics to calculate visitor, session and campaign data for analytics reporting.",
      },
    ],
  },
  {
    title: "Others",
    description:
      "Other uncategorized cookies are cookies that are being analyzed and have not yet been classified into a category.",
    cookies: [
      {
        name: "cookielawinfo-checkbox-functional",
        duration: "1 year",
        description:
          'Records the user consent for cookies in the "Functional" category.',
      },
    ],
  },
];

const domains = [
  "pmafilmtv.com",
  "pmafilmtv.co.uk",
  "pmafilmtv.fr",
  "pmaproduction.co.uk",
];

export default function CookiePolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Legal</p>

        <h1 className={styles.title}>Cookie Policy</h1>

        <section className={styles.section}>
          <h2>About this cookie policy</h2>
          <p>
            This Cookie Policy explains what cookies are and how we use them,
            the types of cookies we use, the information we collect using
            cookies and how that information is used, and how to control cookie
            preferences.
          </p>
          <p>
            For further information on how personal data is used, stored and
            kept secure, please see our{" "}
            <Link href="/privacy-policy" className={styles.link}>
              Privacy Policy
            </Link>
            .
          </p>
          <p>
            You can change or withdraw your consent at any time from the cookie
            declaration on the website.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Domains covered</h2>
          <ul className={styles.domainList}>
            {domains.map((domain) => (
              <li key={domain}>{domain}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when a
            website is loaded in your browser. They help websites function
            properly, improve security, support user experience, and help site
            owners understand how the website performs.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How do we use cookies?</h2>
          <p>
            The site uses both first-party and third-party cookies for several
            purposes. First-party cookies are generally necessary for the site
            to function and do not collect personally identifiable data.
          </p>
          <p>
            Third-party cookies may be used to understand website performance,
            support embedded services, improve user experience and speed up
            future interactions with the site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What types of cookies do we use?</h2>

          {cookieGroups.map((group) => (
            <div key={group.title} className={styles.group}>
              <div className={styles.groupHeader}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Duration</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.cookies.map((cookie) => (
                      <tr key={cookie.name}>
                        <td>{cookie.name}</td>
                        <td>{cookie.duration}</td>
                        <td>{cookie.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2>Managing cookie preferences</h2>
          <p>
            Users can control cookies through the site’s consent controls and
            can also block or delete cookies through their browser settings.
          </p>
          <p>
            To learn more about managing cookies in browsers, the current PMA
            page also points users to general cookie-information resources.
          </p>
        </section>
      </div>
    </main>
  );
}

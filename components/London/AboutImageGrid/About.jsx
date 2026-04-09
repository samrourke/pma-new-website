"use client";

import styles from "./About.module.css";
import Image from "next/image";
import Header from "../Header/Header";

const images = [
  {
    src: "/images/About/team-bridgetJones.jpeg",
    alt: "Behind the scenes 1",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-cupcakes.jpeg",
    alt: "Behind the scenes 2",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-hepburn.jpeg",
    alt: "Behind the scenes 3",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-junkets.jpeg",
    alt: "Behind the scenes 4",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-laptop.jpeg",
    alt: "Behind the scenes 5",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-office-group.jpeg",
    alt: "Behind the scenes 6",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-starwars.jpeg",
    alt: "Behind the scenes 7",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-trophy.jpeg",
    alt: "Behind the scenes 8",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-wicked-pair.jpeg",
    alt: "Behind the scenes 9",
    orientation: "landscape",
  },
];

export default function AboutUs() {
  return (
    <section className={styles.about} data-nav-theme="light">
      <div className={styles.headerWrap}>
        <Header
          title="About Us"
          textColor="var(--offWhite)"
          align="flex-start"
          number="01"
          paddingT={0}
          textAlign="left"
        />
      </div>
      <div className={styles.inner}>
        {/* LEFT TEXT SIDE */}
        <div className={styles.left}>
          <div className={styles.copy}>
            <p>
              PMA is a close-knit family of creatives bringing film and
              television campaigns to life{" "}
              <span className={styles.highlight}>from end to end</span>.
            </p>

            <p>
              From international press to premieres, post-production and digital
              content, we have shaped how stories connect with audiences beyond
              the screen for over twenty years.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE GRID */}
        <div className={styles.right}>
          <div className={styles.masonry}>
            {images.map((img, i) => (
              <div
                key={i}
                className={`${styles.item} ${styles[img.orientation]}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={600}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

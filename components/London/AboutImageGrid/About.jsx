"use client";

import styles from "./About.module.css";
import Image from "next/image";
import Header from "../Header/Header";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const column1 = [
  {
    src: "/images/About/team-bridgetJones.jpeg",
    alt: "Behind the scenes 1",
    orientation: "landscape",
    mobile: true,
  },
  {
    src: "/images/About/team-cupcakes.jpeg",
    alt: "Behind the scenes 2",
    orientation: "portrait",
    mobile: false,
  },
  {
    src: "/images/About/team-hepburn.jpeg",
    alt: "Behind the scenes 3",
    orientation: "portrait",
    mobile: false,
  },
];
const column2 = [
  {
    src: "/images/About/team-junkets.jpeg",
    alt: "Behind the scenes 4",
    orientation: "landscape",
    mobile: true,
  },
  {
    src: "/images/About/team-laptop.jpeg",
    alt: "Behind the scenes 5",
    orientation: "portrait",
    mobile: false,
  },
];
const column3 = [
  {
    src: "/images/About/team-office-group.jpeg",
    alt: "Behind the scenes 6",
    orientation: "landscape",
    mobile: true,
  },
  {
    src: "/images/About/team-starwars.jpeg",
    alt: "Behind the scenes 7",
    orientation: "landscape",
    mobile: false,
  },
  {
    src: "/images/About/team-trophy.jpeg",
    alt: "Behind the scenes 8",
    orientation: "landscape",
    mobile: true,
  },
  {
    src: "/images/About/team-wicked-pair.jpeg",
    alt: "Behind the scenes 9",
    orientation: "landscape",
    mobile: false,
  },
];

const mobileImages = [column1[0], column2[0], column3[0], column3[2]];

export default function AboutUs() {
  const masonryRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = masonryRef.current.querySelectorAll(`.${styles.item}`);

      const columns = masonryRef.current.querySelectorAll(`.${styles.column}`);

      console.log("mobile images " + mobileImages);

      gsap.to(columns[0], {
        y: -40,
        scrollTrigger: {
          trigger: masonryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(columns[2], {
        y: 30,
        scrollTrigger: {
          trigger: masonryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(mobileImages[0], {
        y: 30,
        scrollTrigger: {
          trigger: masonryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(mobileImages[2], {
        y: 30,
        scrollTrigger: {
          trigger: masonryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(items, {
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: masonryRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, masonryRef);

    return () => ctx.revert();
  }, [isMobile]);

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
          <div className={styles.masonry} ref={masonryRef}>
            {!isMobile ? (
              <>
                <div className={styles.column}>
                  {column1.map((img, i) => (
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

                <div className={styles.column}>
                  {column2.map((img, i) => (
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

                <div className={styles.column}>
                  {column3.map((img, i) => (
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
              </>
            ) : (
              <div className={styles.imageStrip}>
                {/* <figure className={`${styles.imageCard} ${styles.imageLeft}`}>
                  <div className={styles.imageInner}>
                    <img
                      src="/images/About/team-junkets.jpeg"
                      alt="PMA team working on set"
                      className={styles.image}
                    />
                  </div>
                </figure> */}

                <figure className={`${styles.imageCard} ${styles.imageCenter}`}>
                  <div className={styles.imageInner}>
                    <img
                      src="/images/About/team-office-group.jpeg"
                      alt="PMA team in the office"
                      className={styles.image}
                    />
                  </div>
                </figure>

                {/* <figure className={`${styles.imageCard} ${styles.imageRight}`}>
                  <div className={styles.imageInner}>
                    <img
                      src="/images/About/team-wicked-pair.jpeg"
                      alt="PMA team at an event"
                      className={styles.image}
                    />
                  </div>
                </figure> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

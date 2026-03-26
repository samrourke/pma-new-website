"use client";

import { useLayoutEffect, useRef } from "react";
import styles from "./AboutUsStory.module.css";
import Header from "../../Header/Header";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsStory() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.imageCard}`);

      cards.forEach((card, i) => {
        const image = card.querySelector(`.${styles.image}`);
        if (!image) return;

        const offsets = [-40, -70, -28];
        const scales = [1.02, 1.03, 1.01];

        gsap.set(card, {
          y: 0,
          willChange: "transform",
          filter: "contrast(1.01) brightness(0.87) saturate(0.85)",
        });

        gsap.set(image, {
          scale: scales[i] || 1.08,
          willChange: "transform",
        });

        gsap.fromTo(
          card,
          {
            y: 0,
          },
          {
            y: offsets[i] || -24,
            filter: "contrast(1.09) brightness(0.9) saturate(0.92)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        gsap.to(image, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className={styles.about}
      data-nav-theme="dark"
      ref={sectionRef}
    >
      <div className={styles.headerWrap}>
        <Header
          title="Who We Are"
          textColor="var(--offWhite)"
          align="flex-start"
          number="01"
          paddingT={0}
          textAlign="left"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.imageStrip}>
          <figure className={`${styles.imageCard} ${styles.imageLeft}`}>
            <div className={styles.imageInner}>
              <img
                src="/images/About/team-junkets.jpeg"
                alt="PMA team working on set"
                className={styles.image}
              />
            </div>
          </figure>

          <figure className={`${styles.imageCard} ${styles.imageCenter}`}>
            <div className={styles.imageInner}>
              <img
                src="/images/About/team-office-group.jpeg"
                alt="PMA team in the office"
                className={styles.image}
              />
            </div>
          </figure>

          <figure className={`${styles.imageCard} ${styles.imageRight}`}>
            <div className={styles.imageInner}>
              <img
                src="/images/About/team-wicked-pair.jpeg"
                alt="PMA team at an event"
                className={styles.image}
              />
            </div>
          </figure>
        </div>

        <div className={styles.storyGrid}>
          <div className={styles.storyLabel}>
            <p>OUR STORY</p>
          </div>

          <div className={styles.storyTextWrap}>
            <h2 className={styles.statement}>
              PMA is a close-knit family of creatives who bring film and
              television campaigns to life.
            </h2>
            <h2 className={styles.statement}>
              From international press to premieres, post-production and digital
              content, we have shaped how stories connect with audiences beyond
              the screen for over twenty years.
            </h2>
          </div>
        </div>

        {/* <div className={styles.editorialGrid}>
          <figure
            className={`${styles.editorialCard} ${styles.editorialLandscape}`}
          >
            <img
              src="/images/About/team-bridgetJones.jpeg"
              alt="PMA team on set during a production"
              className={styles.editorialImage}
            />
          </figure>

          <figure
            className={`${styles.editorialCard} ${styles.editorialPortrait}`}
          >
            <img
              src="/images/About/team-cupcakes.jpeg"
              alt="PMA team members at a client event"
              className={styles.editorialImage}
            />
          </figure>
        </div> */}
      </div>
    </section>
  );
}

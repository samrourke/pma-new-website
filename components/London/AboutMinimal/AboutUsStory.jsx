"use client";

import { useLayoutEffect, useRef } from "react";
import styles from "./AboutUsStory.module.css";
import Header from "../../Header/Header";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const galleryImages = [
  { src: "/images/About/team-junkets.jpeg", alt: "PMA team working on set" },
  {
    src: "/images/About/team-office-group.jpeg",
    alt: "PMA team in the office",
  },

  {
    src: "/images/About/team-hepburn.jpeg",
    alt: "PMA dressed up as audrey hepbun",
  },
  {
    src: "/images/About/team-cupcakes.jpeg",
    alt: "PMA dressed up as audrey hepbun",
  },
  {
    src: "/images/About/team-starwars.jpeg",
    alt: "PMA team at a star wars event",
  },

  {
    src: "/images/About/team-wicked-pair.jpeg",
    alt: "PMA team at Wicked junket",
  },
  {
    src: "/images/About/team-bridgetJones.jpeg",
    alt: "PMA team on a Bridget Jones junket",
  },
];

export default function AboutUsStory() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const statementRefs = useRef([]);
  const splitInstances = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray(`.${styles.image}`, track);

      let xPercent = 0;

      // Default idle movement (leftward drift)
      const baseSpeed = 0.01;

      // Extra scroll-driven momentum. Positive = move right, negative = move left
      let scrollBoost = 0;

      let direction = -1; // -1 = left, 1 = right
      let speed = 0.01;

      gsap.set(images, {
        scale: 1.05,
        willChange: "transform",
      });

      const ticker = () => {
        xPercent += speed * direction;

        if (xPercent <= -50) xPercent += 50;
        if (xPercent > 0) xPercent -= 50;

        gsap.set(track, { xPercent });
      };

      gsap.ticker.add(ticker);

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          if (velocity < -80) direction = 1;
          if (velocity > 80) direction = -1;

          // Downward scroll gives negative boost (faster left)
          // Upward scroll gives positive boost (reverse right)
          scrollBoost = gsap.utils.clamp(-0.03, 0.03, -velocity * 0.00005);
        },
      });

      gsap.to(images, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      statementRefs.current.forEach((el) => {
        if (!el) return;

        const split = new SplitText(el, {
          type: "words,lines",
          linesClass: styles.splitLine,
        });

        splitInstances.current.push(split);

        gsap.set(split.words, {
          yPercent: 110,
          opacity: 0,
          willChange: "transform, opacity",
        });

        gsap.to(split.words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        });
      });

      return () => {
        gsap.ticker.remove(ticker);
      };
    }, section);

    return () => {
      splitInstances.current.forEach((split) => split.revert());
      splitInstances.current = [];
      ctx.revert();
    };
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
        <div className={styles.imageMarquee}>
          <div className={styles.imageTrack} ref={trackRef}>
            {[...galleryImages, ...galleryImages].map((image, i) => (
              <figure className={styles.imageCard} key={`${image.src}-${i}`}>
                <div className={styles.imageInner}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.image}
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className={styles.storyGrid}>
          <div className={styles.storyLabel}>
            <p>OUR STORY</p>
          </div>

          <div className={styles.storyTextWrap}>
            <h2
              className={styles.statement}
              ref={(el) => (statementRefs.current[0] = el)}
            >
              PMA is a close-knit family of creatives who bring film and
              television campaigns to life.
            </h2>

            <h2
              className={styles.statement}
              ref={(el) => (statementRefs.current[1] = el)}
            >
              From international press to premieres, post-production and digital
              content, we have shaped how stories connect with audiences beyond
              the screen for over twenty years.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

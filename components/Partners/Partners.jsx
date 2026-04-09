"use client";

import styles from "./Partners.module.css";
import Header from "../Header/Header";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { partners } from "@/data/partners";

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const sectionRef = useRef(null);
  const logoRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const logos = logoRefs.current.filter(Boolean);
      if (!logos.length) return;

      gsap.set(logos, {
        autoAlpha: 0,
      });

      const shuffled = [...logos].sort(() => Math.random() - 0.5);

      gsap.to(shuffled, {
        autoAlpha: 0.9,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.partners}
      data-nav-theme="light"
    >
      <Header
        textColor="var(--offWhite)"
        align="center"
        title="Our Partners"
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
          <img
            key={i}
            src={logo}
            className={styles.logo}
            alt=""
            ref={(el) => {
              logoRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}

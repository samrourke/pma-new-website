"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition() {
  const panelRef = useRef(null);
  const textRef = useRef(null);
  const identRef = useRef(null);

  useEffect(() => {
    const handleCitySwitch = (e) => {
      const { city } = e.detail || {};
      const text = textRef.current;

      text.textContent = city === "london" ? "LONDON" : "PARIS";

      const ident = identRef.current;

      ident.currentTime = 0.3;
      ident.pause();

      gsap.set(ident, {
        opacity: 0,
      });
      gsap.set(panelRef.current, {
        scaleX: 0,
        backgroundColor: city === "london" ? "var(--london)" : "var(--paris)",
        transformOrigin: "center left",
      });

      gsap.set(text, {
        opacity: 0,
        y: 20,
      });

      gsap
        .timeline()
        .to(ident, {
          opacity: 1,
        })
        .call(() => {
          ident.currentTime = 0.3;
          ident.play();
        })
        .to(panelRef.current, {
          scaleX: 1,
          ease: "circ.inOut",
          duration: 0.6,
          transformOrigin: "center left",
        })

        .to(text, {
          opacity: 1,
          y: 0,
        })

        .to(panelRef.current, {
          scaleX: 0,
          delay: 0.25,
          ease: "circ.inOut",
          duration: 0.6,
          transformOrigin: "center right",
        })
        .to(
          ident,
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.4",
        )
        .to(
          text,
          {
            opacity: 0,
            y: 20,

            ease: "circ.inOut",
          },
          "-=0.5",
        )
        .call(() => {
          ident.pause();
          ident.currentTime = 0.3;
        });
    };

    window.addEventListener("city-switch", handleCitySwitch);

    return () => window.removeEventListener("city-switch", handleCitySwitch);
  }, []);

  return (
    <>
      <div ref={panelRef} className={styles.transition}></div>
      <div className={styles.city}>
        <video
          ref={identRef}
          className={styles.ident}
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/video/logo/output-safari.mov"
            type='video/mp4; codecs="hvc1"'
          />
          <source src="/video/logo/output.webm" type="video/webm" />
        </video>

        <h1 ref={textRef} className={styles.cityText}></h1>
      </div>
    </>
  );
}

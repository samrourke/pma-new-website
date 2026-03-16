"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./PageTransition.module.css";
import { transitionStore } from "./transitionstore";

const CITY_COLORS = {
  london: "var(--london)",
  paris: "var(--paris)",
};

export default function PageTransition({ children }) {
  const overlayRef = useRef(null);
  const mediaRef = useRef(null);
  const coverRef = useRef(null);
  const logoRef = useRef(null);
  const cityRef = useRef(null);
  const videoStageRef = useRef(null);

  useEffect(() => {
    gsap.set(overlayRef.current, {
      autoAlpha: 0,
      pointerEvents: "none",
    });

    gsap.set(logoRef.current, {
      autoAlpha: 0,
      y: 20,
    });

    gsap.set(cityRef.current, {
      autoAlpha: 0,
      y: 12,
    });

    gsap.set(coverRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
  }, []);

  useEffect(() => {
    const handleStart = (e) => {
      document.body.style.pointerEvents = "none";
      const { city } = e.detail || {};
      const videoEl = transitionStore.activeVideoEl;

      if (
        !videoEl ||
        !videoStageRef.current ||
        !overlayRef.current ||
        !coverRef.current ||
        !logoRef.current ||
        !cityRef.current
      ) {
        return;
      }

      const rect = videoEl.getBoundingClientRect();

      gsap.set(overlayRef.current, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      // move the real video into the persistent stage
      videoStageRef.current.innerHTML = "";
      videoStageRef.current.appendChild(videoEl);

      gsap.set(videoEl, {
        position: "fixed",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        margin: 0,
        zIndex: 1,
        objectFit: "cover",
      });

      cityRef.current.textContent = city === "london" ? "London" : "Paris";

      // gsap.set(coverRef.current, {
      //   autoAlpha: 1,
      //   scaleX: 0,
      //   backgroundColor: city === "london" ? "var(--london)" : "var(--paris)",
      //   transformOrigin: "left center",
      // });

      gsap.set(logoRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(cityRef.current, { autoAlpha: 0, y: 12 });

      gsap
        .timeline()
        .to(
          videoEl,
          {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            duration: 0.6,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          logoRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
          },
          0.15,
        )
        .to(
          cityRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
          },
          0.2,
        )
        .to(
          coverRef.current,
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power3.inOut",
          },
          0.55,
        );
    };

    const handleReveal = () => {
      document.body.style.pointerEvents = "";
      if (
        !overlayRef.current ||
        !coverRef.current ||
        !logoRef.current ||
        !cityRef.current ||
        !mediaRef.current
      ) {
        return;
      }

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlayRef.current, {
              autoAlpha: 0,
              pointerEvents: "none",
            });

            if (mediaRef.current) {
              mediaRef.current.innerHTML = "";
            }
          },
        })
        .to(
          [logoRef.current, cityRef.current],
          {
            autoAlpha: 0,
            y: 12,
            duration: 0.25,
            stagger: 0.04,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          [coverRef.current, mediaRef.current],
          {
            autoAlpha: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          0.12,
        );
    };

    window.addEventListener("pma-transition-start", handleStart);
    window.addEventListener("pma-transition-reveal", handleReveal);

    return () => {
      window.removeEventListener("pma-transition-start", handleStart);
      window.removeEventListener("pma-transition-reveal", handleReveal);
    };
  }, []);

  return (
    <>
      <div ref={overlayRef} className={styles.transitionOverlay}>
        <div ref={videoStageRef} className={styles.videoStage} />
        <div ref={mediaRef} className={styles.transitionMedia} />
        <div ref={coverRef} className={styles.transitionCover} />

        <div className={styles.logoOverlay}>
          <Image
            ref={logoRef}
            className={styles.logoText}
            height={177}
            width={446}
            src="/images/pma-white.png"
            alt="PMA"
            priority
          />
          <div ref={cityRef} className={styles.cityText} />
        </div>
      </div>
      {children}
    </>
  );
}

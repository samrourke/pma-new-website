"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

export default function PageTransition() {
  const panelRef = useRef(null);
  const textRef = useRef(null);
  const identRef = useRef(null);

  const tlRef = useRef(null);
  const isReadyRef = useRef(false);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const ident = identRef.current;

    if (!ident) return;

    const warmVideo = async () => {
      try {
        // Force browser to begin buffering
        ident.load();

        // Wait until enough data is buffered
        await new Promise((resolve) => {
          if (ident.readyState >= 4) {
            resolve();
            return;
          }

          ident.addEventListener("canplaythrough", resolve, {
            once: true,
          });
        });

        // Seek to first usable frame
        ident.currentTime = 0.3;

        // Warm decoder
        const playPromise = ident.play();

        if (playPromise !== undefined) {
          await playPromise;
        }

        ident.pause();
        ident.currentTime = 0.3;

        isReadyRef.current = true;
      } catch (err) {
        console.error("Video warmup failed:", err);
      }
    };

    warmVideo();
  }, []);

  useEffect(() => {
    const handleCitySwitch = async (e) => {
      if (isAnimatingRef.current) return;

      const ident = identRef.current;
      const panel = panelRef.current;
      const text = textRef.current;

      if (!ident || !panel || !text) return;

      const { city } = e.detail || {};

      isAnimatingRef.current = true;

      // Wait briefly if video still loading
      if (!isReadyRef.current) {
        await new Promise((resolve) => {
          const check = () => {
            if (isReadyRef.current) {
              resolve();
            } else {
              requestAnimationFrame(check);
            }
          };

          check();
        });
      }

      text.textContent = city === "london" ? "LONDON" : "PARIS";

      // Kill previous timeline safely
      tlRef.current?.kill();

      ident.pause();

      // Ensure frame is available
      try {
        ident.currentTime = 0.3;
      } catch (err) {
        console.error("Seek failed:", err);
      }

      gsap.set(ident, {
        opacity: 0,
      });

      gsap.set(panel, {
        scaleX: 0,
        backgroundColor: city === "london" ? "var(--london)" : "var(--paris)",
        transformOrigin: "center left",
      });

      gsap.set(text, {
        opacity: 0,
        y: 20,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          ident.pause();
          ident.currentTime = 0.3;
          isAnimatingRef.current = false;
        },
      });

      tlRef.current = tl;

      tl.to(ident, {
        opacity: 1,
        duration: 0.15,
      })

        .call(async () => {
          try {
            ident.currentTime = 0.3;

            const playPromise = ident.play();

            if (playPromise !== undefined) {
              await playPromise;
            }
          } catch (err) {
            console.error("Playback failed:", err);
          }
        })

        .to(panel, {
          scaleX: 1,
          ease: "circ.inOut",
          duration: 0.6,
          transformOrigin: "center left",
        })

        .to(text, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        })

        .to(panel, {
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
            duration: 0.3,
          },
          "-=0.5",
        );
    };

    window.addEventListener("city-switch", handleCitySwitch);

    return () => {
      window.removeEventListener("city-switch", handleCitySwitch);

      tlRef.current?.kill();
    };
  }, []);

  return (
    <>
      <div ref={panelRef} className={styles.transition} />

      <div className={styles.city}>
        <video
          ref={identRef}
          className={styles.ident}
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/video/logo/transition.mov"
            type='video/quicktime; codecs="hvc1"'
          />

          <source src="/video/logo/transition.webm" type="video/webm" />
        </video>

        <h1 ref={textRef} className={styles.cityText} />
      </div>
    </>
  );
}

"use client";

import styles from "./page.module.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { transitionStore } from "../../../components/PageTransition/transitionstore";

export default function London() {
  const heroMediaSlotRef = useRef(null);
  const heroContentRef = useRef(null);

  useLayoutEffect(() => {
    const adoptedVideo = transitionStore.activeVideoEl;
    const heroSlot = heroMediaSlotRef.current;
    const heroContent = heroContentRef.current;

    if (!heroSlot || !heroContent) return;

    const applyVideoStyles = (videoEl) => {
      gsap.set(videoEl, {
        clearProps: "all",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
        inset: 0,
      });
    };

    const createFallbackVideo = () => {
      const video = document.createElement("video");
      video.className = styles.heroVideo;
      video.src = "/video/clip_04.mp4";
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      return video;
    };

    heroSlot.innerHTML = "";

    let videoToUse = null;

    if (adoptedVideo && adoptedVideo.tagName === "VIDEO") {
      const adoptedSrc = adoptedVideo.currentSrc || adoptedVideo.src;

      if (adoptedSrc) {
        videoToUse = adoptedVideo;
      }
    }

    if (!videoToUse) {
      videoToUse = createFallbackVideo();
    }

    heroSlot.appendChild(videoToUse);
    applyVideoStyles(videoToUse);

    const playPromise = videoToUse.play?.();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // autoplay may be blocked briefly, but muted video should usually recover
      });
    }

    gsap.set(heroContent, {
      autoAlpha: 0,
      y: 24,
    });

    gsap
      .timeline()
      .to(heroContent, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .call(
        () => {
          window.dispatchEvent(new CustomEvent("pma-transition-reveal"));
        },
        null,
        0.12,
      );

    return () => {
      transitionStore.activeVideoEl = null;
      transitionStore.city = null;
    };
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.london}>
        <section className={styles.hero} data-nav-theme="light">
          <div ref={heroMediaSlotRef} className={styles.heroMediaSlot} />

          <div className={styles.heroOverlay} />

          <div ref={heroContentRef} className={styles.heroContent}>
            <div className={styles.heroTop}>
              <Link href="/">
                <Image
                  className={styles.logo}
                  height={177}
                  width={446}
                  src="/images/pma-white.png"
                  alt="PMA"
                  priority
                />
              </Link>
              <span className={styles.officeTag}>London</span>
            </div>

            <div className={styles.heroBottom}>
              <h1 className={styles.heroText}>
                valeurs fondamentales
                <br />
                contenu de marque
                <br />
                <span className={styles.hl}>audiences croissantes</span>
              </h1>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

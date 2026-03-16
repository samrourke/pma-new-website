"use client";

import styles from "./page.module.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { transitionStore } from "../../../components/PageTransition/transitionstore";
import Partners from "../../../components/Partners/Partners";
import Footer from "../../../components/Footer/Footer";
import AboutUs from "../../../components/London/Who/AboutUs";
import What from "../../../components/London/What/What";
import Contact from "../../../components/London/Contact/Contact";
import Team from "../../../components/London/Team/Team";

export default function London() {
  const heroMediaSlotRef = useRef(null);
  const heroContentRef = useRef(null);

  useLayoutEffect(() => {
    const adoptedVideo = transitionStore.activeVideoEl;
    const heroSlot = heroMediaSlotRef.current;
    const heroContent = heroContentRef.current;

    if (!heroSlot || !heroContent) return;

    if (adoptedVideo) {
      heroSlot.innerHTML = "";
      heroSlot.appendChild(adoptedVideo);

      gsap.set(adoptedVideo, {
        clearProps: "all",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
        inset: 0,
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
          <div ref={heroMediaSlotRef} className={styles.heroMediaSlot}>
            {!transitionStore.activeVideoEl && (
              <video
                className={styles.heroVideo}
                src="/video/clip_02.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>

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
                Core Values
                <br />
                Branded Content
                <br />
                <span className={styles.hl}>Growing Audiences</span>
              </h1>
              {/* 
              <h1>
                Global <br />
                Film <br />
                <span className={styles.hl}>Publicity</span>
              </h1> */}

              {/* <p className={styles.heroIntro}>
                World-class production, press and post with the warmth and
                precision of a closely trusted team.
              </p> */}
            </div>
          </div>
        </section>
        <AboutUs />
        <What />

        <Partners />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

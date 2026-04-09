"use client";

import styles from "./page.module.css";
import { useLayoutEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import NavWidget from "../../../components/London/NavWidget/NavWidget";
import { transitionStore } from "../../../components/PageTransition/transitionstore";
import Partners from "../../../components/London/Partners/Partners";
import Footer from "../../../components/London/Footer/Footer";
import AboutUs from "../../../components/London/AboutImageGrid/About";
import What from "../../../components/London/What/What";
import Contact from "../../../components/London/Contact/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function London() {
  const heroMediaSlotRef = useRef(null);
  const heroContentRef = useRef(null);
  const whatRef = useRef(null);

  const heroSectionRef = useRef(null);

  useLayoutEffect(() => {
    const adoptedVideo = transitionStore.activeVideoEl;
    const heroSlot = heroMediaSlotRef.current;
    const heroContent = heroContentRef.current;

    if (!heroSlot || !heroContent) return;

    const logoEl = heroContent.querySelector(`.${styles.logo}`);
    const officeTagEl = heroContent.querySelector(`.${styles.officeTag}`);
    const heroTextEl = heroContent.querySelectorAll(`.${styles.heroText}`);
    const subTextLinks = heroContent.querySelectorAll(`.${styles.subtextLink}`);

    const subnavEl = heroContent.querySelector(`.${styles.subtextNav}`);
    const scrollCueEl = heroContent.querySelector(
      `.${styles.scrollCueContainer}`,
    );

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
      video.src = "/video/clip_02.mp4";
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
      playPromise.catch(() => {});
    }

    gsap.set(logoEl, {
      autoAlpha: 0,
      y: -10,
      scale: 0.96,
    });

    gsap.set(officeTagEl, {
      autoAlpha: 0,
      y: -8,
    });

    gsap.set([heroTextEl, scrollCueEl, subTextLinks], {
      autoAlpha: 0,
      y: 24,
    });

    const tl = gsap.timeline();

    tl.to(logoEl, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.3,
    })
      .to(
        officeTagEl,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.3,
      )
      .to(
        heroTextEl,
        {
          autoAlpha: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,

          ease: "power3.out",
        },
        0.28,
      )
      .to(subTextLinks, {
        autoAlpha: 1,
        opacity: 1,
        duration: 0.03,
        stagger: 0.4,
      })
      .to(
        scrollCueEl,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "+=0.2",
      )
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
      tl.kill();
    };
  }, []);

  const handleHeroNav = (panelId) => {
    whatRef.current?.goToPanel(panelId);
  };

  useLayoutEffect(() => {
    const cue = document.querySelector(`.${styles.scrollCue}`);
    if (!cue) return;

    const tween = gsap.to(cue, {
      y: 6,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => tween.kill();
  }, []);

  return (
    <>
      {" "}
      <NavWidget handleNav={handleHeroNav} />
      <div className={styles.container} ref={heroSectionRef}>
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
                <h1 className={styles.heroText}>Growing</h1>
                <h1 className={styles.heroText}>Audiences</h1>

                <div className={styles.subtextNav}>
                  <button
                    type="button"
                    className={styles.subtextLink}
                    onClick={() => handleHeroNav("creative")}
                  >
                    Creative
                  </button>
                  <button
                    type="button"
                    className={styles.subtextLink}
                    onClick={() => handleHeroNav("publicity")}
                  >
                    Junkets
                  </button>
                  <button
                    type="button"
                    className={styles.subtextLink}
                    onClick={() => handleHeroNav("post")}
                  >
                    Post
                  </button>
                </div>

                <div className={styles.scrollCueContainer}>
                  <button
                    className={styles.scrollCue}
                    onClick={() =>
                      document
                        .querySelector("#creative")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    aria-label="Scroll down"
                    type="button"
                  >
                    <span className={styles.scrollArrow}>↓</span>
                  </button>
                  <p>Scroll Down</p>
                </div>
              </div>
            </div>
          </section>
          <AboutUs />
          <What ref={whatRef} />

          <Partners />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}

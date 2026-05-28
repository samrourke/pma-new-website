"use client";

import styles from "./page.module.css";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

import Link from "next/link";
import NavWidget from "../../../components/London/NavWidget/NavWidget";
import DesktopNav from "../../../components/London/NavWidget/DesktopNav";

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
  const logoVidRef = useRef(null);

  const heroSectionRef = useRef(null);

  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  /*set active section for Nav */
  useEffect(() => {
    const sections = heroSectionRef.current.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = Array.from(entries).find(
          (entry) => entry.isIntersecting,
        )?.target;
        if (visibleSection) {
          if (visibleSection.id === "what") {
            if (scrollProgress < 0.4) {
              setActiveSection("creative");
            } else if (scrollProgress >= 0.4 && scrollProgress < 0.7) {
              setActiveSection("junkets");
            } else if (scrollProgress >= 0.7 && scrollProgress < 0.99) {
              setActiveSection("post");
            }
          } else setActiveSection(visibleSection.id);
        }
      },
      { root: null, threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [scrollProgress]);

  useLayoutEffect(() => {
    const adoptedVideo = transitionStore.activeVideoEl;
    const heroSlot = heroMediaSlotRef.current;
    const heroContent = heroContentRef.current;
    const logoVid = logoVidRef.current;

    if (!heroSlot || !heroContent || !logoVid) return;

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

    logoVid.currentTime = 0;
    logoVid.pause();

    gsap.set(logoEl, {
      autoAlpha: 0,
      y: -10,
      scale: 0.96,
    });

    gsap.set(logoVid, {
      opacity: 0,
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

    tl.to(
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
      .to(logoVid, {
        opacity: 1,
      })
      .call(() => {
        logoVid.currentTime = 0;
        logoVid.play();
      })
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
        "<",
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
      {/* <NavWidget handleNav={handleHeroNav} currentSection={activeSection} /> */}
      <DesktopNav handleNav={handleHeroNav} currentSection={activeSection} />
      <div className={styles.container} ref={heroSectionRef}>
        <main className={styles.london}>
          <section className={styles.hero} data-nav-theme="light" id="#hero">
            <div ref={heroMediaSlotRef} className={styles.heroMediaSlot} />

            <div className={styles.heroOverlay} />

            <div ref={heroContentRef} className={styles.heroContent}>
              <div className={styles.heroTop}>
                <Link href="/">
                  <video
                    className={styles.logoVideo}
                    ref={logoVidRef}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    style={{
                      width: "clamp(120px, 11vw, 240px)",
                      height: "auto",
                    }}
                  >
                    <source
                      src="/video/logo/london-crop-comp.mov"
                      type='video/mp4; codecs="hvc1"'
                    />
                    <source
                      src="/video/logo/london-crop.webm"
                      type="video/webm"
                    />
                  </video>
                </Link>
                {/* <span className={styles.officeTag}>London</span> */}
              </div>

              <div className={styles.heroBottom}>
                <div className={styles.heroSlogan}>
                  {" "}
                  <h1 className={styles.heroText}>Growing</h1>
                  <h1 className={styles.heroText}>Audiences</h1>
                </div>

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
                    aria-label="Scroll down"
                    type="button"
                  >
                    <span className={styles.scrollArrow}>↓</span>
                  </button>
                  {/* <p>Scroll Down</p> */}
                </div>
              </div>
            </div>
          </section>
          <AboutUs />
          <What ref={whatRef} handleProgress={setScrollProgress} />

          <Partners />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}

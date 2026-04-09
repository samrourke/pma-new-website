"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import styles from "./What.module.css";
import Header from "../Header/Header";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const What = forwardRef(function What(_, ref) {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);
  const headerRef = useRef(null);

  const modalVideoRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const services = [
    {
      title: "CREATIVE",
      text: "Behind-the-scenes films, branded content and campaign storytelling built for modern audiences.",
      video: "/video/trailer.mp4",
      id: "creative",
    },
    {
      title: "JUNKETS",
      text: "International press junkets, screenings and Q&As delivered with precision and experience.",
      video: "/video/press.mp4",
      id: "publicity",
    },
    {
      title: "POST",
      text: "Editing, finishing and delivery handled in-house to keep every campaign sharp, cohesive and on time.",
      video: "/video/trailer.mp4",
      id: "post",
    },
  ];

  useImperativeHandle(ref, () => ({
    goToPanel(panelId) {
      const st = triggerRef.current;
      const section = sectionRef.current;
      if (!st || !section) return;

      const progressMap = {
        creative: 0.3,
        publicity: 0.62,
        post: 1,
      };

      const targetProgress = progressMap[panelId];
      if (targetProgress == null) return;

      const targetScroll = st.start + (st.end - st.start) * targetProgress;

      gsap.to(window, {
        duration: 2,
        ease: "power1.inOut",
        scrollTo: targetScroll,
      });
    },
  }));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current.filter(Boolean);
    const header = headerRef.current;

    if (!section || !panels.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let ctx;
    let cancelled = false;

    const waitForMedia = async () => {
      const media = Array.from(section.querySelectorAll("video, img"));

      await Promise.all(
        media.map((el) => {
          if (el.tagName === "IMG") {
            if (el.complete) return Promise.resolve();
            return new Promise((resolve) => {
              el.addEventListener("load", resolve, { once: true });
              el.addEventListener("error", resolve, { once: true });
            });
          }

          if (el.tagName === "VIDEO") {
            if (el.readyState >= 1) return Promise.resolve();
            return new Promise((resolve) => {
              el.addEventListener("loadedmetadata", resolve, { once: true });
              el.addEventListener("error", resolve, { once: true });
            });
          }

          return Promise.resolve();
        }),
      );
    };

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await waitForMedia();

      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));

      if (cancelled) return;

      ctx = gsap.context(() => {
        gsap.set(panels[0], { yPercent: 40 });
        gsap.set(panels[1], { yPercent: 100 });
        gsap.set(panels[2], { yPercent: 200 });

        gsap.set([header], { opacity: 0, y: 50 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 4.25}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });

        triggerRef.current = tl.scrollTrigger;

        gsap.to(header, {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=200",
            end: "+=200",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.25 });
        tl.to(panels[0], { yPercent: 0, ease: "none", duration: 1 });
        tl.to({}, { duration: 0.25 });
        tl.to(panels[1], { yPercent: 0, ease: "none", duration: 1 });
        tl.to({}, { duration: 0.25 });
        tl.to(panels[2], { yPercent: 0, ease: "none", duration: 1 });
        tl.to({}, { duration: 0.35 });
      }, section);

      ScrollTrigger.refresh();
    };

    init();

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", handleLoad);
      triggerRef.current = null;
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    if (activeVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setActiveVideo(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!activeVideo || !modalVideoRef.current) return;
    modalVideoRef.current.play?.().catch(() => {});
  }, [activeVideo]);

  return (
    <>
      <section id="what" className={styles.what} ref={sectionRef}>
        <div
          className={styles.headerWrap}
          ref={headerRef}
          data-nav-theme="dark"
        >
          <Header
            title="Our Work"
            textColor="var(--paris)"
            align="flex-start"
            paddingT="var(--padding-topbottom)"
            textAlign="left"
          >
            {/* <div className={styles.description} ref={descriptionRef}>
              <p className={styles.copy}>We build campaigns end to end.</p>
              <p className={styles.copy}>
                From BTS and creative content through post production to press
                and promotion.
              </p>
            </div> */}
          </Header>
        </div>

        <div className={styles.stack} data-nav-theme="light">
          {services.map((service, i) => (
            <article
              data-nav-theme="light"
              key={service.title}
              ref={(el) => (panelsRef.current[i] = el)}
              className={styles.panel}
            >
              <video
                className={styles.video}
                src={service.video}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h1>{service.title}</h1>
                {/* <p>{service.text}</p> */}

                <button
                  type="button"
                  className={styles.watchButton}
                  onClick={() => setActiveVideo(service.video)}
                  aria-label={`Watch ${service.title} video full screen`}
                >
                  Play reel
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeVideo && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen video player"
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setActiveVideo(null)}
            aria-label="Close video player"
          >
            X
          </button>

          <div
            className={styles.modalBackdrop}
            onClick={() => setActiveVideo(null)}
          />

          <div className={styles.modalInner}>
            <video
              ref={modalVideoRef}
              className={styles.modalVideo}
              src={activeVideo}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
});

export default What;

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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const What = forwardRef(function What({ handleProgress }, ref) {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);

  // store BOTH timeline + trigger
  const timelineDataRef = useRef(null);

  const modalVideoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const services = [
    {
      title: "CREATIVE",
      video: "/video/trailer.mp4",
      id: "creative",
    },
    {
      title: "JUNKETS",
      video: "/video/press.mp4",
      id: "publicity",
    },
    {
      title: "POST",
      video: "/video/trailer.mp4",
      id: "post",
    },
  ];

  // =========================================
  // IMPERATIVE NAVIGATION
  // =========================================

  useImperativeHandle(ref, () => ({
    goToPanel(panelId) {
      console.group("goToPanel");

      console.log("Requested panel:", panelId);

      const data = timelineDataRef.current;
      const section = sectionRef.current;

      if (!data || !section) {
        console.warn("Timeline or section not ready");

        console.groupEnd();
        return;
      }

      const { trigger, timeline } = data;

      console.log("Trigger exists:", !!trigger);
      console.log("Timeline exists:", !!timeline);

      if (!trigger || !timeline) {
        console.warn("Missing trigger or timeline");

        console.groupEnd();
        return;
      }

      // force fresh calculations
      ScrollTrigger.refresh();

      requestAnimationFrame(() => {
        const targetTime = timeline.labels[panelId];

        console.log("Target label time:", targetTime);

        if (targetTime == null) {
          console.warn("Unknown panel label:", panelId);

          console.groupEnd();
          return;
        }

        const timelineDuration = timeline.duration();

        const targetProgress = targetTime / timelineDuration;

        const targetScroll =
          trigger.start + (trigger.end - trigger.start) * targetProgress;

        //for DEBUGGING - log all relevant values
        //
        // console.log({
        //   start: trigger.start,
        //   end: trigger.end,
        //   progress: trigger.progress,
        //   targetProgress,
        //   targetScroll,
        // });

        // kill any active scroll tweens

        gsap.killTweensOf(window);

        gsap.to(window, {
          scrollTo: {
            y: targetScroll,
            autoKill: false,
          },

          duration: 0.5,
          ease: "power2.out",

          overwrite: "auto",

          onStart: () => {
            console.log("Scroll started");
          },

          onComplete: () => {
            console.log("Scroll complete");
            console.groupEnd();
          },
        });
      });
    },
  }));

  // =========================================
  // MAIN GSAP SETUP
  // =========================================

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current.filter(Boolean);

    if (!section || !panels.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let ctx;
    let cancelled = false;

    // -----------------------------------------
    // wait for all media
    // -----------------------------------------

    const waitForMedia = async () => {
      const media = Array.from(section.querySelectorAll("video, img"));

      await Promise.all(
        media.map((el) => {
          if (el.tagName === "IMG") {
            if (el.complete) return Promise.resolve();

            return new Promise((resolve) => {
              el.addEventListener("load", resolve, {
                once: true,
              });

              el.addEventListener("error", resolve, {
                once: true,
              });
            });
          }

          if (el.tagName === "VIDEO") {
            if (el.readyState >= 1) return Promise.resolve();

            return new Promise((resolve) => {
              el.addEventListener("loadedmetadata", resolve, {
                once: true,
              });

              el.addEventListener("error", resolve, {
                once: true,
              });
            });
          }

          return Promise.resolve();
        }),
      );
    };

    // -----------------------------------------
    // init GSAP
    // -----------------------------------------

    const init = async () => {
      // wait for fonts
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      // wait for media
      await waitForMedia();

      // allow layout to settle
      await new Promise((r) => requestAnimationFrame(r));

      await new Promise((r) => requestAnimationFrame(r));

      if (cancelled) return;

      ctx = gsap.context(() => {
        // initial states
        gsap.set(panels[0], {
          yPercent: 0,
          filter: "brightness(1)",
        });

        gsap.set(panels[1], {
          yPercent: 100,
          filter: "brightness(0)",
        });

        gsap.set(panels[2], {
          yPercent: 200,
          filter: "brightness(0)",
        });

        // -------------------------------------
        // timeline
        // -------------------------------------

        const tl = gsap.timeline({
          defaults: {
            ease: "none",
          },

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: () => `+=${window.innerHeight * 3.4}`,

            scrub: 1,

            pin: true,

            anticipatePin: 1,

            invalidateOnRefresh: true,

            refreshPriority: 1,

            fastScrollEnd: true,

            onUpdate: (self) => {
              handleProgress(Number(self.progress.toFixed(2)));
            },

            onRefresh: (self) => {
              console.log("ScrollTrigger refreshed", {
                start: self.start,
                end: self.end,
              });
            },
          },
        });

        // -------------------------------------
        // LABELS
        // -------------------------------------

        tl.addLabel("creative");

        // -------------------------------------
        // TRANSITION 1
        // -------------------------------------

        tl.to(panels[0], {
          yPercent: -10,
          opacity: 0.8,
          duration: 1,
        })

          .to(
            panels[1],
            {
              yPercent: 0,
              filter: "brightness(1)",
              duration: 1,
            },
            "<",
          )

          .addLabel("publicity")

          // -----------------------------------
          // TRANSITION 2
          // -----------------------------------

          .to(
            panels[1],
            {
              yPercent: -10,
              opacity: 0.8,
              duration: 1,
            },
            ">",
          )

          .to(
            panels[2],
            {
              yPercent: 0,
              filter: "brightness(1)",
              duration: 1.2,
            },
            "<-0.6",
          )

          .addLabel("post");

        // store references
        timelineDataRef.current = {
          timeline: tl,
          trigger: tl.scrollTrigger,
        };
      }, section);

      // final refresh
      ScrollTrigger.refresh();
    };

    init();

    // -----------------------------------------
    // refresh handlers
    // -----------------------------------------

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;

      window.removeEventListener("load", handleLoad);

      window.removeEventListener("resize", handleResize);

      gsap.killTweensOf(window);

      timelineDataRef.current = null;

      ctx?.revert();
    };
  }, [handleProgress]);

  // =========================================
  // MODAL BODY LOCK
  // =========================================

  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  // =========================================
  // ESC KEY CLOSE
  // =========================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =========================================
  // AUTOPLAY MODAL VIDEO
  // =========================================

  useEffect(() => {
    if (!activeVideo || !modalVideoRef.current) return;

    modalVideoRef.current.play?.().catch(() => {});
  }, [activeVideo]);

  // =========================================
  // RENDER
  // =========================================

  return (
    <>
      <section
        id="what"
        className={styles.what}
        ref={sectionRef}
        data-nav-theme="dark"
      >
        <div className={styles.stack}>
          {services.map((service, i) => (
            <article
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

              <div className={styles.content}>
                <h1>{service.title}</h1>

                <button
                  type="button"
                  className={styles.watchButton}
                  onClick={() => setActiveVideo(service.video)}
                >
                  Play reel
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeVideo && (
        <div className={styles.modal}>
          <button
            className={styles.closeButton}
            onClick={() => setActiveVideo(null)}
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

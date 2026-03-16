"use client";

import styles from "./AboutNew.module.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const pinnedWrapRef = useRef(null);
  const articleRef = useRef(null);
  const bodyCopyRef = useRef(null);
  const whatTriggerRef = useRef(null);

  const firstTitleRef = useRef(null);
  const secondTitleRef = useRef(null);
  const coverRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinnedWrap = pinnedWrapRef.current;
    const article = articleRef.current;
    const bodyCopy = bodyCopyRef.current;
    const whatTrigger = whatTriggerRef.current;
    const firstTitle = firstTitleRef.current;
    const secondTitle = secondTitleRef.current;
    const cover = coverRef.current;

    if (
      !section ||
      !pinnedWrap ||
      !article ||
      !bodyCopy ||
      !whatTrigger ||
      !firstTitle ||
      !secondTitle ||
      !cover
    ) {
      return;
    }

    let split;
    let masks = [];
    let isCancelled = false;

    const cleanupMasks = () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars?.id?.startsWith("about-mask-"))
        .forEach((t) => t.kill());

      masks.forEach((mask) => mask?.remove());
      masks = [];

      if (split) {
        split.revert();
        split = null;
      }
    };

    const buildLineMasks = () => {
      if (isCancelled) return;

      cleanupMasks();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const paragraphs = bodyCopy.querySelectorAll("p");
      if (!paragraphs.length) return;

      split = new SplitText(paragraphs, {
        type: "lines",
        linesClass: "about-line",
      });

      split.lines.forEach((line, idx) => {
        const mask = document.createElement("span");
        mask.className = styles.textMask;
        line.appendChild(mask);
        masks.push(mask);

        gsap.to(mask, {
          scaleX: 0,
          transformOrigin: "right center",
          ease: "none",
          scrollTrigger: {
            id: `about-mask-${idx}`,
            trigger: line,
            start: "top 78%",
            end: "bottom 58%",
            scrub: false,
            invalidateOnRefresh: true,
          },
        });
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(secondTitle, {
        autoAlpha: 0,
        yPercent: -18,
      });

      gsap.set(cover, {
        scaleX: 1,
        transformOrigin: "left center",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 22%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(cover, {
          scaleX: 0,
          ease: "none",
        });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        endTrigger: whatTrigger,
        end: "top center",
        pin: pinnedWrap,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: whatTrigger,
            start: "top 78%",
            end: "top 42%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(
          firstTitle,
          {
            autoAlpha: 0,
            yPercent: 100,
            ease: "none",
          },
          0,
        )
        .to(
          secondTitle,
          {
            autoAlpha: 1,
            yPercent: 0,
            ease: "none",
          },
          0,
        );

      // Wait for fonts once, then build once
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (isCancelled) return;
          buildLineMasks();
          ScrollTrigger.refresh();
        });
      } else {
        buildLineMasks();
        ScrollTrigger.refresh();
      }

      const handleResize = () => {
        if (isCancelled) return;
        buildLineMasks();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, section);

    return () => {
      isCancelled = true;
      cleanupMasks();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section id="about" className={styles.about} ref={sectionRef}>
        <div className={styles.leftCol}>
          <div className={styles.pinnedWrap} ref={pinnedWrapRef}>
            <div className={styles.textContainer}>
              <span
                className={styles.cover}
                ref={coverRef}
                aria-hidden="true"
              />

              <h1
                ref={firstTitleRef}
                className={`${styles.title} ${styles.titlePrimary}`}
              >
                WHO WE ARE
              </h1>

              <h1
                ref={secondTitleRef}
                className={`${styles.title} ${styles.titleSecondary}`}
              >
                WHAT WE DO
              </h1>
            </div>
          </div>
        </div>

        <article className={styles.article} ref={articleRef}>
          <div className={`${styles.para} ${styles.intro}`}>
            <p className={styles.lead}>
              PMA is a family. That is what you get when you work with us, a
              small trusted team of creatives that are incredibly passionate
              about what they do.
            </p>
          </div>

          <div className={styles.copyBlock} ref={bodyCopyRef}>
            <div className={styles.para}>
              <p className={styles.subLead}>
                We work closely with our partners to shape ideas from the first
                pitch to the final execution. Professionalism and precision
                alongside personality has been the foundation of our business
                and of our relationships in this industry for the past twenty
                years.
              </p>
              <p className={styles.subLead}>
                We help shape how film and television stories are experienced
                beyond the screen. From press junkets and screenings to
                behind-the-scenes content and campaign delivery, we create work
                that connects talent, titles and audiences.
              </p>
              <p className={styles.subLead}></p>
            </div>
          </div>
        </article>
      </section>

      <section
        className={styles.whatTrigger}
        ref={whatTriggerRef}
        aria-hidden="true"
      >
        <div className={styles.whatSpacer} />
      </section>
    </>
  );
}

"use client";

import styles from "./AboutUs.module.css";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Header from "../../Header/Header";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const copyRef = useRef(null);
  const captionRef = useRef(null);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const imageInner = imageInnerRef.current;
    const copy = copyRef.current;
    const caption = captionRef.current;

    if (!section || !imageWrap || !imageInner || !copy) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const bodyParagraphs = copy.querySelectorAll(`.${styles.body}`);
    const leadParagraph = copy.querySelector(`.${styles.lead}`);

    const originalHTML = Array.from(bodyParagraphs).map((p) => p.innerHTML);

    const splitTextToWords = (element) => {
      const text = element.textContent || "";
      const words = text.trim().split(/\s+/);

      element.innerHTML = "";

      const wordSpans = [];

      words.forEach((word, index) => {
        const outer = document.createElement("span");
        outer.className = styles.wordWrap;

        const inner = document.createElement("span");
        inner.className = styles.word;
        inner.textContent = word;

        outer.appendChild(inner);
        element.appendChild(outer);
        wordSpans.push(inner);

        if (index < words.length - 1) {
          element.appendChild(document.createTextNode(" "));
        }
      });

      return wordSpans;
    };

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const header = headerRef.current;
      if (reduceMotion) return;

      gsap.set(header, { opacity: 0 });

      if (leadParagraph) {
        gsap.set(leadParagraph, {
          opacity: 0,
          y: 28,
        });

        gsap.to(leadParagraph, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leadParagraph,
            start: "top 82%",
            once: true,
          },
        });
      }

      bodyParagraphs.forEach((paragraph) => {
        const header = headerRef.current;
        const words = splitTextToWords(paragraph);
        const section = sectionRef.current;
        gsap.set(words, { opacity: 0.2, y: 4 });

        gsap.set(header, {
          opacity: 0,
          y: 20,
        });

        gsap.to(header, {
          opacity: 1,
          y: 0,
          ease: "circ.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100px",
            end: "top center",
            scrub: true,
            // markers: true,
          },
        });

        gsap.to(words, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 88%",
            end: "top 40%",
            scrub: true,
          },
        });
      });

      if (caption) {
        gsap.set(caption, {
          opacity: 0,
          y: 28,
        });

        gsap.to(caption, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: caption,
            start: "top 90%",
            once: true,
          },
        });
      }

      gsap.fromTo(
        imageInner,
        {
          scale: 1.1,
          y: 32,
        },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrap,
            start: "top 88%",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, section);

    return () => {
      bodyParagraphs.forEach((p, i) => {
        p.innerHTML = originalHTML[i];
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      className={styles.about}
      ref={sectionRef}
      data-nav-theme="light"
    >
      <div className={styles.headerWrap} ref={headerRef}>
        {" "}
        <Header
          title="Who We Are"
          textColor="var(--offWhite)"
          align="flex-start"
          number="01"
          paddingT={0}
          textAlign="left"
        />
      </div>

      <div className={styles.copy} ref={copyRef}>
        <p className={styles.lead}>
          PMA is a creative agency working across global film and television
          campaigns.
        </p>

        <p className={styles.body}>
          From international press and premieres to behind-the-scenes films and
          digital content we help shape how stories are experienced beyond the
          screen.
        </p>

        <p className={styles.body}>
          But more than this, PMA is a family. That is what you get when you
          work with us, a trusted team of producers, directors, editors and
          creatives that are incredibly passionate about what they do.
        </p>

        <p className={styles.body}>
          This has been the foundation of our company and our relationships for
          over twenty years.
        </p>
      </div>

      <div className={styles.imageBreakout}>
        <div className={styles.teamImage} ref={imageWrapRef}>
          <div className={styles.imageInner} ref={imageInnerRef}>
            <Image
              src="/images/pma-large.webp"
              alt="The PMA team"
              fill
              priority
              sizes="100vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

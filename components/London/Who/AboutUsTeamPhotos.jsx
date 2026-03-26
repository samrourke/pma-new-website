"use client";

import styles from "./AboutUsTeamPhotos.module.css";
import { useLayoutEffect, useRef } from "react";
import Header from "../../Header/Header";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsTeam() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const leadImgBlockRef = useRef(null);
  const leadImgMaskRef = useRef(null);
  const leadImgInnerRef = useRef(null);

  const bodyRowRef = useRef(null);
  const bodyTextRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.imageCard}`);

      gsap.to(bodyTextRef.current, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: bodyRowRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      cards.forEach((card, i) => {
        const mask = card.querySelector(`.${styles.imgMask}`);
        const inner = card.querySelector(`.${styles.imgInner}`);

        if (!mask || !inner) return;

        const isLead = card.classList.contains(styles.leadImageCard);

        gsap.set(card, {
          autoAlpha: 0,
          y: isLead ? -24 : -40,
        });

        gsap.set(mask, {
          clipPath: "inset(0% 0% 100% 0%)",
        });

        gsap.set(inner, {
          scale: isLead ? 1.07 : 1.05,
          yPercent: 0,
        });

        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: isLead ? 0.8 : 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: isLead ? "top 82%" : "top 88%",
            once: true,
          },
        });

        gsap.fromTo(
          mask,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: isLead ? "top 80%" : "top 82%",
              end: isLead ? "top 45%" : "top 52%",
              scrub: false,
            },
          },
        );

        gsap.fromTo(
          card,
          { yPercent: 0 },
          {
            yPercent: isLead ? 12 : 14 + i * 2,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        gsap.to(inner, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className={styles.about}
      ref={sectionRef}
      data-nav-theme="light"
    >
      <div className={styles.headerWrap} ref={headerRef}>
        <Header
          title="Who We Are"
          textColor="var(--offWhite)"
          align="flex-start"
          number="01"
          paddingT={0}
          textAlign="left"
        />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.row}>
          <div
            className={`${styles.textBlock} ${styles.left} ${styles.leadBlock}`}
          >
            <p className={styles.lead}>
              PMA works across global film and television campaigns with a
              personal, hands-on approach.
            </p>
          </div>

          <div
            className={`${styles.imgBlockRight} ${styles.imageCard} ${styles.leadImageCard}`}
            ref={leadImgBlockRef}
          >
            <div className={styles.imgMask} ref={leadImgMaskRef}>
              <div className={styles.imgInner} ref={leadImgInnerRef}>
                <img
                  className={`${styles.img} ${styles.leadImg}`}
                  src="/images/About/team-office-group.jpeg"
                  alt="PMA team in the office"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.row} ${styles.bodyRow}`} ref={bodyRowRef}>
          <div
            className={`${styles.textBlock} ${styles.center}`}
            ref={bodyTextRef}
          >
            <p className={styles.body}>
              From international press and premieres to behind-the-scenes films
              and digital content, we help shape how stories are experienced
              beyond the screen.
            </p>
            <p className={styles.body}>
              More than that, PMA is a family. A trusted team of producers,
              directors, editors and creatives who care deeply about the work
              and the people behind it.
            </p>
            <p className={styles.body}>
              This has been the foundation of our company and our relationships
              for over twenty years.
            </p>
          </div>

          <div className={styles.bodyImgBlock}>
            <div className={`${styles.imageCard} ${styles.imageCardTop}`}>
              <div className={styles.imgMask}>
                <div className={styles.imgInner}>
                  <img
                    className={styles.img}
                    src="/images/About/team-wicked-pair.jpeg"
                    alt="Two PMA team members seated beside Wicked branding"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.imageCard} ${styles.imageCardMiddle}`}>
              <div className={styles.imgMask}>
                <div className={styles.imgInner}>
                  <img
                    className={styles.img}
                    src="/images/About/team-junkets.jpeg"
                    alt="PMA team on set"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.imageCard} ${styles.imageCardThird}`}>
              <div className={styles.imgMask}>
                <div className={styles.imgInner}>
                  <img
                    className={styles.img}
                    src="/images/About/team-bridgetJones.jpeg"
                    alt="PMA team on the Bridget Jones junket"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.imageCard} ${styles.imageCardThird}`}>
              <div className={styles.imgMask}>
                <div className={styles.imgInner}>
                  <img
                    className={styles.img}
                    src="/images/About/team-bridgetJones.jpeg"
                    alt="PMA team on the Bridget Jones junket"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.imageCard} ${styles.imageCardFourth}`}>
              <div className={styles.imgMask}>
                <div className={styles.imgInner}>
                  <img
                    className={styles.img}
                    src="/images/About/team-cupcakes.jpeg"
                    alt="PMA team on the Bridget Jones junket"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.imageCard} ${styles.imageCardFifth}`}>
              <div className={styles.imgMask}>
                <div className={styles.imgInner}>
                  <img
                    className={styles.img}
                    src="/images/About/team-starwars.jpeg"
                    alt="PMA team on the Bridget Jones junket"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.imageCard} ${styles.imageCardSixth}`}>
              <div className={styles.imgMask}>
                <div className={styles.imgInner}>
                  <img
                    className={styles.img}
                    src="/images/About/team-hepburn.jpeg"
                    alt="PMA team on the Bridget Jones junket"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.imageCard} ${styles.imageCardBottom}`}>
              <div className={styles.imgMask}>
                <div className={styles.imgInner}>
                  <img
                    className={styles.img}
                    src="/images/About/team-trophy.jpeg"
                    alt="PMA team celebrating with a trophy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

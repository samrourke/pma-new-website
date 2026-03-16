"use client";

import { useLayoutEffect, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { transitionStore } from "../PageTransition/transitionstore";

const CITY_ASSETS = {
  london: {
    previewA: "/video/clip_03.mp4",
    previewB: "/video/clip_02.mp4",
    previewC: "/video/clip_05.mp4",
  },
  paris: {
    previewA: "/video/clip_01.mp4",
    previewB: "/video/clip_04.mp4",
    previewC: "/video/clip_06.mp4",
  },
};

export default function GatewayTitle() {
  const router = useRouter();
  const containerRef = useRef(null);

  const mm = useRef(null);

  const logoRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const pmaTrailerRef = useRef(null);
  const subtitleRef = useRef(null);

  const londonBgRef = useRef(null);
  const parisBgRef = useRef(null);

  const londonCellARef = useRef(null);
  const londonCellBRef = useRef(null);
  const londonCellCRef = useRef(null);

  const parisCellARef = useRef(null);
  const parisCellBRef = useRef(null);
  const parisCellCRef = useRef(null);

  const cityLeftRef = useRef(null);
  const cityRightRef = useRef(null);

  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);

  const introTl = useRef(null);
  const hoverTl = useRef(null);
  const exitTl = useRef(null);

  const isTransitioning = useRef(false);

  const [activeCity, setActiveCity] = useState(null);
  const [introComplete, setIntroComplete] = useState(false);

  const londonCells = useMemo(
    () => [londonCellARef, londonCellBRef, londonCellCRef],
    [],
  );

  const parisCells = useMemo(
    () => [parisCellARef, parisCellBRef, parisCellCRef],
    [],
  );

  /*INTRO */

  useLayoutEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const logoWrapper = logoWrapperRef.current;
    const trailer = pmaTrailerRef.current;
    const londonBg = londonBgRef.current;
    const parisBg = parisBgRef.current;
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;

    if (!container || !logo || !logoWrapper || !londonBg || !parisBg) {
      return;
    }

    mm.current = gsap.matchMedia();

    const setupIntro = ({ isMobile, isTablet, isDesktop }) => {
      const londonEls = londonCells.map((ref) => ref.current).filter(Boolean);
      const parisEls = parisCells.map((ref) => ref.current).filter(Boolean);
      const subtitle = subtitleRef.current;

      const ctx = gsap.context(() => {
        gsap.set(londonBg, {
          scaleY: 0,
          transformOrigin: "bottom center",
          autoAlpha: 1,
        });

        gsap.set(parisBg, {
          scaleY: 0,
          transformOrigin: "top center",
          autoAlpha: 1,
        });

        gsap.set(logoWrapper, {
          autoAlpha: 1,
          scale: 1,
          clearProps: "transform",
        });

        gsap.set(logo, {
          autoAlpha: 1,
          clearProps: "transform",
        });

        // gsap.set(trailer, {
        //   autoAlpha: 0,
        //   scale: 0.88,
        //   clearProps: "width,height,x,y",
        // });

        gsap.set([cityLeftRef.current, cityRightRef.current], {
          autoAlpha: 0,
          y: 18,
        });

        gsap.set([...londonEls, ...parisEls], {
          autoAlpha: 0,
          y: 24,
          scale: 0.98,
        });

        if (!isTablet && !isMobile && cursor && cursorText) {
          gsap.set([cursor, cursorText], {
            autoAlpha: 0,
          });
        }

        const logoRect = logo.getBoundingClientRect();

        let targetWidth;
        let targetY;

        if (isDesktop) {
          targetWidth = 900;
          targetY = "-35vh";
        } else if (isTablet) {
          targetWidth = 700;
          targetY = "-24vh";
        } else {
          targetWidth = 520;
          targetY = "-18vh";
        }

        const targetScale = targetWidth / logoRect.width;

        const scaledHeight = logoRect.height * targetScale;
        const scaleOffsetY = (scaledHeight - logoRect.height) / 2;
        const moveY = logoRect.top - scaleOffsetY;

        const positionSubTitle = targetScale + logoRect.height;

        introTl.current = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            setIntroComplete(true);
          },
        });

        introTl.current
          .to(logoWrapper, {
            autoAlpha: 1,
            duration: 0.6,
          })
          .to(
            londonBg,
            {
              scaleY: 1,
              duration: 0.55,
              ease: "circ.inOut",
            },
            0.2,
          )
          .to(
            logoWrapper,
            {
              y: -moveY,
              scale: targetScale,
              duration: 1.15,
              ease: "power3.inOut",
            },
            0.8,
          )
          // .to(
          //   trailer,
          //   {
          //     autoAlpha: 1,
          //     scale: 1,
          //     duration: 0.9,
          //     ease: "circ.inOut",
          //   },
          //   1.0,
          // )
          .to(
            [cityLeftRef.current, cityRightRef.current],
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
            },
            1.45,
          )
          .to(
            subtitle,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            1.9,
          );

        if (!isTablet && !isMobile && cursor && cursorText) {
          introTl.current.to(
            [cursor, cursorText],
            {
              autoAlpha: 1,
              duration: 0.4,
            },
            1.7,
          );
        }
      }, container);

      return () => ctx.revert();
    };

    mm.current.add(
      {
        isDesktop: "(min-width: 1025px)",
        isTablet: "(min-width: 769px) and (max-width: 1024px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => setupIntro(context.conditions),
    );

    return () => {
      introTl.current?.kill();
      hoverTl.current?.kill();
      exitTl.current?.kill();
      mm.current?.revert();
    };
  }, [londonCells, parisCells]);

  /*CURSOR */

  useEffect(() => {
    if (!introComplete) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;

    const container = containerRef.current;
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;

    if (!container || !cursor || !cursorText) return;

    const moveCursor = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(cursor, {
        x,
        y,
        duration: 0.18,
        ease: "power3.out",
      });

      gsap.to(cursorText, {
        x: x + 28,
        y: y + 28,
        duration: 0.28,
        ease: "power3.out",
      });
    };

    const showCursor = () => {
      gsap.to([cursor, cursorText], {
        autoAlpha: 1,
        duration: 0.25,
        overwrite: true,
      });
    };

    const hideCursor = () => {
      gsap.to([cursor, cursorText], {
        autoAlpha: 0,
        duration: 0.2,
        overwrite: true,
      });
      setActiveCity(null);
    };

    container.addEventListener("mousemove", moveCursor);
    container.addEventListener("mouseenter", showCursor);
    container.addEventListener("mouseleave", hideCursor);

    return () => {
      container.removeEventListener("mousemove", moveCursor);
      container.removeEventListener("mouseenter", showCursor);
      container.removeEventListener("mouseleave", hideCursor);
    };
  }, [introComplete]);

  /*HOVER TRANSITION */

  useEffect(() => {
    const londonBg = londonBgRef.current;
    const parisBg = parisBgRef.current;

    const londonEls = londonCells.map((ref) => ref.current).filter(Boolean);
    const parisEls = parisCells.map((ref) => ref.current).filter(Boolean);

    if (!londonBg || !parisBg || !londonEls.length || !parisEls.length) return;
    if (!introComplete) return;

    hoverTl.current?.kill();

    const tl = gsap.timeline({
      defaults: { duration: 0.55, ease: "power3.out" },
    });

    if (activeCity === "london") {
      tl.to(londonBg, { scaleY: 1 }, 0)
        .to(parisBg, { scaleY: 0 }, 0)
        .to(
          cityRightRef.current,
          {
            opacity: 0.5,
          },
          "<",
        )
        .to(
          cityLeftRef.current,
          {
            opacity: 1,
          },
          "<",
        )
        .to(
          londonEls,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
          },
          0.06,
        )
        .to(
          parisEls,
          {
            autoAlpha: 0,
            y: 18,
            scale: 0.985,
            stagger: 0.04,
          },
          0,
        );
    } else if (activeCity === "paris") {
      tl.to(parisBg, { scaleY: 1 }, 0)
        .to(londonBg, { scaleY: 0 }, 0)
        .to(
          cityRightRef.current,
          {
            opacity: 1,
          },
          "<",
        )
        .to(
          cityLeftRef.current,
          {
            opacity: 0.5,
          },
          "<",
        )
        .to(
          parisEls,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
          },
          0.06,
        )
        .to(
          londonEls,
          {
            autoAlpha: 0,
            y: 18,
            scale: 0.985,
            stagger: 0.04,
          },
          0,
        );
    }
    // else {
    //   tl.to([londonBg, parisBg], { scaleY: 0 }, 0).to(
    //     [...londonEls, ...parisEls],
    //     {
    //       autoAlpha: 0,
    //       y: 18,
    //       scale: 0.985,
    //       stagger: 0.03,
    //     },
    //     0,
    //   );
    // }

    hoverTl.current = tl;
  }, [activeCity, introComplete, londonCells, parisCells]);

  /*EXIT ANIMATION */

  function handleCityClick(e, city) {
    e.preventDefault();
    if (isTransitioning.current) return;

    isTransitioning.current = true;
    const logo = logoRef.current;
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;

    const londonEls = londonCells.map((ref) => ref.current).filter(Boolean);
    const parisEls = parisCells.map((ref) => ref.current).filter(Boolean);

    const selectedEls =
      city === "london"
        ? [londonCellARef.current, londonCellCRef.current]
        : [parisCellARef.current, parisCellCRef.current];
    const unselectedEls = city === "london" ? parisEls : londonEls;

    const selectedCity =
      city === "london" ? cityLeftRef.current : cityRightRef.current;
    const unSelectedCity =
      city === "paris" ? cityLeftRef.current : cityRightRef.current;

    const heroCell =
      city === "london" ? londonCellBRef.current : parisCellBRef.current;

    const heroVideo = heroCell?.querySelector("video");

    const activeBg =
      city === "london" ? londonBgRef.current : parisBgRef.current;

    console.log("heroCell =", heroCell);
    console.log("heroVideo =", heroVideo);

    if (!heroVideo) {
      console.error("No hero video found for transition");
      return;
    }

    transitionStore.activeVideoEl = heroVideo;
    transitionStore.city = city;

    console.log("gateway store set =", transitionStore);

    exitTl.current?.kill();

    exitTl.current = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    exitTl.current

      .to(
        [cursor, cursorText],
        {
          autoAlpha: 0,
          duration: 0.15,
        },
        0,
      )
      .to(
        unselectedEls,
        {
          autoAlpha: 0,
          y: 12,
          scale: 0.98,
          duration: 0.3,
          stagger: 0.03,
        },
        0.04,
      )
      .to(
        unSelectedCity,
        {
          autoAlpha: 0,
          y: 10,
          duration: 0.28,
        },
        0,
      )

      .to(selectedEls, {
        autoAlpha: 0,
        stagger: 0.05,
      })

      .to(
        [logo, subtitleRef.current],
        {
          autoAlpha: 0,
          duration: 0.4,
        },
        0.08,
      )
      .to(
        activeBg,
        {
          scaleY: 1,
          duration: 0.4,
        },
        0.08,
      )
      .to(selectedCity, {
        autoAlpha: 0,
        y: 10,
        duration: 0.28,
      })

      .call(
        () => {
          window.dispatchEvent(
            new CustomEvent("pma-transition-start", {
              detail: { city },
            }),
          );
        },
        null,
        1,
      )
      .to({}, { duration: 1 })
      .call(() => {
        router.push(`/${city}`);
      });
  }

  return (
    <main ref={containerRef} className={styles.gateway}>
      <div className={styles.bgLayers}>
        <div
          ref={londonBgRef}
          className={`${styles.bgPanel} ${styles.londonBg}`}
        />
        <div
          ref={parisBgRef}
          className={`${styles.bgPanel} ${styles.parisBg}`}
        />
      </div>

      <div className={styles.sheetLayer}>
        <div
          ref={londonCellARef}
          className={`${styles.sheetCell} ${styles.londonCellA}`}
        >
          <video
            className={styles.sheetMedia}
            src={CITY_ASSETS.london.previewA}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ animationDelay: "-1.2s" }}
          />
        </div>

        <div
          ref={londonCellBRef}
          className={`${styles.sheetCell} ${styles.londonCellB}`}
        >
          <video
            className={styles.sheetMedia}
            src={CITY_ASSETS.london.previewB}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div
          ref={londonCellCRef}
          className={`${styles.sheetCell} ${styles.londonCellC}`}
        >
          <video
            className={styles.sheetMedia}
            src={CITY_ASSETS.london.previewC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ animationDelay: "-3.3s" }}
          />
        </div>

        <div
          ref={parisCellARef}
          className={`${styles.sheetCell} ${styles.parisCellA}`}
        >
          <video
            className={styles.sheetMedia}
            src={CITY_ASSETS.paris.previewA}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ animationDelay: "-3.3s" }}
          />
        </div>

        <div
          ref={parisCellBRef}
          className={`${styles.sheetCell} ${styles.parisCellB}`}
        >
          <video
            className={styles.sheetMedia}
            src={CITY_ASSETS.paris.previewB}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div
          ref={parisCellCRef}
          className={`${styles.sheetCell} ${styles.parisCellC}`}
        >
          <video
            className={styles.sheetMedia}
            src={CITY_ASSETS.paris.previewC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ animationDelay: "-1.2s" }}
          />
        </div>

        <div className={styles.sheetFrameLines} />
      </div>

      <div className={styles.gatewayInner}>
        <div ref={logoWrapperRef} className={styles.logoWrapper}>
          <video
            ref={logoRef}
            className={styles.logo}
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source
              src="/video/logo/PMA-logo-alpha-noCity-trim.webm"
              type="video/webm"
            />
          </video>

          <p ref={subtitleRef} className={styles.subtitle}>
            Film &amp; TV
          </p>
        </div>

        {/* <div className={styles.trailerWrap}>
          <video
            ref={pmaTrailerRef}
            className={styles.trailer}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/video/pma-gateway-trailer.mp4" type="video/mp4" />
          </video>
        </div> */}

        <nav className={styles.cityNav}>
          <a
            ref={cityLeftRef}
            href="/london"
            className={`${styles.city} ${styles.cityLeft}`}
            onMouseEnter={() => setActiveCity("london")}
            onClick={(e) => handleCityClick(e, "london")}
          >
            <span className={styles.cityLabel}>LONDON</span>
            <span
              className={`${styles.selectedLine} ${styles.selectedLineLondon}`}
            />
          </a>

          <a
            ref={cityRightRef}
            href="/paris"
            className={`${styles.city} ${styles.cityRight}`}
            onMouseEnter={() => setActiveCity("paris")}
            onClick={(e) => handleCityClick(e, "paris")}
          >
            <span className={styles.cityLabel}>PARIS</span>
            <span
              className={`${styles.selectedLine} ${styles.selectedLineParis}`}
            />
          </a>
        </nav>
      </div>

      <div className={styles.socialDiv}>
        <a
          className={styles.socialLink}
          href="https://vimeo.com/pmafilmtv"
          target="_blank"
          rel="noreferrer"
        >
          <h2>Vimeo</h2>
        </a>

        <a
          className={styles.socialLink}
          href="https://www.instagram.com/pmafilms/"
          target="_blank"
          rel="noreferrer"
        >
          <h2>Insta</h2>
        </a>
      </div>

      <div ref={cursorRef} className={styles.cursorDot} />
      <div ref={cursorTextRef} className={styles.cursorText}>
        <p>Select studio</p>
      </div>
      <div className={styles.bottom}>
        <p>PMA Film and TV</p>
      </div>
    </main>
  );
}

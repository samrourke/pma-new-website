"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import styles from "./simplePage.module.css";
import { transitionStore } from "../PageTransition/transitionstore";

const CITY_ASSETS = {
  london: {
    preview: "/video/clip_02.mp4",
  },
  paris: {
    preview: "/video/clip_04.mp4",
  },
};

export default function GatewayTitleSimple() {
  const router = useRouter();

  const containerRef = useRef(null);
  const logoWrapRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  const londonBgRef = useRef(null);
  const parisBgRef = useRef(null);

  const londonPanelRef = useRef(null);
  const parisPanelRef = useRef(null);
  const londonVideoRef = useRef(null);
  const parisVideoRef = useRef(null);

  const londonLinkRef = useRef(null);
  const parisLinkRef = useRef(null);

  const introTl = useRef(null);
  const hoverTl = useRef(null);
  const exitTl = useRef(null);
  const isTransitioning = useRef(false);

  const [activeCity, setActiveCity] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([londonPanelRef.current, parisPanelRef.current], {
        autoAlpha: 0,
        scaleX: 0.96,
      });

      gsap.set(logoWrapRef.current, {
        autoAlpha: 0,
        y: 20,
        scale: 0.96,
      });

      gsap.set(navRef.current?.children || [], {
        autoAlpha: 0,
        y: 16,
      });

      introTl.current = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      introTl.current
        .to(logoWrapRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
        })
        .to(
          navRef.current?.children || [],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.2,
          },
          1.4,
        );
    }, containerRef);

    return () => {
      ctx.revert();
      introTl.current?.kill();
      hoverTl.current?.kill();
      exitTl.current?.kill();
    };
  }, []);

  useEffect(() => {
    hoverTl.current?.kill();

    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power3.out" },
    });

    if (activeCity === "london") {
      tl.to(
        parisPanelRef.current,
        {
          autoAlpha: 0,
        },
        0,
      )
        .to(
          londonBgRef.current,
          {
            autoAlpha: 1,
            duration: 0.6,
          },
          0,
        )
        .to(
          parisBgRef.current,
          {
            autoAlpha: 0,
            duration: 0.6,
          },
          0.2,
        )
        .to(
          londonPanelRef.current,
          {
            autoAlpha: 1,
            scaleX: 1,
          },
          0.5,
        )
        .to(
          parisPanelRef.current,
          {
            autoAlpha: 0,
          },
          0,
        )
        .to(parisPanelRef.current, {
          scaleX: 0.96,
        })
        .to(
          londonLinkRef.current,
          {
            opacity: 1,
            y: 0,
          },
          0,
        )
        .to(
          parisLinkRef.current,
          {
            opacity: 0.45,
          },
          0,
        );
    } else if (activeCity === "paris") {
      tl.to(
        londonPanelRef.current,
        {
          autoAlpha: 0,
        },
        0,
      )
        .to(
          parisBgRef.current,
          {
            autoAlpha: 1,
            duration: 0.6,
          },
          0,
        )
        .to(
          londonBgRef.current,
          {
            autoAlpha: 0,
            duration: 0.6,
          },
          0.2,
        )
        .to(
          parisPanelRef.current,
          {
            autoAlpha: 1,
            scaleX: 1,
          },
          0.5,
        )

        .to(londonPanelRef.current, {
          scaleX: 0.96,
        })
        .to(
          parisLinkRef.current,
          {
            opacity: 1,
            y: 0,
          },
          0,
        )
        .to(
          londonLinkRef.current,
          {
            opacity: 0.45,
          },
          0,
        );
    } else {
      tl.to(
        [londonPanelRef.current, parisPanelRef.current],
        {
          autoAlpha: 0,
          scaleX: 0.96,
        },
        0,
      ).to(
        [londonLinkRef.current, parisLinkRef.current],
        {
          opacity: 1,
        },
        0,
      );
    }

    hoverTl.current = tl;
  }, [activeCity]);

  function handleCityClick(e, city) {
    e.preventDefault();
    if (isTransitioning.current) return;

    isTransitioning.current = true;

    const selectedPanel =
      city === "london" ? londonPanelRef.current : parisPanelRef.current;

    const selectedVideo =
      city === "london" ? londonVideoRef.current : parisVideoRef.current;

    const unselectedPanel =
      city === "london" ? parisPanelRef.current : londonPanelRef.current;

    const unselectedLink =
      city === "london" ? parisLinkRef.current : londonLinkRef.current;

    const selectedLink =
      city === "london" ? londonLinkRef.current : parisLinkRef.current;

    if (!selectedVideo) return;

    transitionStore.activeVideoEl = selectedVideo;
    transitionStore.city = city;

    exitTl.current?.kill();

    exitTl.current = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    exitTl.current
      .to(
        unselectedPanel,
        {
          autoAlpha: 0,
          duration: 0.25,
        },
        0,
      )
      .to(
        unselectedLink,
        {
          autoAlpha: 0,
          y: 10,
          duration: 0.25,
        },
        0,
      )
      .to(
        logoWrapRef.current,
        {
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.4,
        },
        0.05,
      )
      .to(
        selectedLink,
        {
          autoAlpha: 0,
          y: 10,
          duration: 0.25,
        },
        0.05,
      )
      .to(
        selectedPanel,
        {
          autoAlpha: 1,
          scaleX: 1,
          width: "100%",
          duration: 0.65,
        },
        0.1,
      )
      .call(() => {
        window.dispatchEvent(
          new CustomEvent("pma-transition-start", {
            detail: { city },
          }),
        );
      })
      .to({}, { duration: 0.45 })
      .call(() => {
        router.push(`/${city}`);
      });
  }

  return (
    <main
      ref={containerRef}
      className={styles.gateway}
      onMouseLeave={() => setActiveCity(null)}
    >
      <div className={styles.bgBase} />
      <div
        ref={londonBgRef}
        className={`${styles.cityBg} ${styles.londonBg}`}
      />
      <div ref={parisBgRef} className={`${styles.cityBg} ${styles.parisBg}`} />
      <div className={styles.videoLayer}>
        <div
          ref={londonPanelRef}
          className={`${styles.hoverPanel} ${styles.leftPanel}`}
        >
          <video
            ref={londonVideoRef}
            className={styles.hoverVideo}
            src={CITY_ASSETS.london.preview}
            autoPlay
            muted
            loop
            playsInline
            // preload="metadata"
          />
        </div>

        <div
          ref={parisPanelRef}
          className={`${styles.hoverPanel} ${styles.rightPanel}`}
        >
          <video
            ref={parisVideoRef}
            className={styles.hoverVideo}
            src={CITY_ASSETS.paris.preview}
            autoPlay
            muted
            loop
            playsInline
            // preload="metadata"
          />
        </div>
      </div>

      <div className={styles.content}>
        <div ref={logoWrapRef} className={styles.logoWrap}>
          <video
            ref={logoRef}
            className={styles.logo}
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src="/video/logo/output-all.webm" type="video/webm" />
          </video>
          <nav ref={navRef} className={styles.cityNav}>
            <a
              ref={londonLinkRef}
              href="/london"
              className={styles.cityLink}
              onMouseEnter={() => setActiveCity("london")}
              onClick={(e) => handleCityClick(e, "london")}
            >
              LONDON
            </a>

            <a
              ref={parisLinkRef}
              href="/paris"
              className={styles.cityLink}
              onMouseEnter={() => setActiveCity("paris")}
              onClick={(e) => handleCityClick(e, "paris")}
            >
              PARIS
            </a>
          </nav>
        </div>

        {/* <div className={styles.socials}>
          <a
            href="https://vimeo.com/pmafilmtv"
            target="_blank"
            rel="noreferrer"
          >
            Vimeo
          </a>
          <a
            href="https://www.instagram.com/pmafilms/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div> */}
      </div>
    </main>
  );
}

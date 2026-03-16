"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./page.module.css";

const CARD_WIDTH = 420;
const CARD_HEIGHT = 250;
const MAX_CARDS = 10;
const SPAWN_DIST = 40;
const SAMPLE_TIMESTAMPS = [
  0.4, 2.1, 3.3, 4.8, 6.0, 10, 8.2, 7.5, 1.2, 20, 23.6, 17.2, 4.4, 9.8,
];

export default function GatewayVideo() {
  const socialLinks = [
    {
      social: "instagram",
      src: "/socials/insta.svg",
      link: "",
    },
    {
      social: "vimeo",
      src: "/socials/vimeo.png",
      link: "",
    },
  ];

  const logoRef = useRef(null);
  const londonBgRef = useRef(null);
  const parisBgRef = useRef(null);

  const trailerRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const selectCityRef = useRef(null);
  const uiRef = useRef(null);
  const cards = useRef([]);
  const lastPos = useRef({ x: -999, y: -999 });
  const isTransitioning = useRef(false);
  const sampleIndex = useRef(0);

  const pmaTrailerRef = useRef(null);

  const [activeCity, setActiveCity] = useState(null);
  const [introComplete, setIntroComplete] = useState(false);

  /*Opening Timeline */
  useLayoutEffect(() => {
    const logo = logoRef.current;
    const video = pmaTrailerRef.current;

    const ctx = gsap.context(() => {
      gsap.set(londonBgRef.current, {
        scaleY: 0,
        transformOrigin: "bottom center",
        opacity: 1,
      });

      gsap.set(video, {
        opacity: 0,
        scale: 0.5,
      });

      gsap.set(parisBgRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        opacity: 1,
      });
      gsap.set(`.${styles.gatewayInner}`, { opacity: 1 });

      gsap.set(selectCityRef.current, {
        opacity: 0,
      });
      gsap.set(logo, {
        scale: 1,

        y: 0,
        opacity: 1,
      });

      const TOP_PADDING = 10;
      const rect = logo.getBoundingClientRect();

      const targetWidth = 600;
      const targetScale = targetWidth / rect.width;
      const moveY = TOP_PADDING - rect.top;
      console.log(moveY);

      let tl = gsap.timeline({
        onComplete: () => {
          setIntroComplete(true);
          gsap.to(`.${styles.city}`, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.3,
          });
          gsap.to(selectCityRef.current, {
            opacity: 1,
          });
        },
      });

      tl.to(`.${styles.logoWrapper}`, {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
      })
        .to(
          londonBgRef.current,
          {
            scaleY: 1,
            ease: "circ.inOut",
            duration: 0.5,
          },
          "-=0.3",
        )
        .to(logo, {
          y: "-40vh",
          scale: targetScale,
          duration: 1.1,
          ease: "power3.inOut",
        })
        .to(video, {
          scale: 1,
          opacity: 1,
          ease: "circ.inOut",
        });
      // .to(
      //   logo,
      //   {
      //     y: "-25vh",
      //     scale: 0.72,
      //     duration: 1.1,
      //     ease: "power3.inOut",
      //   },
      //   "+=0.9",
      // );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = trailerRef.current;
    const canvas = canvasRef.current;
    if (!container || !video || !canvas) return;

    const ctx = canvas.getContext("2d");
    let rafId = null;

    function spawnCard(x, y) {
      if (!video.videoWidth || !video.videoHeight) return;

      const t =
        SAMPLE_TIMESTAMPS[sampleIndex.current % SAMPLE_TIMESTAMPS.length];
      sampleIndex.current += 1;

      const doCapture = () => {
        canvas.width = CARD_WIDTH;
        canvas.height = CARD_HEIGHT;
        ctx.drawImage(video, 0, 0, CARD_WIDTH, CARD_HEIGHT);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.72);

        const card = document.createElement("div");
        card.className = styles.trailCard;
        card.style.width = `${CARD_WIDTH}px`;
        card.style.height = `${CARD_HEIGHT}px`;
        card.style.left = `${x - CARD_WIDTH / 2}px`;
        card.style.top = `${y - CARD_HEIGHT / 2}px`;
        card.style.backgroundImage = `url(${dataUrl})`;

        const rotation = gsap.utils.random(-8, 8);
        const scale = gsap.utils.random(0.92, 1.04);

        gsap.set(card, {
          rotation,
          scale: 0.86,
          opacity: 0,
          z: gsap.utils.random(-20, 20),
        });

        container.appendChild(card);

        const tl = gsap.timeline({
          onComplete: () => {
            card.remove();
            cards.current = cards.current.filter((el) => el !== card);
          },
        });

        tl.to(card, {
          opacity: 0.95,
          scale,
          duration: 0.35,
          ease: "power2.out",
        }).to(
          card,
          {
            opacity: 0,
            y: 18,
            scale: scale * 0.98,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "+=0.18",
        );

        cards.current.push(card);

        if (cards.current.length > MAX_CARDS) {
          const oldest = cards.current.shift();
          oldest?.remove();
        }
      };

      // More controlled sampling than pure random access
      try {
        video.currentTime = t;
        const onSeeked = () => {
          doCapture();
          video.removeEventListener("seeked", onSeeked);
        };
        video.addEventListener("seeked", onSeeked, { once: true });
      } catch {
        doCapture();
      }
    }

    function handleMouseMove(e) {
      return;
      if (isTransitioning.current) return;
      if (!introComplete) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < SPAWN_DIST) return;
      lastPos.current = { x, y };

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (video.readyState >= 2) spawnCard(x, y);
      });
    }

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [introComplete]);

  /*Select City Color Change */

  useEffect(() => {
    if (!introComplete) return;
    const logo = logoRef.current;
    const londonBg = londonBgRef.current;
    const parisBg = parisBgRef.current;

    if (!logo || !londonBg || !parisBg) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "circ.inOut" },
    });

    if (activeCity === "london") {
      tl.to(londonBg, { scaleY: 1 }, 0).to(parisBg, { scaleY: 0 }, 0);
    } else if (activeCity === "paris") {
      tl.to(parisBg, { scaleY: 1 }, 0).to(londonBg, { scaleY: 0 }, 0);
    } else {
      tl.to([londonBg, parisBg], { scaleY: 0 }, 0);
    }
  }, [activeCity]);

  /*Handle Nav NEEDS WORK */

  function handleCityClick(e, city) {
    e.preventDefault();
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const logo = logoRef.current;
    const video = pmaTrailerRef.current;
    const cardsEls = cards.current;
    const selectCity = selectCityRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        window.location.href = `/${city}`;
      },
    });

    tl.to(selectCity, {
      opacity: 0,
      Y: 10,
    })
      .to(
        cardsEls,
        {
          opacity: 0,
          scale: 0.92,
          duration: 0.22,
          stagger: 0.01,
          ease: "power2.in",
        },
        0,
      )
      .to(
        `.${styles.city}`,
        {
          opacity: 0,
          y: 8,
          duration: 0.25,
          ease: "power2.out",
        },
        0,
      )
      .to(
        logo,
        {
          opacity: 0,
          y: 10,
          duration: 1.2,
          ease: "power2.inOut",
        },
        0.5,
      )
      .to(video, {
        width: "100vw",
      })
      .to(
        containerRef.current,
        {
          filter: "brightness(1.15)",
          duration: 0.25,
        },
        0.1,
      );
  }

  return (
    <main
      ref={containerRef}
      className={styles.gateway}
      onMouseLeave={() => setActiveCity(null)}
    >
      <canvas ref={canvasRef} className={styles.hiddenCanvas} />

      <video
        ref={trailerRef}
        className={styles.hiddenVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/trailer.mp4" type="video/mp4" />
      </video>

      <div className={styles.gatewayInner}>
        <div className={styles.logoWrapper}>
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
        </div>
        <div className={styles.trailerContainer}>
          <video
            ref={pmaTrailerRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            className={styles.trailer}
            loop
          >
            <source src="/video/trailer.mp4" type="video/mp4"></source>
          </video>
        </div>

        <div ref={uiRef} className={styles.cityNav}>
          <a
            href="/london"
            className={`${styles.city} ${styles.cityLeft}`}
            onMouseEnter={() => setActiveCity("london")}
            onClick={(e) => handleCityClick(e, "london")}
          >
            <span className={styles.cityLabel}>LONDON</span>

            <span
              className={`${styles.selectedLine} ${styles["selectedLine-london"]}`}
            />
          </a>

          <a
            href="/paris"
            className={`${styles.city} ${styles.cityRight}`}
            onMouseEnter={() => setActiveCity("paris")}
            onClick={(e) => handleCityClick(e, "paris")}
          >
            <span className={styles.cityLabel}>PARIS</span>

            <span
              className={`${styles.selectedLine} ${styles["selectedLine-paris"]}`}
            />
          </a>
        </div>
        <div className={styles.cornerNote} ref={selectCityRef}>
          <p>Select a studio</p>
        </div>
      </div>
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
    </main>
  );
}

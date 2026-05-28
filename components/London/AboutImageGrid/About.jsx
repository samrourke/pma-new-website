"use client";

import styles from "./About.module.css";
import Image from "next/image";
import Header from "../Header/Header";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/About/team-bridgetJones.jpeg",
    alt: "Behind the scenes 1",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-cupcakes.jpeg",
    alt: "Behind the scenes 2",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-hepburn.jpeg",
    alt: "Behind the scenes 3",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-junkets.jpeg",
    alt: "Behind the scenes 4",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-laptop.jpeg",
    alt: "Behind the scenes 5",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-office-group.jpeg",
    alt: "Behind the scenes 6",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-starwars.jpeg",
    alt: "Behind the scenes 7",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-trophy.jpeg",
    alt: "Behind the scenes 8",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-wicked-pair.jpeg",
    alt: "Behind the scenes 9",
    orientation: "landscape",
  },
  {
    src: "/images/About/team-nyc.jpeg",
    alt: "Behind the scenes 10",
    orientation: "portrait",
  },

  {
    src: "/images/About/team-portrait.jpg",
    alt: "Behind the scenes 11",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-stage.JPG",
    alt: "Behind the scenes 12",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-viking.JPG",
    alt: "Behind the scenes 13",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-tron.jpeg",
    alt: "Behind the scenes 14",
    orientation: "portrait",
  },
  {
    src: "/images/About/team-grinch.jpeg",
    alt: "Behind the scenes 15",
    orientation: "portrait",
  },
];

export default function AboutUs() {
  const masonryRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  const imageRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const images = imageRefs.current;
    const section = sectionRef.current;

    if (!images) return;

    gsap.set(images, { opacity: 0, y: 10 });

    gsap.to(images, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 25%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.about}
      data-nav-theme="light"
      id="london-about"
    >
      <div className={styles.headerWrap}>
        <Header
          title="About Us"
          textColor="var(--offWhite)"
          align="flex-end"
          number="01"
          paddingT={"var(--padding-topbottom)"}
          textAlign="left"
        />
      </div>
      <div className={styles.inner}>
        {/* RIGHT IMAGE GRID */}
        <div className={styles.right}>
          <div className={styles.collage} ref={masonryRef}>
            {images.map((img, i) => (
              <div
                key={i}
                className={styles.collageItem}
                data-index={i}
                ref={(el) => (imageRefs.current[i] = el)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={600}
                  className={styles.collageImage}
                />
              </div>
            ))}
          </div>
        </div>
        {/* LEFT TEXT SIDE */}
        <div className={styles.left}>
          <div className={styles.copy}>
            <p>
              PMA is a wonderful family of creative thinkers and enthusiastic
              do-ers. And we’re expert in bringing film and tv campaigns to
              life.
            </p>
            <p>It’s okay to say it if it’s true. We’re super good at it. </p>
            <p>
              With busy offices in London and Paris, we have been the Europe’s
              favourite, complete and ever-friendly production solution for over
              20 years. A reputation and an attitude we bring to every job, big
              or small.{" "}
            </p>
            <p className={styles.highlight}>
              We create. We plan. We shoot. We edit.
            </p>
            <p>
              You can see the thousands of global press junkets, world
              premieres, events, commercials, promos and launches we have
              produced online, and over the years every kind of video content
              from TikToks to long-form documentary.. but to save you the time
              trawling the internet, just drop us a line and we can tell you
              what we’re about.
            </p>
            <p>Come on it. It’s pretty fun in here :-) </p>
            {/* <p>
              PMA is a close-knit family of creatives bringing film and
              television campaigns to life{" "}
              <span className={styles.highlight}>from end to end</span>.
            </p>

            <p>
              From international press to premieres, post-production and digital
              content, we have shaped how stories connect with audiences beyond
              the screen for over twenty years.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}

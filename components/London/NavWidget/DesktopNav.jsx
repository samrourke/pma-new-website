"use client";

import styles from "./DesktopNav.module.css";
import NavWidget from "./NavWidget";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function DesktopNav({ handleNav, currentSection }) {
  const pathname = usePathname();
  const router = useRouter();

  const [color, setColor] = useState("var(--offWhite)");

  const [ended, setEnded] = useState(false);

  const internalLinks = [
    { label: "creative", action: () => handleNav("creative") },
    { label: "junkets", action: () => handleNav("publicity") },
    { label: "post", action: () => handleNav("post") },
  ];

  const handlePathChange = () => {
    window.dispatchEvent(
      new CustomEvent("city-switch", {
        detail: { city: "paris" },
      }),
    );

    setTimeout(() => {
      router.push("/paris");
    }, 1200);
  };

  useEffect(() => {
    const sections = document.querySelectorAll("[data-nav-theme]");

    const darkThemeSections = Array.from(sections).filter(
      (s) => s.dataset.navTheme === "dark",
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setColor("var(--london)");
        } else {
          setColor("var(--offWhite)");
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    darkThemeSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const navLinks = document.querySelectorAll(`.${styles.link}`);

    navLinks.forEach((link) => {
      if (link.classList.contains(styles.active)) {
        link.style.setProperty("--color", "var(--paris)");
      } else {
        link.style.setProperty("--color", color);
      }
    });
  }, [color, currentSection]);

  return (
    <header className={styles.wrap}>
      <div className={styles.inner}>
        {/*Desktop Nav */}
        <nav className={styles.nav}>
          <button
            className={`${styles.link} ${
              currentSection === "london-about" ? styles.active : ""
            }`}
            onClick={() => {
              const el = document.getElementById("london-about");

              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }

              window.history.pushState(null, "", "#london-about");
            }}
            style={{
              color: currentSection === "london-about" ? "var(--paris)" : color,
            }}
          >
            About
          </button>

          {internalLinks.map((link, i) => (
            <button
              key={i}
              className={`${styles.link} ${
                currentSection === link.label ? styles.active : ""
              }`}
              onClick={link.action}
              style={{
                color: currentSection === link.label ? "var(--paris)" : color,
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            className={`${styles.link} ${
              currentSection === "london-contact" ? styles.active : ""
            }`}
            onClick={() => {
              const el = document.getElementById("london-contact");

              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }

              window.history.pushState(null, "", "#london-contact");
            }}
            style={{
              color:
                currentSection === "london-contact" ? "var(--paris)" : color,
            }}
          >
            Contact
          </button>

          <button
            onClick={handlePathChange}
            className={styles.link}
            style={{
              color,
              "--color": color,
            }}
          >
            Paris
          </button>
        </nav>

        {/*Mobile Nav */}
        <NavWidget handleNav={handleNav} />
        {/* Logo Wrap */}

        <div className={styles.logoWrap}>
          <Link href="/">
            <video
              className={`${styles.logoVideo}`}
              id="desktopLogoVid"
              autoPlay
              muted
              playsInline
              preload="auto"
              style={{ opacity: color === "var(--offWhite)" ? 1 : 0 }}
            >
              <source
                src="/video/logo/london-crop-comp.mov"
                type='video/mp4; codecs="hvc1"'
              />

              <source src="/video/logo/london-crop.webm" type="video/webm" />
            </video>

            <img
              src="/video/logo/london-frame-cropped.png"
              alt="logo"
              className={`${styles.logoImg} ${ended ? styles.hidden : styles.visible}`}
              id="logoImgRed"
              style={{ opacity: color === "var(--london)" ? 1 : 0 }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

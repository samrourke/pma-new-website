"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./NavWidget.module.css";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavWidget() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const panelRef = useRef(null);
  const tlRef = useRef(null);
  const pathname = usePathname();

  const [theme, setTheme] = useState("light");

  const accentColor = pathname === "/paris" ? "var(--paris)" : "var(--london)";

  const hoverColor =
    pathname === "/london"
      ? "brightness(0) saturate(100%) invert(58%) sepia(91%) saturate(6493%) hue-rotate(344deg) brightness(97%) contrast(87%);"
      : "brightness(0) saturate(100%) invert(30%) sepia(57%) saturate(424%) hue-rotate(160deg) brightness(97%) contrast(89%);";

  const links = [
    { label: "london", href: "/london" },
    { label: "paris", href: "/paris" },
    { label: "contact", href: "#contact" },
  ];
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    if (pathname === "/") {
      gsap.set(wrapRef.current, {
        opacity: 0,

        display: "none",
      });
    } else {
      gsap.set(wrapRef.current, {
        opacity: 1,
        display: "block",
      });
    }
  }, [pathname]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (!open) return;
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-nav-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const nextTheme = visible.target.getAttribute("data-nav-theme");
          if (nextTheme) setTheme(nextTheme);
        }
      },
      {
        root: null,
        rootMargin: "-10% 0px -75% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    if (!wrap || !panel) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) return;

    const ctx = gsap.context(() => {
      const items = wrap.querySelectorAll(`.${styles.item}`);
      const meta = wrap.querySelectorAll(`.${styles.metaItem}`);
      const logo = wrap.querySelector(`.${styles.logoDiv}`);

      gsap.set(panel, {
        autoAlpha: 0,
        y: -20,
      });

      gsap.set(items, {
        autoAlpha: 0,
        y: 18,
      });

      gsap.set(meta, {
        autoAlpha: 0,
        y: 12,
      });

      gsap.set(logo, {
        autoAlpha: 0,
        y: 16,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onReverseComplete: () => {
          gsap.set(panel, { autoAlpha: 0 });
        },
      });

      tl.to(panel, {
        autoAlpha: 1,
        y: 0,
        duration: 0.32,
      })
        .to(
          items,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.12",
        )
        .to(
          [meta, logo],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
          },
          "-=0.28",
        );

      tlRef.current = tl;
    }, wrap);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (open) {
      tl.play(0);
      document.body.style.overflow = "hidden";
    } else {
      tl.reverse();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <button
        className={`${styles.toggle} ${open ? styles.open : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        type="button"
      >
        <span className={styles.icon} aria-hidden="true">
          <span />
          <span />
        </span>
        {/* <span className={styles.toggleLabel}>{open ? "Close" : "Menu"}</span> */}
      </button>

      <div
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.isOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.logoDiv}>
          <Link href="/">
            <Image
              className={styles.logo}
              src="/images/pma-white.png"
              alt="PMA logo"
              width={446}
              height={177}
            />
          </Link>

          <p className={styles.logoText}>Film &amp; Television</p>
        </div>

        <nav className={styles.nav}>
          {links.map((l) => {
            const hoverColor =
              l.label === "london"
                ? "var(--london)"
                : l.label === "paris"
                  ? "var(--paris)"
                  : accentColor;

            const activeColor =
              pathname === l.href
                ? l.label === "london"
                  ? "var(--london)"
                  : l.label === "paris"
                    ? "var(--paris)"
                    : accentColor
                : "";

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.item} ${styles[l.label]} ${
                  pathname === l.href ? styles.active : ""
                }`}
                onClick={() => setOpen(false)}
                style={{
                  "--hover-colour": hoverColor,
                  color: activeColor,
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.socialDiv}>
          <a
            className={styles.socialLink}
            href="https://vimeo.com/pmafilmtv"
            target="_blank"
            rel="noreferrer"
          >
            <img className={styles.socialImg} src="/images/socials/vimeo.png" />
          </a>

          <a
            className={styles.socialLink}
            href="https://www.instagram.com/pmafilms/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={styles.socialImg} src="/images/socials/insta.png" />
          </a>
        </div>

        <div className={styles.meta}>
          <p className={styles.metaItem}>London / Paris</p>
          <a
            className={styles.metaItem}
            href="mailto:info@pmafilmtv.com"
            onClick={() => setOpen(false)}
          >
            info@pmafilmtv.com
          </a>
        </div>
      </div>
    </div>
  );
}

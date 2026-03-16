"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  const disableLenis = pathname === "/roster";

  const createLenis = () => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
  };

  const destroyLenis = () => {
    const lenis = lenisRef.current;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    if (lenis) {
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) delete window.__lenis;
    }
  };

  // Create/destroy Lenis based on route
  useEffect(() => {
    const html = document.documentElement;

    if (disableLenis) {
      // FULLY give native scroll back (wheel/touch included)
      destroyLenis();

      html.classList.add("lenis-disabled");
      html.style.overflow = "auto";
      document.body.style.overflow = "auto";
    } else {
      // ensure Lenis exists
      if (!lenisRef.current) createLenis();

      html.classList.remove("lenis-disabled");
      html.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      // no-op: we manage lifetime intentionally above
    };
  }, [disableLenis]);

  // Scroll to top on route change
  useEffect(() => {
    requestAnimationFrame(() => {
      if (disableLenis || !lenisRef.current) {
        window.scrollTo(0, 0);
      } else {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      }
    });
  }, [pathname, disableLenis]);

  // Final cleanup on unmount
  useEffect(() => {
    return () => destroyLenis();
  }, []);

  return children;
}

// import { useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";
// import Lenis from "lenis";

// export default function SmoothScroll({ children }) {
//   const pathname = usePathname();
//   const lenisRef = useRef(null);
//   const rafRef = useRef(null);

//   const disableLenis = pathname === "/roster";

//   useEffect(() => {
//     // Tear down any existing instance on route change
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     rafRef.current = null;

//     if (lenisRef.current) {
//       lenisRef.current.destroy();
//       lenisRef.current = null;
//     }

//     // If Lenis is disabled on this route, still force scroll-to-top natively.
//     if (disableLenis) {
//       // Ensure we land at top even without Lenis
//       window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//       return;
//     }

//     const lenis = new Lenis({
//       duration: 2,
//       smoothWheel: true,
//       smoothTouch: false,
//     });

//     lenisRef.current = lenis;

//     // Force scroll-to-top on every route load
//     lenis.scrollTo(0, { immediate: true, force: true });

//     const raf = (time) => {
//       lenis.raf(time);
//       rafRef.current = requestAnimationFrame(raf);
//     };

//     rafRef.current = requestAnimationFrame(raf);

//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       rafRef.current = null;

//       if (lenisRef.current) {
//         lenisRef.current.destroy();
//         lenisRef.current = null;
//       }
//     };
//   }, [pathname, disableLenis]);

//   return <>{children}</>;
// }

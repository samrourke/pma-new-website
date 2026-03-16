"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./What.module.css";
import Header from "../../Header/Header";

gsap.registerPlugin(ScrollTrigger);

export default function What() {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);
  const endRef = useRef(null);
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);
  const modalVideoRef = useRef(null);

  const [activeVideo, setActiveVideo] = useState(null);

  const services = [
    {
      number: "01 / 03",
      title: "Press",
      text: "International press junkets, screenings and Q&As delivered with precision and experience.",
      video: "/video/press.mp4",
    },
    {
      number: "02 / 03",
      title: "Creative",
      text: "Behind-the-scenes films, branded content and campaign storytelling built for modern audiences.",
      video: "/video/trailer.mp4",
    },
    {
      number: "03 / 03",
      title: "Post Production",
      text: "Editing, finishing and delivery handled in-house to keep every campaign sharp, cohesive and on time.",
      video: "/video/press.mp4",
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current.filter(Boolean);
    const header = headerRef.current;
    const description = descriptionRef.current;

    if (!section || !panels.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      gsap.set(panels[0], { yPercent: 50 });
      gsap.set(panels[1], { yPercent: 100 });
      gsap.set(panels[2], { yPercent: 200 });

      gsap.set([header, description], { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * 4.25}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=200",
            end: "+=200",
            invalidateOnRefresh: true,
          },
        })
        .to([header, description], { opacity: 1, y: 0, ease: "none" });

      tl.to({}, { duration: 0.25 });

      tl.to(panels[0], {
        yPercent: 0,
        ease: "none",
        duration: 1,
      });
      tl.to({}, { duration: 0.25 });

      tl.to(panels[1], {
        yPercent: 0,
        ease: "none",
        duration: 1,
      });
      tl.to({}, { duration: 0.25 });

      tl.to(panels[2], {
        yPercent: 0,
        ease: "none",
        duration: 1,
      });
      tl.to({}, { duration: 0.35 });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!activeVideo || !modalVideoRef.current) return;

    const video = modalVideoRef.current;

    // Try to start playback with sound after user interaction
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // Some browsers may still block; controls remain available
      });
    }
  }, [activeVideo]);

  return (
    <>
      <section className={styles.what} ref={sectionRef} data-nav-theme="dark">
        <div className={styles.headerWrap} ref={headerRef}>
          <Header
            number="02"
            title="What We Do"
            textColor="var(--london)"
            align="flex-end"
            paddingT="var(--padding-topbottom)"
            textAlign="left"
          >
            <div className={styles.description} ref={descriptionRef}>
              <p className={styles.copy}>
                At PMA we work across whole campaigns, from BTS and creative
                content through post production to press and promotion.
              </p>
            </div>
          </Header>
        </div>

        <div className={styles.stack}>
          {services.map((service, i) => {
            return (
              <article
                data-nav-theme="light"
                key={service.title}
                ref={(el) => (panelsRef.current[i] = el)}
                className={styles.panel}
              >
                <video
                  className={styles.video}
                  src={service.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  ref={i === 2 ? endRef : null}
                />

                <div className={styles.overlay} />

                <div className={styles.content}>
                  <span className={styles.number}>{service.number}</span>
                  <h2>{service.title}</h2>
                  <p>{service.text}</p>

                  <button
                    type="button"
                    className={styles.watchButton}
                    onClick={() => setActiveVideo(service.video)}
                    aria-label={`Watch ${service.title} video full screen`}
                  >
                    Play reel
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {activeVideo && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen video player"
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setActiveVideo(null)}
            aria-label="Close video player"
          >
            X
          </button>

          <div
            className={styles.modalBackdrop}
            onClick={() => setActiveVideo(null)}
          />

          <div className={styles.modalInner}>
            <video
              ref={modalVideoRef}
              className={styles.modalVideo}
              src={activeVideo}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
}

// "use client";

// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import styles from "./What.module.css";
// import Header from "../../Header/Header";

// gsap.registerPlugin(ScrollTrigger);

// export default function What() {
//   const sectionRef = useRef(null);
//   const panelsRef = useRef([]);
//   const endRef = useRef(null);
//   const headerRef = useRef(null);
//   const descriptionRef = useRef(null);

//   const services = [
//     {
//       number: "01 / 03",
//       title: "Press",
//       text: "International press junkets, screenings and Q&As delivered with precision and experience.",
//       video: "/video/press.mp4",
//     },
//     {
//       number: "02 / 03",
//       title: "Creative",
//       text: "Behind-the-scenes films, branded content and campaign storytelling built for modern audiences.",
//       video: "/video/trailer.mp4",
//     },
//     {
//       number: "03 / 03",
//       title: "Post Production",
//       text: "Editing, finishing and delivery handled in-house to keep every campaign sharp, cohesive and on time.",
//       video: "/video/press.mp4",
//     },
//   ];

//   useLayoutEffect(() => {
//     const section = sectionRef.current;
//     const panels = panelsRef.current.filter(Boolean);
//     const header = headerRef.current;
//     const description = descriptionRef.current;

//     if (!section || !panels.length) return;

//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;

//     const ctx = gsap.context(() => {
//       if (reduceMotion) return;

//       gsap.set(panels[0], { yPercent: 50 });
//       gsap.set(panels[1], { yPercent: 100 });
//       gsap.set(panels[2], { yPercent: 200 });

//       gsap.set([header, description], { opacity: 0, y: 50 });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: `+=${window.innerHeight * 4.25}`,
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//           //   markers: true,
//         },
//       });

//       // Title cover wipe
//       gsap
//         .timeline({
//           scrollTrigger: {
//             trigger: section,
//             start: "top bottom-=200",
//             end: "+=200",
//             invalidateOnRefresh: true,
//           },
//         })
//         .to([header, description], { opacity: 1, y: 0, ease: "none" });

//       // breathing room before panel 1 locks in
//       tl.to({}, { duration: 0.25 });

//       // panel 1 rises into place
//       tl.to(panels[0], {
//         yPercent: 0,
//         ease: "none",
//         duration: 1,
//       });
//       tl.to({}, { duration: 0.25 });

//       // panel 2 stays offscreen until panel 1 is fully in place
//       tl.to(panels[1], {
//         yPercent: 0,
//         ease: "none",
//         duration: 1,
//       });
//       tl.to({}, { duration: 0.25 });

//       // panel 3 stays offscreen until panel 2 is fully in place
//       tl.to(panels[2], {
//         yPercent: 0,
//         ease: "none",
//         duration: 1,
//       });
//       tl.to({}, { duration: 0.35 });
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section className={styles.what} ref={sectionRef} data-nav-theme="dark">
//       <div className={styles.headerWrap} ref={headerRef}>
//         <Header
//           number="02"
//           title="What We Do"
//           textColor="var(--london)"
//           align="flex-end"
//           paddingT="var(--padding-topbottom)"
//           textAlign="left"
//         >
//           <div className={styles.description} ref={descriptionRef}>
//             <p className={styles.copy}>
//               At PMA we work across whole campaigns, from BTS and creative
//               content through post production to press and promotion.
//             </p>
//           </div>
//         </Header>
//       </div>

//       <div className={styles.stack}>
//         {/* <div className={styles.index}>01</div> */}
//         {services.map((service, i) => {
//           return (
//             <article
//               data-nav-theme="light"
//               key={service.title}
//               ref={(el) => (panelsRef.current[i] = el)}
//               className={styles.panel}
//             >
//               <video
//                 className={styles.video}
//                 src={service.video}
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 ref={i === 2 ? endRef : null}
//               />
//               <div className={styles.overlay} />
//               <div className={styles.content}>
//                 <span className={styles.number}>{service.number}</span>
//                 <h2>{service.title}</h2>
//                 <p>{service.text}</p>
//               </div>
//             </article>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

import NavWidget from "./NavWidget";
import DesktopNav from "./DesktopNav";
import styles from "./NavContainer.module.css";
import Link from "next/link";

export default function NavContainer() {
  return (
    <div className={styles.navContainer}>
      <DesktopNav />
      <NavWidget />
      <Link href="/">
        <video
          className={styles.logoVideo}
          //   ref={logoVidRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{
            width: "clamp(120px, 11vw, 240px)",
            height: "auto",
          }}
        >
          <source
            src="/video/logo/london-crop-comp.mov"
            type='video/mp4; codecs="hvc1"'
          />
          <source src="/video/logo/london-crop.webm" type="video/webm" />
        </video>
      </Link>
    </div>
  );
}

import NavWidget from "../../components/NavWidget/NavWidget";
import Head from "./head";
import {
  clashGrotesk,
  satoshi,
  mango,
  absans,
  galgo,
  gravity,
  ginto,
} from "./fonts";
import PageTransition from "../../components/PageTransition/PageTransition";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";
import "./globals.css";

export const metadata = {
  // metadataBase: new URL("https://burnttoastmgmt.com/"),
  title: {
    default: "PMA Film & TV",
    template: "%s – PMA Film and TV",
  },
  description:
    "From creative conception to post - production, we are the entertainment industry's go-to agency for full service video marketing",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/png" },
      // { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    // apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${clashGrotesk.variable} ${ginto.variable} ${gravity.variable}  ${satoshi.variable} ${galgo.variable} ${mango.variable} ${absans.variable}`}
    >
      <Head />
      <body>
        {" "}
        <SmoothScroll>
          <PageTransition>
            <NavWidget />
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}

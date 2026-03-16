import localFont from "next/font/local";

export const absans = localFont({
  src: "../../public/fonts/Absans-Regular.woff2",
  variable: "--font-absans",
  display: "swap",
  weight: "500",
});

export const gravity = localFont({
  src: "../../public/fonts/GravityVariable.woff2",
  variable: "--font-gravity",
  display: "swap",
  weight: "500",
});

export const ginto = localFont({
  src: "../../public/fonts/GintoCondensed-Bold.woff2",
  variable: "--font-ginto",
  display: "swap",
  weight: "500",
});

export const clashGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/ClashGrotesk-Medium.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Semibold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-grotesk",
  display: "swap",
});

export const galgo = localFont({
  src: [
    {
      path: "../../public/fonts/Galgo-Light.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/fonts/GalgoVF.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/fonts/Galgo-Regular.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../public/fonts/Galgo-Bold.woff2",
      style: "normal",
      weight: "800",
    },
  ],
  variable: "--font-galgo",
  display: "swap",
});

export const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const mango = localFont({
  src: [
    {
      path: "../../public/fonts/MangoGrotesque-Black.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/MangoGrotesque-Bold.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/fonts/MangoGrotesque-ExtraBold.woff2",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-mango",
  display: "swap",
});

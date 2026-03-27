import localFont from "next/font/local";

export const gravity = localFont({
  src: "../../public/fonts/GravityVariable.woff2",
  variable: "--font-gravity",
  display: "swap",
  weight: "500",
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

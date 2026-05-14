"use client";

import { useRouter } from "next/navigation";

export default function CityLink({ href, city, children }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    window.dispatchEvent(
      new CustomEvent("city-switch", {
        detail: { city },
      }),
    );

    setTimeout(() => {
      router.push(href);
    }, 1100);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

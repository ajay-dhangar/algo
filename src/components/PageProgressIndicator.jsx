import React, { useEffect, useState } from "react";

export default function PageProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollProgress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setProgress(scrollProgress);
      ticking = false;
    };

    // Use requestAnimationFrame to prevent scroll lag and maintain high frame rates
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    calculateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateProgress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[9999] pointer-events-none will-change-[width] transition-all duration-700 ease-out"
      style={{
        width: `${progress}%`,
        background: `linear-gradient(90deg, 
          var(--ifm-color-primary-light) 0%, 
          var(--ifm-color-primary) 50%, 
          var(--ifm-color-primary-darker) 100%)`,
        boxShadow: "0 1px 10px rgba(var(--ifm-color-primary-rgb), 0.5), 0 0 4px rgba(var(--ifm-color-primary-rgb), 0.3)",
      }}
      aria-hidden="true"
    />
  );
}
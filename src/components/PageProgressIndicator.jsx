import React, { useEffect, useState } from "react";

export default function PageProgressIndicator() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            const scrollTop = window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const scrollProgress =
                documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

            setProgress(scrollProgress);
        };

        calculateProgress();

        window.addEventListener("scroll", calculateProgress);
        window.addEventListener("resize", calculateProgress);

        return () => {
            window.removeEventListener("scroll", calculateProgress);
            window.removeEventListener("resize", calculateProgress);
        };
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: `${progress}%`,
                height: "4px",
                background:
                    "linear-gradient(90deg, #facc15 0%, #f59e0b 50%, #f97316 100%)",
                zIndex: 9999,
                transition: "width 0.1s ease-out",
                boxShadow: "0 0 8px rgba(250, 204, 21, 0.6)",
            }}
            aria-hidden="true"
        />
    );
}
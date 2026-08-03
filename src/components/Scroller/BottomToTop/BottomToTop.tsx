import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "../../../css/BottomToTop.module.css";

const ScrollBottomToTop: React.FC = () => {
    const [showButton, setShowButton] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleScroll = () => {
    setShowButton(window.scrollY > 400);

    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    setScrollProgress(Math.round(progress));
};

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        showButton && (
            <button
    onClick={scrollToTop}
    className={styles.scrollToTopButton}
    aria-label="Scroll to top"
    title="Scroll to top"
>
    <FaArrowUp aria-hidden="true" />

    <span className={styles.progressText}>
        {scrollProgress}%
    </span>
</button>
        )
    );
};

export default ScrollBottomToTop;
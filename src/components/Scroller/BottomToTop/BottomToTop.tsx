import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "../../../css/BottomToTop.module.css";

const ScrollBottomToTop: React.FC = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
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
            >
                <FaArrowUp size={20} aria-hidden="true" />
            </button>
        )
    );
};

export default ScrollBottomToTop;
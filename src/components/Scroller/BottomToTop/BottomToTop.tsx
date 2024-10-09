import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "../../../css/BottomToTop.module.css";

const ScrollBottomToTop: React.FC = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    const scrollToTop = () => {
        const scrollStep = -window.scrollY / (500 / 15);
        const scrollInterval = setInterval(() => {
            if (window.scrollY === 0) {
                clearInterval(scrollInterval);
            }
            window.scrollBy(0, scrollStep);
        }, 15);
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
            <button onClick={scrollToTop} className={styles.scrollToTopButton}>
                <FaArrowUp />
            </button>
        )
    );
};

export default ScrollBottomToTop;

import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import styles from "../../../css/TopToBottom.module.css";

const ScrollTopToBottom: React.FC = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    const scrollToBottom = () => {
        const totalHeight = document.documentElement.scrollHeight;
        const currentScroll = window.scrollY;
        const scrollStep = (totalHeight - currentScroll) / (500 / 15);
        const scrollInterval = setInterval(() => {
            const newScroll = window.scrollY + scrollStep;
            window.scrollTo(0, newScroll);
            if (window.scrollY >= totalHeight - window.innerHeight) {
                clearInterval(scrollInterval);
            }
        }, 15);
    };

    const handleScroll = () => {
        const bottomThreshold =
            document.documentElement.scrollHeight - window.innerHeight - 100;
        if (window.scrollY < bottomThreshold) {
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
        <>
            {showButton && (
                <button
                    onClick={scrollToBottom}
                    className={styles.scrollToBottomButton}
                >
                    <FaArrowDown />
                </button>
            )}
            <div id="scroll-target" style={{ height: '1px' }} />
        </>
    );
};

export default ScrollTopToBottom;

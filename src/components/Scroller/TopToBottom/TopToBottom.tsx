import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import styles from "../../../css/TopToBottom.module.css";

const ScrollTopToBottom: React.FC = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
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
                    aria-label="Scroll to bottom"
                >
                    <FaArrowDown size={20}aria-hidden="true" />
                </button>
            )}
            <div id="scroll-target" style={{ height: '1px' }} />
        </>
    );
};

export default ScrollTopToBottom;

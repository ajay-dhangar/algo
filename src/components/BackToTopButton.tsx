import React, { useState, useEffect } from "react";
import "../css/BackToTopButton.css";

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const scrollToTop = () => {
        const scrollStep = -window.scrollY / (500 / 15);
        const scrollInterval = setInterval(() => {
            if (window.scrollY === 0) {
                clearInterval(scrollInterval);
            }
            window.scrollBy(0, scrollStep);
        }, 15);
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div className="back-to-top">
            {isVisible && (
                <button onClick={scrollToTop} className="back-to-top-button">
                    <span className="up-arrow">↑</span>{" "}
                </button>
            )}
        </div>
    );
};

export default BackToTopButton;
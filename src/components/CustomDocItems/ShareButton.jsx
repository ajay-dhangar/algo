import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useColorMode } from "@docusaurus/theme-common";
import {
  FiShare2,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiMail,
} from "react-icons/fi";
import styles from "./shareButton.module.css";

function ShareButton({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { colorMode } = useColorMode();
  
  const baseUrl = "https://ajay-dhangar.github.io";
  const fullUrl = encodeURIComponent(`${baseUrl}${location.pathname}`);
  const encodedTitle = encodeURIComponent(title || "Check out this article");

  // Toggle Dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Safe outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${fullUrl}&text=${encodedTitle}&hashtags=codeharborhub,algo,opensource`,
      icon: <FiTwitter />,
      color: "#1DA1F2",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${fullUrl}`,
      icon: <FiLinkedin />,
      color: "#0A66C2",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`,
      icon: <FiFacebook />,
      color: "#1877F2",
    },
    {
      name: "Email",
      url: `mailto:?subject=Shared Article | ${title} | Algo Docs&body=Check out this article on ${title}: ${baseUrl}${location.pathname}`,
      icon: <FiMail />,
      color: "#D44638",
    },
  ];

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Share this page"
      >
        <FiShare2 className={styles.shareIcon} />
        <span className={styles.label}>Share</span>
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {shareLinks.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
                style={{
                  "--hover-color": colorMode === "dark" ? "#ffffff" : item.color,
                }}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShareButton;
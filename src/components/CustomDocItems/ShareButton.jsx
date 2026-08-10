import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useColorMode } from "@docusaurus/theme-common";
import {
  FiShare2,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiMail,
  FiDownload,
  FiImage,
  FiCheck,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { slugify } from "../../utils/slugUtils";
import styles from "./shareButton.module.css";

// A4 at 96 DPI – matches CheatSheetExport dimensions.
const PDF_PAGE_WIDTH_PX = 794;
const PDF_PAGE_HEIGHT_PX = 1123;
const RESET_DELAY_MS = 2500;

function ShareButton({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfStatus, setPdfStatus] = useState("idle"); // "idle" | "working" | "done" | "error"
  const [imgStatus, setImgStatus] = useState("idle"); // "idle" | "working" | "done" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const dropdownRef = useRef(null);
  const resetTimerRef = useRef(null);
  const location = useLocation();
  const { colorMode } = useColorMode();

  const baseUrl = "https://ajay-dhangar.github.io";
  const fullUrl = encodeURIComponent(`${baseUrl}${location.pathname}`);
  const encodedTitle = encodeURIComponent(title || "Check out this article");

  // Cleanup reset timer on unmount
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

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

  const scheduleReset = useCallback((setStatus) => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setStatus("idle"), RESET_DELAY_MS);
  }, []);

  const slugifyFilename = (value) => slugify(value, "cheatsheet");

  /** Capture the main article content via html2canvas (same logic as CheatSheetExport) */
  const captureCanvas = useCallback(async () => {
    const target =
      document.querySelector(".markdown") ||
      document.querySelector(".theme-doc-markdown") ||
      document.querySelector("article") ||
      document.querySelector("main");

    if (!target) throw new Error("Could not find the content on this page.");

    const html2canvasModule = await import("html2canvas");
    const html2canvas = html2canvasModule.default || html2canvasModule;

    // Use the computed background so dark/light mode is respected correctly
    const computedBg =
      getComputedStyle(document.body).backgroundColor ||
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ifm-background-color")
        .trim();
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const backgroundColor =
      computedBg && computedBg !== "rgba(0, 0, 0, 0)" && computedBg !== "transparent"
        ? computedBg
        : isDark ? "#1b1b1d" : "#ffffff";

    return html2canvas(target, {
      backgroundColor,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      // Exclude Share dropdown and any export toolbar from captured output
      ignoreElements: (el) =>
        el.classList?.contains("cheatsheet-export-toolbar") ||
        el.classList?.contains("no-print") ||
        false,
    });
  }, []);

  /** Download the current page as a multi-page PDF (matches CheatSheetExport exactly) */
  const handleDownloadPDF = useCallback(async () => {
    if (pdfStatus === "working") return;
    setPdfStatus("working");
    setErrorMessage("");
    setIsOpen(false);

    try {
      const canvas = await captureCanvas();
      const jsPDFModule = await import("jspdf");
      const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [PDF_PAGE_WIDTH_PX, PDF_PAGE_HEIGHT_PX],
      });

      const imgWidth = PDF_PAGE_WIDTH_PX;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= PDF_PAGE_HEIGHT_PX;

      // Slice long pages across multiple print-friendly pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage([PDF_PAGE_WIDTH_PX, PDF_PAGE_HEIGHT_PX], "portrait");
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= PDF_PAGE_HEIGHT_PX;
      }

      pdf.save(`${slugifyFilename(title)}.pdf`);
      setPdfStatus("done");
    } catch (err) {
      console.error("[ShareButton] PDF export failed:", err);
      setErrorMessage(err instanceof Error ? err.message : "PDF export failed.");
      setPdfStatus("error");
    } finally {
      scheduleReset(setPdfStatus);
    }
  }, [captureCanvas, pdfStatus, title, scheduleReset]);

  /** Copy page as PNG to clipboard; falls back to download (matches CheatSheetExport exactly) */
  const handleCopyImage = useCallback(async () => {
    if (imgStatus === "working") return;
    setImgStatus("working");
    setErrorMessage("");
    setIsOpen(false);

    try {
      const canvas = await captureCanvas();
      const blob = await new Promise((resolve) =>
        canvas.toBlob((result) => resolve(result), "image/png")
      );
      if (!blob) throw new Error("Could not generate an image from this page.");

      const ClipboardItemCtor =
        typeof window !== "undefined" ? window.ClipboardItem : undefined;

      let copiedToClipboard = false;

      if (navigator.clipboard && ClipboardItemCtor) {
        try {
          await navigator.clipboard.write([new ClipboardItemCtor({ "image/png": blob })]);
          copiedToClipboard = true;
        } catch (clipErr) {
          console.warn("[ShareButton] Clipboard write blocked, falling back to download:", clipErr);
        }
      }

      if (!copiedToClipboard) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${slugifyFilename(title)}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }

      setImgStatus("done");
    } catch (err) {
      console.error("[ShareButton] Image export failed:", err);
      setErrorMessage(err instanceof Error ? err.message : "Image export failed.");
      setImgStatus("error");
    } finally {
      scheduleReset(setImgStatus);
    }
  }, [captureCanvas, imgStatus, title, scheduleReset]);

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
          {/* ── Action items ── */}
          <li>
            <button
              className={`${styles.menuItem} ${styles.menuButton}`}
              onClick={handleDownloadPDF}
              disabled={pdfStatus === "working"}
              aria-label={`Download ${title || "page"} as PDF`}
              style={{ "--hover-color": colorMode === "dark" ? "#ffffff" : "#e44" }}
            >
              <span className={styles.icon}>
                {pdfStatus === "working" && <FiLoader className={styles.spin} />}
                {pdfStatus === "done" && <FiCheck />}
                {pdfStatus === "error" && <FiAlertCircle />}
                {pdfStatus === "idle" && <FiDownload />}
              </span>
              {{ idle: "Download PDF", working: "Preparing…", done: "Downloaded!", error: "Try again" }[pdfStatus]}
            </button>
          </li>
          <li>
            <button
              className={`${styles.menuItem} ${styles.menuButton}`}
              onClick={handleCopyImage}
              disabled={imgStatus === "working"}
              aria-label={`Copy ${title || "page"} as an image`}
              style={{ "--hover-color": colorMode === "dark" ? "#ffffff" : "#7c3aed" }}
            >
              <span className={styles.icon}>
                {imgStatus === "working" && <FiLoader className={styles.spin} />}
                {imgStatus === "done" && <FiCheck />}
                {imgStatus === "error" && <FiAlertCircle />}
                {imgStatus === "idle" && <FiImage />}
              </span>
              {{ idle: "Copy as Image", working: "Copying…", done: "Copied!", error: "Try again" }[imgStatus]}
            </button>
          </li>

          {/* ── Divider ── */}
          <li className={styles.divider} role="separator" />

          {/* ── Social share links ── */}
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
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FiDownload,
  FiImage,
  FiCheck,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import styles from "./styles.module.css";

interface CheatSheetExportProps {
  /** Doc title, used for filename and export status messages. */
  title?: string;
  /** CSS selector for the content that should be captured. Defaults to Docusaurus doc content wrappers. */
  targetSelector?: string;
}

type ExportStatus = "idle" | "working" | "done" | "error";

const RESET_DELAY_MS = 2500;
// A4 at 96 DPI in px — standard print page dimensions.
const PDF_PAGE_WIDTH_PX = 794;
const PDF_PAGE_HEIGHT_PX = 1123;

/**
 * Adds "Download as PDF" and "Copy as image" actions to cheat sheet doc pages.
 * Captures rendered doc content client-side via html2canvas and packages it
 * into a PDF via jsPDF or copies/downloads a PNG image.
 */
export const CheatSheetExport = ({
  title = "Cheat Sheet",
  targetSelector = ".markdown",
}: CheatSheetExportProps): JSX.Element => {
  const [pdfStatus, setPdfStatus] = useState<ExportStatus>("idle");
  const [imageStatus, setImageStatus] = useState<ExportStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = useCallback((setStatus: (s: ExportStatus) => void) => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => {
      setStatus("idle");
    }, RESET_DELAY_MS);
  }, []);

  /**
   * Converts a title into a safe lowercase filename slug.
   */
  const slugify = (value: string): string =>
    (value || "cheatsheet")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "cheatsheet";

  const captureCanvas = useCallback(async () => {
    if (typeof document === "undefined") {
      throw new Error("Export is only available in the browser.");
    }

    // Try specified targetSelector, then fall back to standard Docusaurus selectors
    const target =
      document.querySelector<HTMLElement>(targetSelector) ||
      document.querySelector<HTMLElement>(".theme-doc-markdown") ||
      document.querySelector<HTMLElement>("article") ||
      document.querySelector<HTMLElement>("main");

    if (!target) {
      throw new Error("Could not find the cheat sheet content on this page.");
    }

    const html2canvasModule: any = await import("html2canvas");
    const html2canvas = html2canvasModule.default || html2canvasModule;

    // Get true computed background color from body or root
    const computedBg =
      getComputedStyle(document.body).backgroundColor ||
      getComputedStyle(document.documentElement).getPropertyValue("--ifm-background-color").trim();

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const backgroundColor =
      computedBg && computedBg !== "rgba(0, 0, 0, 0)" && computedBg !== "transparent"
        ? computedBg
        : isDark
        ? "#1b1b1d"
        : "#ffffff";

    return html2canvas(target, {
      backgroundColor,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      scale: Math.min(
        2,
        typeof window !== "undefined" ? window.devicePixelRatio || 1.5 : 1.5
      ),
      // Exclude our toolbar from captured output
      ignoreElements: (el: Element) =>
        el.classList?.contains("cheatsheet-export-toolbar") ?? false,
    });
  }, [targetSelector]);

  const handleDownloadPdf = useCallback(async () => {
    setPdfStatus("working");
    setErrorMessage("");
    try {
      const canvas = await captureCanvas();
      const jsPDFModule: any = await import("jspdf");
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

      // Slice long cheat sheets across multiple print-friendly pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage([PDF_PAGE_WIDTH_PX, PDF_PAGE_HEIGHT_PX], "portrait");
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= PDF_PAGE_HEIGHT_PX;
      }

      pdf.save(`${slugify(title)}.pdf`);
      setPdfStatus("done");
    } catch (err) {
      console.error("[CheatSheetExport] PDF export failed:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "PDF export failed."
      );
      setPdfStatus("error");
    } finally {
      scheduleReset(setPdfStatus);
    }
  }, [captureCanvas, title, scheduleReset]);

  const handleCopyImage = useCallback(async () => {
    setImageStatus("working");
    setErrorMessage("");
    try {
      const canvas = await captureCanvas();
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((result: Blob | null) => resolve(result), "image/png")
      );
      if (!blob) {
        throw new Error("Could not generate an image from this page.");
      }

      const ClipboardItemCtor =
        typeof window !== "undefined"
          ? (window as any).ClipboardItem
          : undefined;

      let copiedToClipboard = false;

      if (navigator.clipboard && ClipboardItemCtor) {
        try {
          await navigator.clipboard.write([
            new ClipboardItemCtor({ "image/png": blob }),
          ]);
          copiedToClipboard = true;
        } catch (clipErr) {
          console.warn("[CheatSheetExport] Clipboard write blocked, falling back to download:", clipErr);
        }
      }

      if (!copiedToClipboard) {
        // Fallback to downloading image if clipboard API is unavailable or restricted
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${slugify(title)}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }

      setImageStatus("done");
    } catch (err) {
      console.error("[CheatSheetExport] Image export failed:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Image export failed."
      );
      setImageStatus("error");
    } finally {
      scheduleReset(setImageStatus);
    }
  }, [captureCanvas, title, scheduleReset]);

  const renderIcon = (
    status: ExportStatus,
    IdleIcon: React.ComponentType<{ size?: number; className?: string }>
  ) => {
    if (status === "working")
      return <FiLoader size={16} className={styles.spin} />;
    if (status === "done") return <FiCheck size={16} />;
    if (status === "error") return <FiAlertCircle size={16} />;
    return <IdleIcon size={16} />;
  };

  const pdfLabel = {
    idle: "Download PDF",
    working: "Preparing…",
    done: "Downloaded!",
    error: "Try again",
  }[pdfStatus];

  const imageLabel = {
    idle: "Copy as image",
    working: "Copying…",
    done: "Copied!",
    error: "Try again",
  }[imageStatus];

  return (
    <div className={`cheatsheet-export-toolbar no-print ${styles.toolbar}`}>
      <button
        type="button"
        className={styles.button}
        onClick={handleDownloadPdf}
        disabled={pdfStatus === "working"}
        aria-label={`Download ${title || "cheat sheet"} as PDF`}
      >
        {renderIcon(pdfStatus, FiDownload)}
        <span>{pdfLabel}</span>
      </button>

      <button
        type="button"
        className={styles.button}
        onClick={handleCopyImage}
        disabled={imageStatus === "working"}
        aria-label={`Copy ${title || "cheat sheet"} as an image`}
      >
        {renderIcon(imageStatus, FiImage)}
        <span>{imageLabel}</span>
      </button>

      {errorMessage && (pdfStatus === "error" || imageStatus === "error") && (
        <span className={styles.errorText} role="status">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default CheatSheetExport;


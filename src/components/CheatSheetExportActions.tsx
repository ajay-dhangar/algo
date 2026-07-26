import React, { useState } from "react";

interface CheatSheetExportActionsProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

type Html2Canvas = (
  element: HTMLElement,
  options?: Record<string, unknown>
) => Promise<HTMLCanvasElement>;

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Unable to create an image from this cheat sheet."));
    }, "image/png");
  });
}

async function captureCheatSheet(target: HTMLElement): Promise<HTMLCanvasElement> {
  const { default: html2canvas } = await import("html2canvas");
  return (html2canvas as unknown as Html2Canvas)(target, {
    backgroundColor: "#ffffff",
    scale: Math.min(window.devicePixelRatio || 1, 2),
    useCORS: true,
    logging: false,
    ignoreElements: (element: Element) =>
      element.hasAttribute("data-cheatsheet-export-exclude"),
    onclone: (clonedDocument: Document) => {
      const surface = clonedDocument.querySelector("[data-cheatsheet-export-surface]") as HTMLElement | null;
      if (surface) {
        surface.style.backgroundColor = "#ffffff";
        surface.style.color = "#172033";
        surface.style.padding = "24px";
      }
    },
  });
}

export default function CheatSheetExportActions({ targetRef }: CheatSheetExportActionsProps) {
  const [busy, setBusy] = useState<"pdf" | "image" | null>(null);
  const [message, setMessage] = useState("");

  const exportSheet = async (format: "pdf" | "image") => {
    const target = targetRef.current;
    if (!target || busy) return;

    setBusy(format);
    setMessage("");

    try {
      const canvas = await captureCheatSheet(target);

      if (format === "image") {
        const blob = await canvasToBlob(canvas);
        const clipboard = navigator.clipboard;

        if (!clipboard || typeof ClipboardItem === "undefined") {
          throw new Error("Image copying is not supported by this browser.");
        }

        await clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setMessage("Image copied");
      } else {
        const { jsPDF } = await import("jspdf");
        const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
        const margin = 10;
        const pageWidth = 210 - margin * 2;
        const pageHeight = 297 - margin * 2;
        const imageHeight = (canvas.height * pageWidth) / canvas.width;
        const pageCount = Math.ceil(imageHeight / pageHeight);

        for (let page = 0; page < pageCount; page += 1) {
          if (page > 0) pdf.addPage();
          pdf.addImage(canvas, "PNG", margin, margin - page * pageHeight, pageWidth, imageHeight);
        }

        const filename = `${document.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "cheatsheet"}.pdf`;
        pdf.save(filename);
        setMessage("PDF downloaded");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Export failed. Please try again.");
    } finally {
      setBusy(null);
      window.setTimeout(() => setMessage(""), 3500);
    }
  };

  return (
    <div
      data-cheatsheet-export-exclude
      className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/60"
      aria-label="Cheat sheet export actions"
    >
      <span className="mr-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
        Save for offline review
      </span>
      <button
        type="button"
        onClick={() => exportSheet("pdf")}
        disabled={busy !== null}
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-wait disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
      >
        {busy === "pdf" ? "Preparing PDF…" : "Download as PDF"}
      </button>
      <button
        type="button"
        onClick={() => exportSheet("image")}
        disabled={busy !== null}
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-wait disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
      >
        {busy === "image" ? "Copying image…" : "Copy as image"}
      </button>
      {message && (
        <span role="status" className="basis-full text-xs text-slate-500 dark:text-slate-400">
          {message}
        </span>
      )}
    </div>
  );
}

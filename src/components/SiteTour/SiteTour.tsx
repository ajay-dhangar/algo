import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  SITE_TOUR_STEPS,
  SITE_TOUR_STORAGE_KEY,
  type SiteTourStep,
  type TourPlacement,
} from "./siteTourSteps";
import styles from "./styles.module.css";

const START_TOUR_EVENT = "algo:start-tour";
const PADDING = 10;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getTargetRect(selector?: string): Rect | null {
  if (!selector || typeof document === "undefined") return null;
  const el = document.querySelector(selector);
  if (!el) return null;
  const box = el.getBoundingClientRect();
  if (box.width < 2 && box.height < 2) return null;
  return {
    top: box.top - PADDING,
    left: box.left - PADDING,
    width: box.width + PADDING * 2,
    height: box.height + PADDING * 2,
  };
}

function getCardPosition(
  rect: Rect | null,
  placement: TourPlacement = "bottom"
): React.CSSProperties {
  if (!rect) return {};

  const margin = 16;
  const cardWidth = 420;
  const cardHeight = 280;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top = rect.top + rect.height + margin;
  let left = rect.left + rect.width / 2 - cardWidth / 2;

  if (placement === "top") {
    top = rect.top - cardHeight - margin;
  } else if (placement === "right") {
    top = rect.top + rect.height / 2 - cardHeight / 2;
    left = rect.left + rect.width + margin;
  } else if (placement === "left") {
    top = rect.top + rect.height / 2 - cardHeight / 2;
    left = rect.left - cardWidth - margin;
  } else if (placement === "bottom") {
    top = rect.top + rect.height + margin;
  }

  left = Math.max(16, Math.min(left, vw - cardWidth - 16));
  top = Math.max(16, Math.min(top, vh - cardHeight - 16));

  return { top, left, transform: "none" };
}

export function startSiteTour(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(START_TOUR_EVENT));
  }
}

function normalizePath(path: string): string {
  const p = path.replace(/\/$/, "");
  return p || "/";
}

export default function SiteTour(): React.ReactElement | null {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const roadmapUrl = useBaseUrl("/docs/data-structures/roadmap-to-dsa");
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [mounted, setMounted] = useState(false);

  const step: SiteTourStep = SITE_TOUR_STEPS[stepIndex];
  const hasTarget = typeof document !== "undefined" && step.target ? !!document.querySelector(step.target) : false;
  const isCentered = !step.target || step.placement === "center" || !hasTarget;
  const total = SITE_TOUR_STEPS.length;

  const closeTour = useCallback((markComplete: boolean) => {
    setActive(false);
    setStepIndex(0);
    if (markComplete && typeof window !== "undefined") {
      try {
        localStorage.setItem(SITE_TOUR_STORAGE_KEY, "true");
      } catch (e) {
        console.warn("LocalStorage is not accessible:", e);
      }
    }
  }, []);

  const openTour = useCallback((fromStep = 0) => {
    setStepIndex(fromStep);
    setActive(true);
  }, []);

  const updateRect = useCallback(() => {
    if (!active) return;
    setTargetRect(getTargetRect(step.target));
  }, [active, step.target]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onStart = () => openTour(0);
    window.addEventListener(START_TOUR_EVENT, onStart);
    return () => window.removeEventListener(START_TOUR_EVENT, onStart);
  }, [openTour]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("tour") === "1") {
      openTour(0);
      params.delete("tour");
      const next = `${window.location.pathname}${
        params.toString() ? `?${params}` : ""
      }${window.location.hash}`;
      window.history.replaceState({}, "", next);
    } else {
      let completed = false;
      try {
        completed = !!localStorage.getItem(SITE_TOUR_STORAGE_KEY);
      } catch (e) {
        console.warn("LocalStorage is not accessible:", e);
      }
      if (!completed) {
        const base = normalizePath(siteConfig.baseUrl);
        const path = normalizePath(location.pathname);
        const isSiteHome = path === base;
        const isDocsHome = path === `${base}/docs`;
        if (isDocsHome || isSiteHome) {
          const timer = window.setTimeout(() => openTour(0), 800);
          return () => window.clearTimeout(timer);
        }
      }
    }
  }, [openTour, location.pathname, siteConfig.baseUrl]);

  useLayoutEffect(() => {
    updateRect();
  }, [updateRect, stepIndex, active]);

  useEffect(() => {
    if (!active) return;
    const onResize = () => updateRect();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [active, updateRect]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTour(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, closeTour]);

  if (!mounted) return null;

  const handleSkip = () => closeTour(true);
  const handleBack = () => setStepIndex((i) => Math.max(0, i - 1));
  const handleNext = () => {
    if (stepIndex >= total - 1) {
      closeTour(true);
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const cardStyle: React.CSSProperties = isCentered
    ? {}
    : getCardPosition(targetRect, step.placement ?? "bottom");

  const tourUi = (
    <>
      <button
        type="button"
        className={`button button--secondary button--sm ${styles.fab}`}
        onClick={() => openTour(0)}
        aria-label="Start site tour (8 steps)"
        title="How to use this site (8-step tour)"
      >
        Tour
      </button>

      {active && (
        <div className={styles.overlay} role="presentation">
          {isCentered && (
            <div
              className={styles.backdrop}
              onClick={handleSkip}
              aria-hidden="true"
            />
          )}
          {targetRect && !isCentered && (
            <div
              className={styles.spotlight}
              style={{
                top: targetRect.top,
                left: targetRect.left,
                width: targetRect.width,
                height: targetRect.height,
              }}
            />
          )}
          <div
            className={`${styles.card} ${isCentered ? styles.cardCentered : ""}`}
            style={cardStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="algo-site-tour-title"
          >
            <div className={styles.header}>
              <h2 id="algo-site-tour-title" className={styles.title}>
                {step.title}
              </h2>
              <button
                type="button"
                className={styles.skipBtn}
                onClick={handleSkip}
              >
                Skip tour
              </button>
            </div>

            <div className={styles.progress} aria-hidden="true">
              {SITE_TOUR_STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`${styles.dot} ${
                    i === stepIndex
                      ? styles.dotActive
                      : i < stepIndex
                        ? styles.dotDone
                        : ""
                  }`}
                />
              ))}
            </div>

            <p className={styles.body}>{step.body}</p>

            {!targetRect && step.hint && (
              <p className={styles.hint}>{step.hint}</p>
            )}

            {stepIndex === total - 1 && (
              <p className={styles.hint}>
                <Link to={roadmapUrl}>Open the DSA learning roadmap →</Link>
              </p>
            )}

            <div className={styles.footer}>
              <span className={styles.stepCount}>
                {stepIndex + 1} / {total}
              </span>
              <div className={styles.actions}>
                {stepIndex > 0 && (
                  <button
                    type="button"
                    className="button button--outline button--sm"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  className="button button--primary button--sm"
                  onClick={handleNext}
                >
                  {stepIndex >= total - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(tourUi, document.body);
}

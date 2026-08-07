import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

const SITE_URL = "https://ajay-dhangar.github.io";
const BASE_URL = "/algo";
const RSS_URL = `${SITE_URL}${BASE_URL}/algorithm-digest.xml`;
const BUTTONDOWN_URL = "https://buttondown.email/algo-digest";

type Timeframe = "weekly" | "monthly" | "all";

interface DigestEntry {
  id: string;
  title: string;
  description: string;
  permalink: string;
  category: string;
  tags: string[];
  author: string;
  pubDate: string;
  pubDateFormatted: string;
}

function useCopyText() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return { copied, copy };
}

function filterByTimeframe(items: DigestEntry[], timeframe: Timeframe) {
  if (timeframe === "all") return items;
  const now = new Date();
  const cutoff = new Date(now);
  if (timeframe === "weekly") cutoff.setDate(cutoff.getDate() - 7);
  else cutoff.setMonth(cutoff.getMonth() - 1);
  return items.filter((item) => new Date(item.pubDate) >= cutoff);
}

const CATEGORY_COLORS: Record<string, string> = {
  "basic-data-structures": "#6366f1",
  "dsa-problems": "#10b981",
  "data-structures": "#f59e0b",
  algorithms: "#3b82f6",
  extra: "#8b5cf6",
  cheatsheets: "#ec4899",
  default: "#6b7280",
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS.default;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function NewsletterPageInner() {
  const [items, setItems] = useState<DigestEntry[]>([]);
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { copied, copy } = useCopyText();

  useEffect(() => {
    // Load the JSON digest directly — no dependency on the XML RSS file.
    // The XML is a static asset for external feed readers; it adds no value
    // to the in-page data load and silently breaks it in local dev where the
    // static file may not be served.
    import("@site/src/data/generated/algorithmDigest.json")
      .then((mod) => {
        const data = (mod.default || mod) as DigestEntry[];
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        // JSON unavailable — page renders empty state, not a blank screen.
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const byTime = filterByTimeframe(items, timeframe);
    if (!search.trim()) return byTime;
    const q = search.toLowerCase();
    return byTime.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [items, timeframe, search]);

  return (
    <Layout
      title="Algorithm Digest & Newsletter"
      description="Subscribe to the Algo periodic digest: get notified of newly added DSA guides, tutorials, and problem walkthroughs via RSS or email."
    >
      <div style={{ minHeight: "100vh", padding: "0 0 80px" }}>
        {/* Hero Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
            padding: "80px 20px 64px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow orbs */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40px",
                left: "20%",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                right: "15%",
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
              }}
            />
          </div>

          <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.4)",
                borderRadius: 50,
                padding: "6px 16px",
                marginBottom: 24,
                fontSize: 13,
                color: "#a5b4fc",
                fontFamily: "monospace",
              }}
            >
              <span style={{ fontSize: 10, lineHeight: 1 }}>📡</span>
              RSS 2.0 · Weekly / Monthly Digest
            </div>

            <h1
              style={{
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 900,
                color: "#fff",
                margin: "0 0 18px",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Algorithm Digest &amp;{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #818cf8, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Newsletter
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(15px, 2.5vw, 18px)",
                color: "rgba(255,255,255,0.65)",
                maxWidth: 520,
                margin: "0 auto 40px",
                lineHeight: 1.7,
              }}
            >
              Stay notified whenever new DSA guides, problem walkthroughs, or
              visualizers are added. Subscribe via RSS or email digest.
            </p>

            {/* Action cards */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                justifyContent: "center",
              }}
            >
              {/* RSS Copy */}
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
                  minWidth: 280,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#f97316",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16 }}>
                    <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z" />
                    <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  RSS Feed
                </div>
                <div
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#a5b4fc",
                    wordBreak: "break-all",
                    width: "100%",
                  }}
                >
                  {RSS_URL}
                </div>
                <button
                  id="newsletter-rss-copy-btn"
                  onClick={() => copy(RSS_URL)}
                  style={{
                    background: copied ? "rgba(16,185,129,0.2)" : "rgba(249,115,22,0.15)",
                    border: `1px solid ${copied ? "rgba(16,185,129,0.5)" : "rgba(249,115,22,0.4)"}`,
                    borderRadius: 8,
                    padding: "7px 16px",
                    color: copied ? "#6ee7b7" : "#fb923c",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {copied ? "✓ Copied!" : "Copy RSS URL"}
                </button>
              </div>

              {/* Email Subscribe */}
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
                  minWidth: 280,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#818cf8",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <span style={{ fontSize: 16 }}>✉️</span>
                  Email Digest via Buttondown
                </div>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.5 }}>
                  Get a weekly or monthly email roundup of new algorithms
                  delivered to your inbox. Free &amp; unsubscribe anytime.
                </p>
                <a
                  id="newsletter-email-subscribe-btn"
                  href={BUTTONDOWN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 20px",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                    boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                >
                  Subscribe via Buttondown →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Digest Stream */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px 0" }}>
          {/* Controls */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 32,
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, flex: 1 }}>
              📚 Latest Algorithms
            </h2>
            <div style={{ display: "flex", gap: 8 }}>
              {(["weekly", "monthly", "all"] as Timeframe[]).map((t) => (
                <button
                  id={`newsletter-filter-${t}`}
                  key={t}
                  onClick={() => setTimeframe(t)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 20,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    transition: "all 0.2s",
                    background:
                      timeframe === t
                        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                        : "rgba(99,102,241,0.1)",
                    color: timeframe === t ? "#fff" : "var(--ifm-font-color-base)",
                    boxShadow: timeframe === t ? "0 2px 12px rgba(99,102,241,0.35)" : "none",
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <input
              id="newsletter-search-input"
              type="text"
              placeholder="Search algorithms…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                border: "1px solid rgba(99,102,241,0.3)",
                background: "rgba(99,102,241,0.06)",
                color: "var(--ifm-font-color-base)",
                fontSize: 13,
                outline: "none",
                minWidth: 180,
              }}
            />
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ifm-font-color-secondary)" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
              Loading digest…
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ifm-font-color-secondary)" }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>📭</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>No articles found</div>
              <div style={{ fontSize: 14 }}>Try switching to "All" or adjusting your search.</div>
            </div>
          )}

          {/* Article Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 18,
            }}
          >
            {filtered.slice(0, 60).map((item) => {
              const color = getCategoryColor(item.category);
              return (
                <a
                  key={item.id}
                  href={item.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    padding: "18px 20px",
                    borderRadius: 14,
                    border: "1px solid rgba(99,102,241,0.12)",
                    background: "var(--ifm-card-background-color, rgba(255,255,255,0.04))",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${color}22`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}55`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.12)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: 50,
                        fontSize: 11,
                        fontWeight: 700,
                        background: `${color}18`,
                        color,
                        letterSpacing: "0.04em",
                        maxWidth: 180,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.category}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--ifm-font-color-secondary)" }}>
                      {timeAgo(item.pubDate)}
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 15,
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "var(--ifm-heading-color)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--ifm-font-color-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.description}
                  </p>
                  {item.tags.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {item.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "2px 8px",
                            borderRadius: 50,
                            fontSize: 10,
                            fontWeight: 600,
                            background: "rgba(99,102,241,0.08)",
                            color: "var(--ifm-font-color-secondary)",
                            border: "1px solid rgba(99,102,241,0.15)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              );
            })}
          </div>

          {filtered.length > 60 && (
            <div style={{ textAlign: "center", marginTop: 32, color: "var(--ifm-font-color-secondary)", fontSize: 14 }}>
              Showing top 60 of {filtered.length} articles.{" "}
              <a href={RSS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>
                Subscribe to RSS
              </a>{" "}
              to see all.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

const NewsletterPage: React.FC = () => (
  <BrowserOnly fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading digest…</div>}>
    {() => <NewsletterPageInner />}
  </BrowserOnly>
);

export default NewsletterPage;

import React, { useState } from "react";

const RSS_URL = "https://ajay-dhangar.github.io/algo/algorithm-digest.xml";
const BUTTONDOWN_URL = "https://buttondown.email/algo-digest";

interface NewsletterWidgetProps {
  compact?: boolean;
}

const NewsletterWidget: React.FC<NewsletterWidgetProps> = ({ compact = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(RSS_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (compact) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          padding: "12px 16px",
          borderRadius: 10,
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--ifm-font-color-secondary)", flex: 1, minWidth: 160 }}>
          📡 Subscribe to Algorithm Digest
        </span>
        <a
          id="newsletter-widget-rss-compact"
          href={RSS_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="RSS Feed"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 12px",
            borderRadius: 6,
            background: "rgba(249,115,22,0.12)",
            border: "1px solid rgba(249,115,22,0.3)",
            color: "#fb923c",
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 12, height: 12 }}>
            <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z" />
            <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          RSS
        </a>
        <a
          id="newsletter-widget-email-compact"
          href={BUTTONDOWN_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 12px",
            borderRadius: 6,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ✉️ Email
        </a>
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f0c29cc, #302b63cc)",
        border: "1px solid rgba(99,102,241,0.25)",
        padding: "28px 28px 24px",
        maxWidth: 480,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          📡
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#fff", lineHeight: 1.2 }}>
            Algorithm Digest
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
            Weekly &amp; Monthly • RSS + Email
          </div>
        </div>
      </div>

      <p
        style={{
          margin: "0 0 20px",
          fontSize: 13,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.6,
        }}
      >
        Stay updated when new Data Structures &amp; Algorithm guides, problem solutions, and
        visualizers are published.
      </p>

      {/* RSS row */}
      <div
        style={{
          background: "rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <svg viewBox="0 0 20 20" fill="#f97316" style={{ width: 15, height: 15, flexShrink: 0 }}>
          <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z" />
          <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span
          style={{
            flex: 1,
            fontFamily: "monospace",
            fontSize: 11,
            color: "#a5b4fc",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {RSS_URL}
        </span>
        <button
          id="newsletter-widget-rss-copy"
          onClick={handleCopy}
          style={{
            padding: "4px 12px",
            borderRadius: 6,
            border: `1px solid ${copied ? "rgba(16,185,129,0.5)" : "rgba(249,115,22,0.4)"}`,
            background: copied ? "rgba(16,185,129,0.12)" : "rgba(249,115,22,0.12)",
            color: copied ? "#6ee7b7" : "#fb923c",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* Subscribe buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <a
          id="newsletter-widget-rss-link"
          href={RSS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            padding: "10px",
            borderRadius: 10,
            background: "rgba(249,115,22,0.12)",
            border: "1px solid rgba(249,115,22,0.3)",
            color: "#fb923c",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
        >
          Open RSS Feed
        </a>
        <a
          id="newsletter-widget-email-subscribe"
          href={BUTTONDOWN_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            padding: "10px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
            transition: "transform 0.15s",
          }}
        >
          ✉️ Subscribe
        </a>
      </div>

      <div style={{ marginTop: 14, textAlign: "center" }}>
        <a
          href="/algo/newsletter"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
        >
          View full digest →
        </a>
      </div>
    </div>
  );
};

export default NewsletterWidget;

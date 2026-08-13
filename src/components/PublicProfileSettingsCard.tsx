import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiShare2, 
  FiCopy, 
  FiExternalLink, 
  FiCheckCircle, 
  FiChevronDown, 
  FiGlobe, 
  FiUser, 
  FiAlignLeft 
} from "react-icons/fi";
import { 
  getPublicProfileSettings, 
  savePublicProfileSettings, 
  getPublicProfileBadgeMarkdown 
} from "../utils/publicProfile";

interface SectionField {
  key: "showSolvedProblems" | "showQuizMastery" | "showStreak" | "allowBadgeEmbed";
  label: string;
  description: string;
  help: string;
}

const sectionFields: SectionField[] = [
  {
    key: "showSolvedProblems",
    label: "Show solved problems",
    description: "Display your solved problem tally on the public profile page.",
    help: "This option exposes your solved count so recruiters can quickly see your learning progress.",
  },
  {
    key: "showQuizMastery",
    label: "Show quiz mastery badges",
    description: "Reveal your quiz performance on the public profile page.",
    help: "When enabled, your quiz mastery section can be shown as part of your public profile.",
  },
  {
    key: "showStreak",
    label: "Show streak",
    description: "Include your current streak in the public profile summary.",
    help: "This shows how many consecutive days you have been active in Algo.",
  },
  {
    key: "allowBadgeEmbed",
    label: "Allow badge embed for GitHub README",
    description: "Provide an embeddable badge for README files.",
    help: "This allows other people to copy badge markdown and add your public profile badge to GitHub or docs.",
  },
];

/** Card component for editing and saving public profile visibility settings, with clipboard copy support. */
const PublicProfileSettingsCard = (): React.ReactElement => {
  const [settings, setSettings] = useState(() => 
    getPublicProfileSettings() || {
      isPublic: false,
      username: "",
      displayName: "",
      bio: "",
      showSolvedProblems: true,
      showQuizMastery: true,
      showStreak: true,
      allowBadgeEmbed: false,
    }
  );
  const [copyMessage, setCopyMessage] = useState("");
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current); }, []);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const profileUrl = typeof window !== "undefined" && settings.username.trim()
    ? `${window.location.origin}/algo/u/${settings.username.trim()}`
    : "";

  const badgeMarkdown = settings.username.trim()
    ? getPublicProfileBadgeMarkdown(settings.username.trim())
    : "";

  useEffect(() => {
    const current = getPublicProfileSettings();
    if (current) {
      setSettings(current);
    }
  }, []);

  const save = (next: typeof settings) => {
    setSettings(next);
    savePublicProfileSettings(next);
  };

  const copyToClipboard = async (text: string, label: string) => {
    if (!text) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopyMessage(`${label} copied!`);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyMessage(""), 2500);
    } catch {
      setCopyMessage(`Unable to copy ${label}`);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyMessage(""), 2500);
    }
  };

  const shareProfile = async () => {
    if (!profileUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({ 
          title: `${settings.displayName || settings.username}'s Algo Profile`, 
          url: profileUrl 
        });
        return;
      } catch {
        // Fallback to copy on user cancel or unsupported share API
      }
    }

    await copyToClipboard(profileUrl, "Profile URL");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border p-6 sm:p-7 shadow-sm transition-colors duration-300"
      style={{
        backgroundColor: "var(--ifm-card-background-color)",
        borderColor: "var(--ifm-color-emphasis-200)",
      }}
    >
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5" style={{ borderColor: "var(--ifm-color-emphasis-200)" }}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)]">
              <FiGlobe className="w-4 h-4" />
            </span>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--ifm-color-primary)] m-0">
              Visibility & Sharing
            </p>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight m-0" style={{ color: "var(--ifm-heading-color)" }}>
            Shareable Public Profile
          </h3>
        </div>

        {/* Public Toggle Switch */}
        <label className="inline-flex items-center gap-3 cursor-pointer select-none self-start sm:self-auto bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)] px-4 py-2 rounded-2xl">
          <span className="text-xs font-bold uppercase tracking-wider opacity-80">
            {settings.isPublic ? "Public On" : "Private"}
          </span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.isPublic}
              onChange={(e) => save({ ...settings, isPublic: e.target.checked })}
            />
            <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
              settings.isPublic ? "bg-[var(--ifm-color-primary)]" : "bg-[var(--ifm-color-emphasis-300)]"
            }`} />
            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
              settings.isPublic ? "transform translate-x-5" : ""
            }`} />
          </div>
        </label>
      </div>

      <p className="mt-4 text-xs sm:text-sm opacity-75 leading-relaxed m-0">
        Make your learning progress, streak counters, and solved problems visible to recruiters or study partners with a dedicated link.
      </p>

      {/* Copy Notification Toast */}
      <AnimatePresence>
        {copyMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400"
          >
            <FiCheckCircle className="w-4 h-4" />
            <span>{copyMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Public Page Link Box */}
      {settings.username.trim() && (
        <div className="mt-5 rounded-2xl border p-4 bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)] space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-60 block">
            Public Profile URL
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="truncate text-xs font-mono opacity-80 bg-[var(--ifm-card-background-color)] px-3 py-2 rounded-xl border border-[var(--ifm-color-emphasis-200)]">
              {profileUrl}
            </span>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={shareProfile}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--ifm-color-primary)] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-90 border-0 cursor-pointer"
              >
                <FiShare2 className="w-3.5 h-3.5" /> Share
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(badgeMarkdown, "Badge markdown")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-card-background-color)] px-3.5 py-2 text-xs font-bold opacity-80 transition hover:opacity-100 cursor-pointer"
              >
                <FiCopy className="w-3.5 h-3.5" /> Badge MD
              </button>
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-card-background-color)] px-3.5 py-2 text-xs font-bold opacity-80 transition hover:opacity-100 no-underline hover:no-underline cursor-pointer"
              >
                <FiExternalLink className="w-3.5 h-3.5" /> Open
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Inputs Form Section */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 block">
          <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
            <FiUser className="w-3.5 h-3.5 text-[var(--ifm-color-primary)]" /> Username
          </span>
          <input
            className="w-full rounded-2xl border bg-[var(--ifm-card-background-color)] border-[var(--ifm-color-emphasis-300)] px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-[var(--ifm-color-primary)] transition-colors"
            value={settings.username}
            onChange={(e) => save({ ...settings, username: e.target.value })}
            placeholder="your-handle"
          />
        </label>

        <label className="space-y-1.5 block">
          <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
            <FiUser className="w-3.5 h-3.5 text-[var(--ifm-color-primary)]" /> Display Name
          </span>
          <input
            className="w-full rounded-2xl border bg-[var(--ifm-card-background-color)] border-[var(--ifm-color-emphasis-300)] px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-[var(--ifm-color-primary)] transition-colors"
            value={settings.displayName}
            onChange={(e) => save({ ...settings, displayName: e.target.value })}
            placeholder="Ada Lovelace"
          />
        </label>
      </div>

      <label className="mt-4 space-y-1.5 block">
        <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
          <FiAlignLeft className="w-3.5 h-3.5 text-[var(--ifm-color-primary)]" /> Short Bio
        </span>
        <textarea
          className="min-h-[90px] w-full rounded-2xl border bg-[var(--ifm-card-background-color)] border-[var(--ifm-color-emphasis-300)] p-3.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-[var(--ifm-color-primary)] transition-colors resize-y"
          value={settings.bio}
          onChange={(e) => save({ ...settings, bio: e.target.value })}
          placeholder="Tell people what you are learning..."
        />
      </label>

      {/* Accordion Privacy Controls */}
      <div className="mt-6 space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest opacity-60 block mb-2">
          Display Preferences
        </span>
        {sectionFields.map((section) => {
          const isActive = expandedSection === section.key;
          const checked = settings[section.key] as boolean;

          return (
            <div
              key={section.key}
              className="rounded-2xl border bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)] transition-all overflow-hidden"
            >
              <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => save({ ...settings, [section.key]: e.target.checked })}
                    className="w-4 h-4 rounded border-[var(--ifm-color-emphasis-300)] text-[var(--ifm-color-primary)] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-bold">{section.label}</span>
                </label>

                <button
                  type="button"
                  onClick={() => setExpandedSection(isActive ? null : section.key)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold opacity-60 hover:opacity-100 transition-opacity border-0 bg-transparent cursor-pointer"
                >
                  <span>{isActive ? "Less" : "Details"}</span>
                  <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Expandable Info Drawer */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t px-4 py-3 bg-[var(--ifm-card-background-color)] space-y-2"
                    style={{ borderColor: "var(--ifm-color-emphasis-200)" }}
                  >
                    <p className="text-xs font-bold m-0">{section.description}</p>
                    <p className="text-xs opacity-75 m-0 leading-relaxed">{section.help}</p>

                    {section.key === "allowBadgeEmbed" && settings.username.trim() && (
                      <div className="mt-3 pt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(badgeMarkdown, "Badge markdown")}
                          className="rounded-xl border border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-color-emphasis-100)] px-3 py-1.5 text-xs font-bold opacity-80 transition hover:opacity-100 cursor-pointer"
                        >
                          Copy README Badge
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(profileUrl, "Profile URL")}
                          className="rounded-xl border border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-color-emphasis-100)] px-3 py-1.5 text-xs font-bold opacity-80 transition hover:opacity-100 cursor-pointer"
                        >
                          Copy Profile Link
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PublicProfileSettingsCard;

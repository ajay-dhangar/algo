import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight, FiLogOut, FiUser, FiMail, FiCalendar,
  FiShield, FiActivity, FiCpu, FiAward, FiClock, FiCheckCircle,
  FiZap, FiKey, FiTerminal, FiLayers, FiTrendingUp
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import PracticeActivityHeatmapWidget from "../components/PracticeActivityHeatmapWidget";
import PracticeActivitySummaryCard from "../components/PracticeActivitySummaryCard";
import PublicProfileSettingsCard from "../components/PublicProfileSettingsCard";
import QuizStreakWidget from "../components/QuizStreakWidget";

type DashboardTab = "overview" | "metrics" | "security";

interface TelemetryStats {
  completedCount: number;
  recentTopics: string[];
}

/** Profile page — developer identity dashboard with telemetry, streak, and public profile settings. */
const ProfilePage = (): React.ReactElement => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  const [telemetry, setTelemetry] = useState<TelemetryStats>({
    completedCount: 0,
    recentTopics: []
  });

  const parseTelemetryData = () => {
    try {
      const saved = localStorage.getItem("algo_progress");
      if (saved) {
        const progress = JSON.parse(saved);
        const totalMastered = Object.keys(progress).filter(
          (key) => !key.endsWith("_title") && !key.endsWith("_updatedAt") && progress[key] === true
        ).length;

        const topics = Object.keys(progress)
          .filter((key) => key.endsWith("_title"))
          .map((key) => progress[key])
          .reverse()
          .slice(0, 4);

        setTelemetry({ completedCount: totalMastered, recentTopics: topics });
      }
    } catch {
      // localStorage parse failed — telemetry stays at default zero state.
    }
  };

  useEffect(() => {
    parseTelemetryData();
    const handleProgressUpdate = () => parseTelemetryData();
    window.addEventListener("progressUpdated", handleProgressUpdate);
    return () => window.removeEventListener("progressUpdated", handleProgressUpdate);
  }, []);

  const joinDate = useMemo(() => {
    if (!user?.createdAt) {
      return new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    return new Date(user.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }, [user]);

  const metrics = useMemo(() => [
    {
      label: "Algorithmic XP",
      value: isAuthenticated ? `${(telemetry.completedCount * 120).toLocaleString()} XP` : "0 XP",
      icon: <FiAward className="w-5 h-5 text-amber-500" />,
      change: "+12% this week"
    },
    {
      label: "Nodes Mastered",
      value: isAuthenticated ? `${telemetry.completedCount} Core Nodes` : "0 Nodes",
      icon: <FiCpu className="w-5 h-5 text-blue-500" />,
      change: "Active Workspace"
    },
    {
      label: "Active Daily Streak",
      value: isAuthenticated ? "6 Days" : "0 Days",
      icon: <FiActivity className="w-5 h-5 text-emerald-500" />,
      change: "Personal Best"
    },
    {
      label: "Lab Sandbox Time",
      value: isAuthenticated ? "14.2 hrs" : "0.0 hrs",
      icon: <FiClock className="w-5 h-5 text-indigo-500" />,
      change: "Runtime Engine"
    },
  ], [telemetry.completedCount, isAuthenticated]);

  const tabOptions: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <FiLayers className="w-4 h-4" /> },
    { id: "metrics", label: "Telemetry & Stats", icon: <FiActivity className="w-4 h-4" /> },
    { id: "security", label: "Security & Auth", icon: <FiShield className="w-4 h-4" /> },
  ];

  const userInitials = useMemo(() => {
    if (!user?.name) return "G";
    return user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  }, [user]);

  return (
    <Layout title="Developer Identity & Profile" description="Manage your workspace telemetry identity.">
      <main
        className="min-h-[calc(100vh-3.7rem)] relative overflow-hidden px-4 sm:px-6 lg:px-8 py-6 md:py-10 font-sans selection:bg-[var(--ifm-color-primary)] selection:text-white"
        style={{
          background: "var(--ifm-color-emphasis-100)",
          color: "var(--ifm-font-color-base)"
        }}
      >
        {/* Subtle Ambient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[var(--ifm-color-primary)]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">

          {/* Header Card */}
          <section
            className="rounded-3xl border p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm backdrop-blur-xl transition-all relative overflow-hidden"
            style={{
              backgroundColor: "var(--ifm-card-background-color)",
              borderColor: "var(--ifm-color-emphasis-200)"
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 z-10">
              <div className="relative shrink-0 self-start sm:self-auto">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl flex items-center justify-center font-black text-2xl text-white bg-gradient-to-tr from-[var(--ifm-color-primary-dark)] to-[var(--ifm-color-primary)] shadow-lg shadow-[var(--ifm-color-primary)]/20 border-2 border-white/20">
                  {isAuthenticated && user ? userInitials : <FiUser className="w-10 h-10" />}
                </div>
                <span
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[var(--ifm-card-background-color)] ${
                    isAuthenticated ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight m-0 truncate" style={{ color: "var(--ifm-heading-color)" }}>
                    {isAuthenticated && user ? user.name : "Guest Developer"}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)] opacity-90">
                    <FiTerminal className="w-3.5 h-3.5 text-[var(--ifm-color-primary)]" /> Dev v2.4
                  </span>
                </div>

                <p className="m-0 text-xs sm:text-sm opacity-70 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-medium">
                  <span className="truncate">{isAuthenticated ? user?.email ?? "Verified Account" : "Guest Sandbox"}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Joined {isAuthenticated ? joinDate : "N/A"}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--ifm-color-emphasis-200)] shrink-0 z-10">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="w-full md:w-auto inline-flex items-center gap-2 justify-center rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white px-5 py-3 text-xs font-bold transition-all cursor-pointer border border-rose-500/20 active:scale-95"
                >
                  <FiLogOut className="w-4 h-4" /> Terminate Session
                </button>
              ) : (
                <div className="grid grid-cols-2 md:flex items-center gap-3 w-full md:w-auto">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 justify-center rounded-xl bg-[var(--ifm-color-primary)] hover:opacity-90 px-5 py-3 text-xs font-bold text-white no-underline transition-all shadow-md active:scale-95"
                  >
                    Authenticate <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-xs font-semibold no-underline transition-all hover:bg-[var(--ifm-color-emphasis-100)] active:scale-95"
                    style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Navigation Controls */}
          <nav aria-label="Dashboard views" className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl border bg-[var(--ifm-card-background-color)] border-[var(--ifm-color-emphasis-200)] no-scrollbar shadow-sm">
            {tabOptions.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-0 cursor-pointer whitespace-nowrap ${
                    isActive ? "text-white" : "opacity-70 hover:opacity-100 bg-transparent"
                  }`}
                  style={{ color: isActive ? "#ffffff" : "var(--ifm-heading-color)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 rounded-xl bg-[var(--ifm-color-primary)] shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon} {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Bento Grid Content */}
          <div className="grid gap-6 lg:grid-cols-12 items-start">

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              <div
                className="rounded-3xl border p-6 space-y-5 shadow-sm"
                style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-[var(--ifm-color-emphasis-200)]">
                  <h2 className="text-xs font-extrabold tracking-wider uppercase opacity-60 m-0">Identity Context</h2>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3.5 items-center text-sm">
                    <div className="p-3 rounded-2xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)] shrink-0">
                      <FiMail className="opacity-70 w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="m-0 text-[10px] uppercase font-bold opacity-50 tracking-wider">Email Context</p>
                      <p className="m-0 truncate font-bold text-xs sm:text-sm mt-0.5" style={{ color: "var(--ifm-heading-color)" }}>
                        {user?.email ?? "Anonymous User"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-center text-sm">
                    <div className="p-3 rounded-2xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)] shrink-0">
                      <FiCalendar className="opacity-70 w-4 h-4" />
                    </div>
                    <div>
                      <p className="m-0 text-[10px] uppercase font-bold opacity-50 tracking-wider">Registered Since</p>
                      <p className="m-0 font-bold text-xs sm:text-sm mt-0.5" style={{ color: "var(--ifm-heading-color)" }}>
                        {isAuthenticated ? joinDate : "Not Registered"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-center text-sm">
                    <div className="p-3 rounded-2xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)] shrink-0">
                      <FiZap className="opacity-70 w-4 h-4" />
                    </div>
                    <div>
                      <p className="m-0 text-[10px] uppercase font-bold opacity-50 tracking-wider">Execution Engine</p>
                      <p className="m-0 font-bold text-xs sm:text-sm mt-0.5" style={{ color: "var(--ifm-heading-color)" }}>
                        Algo Telemetry Node
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Streak Widget */}
              <QuizStreakWidget />
            </div>

            {/* Main Column */}
            <div className="lg:col-span-8 min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-6 grid-cols-1 md:grid-cols-2"
                  >
                    {/* Runtime Card */}
                    <div
                      className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4"
                      style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-50">Runtime State</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            Live
                          </span>
                        </div>
                        <p className="mt-4 text-xl font-black m-0" style={{ color: "var(--ifm-heading-color)" }}>
                          {isAuthenticated ? "Standard Instance" : "Anonymous Sandbox"}
                        </p>
                        <p className="text-xs opacity-75 mt-2 m-0 leading-relaxed font-normal">
                          {isAuthenticated
                            ? "Your profile configuration is bound directly to local browser storage schemas."
                            : "Log in or construct a user node to sync your learning progress."}
                        </p>
                      </div>
                    </div>

                    {/* Auth Launch Card */}
                    <div
                      className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4"
                      style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <FiKey className="w-4 h-4 text-[var(--ifm-color-primary)]" />
                          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-50">Credentials</span>
                        </div>
                        <p className="mt-3 text-lg font-bold m-0" style={{ color: "var(--ifm-heading-color)" }}>
                          Identity Control
                        </p>
                        <p className="text-xs opacity-75 mt-2 m-0 leading-relaxed font-normal">
                          Manage auth protocols, view access keys, or reset state tokens seamlessly.
                        </p>
                      </div>
                      <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-xs font-bold no-underline text-[var(--ifm-color-primary)] hover:underline"
                      >
                        Launch Auth Control <FiArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Full Row Widget Inputs */}
                    <div className="md:col-span-2">
                      <PublicProfileSettingsCard />
                    </div>

                    <div className="md:col-span-2">
                      <PracticeActivitySummaryCard />
                    </div>

                    <div className="md:col-span-2">
                      <PracticeActivityHeatmapWidget />
                    </div>

                    {/* Recent Commits Log */}
                    {isAuthenticated && telemetry.recentTopics.length > 0 && (
                      <div
                        className="rounded-3xl border p-6 shadow-sm md:col-span-2 space-y-4"
                        style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-[var(--ifm-color-emphasis-200)]">
                          <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0 flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-500 w-4 h-4" /> Recent Commits Saved
                          </p>
                          <span className="text-[10px] font-semibold opacity-50">Auto-synced</span>
                        </div>
                        <div className="divide-y divide-[var(--ifm-color-emphasis-200)]">
                          {telemetry.recentTopics.map((title, idx) => (
                            <div key={idx} className="py-3 text-xs font-bold flex items-center justify-between first:pt-0 last:pb-0 group">
                              <span className="truncate opacity-80 group-hover:opacity-100 transition-opacity pr-2">{title}</span>
                              <span className="text-emerald-500 uppercase text-[10px] font-extrabold tracking-wider shrink-0 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                                Compiled
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "metrics" && (
                  <motion.div
                    key="metrics"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    {metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-3xl border p-6 flex items-start justify-between shadow-sm hover:border-[var(--ifm-color-primary)] transition-all"
                        style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                      >
                        <div className="space-y-1">
                          <p className="m-0 text-xs opacity-60 font-bold">{m.label}</p>
                          <p className="m-0 text-2xl font-black" style={{ color: "var(--ifm-heading-color)" }}>{m.value}</p>
                          <p className="m-0 text-[10px] font-bold text-emerald-500 flex items-center gap-1 pt-1">
                            <FiTrendingUp className="w-3 h-3" /> {m.change}
                          </p>
                        </div>
                        <div className="p-3.5 border rounded-2xl shrink-0 bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)]">
                          {m.icon}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-3xl border p-6 sm:p-8 space-y-6 shadow-sm"
                    style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                  >
                    <div className="flex gap-4 items-start">
                      <div className="p-3.5 rounded-2xl bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)] shrink-0">
                        <FiShield className="w-6 h-6" />
                      </div>
                      <div className="space-y-1.5">
                        <h2 className="m-0 text-base sm:text-lg font-bold" style={{ color: "var(--ifm-heading-color)" }}>
                          Security & Browser Persistence Perimeter
                        </h2>
                        <p className="m-0 text-xs sm:text-sm opacity-75 leading-relaxed font-normal">
                          Your records stay locked locally in your browser runtime context. Connecting database infrastructure models will port over existing local progress keys seamlessly.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProfilePage;

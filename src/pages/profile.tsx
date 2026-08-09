import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, FiLogOut, FiUser, FiMail, FiCalendar,
  FiShield, FiActivity, FiCpu, FiAward, FiClock, FiCheckCircle, 
  FiZap, FiKey, FiTerminal, FiLayers
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

export default function ProfilePage() {
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
    } catch (error) {
      console.error("[Telemetry Engine] Failed parsing workspace tracking logs:", error);
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
    <Layout title="Developer Identity & Profile" description="Manage your Algo workspace telemetry identity.">
      <main 
        className="min-h-[calc(100vh-3.7rem)] relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans transition-colors duration-300"
        style={{ 
          background: "var(--ifm-color-emphasis-100)",
          color: "var(--ifm-font-color-base)"
        }}
      >
        {/* Subtle Platform Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ifm-color-emphasis-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--ifm-color-emphasis-200)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30 dark:opacity-10" />

        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative z-10">
          
          {/* Header Identity Core Strip */}
          <div 
            className="rounded-3xl border p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm backdrop-blur-md transition-all"
            style={{ 
              backgroundColor: "var(--ifm-card-background-color)", 
              borderColor: "var(--ifm-color-emphasis-200)" 
            }}
          >
            <div className="flex items-center gap-5">
              {/* Avatar Frame with Ring Glow */}
              <div className="relative group">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl flex items-center justify-center font-extrabold text-xl sm:text-2xl text-white shrink-0 bg-gradient-to-tr from-[var(--ifm-color-primary-dark)] to-[var(--ifm-color-primary)] shadow-md border-2 border-white/20">
                  {isAuthenticated && user ? userInitials : <FiUser className="w-8 h-8" />}
                </div>
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[var(--ifm-card-background-color)] ${isAuthenticated ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight m-0" style={{ color: "var(--ifm-heading-color)" }}>
                    {isAuthenticated && user ? user.name : "Guest Session"}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)] opacity-90">
                    <FiTerminal className="w-3 h-3 text-[var(--ifm-color-primary)]" /> Dev v2.4
                  </span>
                </div>

                <p className="m-0 text-xs sm:text-sm opacity-70 flex items-center gap-2 font-medium">
                  <span>{isAuthenticated ? user?.email ?? "Verified User" : "Unauthenticated Execution Sandbox"}</span>
                  <span>•</span>
                  <span>Member since {isAuthenticated ? joinDate : "N/A"}</span>
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t md:border-t-0 md:pt-0 border-[var(--ifm-color-emphasis-200)]">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 justify-center rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white px-4 py-2.5 text-xs font-bold transition-all cursor-pointer border border-rose-500/20 active:scale-95"
                >
                  <FiLogOut className="w-4 h-4" /> Terminate Session
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 justify-center rounded-xl bg-[var(--ifm-color-primary)] hover:opacity-90 px-5 py-2.5 text-xs font-bold text-white no-underline transition-all shadow-sm active:scale-95"
                  >
                    Authenticate Identity <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-xs font-semibold no-underline transition-all hover:bg-[var(--ifm-color-emphasis-100)] active:scale-95"
                    style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
                  >
                    Register Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Segmented Control Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl border bg-[var(--ifm-card-background-color)] border-[var(--ifm-color-emphasis-200)] no-scrollbar">
            {tabOptions.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-0 cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? "text-white shadow-sm" 
                      : "opacity-70 hover:opacity-100 bg-transparent"
                  }`}
                  style={{ color: isActive ? "#ffffff" : "var(--ifm-heading-color)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 rounded-xl bg-[var(--ifm-color-primary)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon} {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Responsive Layout Grid */}
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            
            {/* Sidebar Profile Card */}
            <div className="lg:col-span-4 space-y-6">
              <div 
                className="rounded-3xl border p-6 space-y-6 shadow-sm"
                style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
              >
                <div className="flex items-center justify-between pb-4 border-b border-[var(--ifm-color-emphasis-200)]">
                  <h3 className="text-xs font-extrabold tracking-wider uppercase opacity-60 m-0">Identity Metadata</h3>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3.5 items-center text-sm">
                    <div className="p-2.5 rounded-xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)] shrink-0">
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
                    <div className="p-2.5 rounded-xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)] shrink-0">
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
                    <div className="p-2.5 rounded-xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)] shrink-0">
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

              {/* Quiz Streak Widget Sidebar Block */}
              <QuizStreakWidget />
            </div>

            {/* Dynamic Main Workspace Content */}
            <div className="lg:col-span-8 min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-6 sm:grid-cols-2"
                  >
                    {/* Status Card */}
                    <div 
                      className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4"
                      style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-50">Runtime State</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500">Live</span>
                        </div>
                        <p className="mt-3 text-xl font-black m-0" style={{ color: "var(--ifm-heading-color)" }}>
                          {isAuthenticated ? "Standard Instance" : "Anonymous Sandbox"}
                        </p>
                        <p className="text-xs opacity-75 mt-2 m-0 leading-relaxed font-normal">
                          {isAuthenticated 
                            ? "Your profile configuration is bound directly to local browser storage schemas."
                            : "Log in or construct a user node to sync your learning progress."}
                        </p>
                      </div>
                    </div>

                    <PublicProfileSettingsCard />

                    {/* Credential Card */}
                    <div 
                      className="rounded-3xl border p-6 shadow-sm flex flex-col justify-between space-y-4"
                      style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <FiKey className="w-4 h-4 text-[var(--ifm-color-primary)]" />
                          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-50">Credentials</span>
                        </div>
                        <p className="mt-2 text-lg font-bold m-0" style={{ color: "var(--ifm-heading-color)" }}>
                          Identity Control
                        </p>
                        <p className="text-xs opacity-75 mt-1 m-0 leading-relaxed">
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

                    <PracticeActivitySummaryCard />

                    {/* Full Width Activity Heatmap */}
                    <div className="sm:col-span-2">
                      <PracticeActivityHeatmapWidget />
                    </div>

                    {/* Industrial Recent Activity Log */}
                    {isAuthenticated && telemetry.recentTopics.length > 0 && (
                      <div 
                        className="rounded-3xl border p-6 shadow-sm sm:col-span-2 space-y-4"
                        style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[var(--ifm-color-emphasis-200)]">
                          <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0 flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-500 w-4 h-4" /> Recent Commits Saved
                          </p>
                          <span className="text-[10px] font-semibold opacity-50">Auto-synced</span>
                        </div>
                        <div className="divide-y divide-[var(--ifm-color-emphasis-200)]">
                          {telemetry.recentTopics.map((title, idx) => (
                            <div key={idx} className="py-3 text-xs font-bold flex items-center justify-between first:pt-0 last:pb-0 group">
                              <span className="truncate opacity-80 group-hover:opacity-100 transition-opacity">{title}</span>
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
                          <p className="m-0 text-[10px] font-semibold opacity-50 pt-1">{m.change}</p>
                        </div>
                        <div className="p-3 border rounded-2xl shrink-0" style={{ backgroundColor: "var(--ifm-color-emphasis-100)", borderColor: "var(--ifm-color-emphasis-200)" }}>
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
                      <div className="p-3 rounded-2xl bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)] shrink-0">
                        <FiShield className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="m-0 text-lg font-bold" style={{ color: "var(--ifm-heading-color)" }}>
                          Security & Browser Persistence Perimeter
                        </h4>
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
}
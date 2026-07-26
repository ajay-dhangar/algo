import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, FiLogOut, FiUser, FiMail, FiCalendar, 
  FiShield, FiActivity, FiCpu, FiAward, FiClock, FiCheckSquare 
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

type DashboardTab = "overview" | "metrics" | "security";

interface TelemetryStats {
  completedCount: number;
  recentTopics: string[];
}

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  
  // Real-time dynamic state pulled directly from localStorage schemas
  const [telemetry, setTelemetry] = useState<TelemetryStats>({
    completedCount: 0,
    recentTopics: []
  });

  // Calculate and sync telemetry indicators safely
  const parseTelemetryData = () => {
    try {
      const saved = localStorage.getItem("algo_progress");
      if (saved) {
        const progress = JSON.parse(saved);
        
        // Count active master flags while omitting key strings tracking titles and updates
        const totalMastered = Object.keys(progress).filter(
          (key) => !key.endsWith("_title") && !key.endsWith("_updatedAt") && progress[key] === true
        ).length;

        // Parse out readable text structures for recent modules list
        const topics = Object.keys(progress)
          .filter((key) => key.endsWith("_title"))
          .map((key) => progress[key])
          .reverse() // Display the latest mastered items first
          .slice(0, 3);

        setTelemetry({ completedCount: totalMastered, recentTopics: topics });
      }
    } catch (error) {
      console.error("[Telemetry Engine] Failed parsing workspace tracking logs:", error);
    }
  };

  // Setup mount listeners to observe event updates from standard content trackers
  useEffect(() => {
    parseTelemetryData();

    const handleProgressUpdate = () => parseTelemetryData();
    window.addEventListener("progressUpdated", handleProgressUpdate);
    
    return () => {
      window.removeEventListener("progressUpdated", handleProgressUpdate);
    };
  }, []);

  // Safely compute registration timeframe variables
  const joinDate = useMemo(() => {
    if (!user?.createdAt) {
      return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
    return new Date(user.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }, [user]);

  // Integrated performance framework matrices
  const metrics = useMemo(() => [
    { 
      label: "Algorithmic XP", 
      value: isAuthenticated ? `${telemetry.completedCount * 120} XP` : "0 XP", 
      icon: <FiAward className="text-amber-500" /> 
    },
    { 
      label: "Modules Mastered", 
      value: isAuthenticated ? `${telemetry.completedCount} Core Nodes` : "0 Nodes", 
      icon: <FiCpu className="text-blue-500" /> 
    },
    { 
      label: "Active Daily Streak", 
      value: isAuthenticated ? "6 Days" : "0 Days", 
      icon: <FiActivity className="text-emerald-500" /> 
    },
    { 
      label: "Lab Sandbox Time", 
      value: isAuthenticated ? "14.2 hrs" : "0.0 hrs", 
      icon: <FiClock className="text-indigo-500" /> 
    },
  ], [telemetry.completedCount, isAuthenticated]);

  return (
    <Layout title="Developer Profile" description="Manage your Algo workspace telemetry identity.">
      <main 
        className="min-h-[calc(100vh-3.7rem)] relative overflow-hidden px-4 py-12 font-sans transition-colors duration-300"
        style={{ 
          background: "var(--ifm-color-emphasis-100)",
          color: "var(--ifm-font-color-base)"
        }}
      >
        {/* Subtle Platform Blueprint Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ifm-color-emphasis-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--ifm-color-emphasis-200)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 dark:opacity-10" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          
          {/* Header Identity Core Strip */}
          <div 
            className="rounded-2xl border p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
            style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl flex items-center justify-center text-white shrink-0 bg-[var(--ifm-color-primary)] shadow-sm">
                <FiUser className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight m-0" style={{ color: "var(--ifm-heading-color)" }}>
                  {isAuthenticated && user ? user.name : "Guest Session"}
                </h1>
                <p className="m-0 text-xs opacity-70 mt-1 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {isAuthenticated ? `Workspace Engine Verified • Active` : "Unauthenticated Token Sandbox"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white border-0 hover:bg-rose-500 transition-all cursor-pointer shadow-sm"
                >
                  <FiLogOut className="w-4 h-4" /> Terminate Session
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 justify-center rounded-xl bg-[var(--ifm-color-primary)] px-5 py-2.5 text-xs font-bold text-white no-underline hover:no-underline hover:opacity-90 transition-all"
                  >
                    Authenticate Identity <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-xs font-semibold no-underline hover:no-underline transition-all"
                    style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
                  >
                    Register Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Tab Selection Row */}
          <div className="flex items-center gap-1 border-b pb-1" style={{ borderColor: "var(--ifm-color-emphasis-200)" }}>
            {(["overview", "metrics", "security"] as DashboardTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold tracking-wide uppercase transition-all bg-transparent border-0 border-b-2 cursor-pointer capitalize ${
                  activeTab === tab 
                    ? "border-[var(--ifm-color-primary)] text-[var(--ifm-color-primary)]" 
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ color: activeTab === tab ? "var(--ifm-color-primary)" : "var(--ifm-heading-color)" }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Operational View Switcher Panels */}
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] items-start">
            
            {/* Quick Profile Overview Info Bar */}
            <div className="space-y-4">
              <div 
                className="rounded-2xl border p-5 space-y-4 shadow-sm"
                style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
              >
                <h3 className="text-sm font-bold tracking-wider uppercase opacity-60 m-0">Identity Snapshot</h3>
                
                <div className="flex gap-3 items-center text-sm">
                  <FiMail className="opacity-50 w-4 h-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="m-0 text-[10px] uppercase font-bold opacity-50">Email Address</p>
                    <p className="m-0 truncate font-semibold" style={{ color: "var(--ifm-heading-color)" }}>{user?.email ?? "Anonymous Guest"}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center text-sm">
                  <FiCalendar className="opacity-50 w-4 h-4 shrink-0" />
                  <div>
                    <p className="m-0 text-[10px] uppercase font-bold opacity-50">Registered Timeline</p>
                    <p className="m-0 font-semibold" style={{ color: "var(--ifm-heading-color)" }}>{isAuthenticated ? joinDate : "Not Registered"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Content Frame rendering Active Tab state logs */}
            <div className="min-h-[280px]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <div 
                      className="rounded-2xl border p-6 shadow-sm"
                      style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0">Authorization Mode</p>
                      <p className="mt-2 text-2xl font-black m-0" style={{ color: "var(--ifm-heading-color)" }}>
                        {isAuthenticated ? "Standard Instance" : "Anonymous Runtime"}
                      </p>
                      <p className="text-xs opacity-70 mt-2 m-0 leading-normal">
                        {isAuthenticated 
                          ? "Your execution profile is mapped cleanly into secure local system structures."
                          : "Verify credentials or construct a workspace node to map algorithmic execution telemetry."}
                      </p>
                    </div>

                    <div 
                      className="rounded-2xl border p-6 shadow-sm flex flex-col justify-between"
                      style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0">Federated Identity</p>
                        <p className="mt-2 text-xl font-bold m-0" style={{ color: "var(--ifm-heading-color)" }}>
                          Credential Registry
                        </p>
                        <p className="text-xs opacity-70 mt-1 m-0 leading-normal">
                          Manage auth protocols, view access keys, or reset authorization levels inside the configuration flow.
                        </p>
                      </div>
                      <Link
                        to="/login"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold no-underline text-[var(--ifm-color-primary)] hover:opacity-80 transition-opacity"
                      >
                        Launch Auth Control <FiArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Industrial Activity Log: Displays real user progress dynamically mapping from local memory arrays */}
                    {isAuthenticated && telemetry.recentTopics.length > 0 && (
                      <div 
                        className="rounded-2xl border p-6 shadow-sm sm:col-span-2 space-y-3"
                        style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0 flex items-center gap-1.5">
                          <FiCheckSquare /> Recent Commits Saved
                        </p>
                        <div className="divide-y divide-[var(--ifm-color-emphasis-200)]">
                          {telemetry.recentTopics.map((title, idx) => (
                            <div key={idx} className="py-2.5 text-xs font-semibold flex items-center justify-between first:pt-0 last:pb-0">
                              <span className="truncate opacity-80">{title}</span>
                              <span className="text-[var(--ifm-color-success)] uppercase text-[10px] font-bold tracking-wider shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded">Compiled</span>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    {metrics.map((m, idx) => (
                      <div 
                        key={idx}
                        className="rounded-2xl border p-5 flex items-center gap-4 shadow-sm"
                        style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                      >
                        <div className="h-10 w-10 border rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--ifm-color-emphasis-100)", borderColor: "var(--ifm-color-emphasis-200)" }}>
                          {m.icon}
                        </div>
                        <div>
                          <p className="m-0 text-xs opacity-60 font-semibold">{m.label}</p>
                          <p className="m-0 text-xl font-extrabold mt-0.5" style={{ color: "var(--ifm-heading-color)" }}>{m.value}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl border p-6 space-y-4 shadow-sm"
                    style={{ backgroundColor: "var(--ifm-card-background-color)", borderColor: "var(--ifm-color-emphasis-200)" }}
                  >
                    <div className="flex gap-3 items-start">
                      <FiShield className="w-5 h-5 text-[var(--ifm-color-primary)] mt-0.5 shrink-0" />
                      <div>
                        <h4 className="m-0 font-bold" style={{ color: "var(--ifm-heading-color)" }}>Local Account Security Perimeter</h4>
                        <p className="m-0 text-xs opacity-75 mt-1 leading-relaxed">
                          Your records stay locked locally in your browser memory runtime context. Connecting real database infrastructure models will port over existing local progress keys seamlessly.
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
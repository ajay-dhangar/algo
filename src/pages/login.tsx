import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { FiArrowRight, FiUser, FiCheckCircle } from "react-icons/fi";
import AuthPanel from "../components/Auth/AuthPanel";

export default function LoginPage() {
  const features = [
    "Track your coding streaks and progress milestones",
    "Unlock advanced algorithms and interactive challenges",
    "Sync achievements seamlessly across all modules",
  ];

  return (
    <Layout title="Login" description="Sign in to your Algo profile.">
      <main 
        className="min-h-[calc(100vh-3.7rem)] relative overflow-hidden flex items-center justify-center px-4 py-12 font-sans transition-colors duration-300"
        style={{ 
          background: "var(--ifm-color-emphasis-100)",
          color: "var(--ifm-font-color-base)"
        }}
      >
        {/* Soft Modern Ambient Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ifm-color-emphasis-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--ifm-color-emphasis-200)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 dark:opacity-10" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[var(--ifm-color-primary)] opacity-[0.03] dark:opacity-[0.06] rounded-full filter blur-[100px] pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center relative z-10">
          
          {/* Left Column: Premium Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border"
              style={{ 
                background: "var(--ifm-card-background-color)", 
                borderColor: "var(--ifm-color-emphasis-300)",
                color: "var(--ifm-color-primary)" 
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ifm-color-primary)] animate-pulse" />
              Algo Arena Hub
            </div>
            
            <h1 
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]"
              style={{ color: "var(--ifm-heading-color)" }}
            >
              Welcome back. Let's build something <span className="text-[var(--ifm-color-primary)]">exceptional</span> today.
            </h1>
            
            <p className="text-base max-w-xl leading-relaxed opacity-80">
              Sign in to return to your workspace, trace optimizations, and scale your expertise across our complete learning catalog.
            </p>

            {/* Micro Feature Indicators */}
            <div className="space-y-3 pt-2">
              {features.map((text, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm opacity-85">
                  <FiCheckCircle className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Quick Action Matrix Trigger Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 justify-center rounded-xl bg-[var(--ifm-color-primary)] px-5 py-2.5 text-sm font-bold text-white no-underline hover:no-underline hover:opacity-90 transition-all shadow-sm shadow-[var(--ifm-color-primary-rgb)]/10"
              >
                Create account <FiArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold no-underline hover:no-underline transition-all"
                style={{ 
                  borderColor: "var(--ifm-color-emphasis-300)", 
                  color: "var(--ifm-heading-color)",
                  background: "var(--ifm-card-background-color)"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--ifm-color-emphasis-100)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "var(--ifm-card-background-color)"}
              >
                <FiUser className="w-4 h-4" /> View profile
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive Login Core Panel Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border p-1 sm:p-2 shadow-xl backdrop-blur-sm"
            style={{ 
              background: "var(--ifm-card-background-color)",
              borderColor: "var(--ifm-color-emphasis-200)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.03), var(--ifm-global-shadow-md)"
            }}
          >
            <AuthPanel initialMode="login" />
          </motion.div>
        </div>
      </main>
    </Layout>
  );
}
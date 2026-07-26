import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCookieBite,
  FaDatabase,
  FaChartBar,
  FaShieldAlt,
  FaGlobe,
  FaTerminal,
  FaInfoCircle,
} from "react-icons/fa";

const CookiePolicyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("what");

  const tabOptions = [
    { id: "what", label: "What We Use", icon: <FaCookieBite /> },
    { id: "why", label: "Why We Use", icon: <FaChartBar /> },
    { id: "manage", label: "Manage Cookies", icon: <FaShieldAlt /> },
    { id: "thirdparty", label: "Third-Party", icon: <FaGlobe /> },
  ];

  return (
    <Layout
      title="Cookies Policy"
      description="Learn how Algo uses cookies, analytics tools, and browser storage to improve your experience."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#080b11] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans pb-16">
        {/* HERO */}
        <section className="relative overflow-hidden bg-slate-100 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/60 py-16 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,197,94,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,179,8,0.03),transparent)]" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-mono font-bold tracking-wider uppercase mb-6 border border-green-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FaCookieBite className="text-xs" /> Tracking Transparency Layer
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white m-0 mb-6 tracking-tight uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              COOKIES{" "}
              <span className="text-[var(--ifm-color-primary)]">POLICY</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed m-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              This page explains how cookies and similar technologies are used
              to enhance functionality, analyze traffic, and personalize your
              experience across the Algo platform.
            </motion.p>
          </div>
        </section>

        {/* MAIN */}
        <section className="max-w-4xl mx-auto px-4 mt-12">
          {/* INFO CARD */}
          <motion.div
            className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 shadow-sm mb-8 flex gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg text-xl shrink-0">
              <FaInfoCircle />
            </div>
            <div>
              <h3 className="text-lg font-bold m-0 mb-2">What This Means</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
                Cookies are small data files stored in your browser that help us
                remember preferences, improve performance, and understand how
                users interact with the platform.
              </p>
            </div>
          </motion.div>

          {/* TABS */}
          <div className="flex border-b border-slate-200 dark:border-slate-800/60 gap-2 mb-6">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-bold uppercase tracking-wider transition-all border-b-2 bg-transparent ${
                  activeTab === tab.id
                    ? "border-[var(--ifm-color-primary)] text-[var(--ifm-color-primary)]"
                    : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* PANELS */}
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {/* WHAT */}
              {activeTab === "what" && (
                <motion.div
                  key="what"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {[
                    {
                      title: "Essential Cookies",
                      desc: "Required for core platform functionality such as authentication, routing, and security sessions.",
                    },
                    {
                      title: "Preference Cookies",
                      desc: "Store UI settings like theme mode, layout preferences, and language selection.",
                    },
                    {
                      title: "Analytics Cookies",
                      desc: "Help us understand usage patterns and improve performance using aggregated data.",
                    },
                    {
                      title: "Performance Cookies",
                      desc: "Monitor system speed, errors, and responsiveness across different devices.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/40 p-5 rounded-xl"
                    >
                      <div className="font-black uppercase mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--ifm-color-primary)]" />
                        {item.title}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 m-0 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* WHY */}
              {activeTab === "why" && (
                <motion.div
                  key="why"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/40 rounded-xl p-6 space-y-3"
                >
                  {[
                    "Improve user experience across sessions",
                    "Remember user preferences and settings",
                    "Analyze traffic and platform usage trends",
                    "Ensure security and prevent abuse",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex gap-3 text-slate-600 dark:text-slate-400"
                    >
                      <span className="text-[var(--ifm-color-primary)] font-mono font-bold">
                        0{i + 1}.
                      </span>
                      <p className="m-0">{text}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* MANAGE */}
              {activeTab === "manage" && (
                <motion.div
                  key="manage"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/40 rounded-xl p-6"
                >
                  <h3 className="font-bold mb-3">How to Control Cookies</h3>
                  <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-2">
                    <li>Adjust browser settings to block or delete cookies</li>
                    <li>Use “Do Not Track” settings where supported</li>
                    <li>Clear site data from browser history settings</li>
                    <li>Disable third-party cookies in privacy controls</li>
                  </ul>

                  <p className="mt-4 text-sm text-slate-500">
                    Note: Disabling cookies may affect platform features and
                    login sessions.
                  </p>
                </motion.div>
              )}

              {/* THIRD PARTY */}
              {activeTab === "thirdparty" && (
                <motion.div
                  key="thirdparty"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/40 rounded-xl p-6"
                >
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    We may use trusted third-party services that place cookies:
                  </p>

                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li>
                      <strong>Google Analytics</strong> – usage tracking &
                      performance insights
                    </li>
                    <li>
                      <strong>GitHub OAuth</strong> – secure authentication
                      sessions
                    </li>
                    <li>
                      <strong>Hosting/CDN providers</strong> – performance
                      optimization
                    </li>
                  </ul>

                  <p className="mt-4 text-sm text-slate-500">
                    Each third party has its own privacy and cookie policy.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 bg-slate-900 text-slate-200 rounded-xl p-6 border border-slate-800 relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="absolute top-0 right-0 text-7xl text-slate-800/40 p-4 pointer-events-none">
              <FaTerminal />
            </div>

            <div className="relative z-10">
              <h4 className="font-mono font-bold text-white mb-2 uppercase">
                cookie_control_terminal
              </h4>
              <p className="text-slate-400 mb-5">
                Want more control over your data? Review your browser settings
                or explore repository-level privacy controls.
              </p>

              <Link
                to="https://github.com/"
                className="inline-flex items-center gap-2 font-mono font-bold bg-white text-slate-950 px-4 py-2.5 rounded-lg hover:bg-slate-100 transition"
              >
                <FaCookieBite /> manage cookies settings
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default CookiePolicyPage;

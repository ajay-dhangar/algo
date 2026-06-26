import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { FiHome, FiTerminal, FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: "theme.NotFound.title",
          message: "Page Not Found",
        })}
      />

      <Layout>
        <main className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-4 relative overflow-hidden bg-slate-50 dark:bg-gray-950">
          
          {/* Subtle Decorative Structural Grid Background Elements */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

          <motion.div
            className="w-full max-w-2xl bg-white dark:bg-gray-900/40 border border-slate-200/80 dark:border-slate-800/60 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative z-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Warning Tech Badge Accent */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <FiAlertTriangle className="w-3.5 h-3.5 animate-pulse" />
              Runtime Error: 404
            </motion.div>

            {/* Giant Graphic 404 Heading */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              404
            </h1>

            {/* Main Response Error Titles */}
            <h2 className="text-xl sm:text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight mb-4">
              <Translate id="theme.NotFound.title" description="The title of the 404 page">
                Page Not Found
              </Translate>
            </h2>

            {/* Description Paragraph Blocks */}
            <div className="space-y-2 max-w-md mx-auto mb-8">
              <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 font-medium leading-relaxed m-0">
                <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
                  We could not find the page you were looking for.
                </Translate>
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed m-0">
                <Translate id="theme.NotFound.p2" description="The second paragraph of the 404 page">
                  The target path may have been modified, purged from the tree, or contains an invalid pointer syntax.
                </Translate>
              </p>
            </div>

            {/* Mock Algorithm Terminal Trace Component Block */}
            <div className="bg-slate-950 rounded-xl p-4 text-left font-mono text-[11px] sm:text-xs text-emerald-400 shadow-inner border border-slate-800/80 mb-8 max-w-lg mx-auto overflow-x-auto">
              <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-2 text-slate-300 font-sans font-bold uppercase tracking-wider">
                <FiTerminal className="w-3.5 h-3.5 text-slate-300" />
                Stack Trace Diagnostic
              </div>
              <p className="m-0 text-slate-300 font-semibold">&gt; executing router lookups...</p>
              <p className="m-0 text-rose-400 font-semibold">&gt; [ERROR] Segment NotFoundException: Stack Pointer out of bounds.</p>
              <p className="m-0 text-amber-400">&gt; routing fallback resolution initiated...</p>
            </div>

            {/* Redirect Interactive Navigation Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--ifm-color-primary)] hover:bg-[var(--ifm-color-primary-dark)] text-white hover:text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-blue-500/10 hover:-translate-y-0.5 no-underline hover:no-underline"
              >
                <FiHome className="w-4 h-4" />
                Return to Core Base
              </Link>
            </div>

          </motion.div>
        </main>
      </Layout>
    </>
  );
}
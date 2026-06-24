import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import AuthPanel from "../components/Auth/AuthPanel";

export default function LoginPage() {
  return (
    <Layout title="Login" description="Sign in to your Algo profile.">
      <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.08),transparent_40%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-700 dark:text-blue-300">
              Welcome back
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Sign in to continue your Algo journey.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Access your saved profile, keep your progress tied to one identity, and jump back into tutorials, quizzes, and practice modules faster.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white no-underline hover:no-underline dark:bg-blue-600"
              >
                Create account
              </Link>
              <Link
                to="/algo/profile"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-transparent px-5 py-3 text-sm font-semibold text-slate-700 no-underline hover:bg-white hover:no-underline dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900/60"
              >
                View profile
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AuthPanel initialMode="login" />
          </motion.div>
        </div>
      </main>
    </Layout>
  );
}

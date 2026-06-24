import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import AuthPanel from "../components/Auth/AuthPanel";

export default function RegisterPage() {
  return (
    <Layout title="Register" description="Create your Algo profile.">
      <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_40%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-indigo-700 dark:text-indigo-300">
              Create profile
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Register once, keep your profile synced locally.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Use a saved Algo profile so you can sign in later and keep a consistent identity across the app.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white no-underline hover:no-underline dark:bg-blue-600"
              >
                Sign in instead
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-transparent px-5 py-3 text-sm font-semibold text-slate-700 no-underline hover:bg-white hover:no-underline dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900/60"
              >
                Profile page
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AuthPanel initialMode="register" />
          </motion.div>
        </div>
      </main>
    </Layout>
  );
}

import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { FiArrowRight, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Layout title="Profile" description="Your Algo profile overview.">
      <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.08),transparent_40%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
        <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-950/10 dark:border-slate-800/80 dark:bg-slate-950/70"
          >
            <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/20">
              <FiUser className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isAuthenticated && user ? user.name : "Guest profile"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {isAuthenticated && user
                ? "Your local profile is active. You can use it to keep session state across the app."
                : "You are not logged in yet. Register or sign in to create a local profile."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {isAuthenticated && user ? (
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white dark:bg-blue-600"
                >
                  <FiLogOut />
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white no-underline hover:no-underline dark:bg-blue-600"
                  >
                    Sign in
                    <FiArrowRight />
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-transparent px-5 py-3 text-sm font-semibold text-slate-700 no-underline hover:bg-white hover:no-underline dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900/60"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-800/80 dark:bg-slate-950/70">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Status</p>
              <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                {isAuthenticated ? "Authenticated" : "Anonymous"}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-800/80 dark:bg-slate-950/70">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Email</p>
              <p className="mt-2 break-words text-lg font-semibold text-slate-900 dark:text-white">
                {user?.email ?? "Not set"}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-800/80 dark:bg-slate-950/70">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Member since</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {user ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg dark:border-slate-800/80 dark:bg-slate-950/70">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Manage</p>
              <Link
                to="/login"
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-blue-600 no-underline hover:no-underline dark:text-blue-300"
              >
                Open auth flow
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </Layout>
  );
}

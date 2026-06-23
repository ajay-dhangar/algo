import React, { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiGithub, FiLock, FiMail, FiUser } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import { AuthMode, useAuth } from "../../contexts/AuthContext";

interface AuthPanelProps {
  initialMode?: AuthMode;
  showBrand?: boolean;
  onSuccess?: () => void;
  compact?: boolean;
}

const AuthPanel: React.FC<AuthPanelProps> = ({
  initialMode = "login",
  showBrand = true,
  onSuccess,
  compact = false,
}) => {
  const history = useHistory();
  const { user, isAuthenticated, login, register, logout } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    setError("");
  }, [mode]);

  const heading = useMemo(() => {
    return mode === "register" ? "Create your Algo profile" : "Welcome back";
  }, [mode]);

  const description = useMemo(() => {
    return mode === "register"
      ? "Create a local profile so your learning progress and preferences can follow you across the app."
      : "Sign in with your saved profile to continue from where you left off.";
  }, [mode]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        await register({
          name,
          email,
          password,
        });
      } else {
        await login({
          email,
          password,
        });
      }

      onSuccess?.();
      history.push("/profile");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
          Signed in
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          You are already logged in
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Profile: <span className="font-semibold">{user.name}</span> ({user.email})
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/profile"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white no-underline hover:no-underline dark:bg-blue-600"
          >
            Open Profile
            <FiArrowRight />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950/70 shadow-2xl shadow-slate-950/10 overflow-hidden",
        compact ? "p-5" : "p-6 sm:p-8",
      ].join(" ")}
    >
      {showBrand && (
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/20">
            <FiUser className="h-5 w-5" />
          </div>
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">
              Algo auth
            </p>
            <h2 className="m-0 text-2xl font-black text-slate-900 dark:text-white">{heading}</h2>
          </div>
        </div>
      )}

      <p className="mb-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>

      {error && (
        <div className="mb-5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div className="relative">
            <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <label className="sr-only" htmlFor="auth-name">
              Full name
            </label>
            <input
              id="auth-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              autoComplete="name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-400"
              required
            />
          </div>
        )}

        <div className="relative">
          <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <label className="sr-only" htmlFor="auth-email">
            Email address
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-400"
            required
          />
        </div>

        <div className="relative">
          <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <label className="sr-only" htmlFor="auth-password">
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={mode === "register" ? "Create a password" : "Enter your password"}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-400"
            required
          />
        </div>

        {mode === "register" && (
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <label className="sr-only" htmlFor="auth-confirm-password">
              Confirm password
            </label>
            <input
              id="auth-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-400"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          {isSubmitting ? "Please wait..." : mode === "register" ? "Register Profile" : "Sign In"}
          <FiArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:bg-slate-950/70">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:bg-slate-900/60"
        >
          <FaGoogle className="h-4 w-4 text-[#ea4335]" />
          Google coming soon
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:bg-slate-900/60"
        >
          <FiGithub className="h-4 w-4" />
          GitHub coming soon
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
        <span>{mode === "register" ? "Already have an account?" : "New here?"}</span>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "register" ? "login" : "register");
            setError("");
          }}
          className="font-bold text-blue-600 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200"
        >
          {mode === "register" ? "Sign in" : "Create account"}
        </button>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
        This build stores accounts locally in your browser for now. It is a good fit for demo and onboarding flows, but a production app should back this with a real server and secure auth provider.
      </p>
    </div>
  );
};

export default AuthPanel;

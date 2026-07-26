import React, { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiGithub, FiLock, FiMail, FiUser, FiInfo } from "react-icons/fi";
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
    return mode === "register" ? "Create your Profile" : "Welcome Back";
  }, [mode]);

  const description = useMemo(() => {
    return mode === "register"
      ? "Set up your platform credentials to log achievements and claim your ranks on the arena."
      : "Access your dashboard to trace performance updates and current coding streaks.";
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

        await register({ name, email, password });
      } else {
        await login({ email, password });
      }

      onSuccess?.();
      history.push("/algo/profile");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div 
        className="rounded-2xl border p-6 md:p-8 shadow-md transition-all duration-300"
        style={{ 
          backgroundColor: "var(--ifm-card-background-color)", 
          borderColor: "var(--ifm-color-emphasis-200)" 
        }}
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active Session
        </div>
        
        <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--ifm-heading-color)" }}>
          Already Signed In
        </h2>
        
        <p className="mt-2 text-sm opacity-80">
          Logged in as <span className="font-bold">{user.name}</span> ({user.email})
        </p>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/profile"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--ifm-color-primary)] px-5 py-2.5 text-sm font-bold text-white no-underline hover:no-underline hover:opacity-95 transition-all"
          >
            Go to Profile Dashboard
            <FiArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold bg-transparent transition-colors"
            style={{ 
              borderColor: "var(--ifm-color-emphasis-300)", 
              color: "var(--ifm-heading-color)" 
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--ifm-color-emphasis-100)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${compact ? "p-5" : "p-6 sm:p-8"}`}
      style={{ 
        backgroundColor: "var(--ifm-card-background-color)", 
        borderColor: "var(--ifm-color-emphasis-200)" 
      }}
    >
      {showBrand && (
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white shrink-0 bg-[var(--ifm-color-primary)] shadow-sm shadow-[var(--ifm-color-primary-rgb)]/20">
            <FiUser className="h-5 w-5" />
          </div>
          <div>
            <p className="m-0 text-[10px] font-bold uppercase tracking-wider opacity-60">
              Identity Services
            </p>
            <h2 className="m-0 text-2xl font-extrabold tracking-tight" style={{ color: "var(--ifm-heading-color)" }}>
              {heading}
            </h2>
          </div>
        </div>
      )}

      <p className="mb-5 text-sm leading-relaxed opacity-75">{description}</p>

      {error && (
        <div className="mb-5 rounded-xl border border-rose-500/20 bg-rose-500/10 dark:bg-rose-500/5 px-4 py-3 text-sm text-rose-600 dark:text-rose-400 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div className="relative">
            <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <label className="sr-only" htmlFor="auth-name">Full name</label>
            <input
              id="auth-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
              required
              className="w-full rounded-xl border px-4 py-2.5 pl-11 text-sm bg-[var(--ifm-color-emphasis-100)] focus:bg-[var(--ifm-card-background-color)] transition-all outline-none focus:ring-2 focus:ring-[var(--ifm-color-primary)]/20"
              style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
            />
          </div>
        )}

        <div className="relative">
          <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
          <label className="sr-only" htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            required
            className="w-full rounded-xl border px-4 py-2.5 pl-11 text-sm bg-[var(--ifm-color-emphasis-100)] focus:bg-[var(--ifm-card-background-color)] transition-all outline-none focus:ring-2 focus:ring-[var(--ifm-color-primary)]/20"
            style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
          />
        </div>

        <div className="relative">
          <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
          <label className="sr-only" htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "register" ? "Create security keys" : "Account security key"}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            required
            className="w-full rounded-xl border px-4 py-2.5 pl-11 text-sm bg-[var(--ifm-color-emphasis-100)] focus:bg-[var(--ifm-card-background-color)] transition-all outline-none focus:ring-2 focus:ring-[var(--ifm-color-primary)]/20"
            style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
          />
        </div>

        {mode === "register" && (
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <label className="sr-only" htmlFor="auth-confirm-password">Confirm password</label>
            <input
              id="auth-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm security keys"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border px-4 py-2.5 pl-11 text-sm bg-[var(--ifm-color-emphasis-100)] focus:bg-[var(--ifm-card-background-color)] transition-all outline-none focus:ring-2 focus:ring-[var(--ifm-color-primary)]/20"
              style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--ifm-color-primary)] px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 border-0"
        >
          {isSubmitting ? "Processing secure handshake..." : mode === "register" ? "Register Workspace Profile" : "Authenticate Identity"}
          <FiArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Modern Separator */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t" style={{ borderColor: "var(--ifm-color-emphasis-200)" }} />
        </div>
        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-wider">
          <span className="px-3 opacity-50" style={{ backgroundColor: "var(--ifm-card-background-color)" }}>
            Enterprise Single Sign-On
          </span>
        </div>
      </div>

      {/* Clean Grid Layout for SSO */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center gap-2 rounded-xl border bg-transparent px-4 py-2.5 text-xs font-semibold opacity-50 cursor-not-allowed"
          style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
        >
          <FaGoogle className="h-3.5 w-3.5 text-[#ea4335]" />
          Google OAuth
        </button>
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center gap-2 rounded-xl border bg-transparent px-4 py-2.5 text-xs font-semibold opacity-50 cursor-not-allowed"
          style={{ borderColor: "var(--ifm-color-emphasis-300)", color: "var(--ifm-heading-color)" }}
        >
          <FiGithub className="h-3.5 w-3.5" />
          GitHub Provider
        </button>
      </div>

      {/* Mode Switcher Footer */}
      <div className="mt-6 flex items-center justify-between gap-3 text-sm border-t pt-4" style={{ borderColor: "var(--ifm-color-emphasis-200)" }}>
        <span className="opacity-70">{mode === "register" ? "Possess an active profile?" : "New developer?"}</span>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "register" ? "login" : "register");
            setError("");
          }}
          className="font-bold bg-transparent border-0 p-0 cursor-pointer text-[var(--ifm-color-primary)] hover:opacity-80 transition-opacity"
        >
          {mode === "register" ? "Sign In" : "Initialize Profile"}
        </button>
      </div>

      {/* Operational Disclaimer Note Box */}
      <div 
        className="mt-5 p-3 rounded-xl border flex gap-2.5 items-start text-xs leading-normal opacity-70"
        style={{ backgroundColor: "var(--ifm-color-emphasis-100)", borderColor: "var(--ifm-color-emphasis-200)" }}
      >
        <FiInfo className="w-4 h-4 mt-0.5 text-[var(--ifm-color-primary)] shrink-0" />
        <p className="m-0">
          <strong>Sandbox Storage Policy:</strong> This build leverages your runtime secure space context storage for data evaluation. Network states sync automatically to local profile instances.
        </p>
      </div>
    </div>
  );
};

export default AuthPanel;
import React, { useState, useRef, useEffect } from "react";
import { FiLock, FiX, FiArrowRight, FiMail, FiUser } from "react-icons/fi";
import { useHistory } from "@docusaurus/router";
import { useAuth } from "../../contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const { user, isAuthenticated, login, register, logout } = useAuth();
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if user clicks outside the modal box boundary canvas
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setError("");
  }, [showSignup]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (showSignup) {
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

      onClose();
      history.push("/algo/profile");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-md px-4 py-6 overflow-y-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-slate-800/80 shadow-2xl transition-all duration-300"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-3xl pointer-events-none" />
        <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-50 inline-flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 border-none bg-transparent cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ifm-color-primary)]"
          aria-label="Close authentication modal"
        >
          <FiX className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 flex flex-col">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20">
              <FiUser className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {showSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
              {showSignup ? "Create your local Algo profile" : "Enter credentials to access your profile"}
            </p>
          </div>

          {isAuthenticated && user ? (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Signed in as {user.name}
              </p>
              <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-300/80">{user.email}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    history.push("/algo/profile");
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-sm font-bold py-3 px-4 shadow-sm hover:shadow transition-all duration-150 cursor-pointer border-none"
                >
                  Open Profile
                  <FiArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950/40 py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3.5">
                  {showSignup && (
                    <div className="group relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                        <FiUser className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <label htmlFor="auth-name" className="sr-only">
                        Full name
                      </label>
                      <input
                        id="auth-name"
                        type="text"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Full name"
                        className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/40 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/5 transition-all w-full"
                      />
                    </div>
                  )}

                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                      <FiMail className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <label htmlFor="auth-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="auth-email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/40 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/5 transition-all w-full"
                    />
                  </div>

                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                      <FiLock className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <label htmlFor="auth-password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="auth-password"
                      type="password"
                      required
                      placeholder={showSignup ? "Choose password" : "Enter password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/40 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/5 transition-all w-full"
                    />
                  </div>

                  {showSignup && (
                    <div className="group relative animate-fadeIn">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                        <FiLock className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <label htmlFor="auth-confirm-password" className="sr-only">
                        Confirm password
                      </label>
                      <input
                        id="auth-confirm-password"
                        type="password"
                        required
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/40 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/5 transition-all w-full"
                      />
                    </div>
                  )}
                </div>

                {!showSignup && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setShowSignup(true)}
                      className="bg-transparent border-none text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 p-0 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ifm-color-primary)]"
                    >
                      Need an account? Register
                    </button>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-sm font-bold py-3 px-4 shadow-sm hover:shadow transition-all duration-150 cursor-pointer border-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ifm-color-primary)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Please wait..." : showSignup ? "Register Profile" : "Secure Sign In"}
                    <FiArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-100 dark:border-slate-800/80" />
                </div>
                <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
                  <span className="bg-white dark:bg-gray-900 px-3 text-slate-400 dark:text-gray-500">
                    Or connect via
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full justify-center items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950/20 py-2.5 px-4 text-xs sm:text-sm font-semibold text-slate-500 dark:text-gray-500 transition-colors shadow-sm cursor-not-allowed opacity-80"
                >
                  Google coming soon
                </button>

                <button
                  type="button"
                  disabled
                  className="inline-flex w-full justify-center items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950/20 py-2.5 px-4 text-xs sm:text-sm font-semibold text-slate-500 dark:text-gray-500 transition-colors shadow-sm cursor-not-allowed opacity-80"
                >
                  GitHub coming soon
                </button>
              </div>
            </>
          )}

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 m-0">
              {showSignup ? "Already have an account matrix profile?" : "New to our ecosystem framework?"}{" "}
              <button
                type="button"
                onClick={() => setShowSignup(!showSignup)}
                className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ifm-color-primary)]"
              >
                {showSignup ? "Sign In Here" : "Create Account Profiles"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

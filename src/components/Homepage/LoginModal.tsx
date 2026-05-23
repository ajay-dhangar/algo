import React, { useState, useRef, useEffect } from "react";
import { FiUser, FiLock, FiX, FiArrowRight, FiMail } from "react-icons/fi";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showSignup, setShowSignup] = useState<boolean>(false);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-md px-4 py-6 overflow-y-auto">
      
      {/* Central Modal Panel Core Wrapper */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-slate-800/80 shadow-2xl transition-all duration-300"
      >
        {/* Dynamic Abstract Tech Grid Pattern Vector Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Dynamic Fluid Light-Glow Accents */}
        <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-3xl pointer-events-none" />
        <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-3xl pointer-events-none" />

        {/* Global Close Button Action */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-50 inline-flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 border-none bg-transparent cursor-pointer transition-colors"
          aria-label="Close authentication modal"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Inner Content Card Pad View Container */}
        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 flex flex-col">
          
          {/* Brand/Identity Header Header Section */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20">
              {/* Clean abstract scalable geometric icon layer replacements */}
              <div className="h-5 w-5 border-2 border-white rounded transform rotate-45 flex items-center justify-center">
                <div className="h-1 w-1 bg-white rounded-full" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {showSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
              {showSignup ? "Sign up to start sync patterns" : "Enter credentials to access account routing"}
            </p>
          </div>

          {/* Core Fields Form Element Container */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            
            {/* Contextual Input Groups Dynamic Layer Injection */}
            <div className="space-y-3.5">
              
              {/* Email Container Input Field Block */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                  <FiMail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/40 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/5 transition-all w-full"
                />
              </div>

              {/* Password Container Input Field Block */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                  <FiLock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder={showSignup ? "Choose password" : "Enter password"}
                  className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/40 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/5 transition-all w-full"
                />
              </div>

              {/* Conditional Repeat Validation Password Field Node */}
              {showSignup && (
                <div className="group relative animate-fadeIn">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">
                    <FiLock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Confirm password"
                    className="block w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/40 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/5 transition-all w-full"
                  />
                </div>
              )}
            </div>

            {/* Middle Controls Secondary Routing Links row options */}
            {!showSignup && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  className="bg-transparent border-none text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 p-0 transition-colors cursor-pointer focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Central Call-To-Action Authentication Confirmation Trigger */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-sm font-bold py-3 px-4 shadow-sm hover:shadow transition-all duration-150 cursor-pointer border-none"
              >
                {showSignup ? "Register Profile" : "Secure Sign In"}
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Horizontal Third-Party Federation Separator Layout Element */}
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

          {/* Social Provider Identity Matrix Grid Buttons row */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex w-full justify-center items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950/20 hover:bg-slate-50 dark:hover:bg-gray-800/50 py-2.5 px-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300 transition-colors shadow-sm cursor-pointer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="Google Identity logo link"
                className="h-4 w-4 block object-contain"
              />
              Google
            </button>

            <button
              type="button"
              className="inline-flex w-full justify-center items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950/20 hover:bg-slate-50 dark:hover:bg-gray-800/50 py-2.5 px-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-gray-300 transition-colors shadow-sm cursor-pointer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub Identity logo link"
                className="h-4 w-4 block invert dark:invert-0 object-contain"
              />
              GitHub
            </button>
          </div>

          {/* Footing Core Flow Modality Mode Shifter Controls Link Footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 m-0">
              {showSignup ? "Already have an account matrix profile?" : "New to our ecosystem framework?"}{" "}
              <button
                type="button"
                onClick={() => setShowSignup(!showSignup)}
                className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer focus:outline-none"
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
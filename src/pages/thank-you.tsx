import React, { useEffect, useState, useCallback } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { Check, CheckCircle2, Copy, ArrowRight, Award, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ThankYou(): JSX.Element {
  const location = useLocation();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const razorpayPaymentId = searchParams.get("razorpay_payment_id");
    if (razorpayPaymentId) {
      setPaymentId(razorpayPaymentId);
    }
  }, [location.search]);

  const handleCopy = useCallback(async () => {
    if (!paymentId) return;
    try {
      await navigator.clipboard.writeText(paymentId);
      setCopied(true);
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Failed to copy transaction ID:", err);
    }
  }, [paymentId]);

  return (
    <Layout
      title="Thank You for Your Support"
      description="Thank you for supporting the platform and open-source software development."
    >
      <main className="relative flex min-h-[calc(100vh-var(--ifm-navbar-height))] items-center justify-center overflow-hidden bg-neutral-50 dark:bg-[#0b0f17] p-4">
        {/* Dynamic Background Glows */}
        <div 
          aria-hidden="true" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-indigo-500/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" 
        />

        {/* Main Card Container */}
        <div className="relative w-full max-w-2xl text-center space-y-6 sm:space-y-8 bg-white/80 dark:bg-neutral-900/60 p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-all duration-300">
          
          {/* Hero Icon */}
          <div className="relative flex justify-center">
            <div aria-hidden="true" className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-emerald-100/80 dark:bg-emerald-950/60 p-3.5 sm:p-4 rounded-2xl border border-emerald-300/50 dark:border-emerald-800/50 shadow-inner">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          {/* Heading Section */}
          <div className="space-y-3">
            <div>
              <span className="inline-flex items-center text-[11px] sm:text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                Payment Successful
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
              Thank You,{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
                Developer!
              </span>
            </h1>

            <p className="text-sm sm:text-base font-normal text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
              Your contribution directly drives open-source software and interactive algorithm mapping forward.
            </p>
          </div>

          {/* Receipt / Payment Reference Box */}
          {paymentId && (
            <div className="max-w-md mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-r from-neutral-200/80 via-neutral-100 to-neutral-200/80 dark:from-neutral-800/80 dark:via-neutral-800/40 dark:to-neutral-800/80 p-0.5 shadow-sm">
              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white/90 dark:bg-[#121721]/90 rounded-[10px] sm:rounded-[14px]">
                <div className="flex items-center gap-2.5 min-w-0 text-left">
                  <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider m-0 leading-none">
                      Transaction Ref
                    </p>
                    <p className="font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 truncate m-0 pt-1 select-all font-medium">
                      {paymentId}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex-shrink-0 inline-flex items-center justify-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  aria-label="Copy payment reference to clipboard"
                  title="Copy payment reference"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Feature Grid / Flexible Badges */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 max-w-xl mx-auto text-left">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-800/20 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 transition-all duration-200 no-underline text-inherit focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white dark:text-neutral-200 group-hover:scale-105 transition-transform duration-200">
                    <FaGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm m-0 text-neutral-900 dark:text-neutral-100">
                      Claim Badge
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 pt-0.5">
                      Link your GitHub username via issue.
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors" />
              </div>
            </a>

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-800/20 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-sm m-0 text-neutral-900 dark:text-neutral-100">
                  Sponsor Wall
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 pt-0.5">
                  Your profile appends to our README.
                </p>
              </div>
            </div>
          </div>

          {/* Flexible Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Link
              to="/"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 no-underline cursor-pointer group focus:outline-none focus:ring-2 focus:ring-neutral-500/40"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

        </div>
      </main>
    </Layout>
  );
}
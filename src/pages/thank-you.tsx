import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { CheckCircle } from 'lucide-react';

export default function ThankYou(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const razorpayPaymentId = urlParams.get('razorpay_payment_id');
      if (razorpayPaymentId) {
        setPaymentId(razorpayPaymentId);
      }
    }
  }, []);

  const handleCopy = async () => {
    if (paymentId) {
      await navigator.clipboard.writeText(paymentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout
      title="Thank You for Your Support"
      description="Thank you for supporting the Algo platform and open-source software development."
    >
      <main className="relative flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-[#0d1117] p-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Industrial Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Main Glassmorphic Wrapper Container */}
        <div className="relative max-w-2xl w-full text-center space-y-10 bg-white dark:bg-neutral-900/40 p-8 sm:p-14 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.07)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.4)] transition-all duration-300">
          
          {/* Animated Premium Success Checkmark */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 m-auto w-24 h-24 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-emerald-100 dark:bg-emerald-950/50 p-4 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
            </div>
          </div>


          {/* Clean Editorial Heading Block */}
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-full border border-emerald-200/30 dark:border-emerald-800/30">
              Payment Completed Successfully
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 pt-2">
              Thank You,{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
                Developer!
              </span>
            </h1>
            <p className="text-base sm:text-lg font-medium text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Your contribution pushes open-source software and algorithm mapping forward.
            </p>
          </div>

          {/* High-Contrast Interactive Receipt Component */}
          {paymentId && (
            <div className="max-w-md mx-auto p-0.5 rounded-2xl bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 shadow-sm">
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-neutral-50 dark:bg-[#161b22] rounded-[14px]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <div className="text-left min-w-0">
                    <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest m-0 leading-none">Transaction Token</p>
                    <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300 truncate m-0 pt-1 select-all">{paymentId}</p>
                  </div>
                </div>
                <button 
                  onClick={handleCopy}
                  className="flex-shrink-0 inline-flex items-center justify-center p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all cursor-pointer"
                  title="Copy Receipt Reference ID"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Minimalist Tech Infrastructure Pitch Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-all duration-200 no-underline text-inherit"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm m-0 text-neutral-800 dark:text-neutral-200">Claim Profile Badge</h4>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 m-0 pt-0.5">Open an issue to map your GitHub tag.</p>
                </div>
              </div>
            </a>

            <div className="p-5 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/30 dark:bg-neutral-800/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-neutral-800 dark:text-neutral-200">Production Wall</h4>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 m-0 pt-0.5">Your profile will append to our README.</p>
              </div>
            </div>
          </div>

          {/* Premium Call to Action Footer Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-sm shadow-sm transition-all duration-200 no-underline cursor-pointer group"
            >
                <span>Back to Home</span>
                <svg className="w-4 h-4 text-white dark:text-neutral-900 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
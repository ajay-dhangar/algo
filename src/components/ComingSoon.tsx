import Link from '@docusaurus/Link';
import React, { JSX, useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoon(): JSX.Element {
  const [targetDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const calculateTime = () => {
      const difference = +targetDate - +new Date();
      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div 
      className="relative min-h-[25vh] w-full overflow-hidden flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 transition-colors duration-300 rounded-2xl my-6 border border-[var(--ifm-color-emphasis-200)] dark:border-[var(--ifm-color-emphasis-300)]"
      style={{ backgroundColor: 'var(--ifm-background-color)' }}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--ifm-color-emphasis-400) 1px, transparent 1px), 
                            linear-gradient(to bottom, var(--ifm-color-emphasis-400) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div 
        className="absolute rounded-full blur-[100px] opacity-10 dark:opacity-20 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse w-auto h-auto"
        style={{ backgroundColor: 'var(--ifm-color-primary)' }}
      />
      <div 
        className="relative z-10 w-full text-center p-4 rounded-3xl backdrop-blur-md border transition-all duration-300"
        style={{ 
          backgroundColor: 'var(--ifm-card-background-color)',
          borderColor: 'var(--ifm-color-emphasis-200)',
          boxShadow: 'var(--ifm-global-shadow-md)'
        }}
      >
        <span 
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border transition-all animate-bounce"
          style={{ 
            backgroundColor: 'var(--ifm-color-info-contrast-background)',
            borderColor: 'var(--ifm-color-primary)',
            color: 'var(--ifm-color-primary)'
          }}
        >
          <span className="w-2 h-2 rounded-full mr-2 animate-ping" style={{ backgroundColor: 'var(--ifm-color-primary)' }} />
          Under Construction
        </span>
        <h2 className="font-extrabold tracking-tight mb-4">
          Algorithm Module{' '}
          <span style={{ color: 'var(--ifm-color-primary)' }} className="transition-colors duration-300">
            Coming Soon
          </span>
        </h2>
        <p className="mb-10">
          We are optimizing standard reference implementations, complex data structures, and rigorous complexity analyses for this documentation node.
        </p>
        {isMounted && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto mb-10">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div 
                key={label}
                className="flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--ifm-background-color)',
                  borderColor: 'var(--ifm-color-emphasis-200)'
                }}
              >
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="text-xs uppercase font-medium tracking-widest mt-1 text-slate-400 dark:text-slate-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex justify-between items-center mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>COMPILING ARCHITECTURE</span>
            <span style={{ color: 'var(--ifm-color-primary)' }}>75%</span>
          </div>
          <div 
            className="w-full h-2 rounded-full overflow-hidden transition-colors"
            style={{ backgroundColor: 'var(--ifm-color-emphasis-200)' }}
          >
            <div 
              className="h-full rounded-full transition-all duration-500 animate-pulse"
              style={{ 
                width: '75%', 
                backgroundColor: 'var(--ifm-color-primary)',
                boxShadow: '0 0 12px var(--ifm-color-primary)'
              }}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="https://github.com/ajay-dhangar/algo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2 rounded-xl font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{ 
              backgroundColor: 'var(--ifm-color-primary)',
              color: 'var(--ifm-background-color)'
            }}
          >
            <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Track Repository
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center p-3 rounded-xl font-semibold border transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            style={{ borderColor: 'var(--ifm-color-emphasis-300)' }}
          >
            Return to Safety
          </button>
        </div>
      </div>
    </div>
  );
}

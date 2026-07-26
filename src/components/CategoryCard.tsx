import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { VisCategory } from '../data/categories';

export default function CategoryCard({ item }: { item: VisCategory }) {
  const { Icon, colorClass, featured, implemented = true } = item;
  
  const isComingSoon = implemented === false;

  return (
    <Link 
      to={isComingSoon ? '#' : item.to}
      onClick={(e) => {
        if (isComingSoon) {
          e.preventDefault();
        }
      }}
      className={clsx(
        "group relative block rounded-2xl border p-6 md:p-8 h-full transition-all duration-300",
        "text-inherit hover:text-inherit no-underline hover:no-underline overflow-hidden",
        "bg-[var(--ifm-card-background-color)] border-[var(--ifm-toc-border-color)] shadow-sm",
        !isComingSoon && "hover:shadow-md hover:-translate-y-0.5",
        isComingSoon && "opacity-60 cursor-not-allowed",
        featured ? "md:col-span-2" : "md:col-span-1",
        !isComingSoon && colorClass.glow
      )}
      aria-disabled={isComingSoon}
    >
      {/* Industrial Grid-Spotlight Blend Accent */}
      {!isComingSoon && <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-slate-500/5 dark:bg-white/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />}

      <div className="flex flex-col h-full justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className={clsx("p-2.5 rounded-xl border flex items-center justify-center", colorClass.iconBg)}>
              <Icon className={clsx("h-5 w-5 stroke-[2]", colorClass.iconText)} />
            </div>
            {featured && !isComingSoon && (
              <span className={clsx("text-[10px] font-bold px-2.5 py-0.5 rounded-md border tracking-wider uppercase", colorClass.badge)}>
                Featured Engine
              </span>
            )}
            {isComingSoon && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md border tracking-wider uppercase bg-gray-500/10 text-gray-500 border-gray-500/20">
                Coming Soon
              </span>
            )}
          </div>

          <h3 className={clsx(
            "m-0 text-lg font-bold tracking-tight transition-colors text-[var(--ifm-heading-color)]",
            !isComingSoon && "group-hover:text-[var(--ifm-color-primary)]"
          )}>
            {item.title}
          </h3>
          <p className="m-0 mt-2 text-[var(--ifm-color-emphasis-700)] text-sm leading-relaxed max-w-2xl">
            {item.description}
          </p>
        </div>

        <div className={clsx(
            "flex items-center gap-1 font-semibold text-xs transition-colors text-[var(--ifm-color-emphasis-600)]",
            !isComingSoon && "group-hover:text-[var(--ifm-color-primary)]"
        )}>
          <span>{isComingSoon ? "Development in Progress" : "Open Sandbox Layout"}</span>
          {!isComingSoon && <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
        </div>
      </div>
    </Link>
  );
}
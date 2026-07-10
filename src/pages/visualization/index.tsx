import React from 'react';
import Layout from '@theme/Layout';
import CategoryCard from '../../components/CategoryCard';
import { categories } from '../../data/categories';
import { LayoutGrid } from 'lucide-react';

export default function VisualizationHub() {
  return (
    <Layout 
      title="Algorithm Visualizations Hub" 
      description="Advanced interactive engines to view structured workflows, pathfinders, arrays and code logic execution in real-time."
    >
      {/* Dynamic Native Docusaurus Header Section */}
      <header className="relative border-b border-[var(--ifm-toc-border-color)] overflow-hidden bg-[var(--ifm-background-surface-color)]">
        {/* Clean Blueprint Lines pattern */}
        <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.1]" 
             style={{ 
               backgroundImage: `linear-gradient(to right, var(--ifm-toc-border-color) 1px, transparent 1px), 
                                 linear-gradient(to bottom, var(--ifm-toc-border-color) 1px, transparent 1px)`,
               backgroundSize: '28px 28px' 
             }} 
        />
        
        <div className="container py-14 px-4 md:py-20 text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[var(--ifm-color-primary-lightest)] text-[var(--ifm-color-primary-darkest)] dark:bg-[var(--ifm-color-primary-darker)] dark:text-white px-3 py-1 rounded-full font-bold text-xs mb-4 border border-[var(--ifm-color-primary-light)]">
            <LayoutGrid className="h-3.5 w-3.5 animate-pulse" />
            <span>Interactive Playground Blueprint</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--ifm-heading-color)]">
            Algorithm <span className="text-[var(--ifm-color-primary)]">Visualization Hub</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--ifm-color-emphasis-700)] max-w-2xl m-0 leading-relaxed">
            Stop raw memorization. Select an active algorithmic sandbox framework below to watch binary arrays, trees, and logic pointers operate visually.
          </p>
        </div>
      </header>

      {/* Structured Core Bento Framework */}
      <main className="container margin-vert--xl px-4">
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight m-0 text-[var(--ifm-heading-color)]">
            System Execution Architectures
          </h2>
          <p className="text-[var(--ifm-color-emphasis-600)] m-0 mt-1 text-sm">
            Select a target compilation block below to launch individual render views.
          </p>
        </div>

        {/* Industrial Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((item, idx) => (
            <CategoryCard key={idx} item={item} />
          ))}
        </div>

        {/* Informative System Context Footer */}
        <div className="mt-20 text-center border-t border-[var(--ifm-toc-border-color)] pt-10 max-w-xl mx-auto">
          <div className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mb-2 mr-2" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--ifm-color-emphasis-800)]">
            Dynamic Node Mapping Active
          </span>
          <p className="text-xs text-[var(--ifm-color-emphasis-600)] mt-1.5 leading-relaxed m-0">
            This module updates layout maps dynamically when markdown routes or system playground modules patch into the main execution pathway.
          </p>
        </div>
      </main>
    </Layout>
  );
}
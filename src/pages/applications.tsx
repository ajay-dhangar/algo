import React from "react";
import Layout from "@theme/Layout";
import AlgorithmUseCases from "../components/AlgorithmUseCases";

export default function Applications(): JSX.Element {
  return (
    <Layout 
      title="Algorithm Applications"
      description="Explore real-world applications of algorithms and understand how they work step-by-step through an interactive interface."
    >
      <main className="w-full min-h-screen bg-slate-50/30 dark:bg-slate-950/20 py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header Section */}
        <div className="mx-auto text-center mb-10 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Algorithm Applications &amp; Step-by-Step Guide
          </h1>
          
          <div className="h-1 w-20 bg-[var(--ifm-color-primary)] mx-auto rounded-full mb-6" />
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto m-0">
            Explore real-world applications of algorithms and understand how they 
            execute step-by-step through an interactive, production-ready interface.
          </p>
        </div>

        {/* Core Interactive Workspace */}
        <section className="w-full max-w-7xl mx-auto">
          <AlgorithmUseCases />
        </section>

      </main>
    </Layout>
  );
}
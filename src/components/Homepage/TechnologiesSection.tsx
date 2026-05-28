import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDatabase,
  FaJs,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

interface Technology {
  name: string;
  // Type as ReactNode to fluidly accept both React Icons elements and raw Img tags
  icon: React.ReactNode;
  brandColorClass: string;
}

const technologies: Technology[] = [
  { name: "React", icon: <FaReact />, brandColorClass: "text-[#61DAFB]" },
  { name: "Node.js", icon: <FaNodeJs />, brandColorClass: "text-[#339933]" },
  { name: "GitHub", icon: <FaGithub />, brandColorClass: "text-slate-900 dark:text-slate-100" },
  { name: "MongoDB", icon: <FaDatabase />, brandColorClass: "text-[#47A248]" },
  { name: "JavaScript", icon: <FaJs />, brandColorClass: "text-[#F7DF1E]" },
  { name: "TypeScript", icon: <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" alt="TypeScript" loading="lazy" className="h-full w-full object-contain" />, brandColorClass: "text-blue-500" },
  { name: "HTML5", icon: <FaHtml5 />, brandColorClass: "text-[#E34F26]" },
  { name: "CSS3", icon: <FaCss3Alt />, brandColorClass: "text-[#1572B6]" },
  { name: "Tailwind CSS", icon: <img src="https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" alt="Tailwind CSS" loading="lazy" className="h-full w-full object-contain" />, brandColorClass: "text-sky-400" },
  { name: "Docusaurus", icon: <img src="https://docusaurus.io/img/docusaurus_keytar.svg" alt="Docusaurus" loading="lazy" className="h-full w-full object-contain" />, brandColorClass: "text-emerald-500" },
  { name: "Markdown", icon: <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Markdown-mark-purple.svg" alt="Markdown" loading="lazy" className="h-full w-full object-contain" />, brandColorClass: "text-purple-500" },
];

const TechnologiesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-gray-950 dark:to-gray-900">
      {/* Background Subtle Ambience Orbs */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ifm-color-primary)]/5 blur-[140px]" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Typography Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Technologies <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">We Use</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Our ecosystem runs on modern software engineering standards designed for speed, low-overhead maintenance, and optimal compilation.
          </p>
        </div>

        {/* Flexible Multi-Device Micro Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 items-stretch justify-center">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="
                group relative flex flex-col items-center justify-center text-center
                bg-white dark:bg-gray-900/40
                backdrop-blur-md
                border border-slate-200/60 dark:border-slate-800/80
                p-6 rounded-2xl
                shadow-sm hover:shadow-md
                transition-all duration-300 ease-out
                hover:-translate-y-1.5
                cursor-default
              "
            >
              {/* Dynamic Focus Border Accent using Docusaurus Core Variable */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[var(--ifm-color-primary)]/30 rounded-2xl transition-colors duration-300" />
              
              {/* Standardized Rigid Icon Container Capsule */}
              <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 shadow-inner mb-4 transition-transform duration-300 ease-out group-hover:scale-110">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-4xl sm:text-5xl transition-colors duration-300 ${tech.brandColorClass}`}>
                  {tech.icon}
                </div>
              </div>

              {/* Technology Label Text */}
              <h3 className="relative text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 tracking-tight transition-colors duration-200 group-hover:text-[var(--ifm-color-primary)]">
                {tech.name}
              </h3>

              {/* Sleek bottom micro indicator dot */}
              <div className="w-1 h-1 rounded-full bg-[var(--ifm-color-primary)] opacity-0 scale-50 transition-all duration-300 mt-1.5 group-hover:opacity-100 group-hover:scale-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;

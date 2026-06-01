import React, { useEffect } from "react";
import { FaGithub, FaLinkedin, FaDiscord, FaTwitter, FaTerminal, FaNodeJs } from "react-icons/fa";
import { HiOutlineCode, HiOutlineServer } from "react-icons/hi";
import Link from "@docusaurus/Link";

const Footer = () => {
  useEffect(() => {
    // Dynamic integration for GTranslate script
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/popup.js";
    script.defer = true;
    document.body.appendChild(script);

    window.gtranslateSettings = {
      default_language: "en",
      detect_browser_language: true,
      wrapper_selector: ".gtranslate_wrapper",
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-[#0b0f17] text-slate-400 border-t border-slate-800/80 relative overflow-hidden font-sans pt-16 pb-8">
      
      {/* Background Micro-Accents (Glow Mesh) */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[200px] bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Top Layout Grid Tree --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/50">
          
          {/* Brand Core Column Block (4/12 width) */}
          <div className="md:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 no-underline group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
                <img
                  src="/algo/logo/logo.png"
                  alt="Algo Core Logo"
                  className="w-10 h-10 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-100 via-indigo-200 to-cyan-400 bg-clip-text text-transparent uppercase font-mono">
                Algo
              </span>
            </Link>
            
            <p className="text-sm text-slate-400/90 leading-relaxed font-sans max-w-sm m-0">
              An advanced open-source platform designed to master data structures, refine logical loops, and trace optimal software algorithms across universal runtimes.
            </p>

            {/* Simulated Architecture Systems Health Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/20 text-[11px] font-mono font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Systems Live // Operational</span>
            </div>
          </div>

          {/* Nav Links Column Matrix (8/12 width split across 3 columns) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Category Node: Resources */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-black tracking-widest text-slate-200 uppercase flex items-center gap-1.5">
                  <HiOutlineCode className="text-indigo-400 text-xs" /> Platform.Core
                </span>
                <div className="w-6 h-[2px] bg-indigo-500/60 rounded-full" />
              </div>
              <ul className="space-y-2.5 p-0 list-none text-sm m-0">
                <li>
                  <Link to="/docs/" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-indigo-400 transition-colors font-mono mr-1">/</span> Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/blog/" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-indigo-400 transition-colors font-mono mr-1">/</span> Developer Blog
                  </Link>
                </li>
                <li>
                  <Link to="/docs/" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-indigo-400 transition-colors font-mono mr-1">/</span> Practice Modules
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category Node: Community */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-black tracking-widest text-slate-200 uppercase flex items-center gap-1.5">
                  <FaTerminal className="text-cyan-400 text-[10px]" /> Ecosystem
                </span>
                <div className="w-6 h-[2px] bg-cyan-500/60 rounded-full" />
              </div>
              <ul className="space-y-2.5 p-0 list-none text-sm m-0">
                <li>
                  <Link to="https://discord.gg/f8dHD5Hv8Q" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-cyan-400 transition-colors font-mono mr-1">/</span> Discord Lounge
                  </Link>
                </li>
                <li>
                  <Link to="/contributors" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-cyan-400 transition-colors font-mono mr-1">/</span> Core Contributors
                  </Link>
                </li>
                <li>
                  <Link to="/events/" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-cyan-400 transition-colors font-mono mr-1">/</span> Open Source Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category Node: Framework Info */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-black tracking-widest text-slate-200 uppercase flex items-center gap-1.5">
                  <HiOutlineServer className="text-blue-400 text-xs" /> Specifications
                </span>
                <div className="w-6 h-[2px] bg-blue-500/60 rounded-full" />
              </div>
              <ul className="space-y-2.5 p-0 list-none text-sm m-0">
                <li>
                  <Link to="/docs/category/algorithms" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-blue-400 transition-colors font-mono mr-1">/</span> System Features
                  </Link>
                </li>
                <li>
                  <Link to="/about/" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-blue-400 transition-colors font-mono mr-1">/</span> Infrastructure Team
                  </Link>
                </li>
                <li>
                  <Link to="/contact/" className="text-slate-400 hover:text-slate-100 no-underline transition-colors flex items-center gap-1 group">
                    <span className="text-slate-600 group-hover:text-blue-400 transition-colors font-mono mr-1">/</span> Technical Support
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* --- Bottom Compliance / Meta Horizon Section --- */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          
          {/* Left Block: Social Aggregators & Legal Routing */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            
            {/* Embedded Dynamic Transpiler Box Row for Social Streams */}
            {/* <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/60 p-1 rounded-lg">
              <Link
                to="https://github.com/ajay-dhangar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Access GitHub Infrastructure"
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
              >
                <FaGithub className="w-4 h-4" />
              </Link>
              <Link
                to="https://linkedin.com/in/ajay-dhangar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Access LinkedIn Pipeline"
                className="p-1.5 rounded-md text-slate-400 hover:text-indigo-400 hover:bg-slate-800/80 transition-all"
              >
                <FaLinkedin className="w-4 h-4" />
              </Link>
              <Link
                to="https://twitter.com/CodesWithAjay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Access X Platform Log"
                className="p-1.5 rounded-md text-slate-400 hover:text-sky-400 hover:bg-slate-800/80 transition-all"
              >
                <FaTwitter className="w-4 h-4" />
              </Link>
              <Link
                to="https://discord.gg/f8dHD5Hv8Q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Discord Hub"
                className="p-1.5 rounded-md text-slate-400 hover:text-[#5865F2] hover:bg-slate-800/80 transition-all"
              >
                <FaDiscord className="w-4 h-4" />
              </Link>
            </div> */}

            {/* Privacy Compliance Footprints Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-500 font-medium">
              <Link to="/privacy" className="hover:text-slate-300 no-underline transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-800 font-mono">|</span>
              <Link to="/terms" className="hover:text-slate-300 no-underline transition-colors">
                Terms of Service
              </Link>
              <span className="text-slate-800 font-mono">|</span>
              
              {/* Dynamic Translator Wrapper Container Dropdown */}
              <div className="gtranslate_wrapper !inline-block advanced-gtranslate-box"></div>
            </div>
          </div>

          {/* Right Block: Copyright Node Stamp */}
          <div className="text-xs text-slate-500/90 font-mono text-center lg:text-right m-0">
            &copy; {new Date().getFullYear()} Algo Ecosystem. Engineered via Docusaurus framework.
          </div>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;
import React, { useEffect } from "react";
import { FaGithub, FaLinkedin, FaDiscord, FaTwitter, FaTerminal } from "react-icons/fa";
import { HiOutlineCode, HiOutlineServer } from "react-icons/hi";
import Link from "@docusaurus/Link";

// Extend Window interface for TypeScript compliance with GTranslate
declare global {
  interface Window {
    gtranslateSettings?: {
      default_language: string;
      detect_browser_language: boolean;
      wrapper_selector: string;
    };
  }
}

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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const socialLinks = [
    { href: "https://github.com/ajay-dhangar", icon: <FaGithub className="w-4 h-4" />, label: "GitHub", hoverClass: "hover:text-white hover:bg-slate-800" },
    { href: "https://linkedin.com/in/ajay-dhangar", icon: <FaLinkedin className="w-4 h-4" />, label: "LinkedIn", hoverClass: "hover:text-indigo-400 hover:bg-indigo-950/30" },
    { href: "https://twitter.com/CodesWithAjay", icon: <FaTwitter className="w-4 h-4" />, label: "Twitter", hoverClass: "hover:text-sky-400 hover:bg-sky-950/30" },
    { href: "https://discord.gg/f8dHD5Hv8Q", icon: <FaDiscord className="w-4 h-4" />, label: "Discord", hoverClass: "hover:text-[#5865F2] hover:bg-[#5865F2]/10" }
  ];

  return (
    <footer className="relative overflow-hidden border-t bg-slate-950 text-slate-400 border-slate-900 pt-16 pb-8 font-sans">
      {/* Background Micro-Accents (Glow & Subtle Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-12 left-1/4 w-72 h-72 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Top Layout Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
          
          {/* Brand Core Column Block (4/12 width on large screens) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 no-underline group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors shadow-inner">
                <img
                  src="/algo/logo/logo.png"
                  alt="Algo Core Logo"
                  className="w-6 h-6 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-100 via-indigo-100 to-cyan-400 bg-clip-text text-transparent uppercase font-mono">
                Algo
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm m-0">
              An advanced open-source platform designed to master data structures, refine logical loops, and trace optimal software algorithms across universal runtimes.
            </p>

            {/* Architecture Systems Health Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[11px] font-mono font-medium text-emerald-400 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Systems Live // Operational</span>
            </div>
          </div>

          {/* Nav Links Matrix (8/12 width split across 3 grids) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            
            {/* Category Node: Resources */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                  <HiOutlineCode className="text-indigo-400 text-sm" /> Platform.Core
                </span>
                <div className="w-8 h-[1px] bg-indigo-500/40" />
              </div>
              <ul className="space-y-3 p-0 list-none text-sm m-0">
                {["Documentation", "Developer Blog", "Practice Modules"].map((item) => (
                  <li key={item}>
                    <Link to={item === "Documentation" ? "/documentation/": item === "Developer Blog" ? "/blog/" : "/practice/"} className="text-slate-400 hover:text-slate-200 no-underline transition-colors flex items-center group">
                      <span className="text-slate-700 group-hover:text-indigo-400 transition-colors font-mono mr-1.5 duration-300 transform group-hover:translate-x-0.5">/</span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category Node: Community */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                  <FaTerminal className="text-cyan-400 text-[10px]" /> Ecosystem
                </span>
                <div className="w-8 h-[1px] bg-cyan-500/40" />
              </div>
              <ul className="space-y-3 p-0 list-none text-sm m-0">
                {[
                  { name: "Discord Lounge", to: "https://discord.gg/f8dHD5Hv8Q" },
                  { name: "Core Contributors", to: "/contributors" },
                  { name: "Open Source Events", to: "/events/" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.to} className="text-slate-400 hover:text-slate-200 no-underline transition-colors flex items-center group">
                      <span className="text-slate-700 group-hover:text-cyan-400 transition-colors font-mono mr-1.5 duration-300 transform group-hover:translate-x-0.5">/</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category Node: Framework Info */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                  <HiOutlineServer className="text-blue-400 text-sm" /> Specifications
                </span>
                <div className="w-8 h-[1px] bg-blue-500/40" />
              </div>
              <ul className="space-y-3 p-0 list-none text-sm m-0">
                {[
                  { name: "System Features", to: "/docs/category/algorithms" },
                  { name: "Infrastructure Team", to: "/about/" },
                  { name: "Technical Support", to: "/contact/" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.to} className="text-slate-400 hover:text-slate-200 no-underline transition-colors flex items-center group">
                      <span className="text-slate-700 group-hover:text-blue-400 transition-colors font-mono mr-1.5 duration-300 transform group-hover:translate-x-0.5">/</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* --- Bottom Compliance / Meta Horizon Section --- */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left Side: Social Icons & Privacy/Terms */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            
            {/* Cleaner mapped Social Streams Layout */}
            <div className="flex items-center gap-1.5 bg-slate-900/40 border border-slate-900 p-1 rounded-xl shadow-inner">
              {socialLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`p-2 rounded-lg text-slate-400 transition-all duration-200 ${link.hoverClass}`}
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            {/* Privacy Compliance Links */}
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <Link to="/privacy" className="hover:text-slate-300 no-underline transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-800 font-mono">/</span>
              <Link to="/terms" className="hover:text-slate-300 no-underline transition-colors">
                Terms of Service
              </Link>
              <span className="text-slate-800 font-mono">/</span>              
            </div>
          </div>

          {/* Right Side: Copyright Node Stamp */}
          <div className="text-xs text-slate-600 font-mono text-center md:text-right m-0">
            &copy; {new Date().getFullYear()} Algo Ecosystem. Built via Docusaurus.
          </div>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;
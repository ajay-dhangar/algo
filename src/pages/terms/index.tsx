import React, { useState } from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import { FaShieldAlt, FaBalanceScale, FaUserCheck, FaGavel, FaExclamationTriangle, FaBan, FaCalendarAlt, FaChevronRight } from "react-icons/fa";

const TermsAndConditions: React.FC = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    { id: "acceptance", label: "Acceptance of Terms", icon: <FaUserCheck /> },
    { id: "obligations", label: "User Obligations", icon: <FaShieldAlt /> },
    { id: "property", label: "Intellectual Property", icon: <FaBalanceScale /> },
    { id: "disclaimer", label: "Disclaimer of Warranties", icon: <FaExclamationTriangle /> },
    { id: "liability", label: "Limitation of Liability", icon: <FaBan /> },
    { id: "jurisdiction", label: "Governing Law", icon: <FaGavel /> },
    { id: "termination", label: "Termination Rules", icon: <FaBan /> },
    { id: "changes", label: "Changes to Terms", icon: <FaCalendarAlt /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <Layout
      title="Terms and Conditions - Platform Regulations"
      description="Review our comprehensive legal baseline, developer expectations, and framework operational criteria."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#040414] text-slate-800 dark:text-slate-200 font-mono transition-colors duration-300 relative">
        
        {/* Decorative Technical Mesh background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(234,179,8,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,179,8,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* --- HEADER MANIFESTO --- */}
        <section className="pt-16 pb-12 px-4 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800/80 text-center">
          <div className="text-[var(--ifm-color-primary)] text-xs font-black tracking-widest uppercase mb-3">// LEGAL_BASELINE_ESTABLISHED</div>
          <motion.h1 
            className="text-3xl sm:text-5xl font-black tracking-tighter uppercase m-0 mb-4 text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            TERMS AND <span className="text-[var(--ifm-color-primary)]">CONDITIONS</span>
          </motion.h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-500 font-sans">
            <span className="flex items-center gap-1.5"><FaCalendarAlt /> Last Updated: May 2026</span>
            <span className="hidden sm:inline-block text-slate-300 dark:text-slate-800">|</span>
            <span>Version 2.4.0-build</span>
          </div>
        </section>

        {/* --- MAIN STRUCTURE SPLIT --- */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* STICKY SIDEBAR NAVIGATION */}
            <aside className="lg:col-span-4 sticky top-24 hidden lg:block bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-4 backdrop-blur-md">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-3 px-2">// DOCUMENT_INDEX</div>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border-0 cursor-pointer hover:no-underline ${
                      activeSection === sec.id
                        ? "bg-[var(--ifm-color-primary)] text-white dark:text-slate-950 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="opacity-80">{sec.icon}</span>
                      <span>{sec.label}</span>
                    </div>
                    <FaChevronRight className={`w-2.5 h-2.5 opacity-60 transition-transform ${activeSection === sec.id ? "translate-x-0.5" : "-translate-x-1"}`} />
                  </a>
                ))}
              </nav>
            </aside>

            {/* DYNAMIC CONTENT FIELD */}
            <motion.div 
              className="lg:col-span-8 space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              
              {/* ACCEPTANCE CARD */}
              <motion.div id="acceptance" variants={itemVariants} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--ifm-color-primary)] text-xs font-bold uppercase tracking-widest mb-3">
                  <FaUserCheck /> 01 // SECT_INIT_COMPLIANCE
                </div>
                <h2 className="font-black uppercase text-slate-900 dark:text-white m-0 mb-3">Acceptance of Terms</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed m-0">
                  By accessing or using our platform, you agree to be bound by these terms and conditions. If you do not agree with any part of the terms, you must not use the platform. Continued use of the platform following any updates to these terms will be deemed your acceptance of those changes.
                </p>
              </motion.div>

              {/* USER OBLIGATIONS CARD */}
              <motion.div id="obligations" variants={itemVariants} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--ifm-color-primary)] text-xs font-bold uppercase tracking-widest mb-3">
                  <FaShieldAlt /> 02 // SECT_USER_PARAMETERS
                </div>
                <h2 className="font-black uppercase text-slate-900 dark:text-white m-0 mb-3">User Obligations</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed m-0 mb-4">
                  As a user, you are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account. You agree not to use the platform for any unlawful purpose or in violation of any applicable laws or regulations.
                </p>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-lg p-4 font-sans text-xs text-slate-600 dark:text-slate-400">
                  <div className="font-mono text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">// EXPLICIT_PROHIBITIONS:</div>
                  <ul className="space-y-2 m-0 p-0 list-none">
                    <li className="flex items-start gap-2"><span className="text-red-500 font-mono">▪</span> Submitting intentionally misleading or falsified user details.</li>
                    <li className="flex items-start gap-2"><span className="text-red-500 font-mono">▪</span> Infringing upon proprietary intellectual property layout systems.</li>
                    <li className="flex items-start gap-2"><span className="text-red-500 font-mono">▪</span> Interrupting or destabilizing global server node network functionality.</li>
                    <li className="flex items-start gap-2"><span className="text-red-500 font-mono">▪</span> Injecting script packages, malware payloads, or active terminal components.</li>
                  </ul>
                </div>
              </motion.div>

              {/* INTELLECTUAL PROPERTY */}
              <motion.div id="property" variants={itemVariants} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--ifm-color-primary)] text-xs font-bold uppercase tracking-widest mb-3">
                  <FaBalanceScale /> 03 // SECT_PROPRIETARY_ASSETS
                </div>
                <h2 className="font-black uppercase text-slate-900 dark:text-white m-0 mb-3">Intellectual Property</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed m-0">
                  All content on this platform, including but not limited to text, graphics, logos, icons, and images, is the property of the platform or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You agree not to reproduce, duplicate, copy, sell, or exploit any portion of the platform’s content without express permission from the owner.
                </p>
              </motion.div>

              {/* DISCLAIMER ALERT BLOCK */}
              <motion.div id="disclaimer" variants={itemVariants} className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/40 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                  <FaExclamationTriangle /> 04 // SECT_WARRANTY_DISCLAIMER
                </div>
                <h2 className="font-black uppercase text-amber-900 dark:text-amber-400 m-0 mb-3">Disclaimer of Warranties</h2>
                <p className="text-sm text-amber-800 dark:text-amber-500/90 font-mono leading-relaxed m-0 uppercase bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-100 dark:border-amber-900/20 text-xs">
                  The platform is provided on an "as-is" and "as-available" basis without warranties of any type, either express or implied, including warranties of merchantability, fitness for a specific operational path, or non-infringement. We do not guarantee uninterrupted execution parameters.
                </p>
              </motion.div>

              {/* LIABILITY ALERT BLOCK */}
              <motion.div id="liability" variants={itemVariants} className="bg-red-50/40 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
                  <FaBan /> 05 // SECT_LIABILITY_LIMITATION
                </div>
                <h2 className="font-black uppercase text-red-900 dark:text-red-400 m-0 mb-3">Limitation of Liability</h2>
                <p className="text-sm text-red-800 dark:text-red-400/90 font-sans leading-relaxed m-0">
                  In no event will we be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of the platform, even if advised of the possibility of such damages. Your sole remedy for dissatisfaction is to discontinue platform interaction.
                </p>
              </motion.div>

              {/* GOVERNING LAW */}
              <motion.div id="jurisdiction" variants={itemVariants} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--ifm-color-primary)] text-xs font-bold uppercase tracking-widest mb-3">
                  <FaGavel /> 06 // SECT_JURISDICTION
                </div>
                <h2 className="font-black uppercase text-slate-900 dark:text-white m-0 mb-3">Governing Law and Jurisdiction</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed m-0">
                  These terms and conditions are governed by and construed in accordance with local legal frameworks. You explicitly agree to submit to the exclusive jurisdiction of the regional courts located within the operating jurisdiction for any structural discrepancies arising out of these agreements.
                </p>
              </motion.div>

              {/* TERMINATION */}
              <motion.div id="termination" variants={itemVariants} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--ifm-color-primary)] text-xs font-bold uppercase tracking-widest mb-3">
                  <FaBan /> 07 // SECT_ACCOUNT_TERMINATION
                </div>
                <h2 className="font-black uppercase text-slate-900 dark:text-white m-0 mb-3">Termination</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed m-0">
                  We reserve the absolute right to terminate or suspend access routes to our system infrastructure at any given point without prior notification protocols for conduct that conflicts with these rules, compromises platform operations, or breaches data compliance.
                </p>
              </motion.div>

              {/* CHANGES */}
              <motion.div id="changes" variants={itemVariants} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--ifm-color-primary)] text-xs font-bold uppercase tracking-widest mb-3">
                  <FaCalendarAlt /> 08 // SECT_REVISION_LOGS
                </div>
                <h2 className="font-black uppercase text-slate-900 dark:text-white m-0 mb-3">Changes to Terms and Conditions</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed m-0">
                  We reserve the right to modify these terms at any time. Any changes will be effective immediately upon hosting updates. It is your structural responsibility to monitor these conditions regularly. Continuous interface connection implies system configuration alignment.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default TermsAndConditions;
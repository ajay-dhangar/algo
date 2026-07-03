import React, { useState } from "react";
import Layout from "@theme/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact(): JSX.Element {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email.toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "OPERATOR ID REQUIRED";
      isValid = false;
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "INVALID COORD PROTOCOL (EMAIL)";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "TRANSMISSION PAYLOAD EMPTY";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      // Simulate pipeline stream processing latency safely
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      toast.success("🚀 TRANSMISSION DISPATCHED TO MAIN FRAME!", {
        className: "dark:bg-neutral-900 dark:text-cyan-400 font-mono border dark:border-neutral-800 text-xs",
        progressClassName: "bg-gradient-to-r from-blue-500 to-cyan-400"
      });
      
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    } else {
      toast.error("⚠️ DATA BUFFER INVALID. CHECK ERRORS.", {
        className: "dark:bg-neutral-900 dark:text-rose-400 font-mono border dark:border-neutral-800 text-xs"
      });
    }
  };

  return (
    <Layout title="CONTACT" description="Open a direct datalink query with the Algo core maintenance platform team.">
      <main className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-mono relative overflow-hidden py-20 px-6 transition-colors duration-300 selection:bg-cyan-500 selection:text-black">
        
        {/* Adaptive Spatial Grid Arrays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293722_1px,transparent_1px),linear-gradient(to_bottom,#1f293722_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60 dark:opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_50%)] pointer-events-none" />

        <ToastContainer theme="dark" position="top-right" toastClassName="font-mono text-xs" />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-stretch justify-center gap-8 pt-12">
          
          {/* SECURE HUD TRANSMISSION FORM SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="w-full lg:max-w-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative group overflow-hidden transition-colors duration-300"
          >
            {/* Top Linear Corner Decals */}
            <div className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400" />
            <div className="absolute top-0 left-0 w-[2px] h-16 bg-gradient-to-b from-blue-500 to-cyan-400" />

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-blue-600 dark:text-cyan-400 uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 animate-ping" />
                SECURE_DATALINK_CHANNEL // V3.2
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase m-0 text-slate-900 dark:text-white">
                INITIALIZE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-teal-300">COMMS</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OPERATOR NAME INPUT */}
              <div className="relative">
                <label htmlFor="name" className="block text-[10px] font-black tracking-widest uppercase text-slate-400 dark:text-neutral-500 mb-2">
                  OPERATOR IDENTITY (NAME)
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.G., MASTER CHIEF"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs tracking-wider uppercase font-mono text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-neutral-700 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-all"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute right-0 -bottom-4 text-[9px] font-bold tracking-wide text-rose-500">
                      {errors.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* COORD METRIC EMAIL INPUT */}
              <div className="relative">
                <label htmlFor="email" className="block text-[10px] font-black tracking-widest uppercase text-slate-400 dark:text-neutral-500 mb-2">
                  ROUTING COORD PROTOCOL (EMAIL)
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="OPERATOR@CORE.MATRIX"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs tracking-wider font-mono text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-neutral-700 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-all"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute right-0 -bottom-4 text-[9px] font-bold tracking-wide text-rose-500">
                      {errors.email}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* CORE MESSAGE TRANSLATION BOX */}
              <div className="relative">
                <label htmlFor="message" className="block text-[10px] font-black tracking-widest uppercase text-slate-400 dark:text-neutral-500 mb-2">
                  TRANSMISSION ENCRYPT PAYLOAD (MESSAGE)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="ENTER DISPATCH LOG PARAMS HERE..."
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs tracking-wider font-mono text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-neutral-700 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-all resize-none"
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute right-0 -bottom-4 text-[9px] font-bold tracking-wide text-rose-500">
                      {errors.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* TACTILE BEAM DISPATCH CAPACITOR */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs tracking-widest uppercase rounded-xl border border-transparent dark:hover:bg-neutral-100 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    STREAMING_LOGS...
                  </>
                ) : (
                  <>
                    <span>SEND LOG PAYLOAD</span>
                    <span className="text-blue-400 dark:text-cyan-500 font-sans">→</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* TELEMETRY CONNECTION NODE CARDS */}
          <div className="flex flex-col gap-4 w-full lg:max-w-xs justify-between">
            
            {/* VOICE INTERFACE NODE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              whileHover={{ x: 4 }}
              className="bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-900 p-5 rounded-2xl flex flex-row lg:flex-col items-center lg:items-start gap-4 flex-1 group transition-colors hover:border-amber-400 dark:hover:border-amber-500/40 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622k" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 15h9" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black tracking-widest text-neutral-400 dark:text-neutral-600 uppercase mb-0.5">COMMS_LINK_A</div>
                <h3 className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-neutral-200 m-0 mb-1">VOICE INTEGRATE</h3>
                <a href="tel:+1234567890" className="text-xs text-slate-500 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors no-underline">
                  +91 62687 65881
                </a>
              </div>
            </motion.div>

            {/* ENCRYPTED EMAIL NODE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ x: 4 }}
              className="bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-900 p-5 rounded-2xl flex flex-row lg:flex-col items-center lg:items-start gap-4 flex-1 group transition-colors hover:border-blue-500 dark:hover:border-cyan-500/40 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 dark:border-cyan-500/20">
                <svg className="w-4 h-4 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 16.5V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black tracking-widest text-neutral-400 dark:text-neutral-600 uppercase mb-0.5">COMMS_LINK_B</div>
                <h3 className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-neutral-200 m-0 mb-1">EMAIL BACKPLANE</h3>
                <a href="mailto:ajaydhangar49@gmail.com" className="text-xs text-slate-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors break-all no-underline">
                  ajaydhangar49@gmail.com
                </a>
              </div>
            </motion.div>

            {/* PHYSICAL COORD SECTOR NODE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ x: 4 }}
              className="bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-900 p-5 rounded-2xl flex flex-row lg:flex-col items-center lg:items-start gap-4 flex-1 group transition-colors hover:border-emerald-500 dark:hover:border-emerald-500/40 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black tracking-widest text-neutral-400 dark:text-neutral-600 uppercase mb-0.5">COMMS_LINK_C</div>
                <h3 className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-neutral-200 m-0 mb-1">SECTOR COORDS</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono m-0">
                  Mandsaur, MP, India
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </Layout>
  );
}
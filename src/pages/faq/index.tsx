import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import { useColorMode } from "@docusaurus/theme-common";
import GiscusComponent from "../../components/GiscusComponent";
import { 
  FaSearch, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaTerminal, 
  FaCodeBranch, 
  FaDiscord, 
  FaBookOpen,
  FaComments
} from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Contributing" | "Support";
}

const faqs: FAQItem[] = [
  {
    category: "General",
    question: "What is Algo?",
    answer: "Algo is an open-source platform designed to help developers learn, implement, and contribute to algorithmic solutions across various programming languages."
  },
  {
    category: "Contributing",
    question: "How can I contribute to Algo?",
    answer: "You can contribute by submitting pull requests to our GitHub repository, adding new algorithms, improving existing ones, or enhancing the documentation."
  },
  {
    category: "Contributing",
    question: "Do I need prior experience to contribute?",
    answer: "No prior experience is required! We welcome contributors of all skill levels. Whether you're a beginner or an experienced developer, your contributions are valuable."
  },
  {
    category: "Support",
    question: "How can I get support?",
    answer: "You can reach out to us via our Discord community, submit issues on GitHub, or contact us directly through the Contact page."
  },
  {
    category: "General",
    question: "Where can I practice algorithms?",
    answer: "You can practice algorithms on websites like LeetCode, Codeforces, and CodeHarborHub."
  },
  {
    category: "General",
    question: "Is Algo free to use?",
    answer: "Yes, Algo is completely free and open-source for everyone to use under the MIT License."
  },
  {
    category: "Contributing",
    question: "Can I suggest new features?",
    answer: "Yes, you can suggest new features by submitting an issue on GitHub or reaching out within our community channels."
  },
  {
    category: "General",
    question: "How often is the platform updated?",
    answer: "We update the platform regularly with new features, algorithms, and performance improvements based on community pull requests and feedback."
  },
  {
    category: "General",
    question: "Can I use Algo in my personal or commercial projects?",
    answer: "Yes, Algo is open-source and licensed under the MIT License, which completely allows you to use it in both personal and commercial environments."
  },
  {
    category: "Support",
    question: "How can I report bugs or issues?",
    answer: "You can report bugs directly by creating a structured issue template on our GitHub repository or dropping a line in our dedicated discord support channels."
  },
  {
    category: "General",
    question: "Does Algo support multiple programming languages?",
    answer: "Yes, Algo supports comprehensive operational solutions written in a wide variety of stacks, including Python, Java, C++, JavaScript, and Go."
  },
  {
    category: "Support",
    question: "How do I stay updated with new features or announcements?",
    answer: "You can stay updated instantly by pinning our GitHub repository, joining our Discord community server, or tracking our site's roadmap logs."
  }
];

/**
 * Isolated Giscus Anchor Engine
 * Safely executes inside the Layout ecosystem where ColorMode context lives.
 */
const GiscusDiscussionEngine: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <div className="giscus-component-wrapper min-h-[320px]">
      <Giscus
        id="giscus"
        repo="ajay-dhangar/algo"
        repoId="R_kgDOK224hg"
        category="General"
        categoryId="DIC_kwDOK224hs4CjEDd"
        mapping="pathname"
        term="Welcome to Algo Discussions! Please feel free to ask questions, share ideas, and discuss anything related to Algo."
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["All", "General", "Contributing", "Support"];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(item => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Layout title="FAQ Workspace" description="Frequently Asked Questions registry for the Algo framework.">
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d10] text-slate-800 dark:text-zinc-300 transition-colors duration-300 select-none">
        
        {/* Dynamic Context Header */}
        <section className="relative overflow-hidden bg-white dark:bg-[#0d1117] border-b border-slate-200/80 dark:border-zinc-800/80 py-16 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />
          <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold tracking-widest text-red-600 dark:text-red-500 bg-red-500/10 rounded-md border border-red-500/10 uppercase">
              <FaTerminal className="text-[9px]" /> Central Help Matrix
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white m-0">
              <Translate>Frequently Asked Questions</Translate>
            </h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 max-w-xl mx-auto m-0">
              Find architecture specs, workflow guidance, and rapid configuration definitions for the open-source algorithm workbench.
            </p>

            {/* Search Pipeline Input */}
            <div className="max-w-md mx-auto pt-4 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pt-4 text-slate-400 pointer-events-none">
                <FaSearch className="text-xs" />
              </span>
              <input
                type="text"
                placeholder="Search queries (e.g., license, pull request)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none focus:border-red-500 dark:focus:border-red-500/60 transition-colors shadow-inner"
              />
            </div>
          </div>
        </section>

        {/* Dashboard Content Grid */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation: Swipeable Bar on Mobile, Sticky Column on Desktop */}
          <div className="lg:col-span-3 lg:space-y-4">
            <span className="hidden lg:block font-mono text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600 px-1">
              Filter Domains
            </span>
            
            {/* Scroll Container Fix for Touch Displays */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-none custom-scrollbar snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setOpenIndex(0); }}
                  className={`snap-center text-left px-4 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wide border transition-all cursor-pointer whitespace-nowrap shrink-0 lg:w-full ${
                    selectedCategory === cat
                      ? "bg-slate-950 text-white dark:bg-red-600/90 dark:text-white border-transparent shadow-sm"
                      : "bg-white dark:bg-[#0d1117] text-slate-600 dark:text-zinc-400 border-slate-200/60 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700"
                  }`}
                >
                  {cat === "All" && "📁 All Components"}
                  {cat === "General" && "💡 General Specs"}
                  {cat === "Contributing" && "🚀 Branch Controls"}
                  {cat === "Support" && "🛠️ System Support"}
                </button>
              ))}
            </div>

            {/* Desktop Side Utilities */}
            <div className="hidden lg:block p-4 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-[#0d1117]/30 space-y-3">
              <h4 className="font-mono font-black uppercase tracking-wider text-slate-400 text-[10px] m-0">Need Live Support?</h4>
              <div className="space-y-2">
                <a href="https://discord.com/invite/f8dHD5Hv8Q" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 hover:text-red-500 transition-colors" style={{ textDecoration: 'none' }}>
                  <FaDiscord className="text-indigo-500" /> Join Discord Space
                </a>
                <a href="https://github.com/ajay-dhangar/algo" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 hover:text-red-500 transition-colors" style={{ textDecoration: 'none' }}>
                  <FaCodeBranch className="text-emerald-500" /> Open GitHub Issue
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel: Accordions + Isolated Engine Container */}
          <div className="lg:col-span-9 space-y-12">
            
            {/* FAQ Item Accordion Cluster */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="font-mono font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
                  Knowledge Base Node ({filteredFaqs.length})
                </span>
              </div>

              <div className="space-y-4 w-full h-[400px] overflow-y-auto rounded custom-scrollbar">

              <AnimatePresence initial={false}>
                {filteredFaqs.slice(0, visibleCount).map((faq) => {
                  const isOpen = openQuestion === faq.question;
                  return (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden bg-white dark:bg-[#0d1117] ${
                        isOpen 
                          ? "border-slate-300 dark:border-zinc-800 ring-1 ring-slate-100 dark:ring-zinc-900 shadow-sm" 
                          : "border-slate-200/60 dark:border-zinc-900/60 hover:border-slate-300 dark:hover:border-zinc-800"
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(faq.question)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-transparent border-none cursor-pointer group select-none"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <FaQuestionCircle className={`mt-1 lg:mt-1.5 shrink-0 transition-colors ${
                            isOpen ? "text-red-500" : "text-slate-300 dark:text-zinc-700"
                          }`} />
                          <h3 className="font-semibold tracking-tight text-slate-900 dark:text-white m-0 text-sm md:text-base group-hover:text-red-500 transition-colors">
                            {faq.question}
                          </h3>
                        </div>
                        <span className={`p-1 text-slate-400 dark:text-zinc-600 transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? "rotate-180 text-red-500" : ""
                        }`}>
                          <FaChevronDown className="text-xs" />
                        </span>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 md:px-5 pb-5 pt-1 text-slate-600 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-900/60 leading-relaxed font-sans font-normal">
                          <p className="m-0 whitespace-pre-wrap text-slate-600 dark:text-zinc-400 text-sm md:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-16 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#0d1117]">
                  <FaBookOpen className="text-3xl text-slate-300 dark:text-zinc-700 mx-auto mb-3" />
                  <p className="font-mono text-slate-400 dark:text-zinc-500 m-0">
                    No answers matching parameters discovered in knowledge tree.
                  </p>
                </div>
              )}

              {visibleCount < filteredFaqs.length && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 4)}
                    className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 rounded-xl cursor-pointer shadow-sm transition-all"
                  >
                    Load More Entries
                  </button>
                </div>
              )}
              </div>
            </div>       
          </div>
        </section>

        {/* Embedded Mobile Support Panel */}
            <div className="block lg:hidden p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#0d1117] space-y-3">
              <h4 className="font-black uppercase tracking-wider text-slate-400 m-0 text-center mb-2">Need Live Support?</h4>
              <div className="grid grid-cols-2 gap-2">
                <a href="https://discord.com/invite/f8dHD5Hv8Q" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 text-slate-600 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-900 rounded-lg border border-slate-200/60 dark:border-zinc-800" style={{ textDecoration: 'none' }}>
                  <FaDiscord className="text-indigo-500" /> Discord
                </a>
                <a href="https://github.com/ajay-dhangar/algo" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 text-slate-600 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-900 rounded-lg border border-slate-200/60 dark:border-zinc-800" style={{ textDecoration: 'none' }}>
                  <FaCodeBranch className="text-emerald-500" /> GitHub
                </a>
              </div>
            </div>

        {/* Unified Comments Portal Card */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#0d1117] space-y-6">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-zinc-900 pb-4">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                  <FaComments className="text-base" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white m-0">
                    Real-time Community Core
                  </h4>
                  <p className="font-mono text-slate-400 dark:text-zinc-500 m-0">
                    Connected to repository thread: ajay-dhangar/algo via GitHub Discussions
                  </p>
                </div>
              </div>

              {/* Call component safely nested deep inside Layout tree */}
              <GiscusComponent />
            </div>
      </div>
    </Layout>
  );
};

export default FAQ;
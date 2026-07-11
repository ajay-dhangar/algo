import React, { useState, useMemo } from 'react';
import { 
  FaHeart, FaShieldAlt, FaCreditCard, FaGithub, FaArrowUp, 
  FaTerminal, FaQrcode, FaSearch, FaFilter, FaSortAmountDown,
  FaMedal, FaExternalLinkAlt, FaTimes
} from 'react-icons/fa';
import { INITIAL_SPONSORS, Sponsor } from '../../data/sponsorsData';

export default function FintechExecutionConsole() {
  // Controller state arrays
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'github' | 'razorpay' | 'upi'>('all');
  const [sortBy, setSortBy] = useState<'value' | 'name'>('value');
  const [showUpiModal, setShowUpiModal] = useState(false);

  // Compute filtering sequence and map ranking based on payment value
  const processedSponsors = useMemo(() => {
    return INITIAL_SPONSORS.filter(sponsor => {
      const matchesSearch = sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (sponsor.role && sponsor.role.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = filterType === 'all' ? true : sponsor.type === filterType;
      return matchesSearch && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'value') {
        return b.amount - a.amount; // Highest contribution ranking first
      }
      return a.name.localeCompare(b.name); // Alphabetical fallback
    });
  }, [searchQuery, filterType, sortBy]);

  return (
    <div className="mx-auto px-4 py-12">
      <div className="border-t border-slate-200 dark:border-zinc-800/60 pt-12 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mx-auto">
          
          {/* Left Block: Analytics Visual Metrics */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0c0c20]/40 border border-slate-200 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xs">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)] w-fit border border-[var(--ifm-color-primary)]/10">
                <FaHeart className="text-xs animate-pulse" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-zinc-50 m-0 tracking-tight">
                Sustain High-Performance Infrastructure Pipelines
              </h2>
              <p className="text-xs sm:text-sm font-normal text-slate-500 dark:text-zinc-400 leading-relaxed m-0">
                Your contributions directly secure distributed deployment endpoints, performance optimization benchmarking nodes, and maintenance runtime systems.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-100 dark:border-zinc-800/60 pt-4">
              <div>
                <span className="block font-mono text-[8px] sm:text-[9px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">NET TRAFFIC</span>
                <strong className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-zinc-50 block mt-0.5">450K+ hits</strong>
              </div>
              <div>
                <span className="block font-mono text-[8px] sm:text-[9px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">GEOSPATIAL</span>
                <strong className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-zinc-50 block mt-0.5">140+ zones</strong>
              </div>
              <div>
                <span className="block font-mono text-[8px] sm:text-[9px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">UPTIME LOGS</span>
                <strong className="text-sm sm:text-base md:text-lg font-black tracking-tight text-emerald-500 dark:text-emerald-400 block mt-0.5">99.98%</strong>
              </div>
            </div>
          </div>

          {/* Right Block: Interactive Entry Point Panel */}
          <div className="lg:col-span-6 bg-slate-950 dark:bg-zinc-950 border border-slate-900 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-white space-y-6 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 p-4 font-mono text-[42px] sm:text-[52px] opacity-25 select-none pointer-events-none leading-none tracking-tighter text-zinc-800">
              $/INT
            </div>

            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black tracking-widest text-zinc-400 uppercase border border-zinc-800 bg-zinc-900 px-2 py-0.5 rounded">
                <FaShieldAlt className="text-[var(--ifm-color-primary)] text-[10px]" /> SECURE ENDPOINTS ACTIVATED
              </div>
              <h3 className="text-lg font-bold tracking-tight m-0 text-zinc-50">
                Inject production resources via your preferred layer.
              </h3>
              <p className="text-xs font-normal text-zinc-400 leading-relaxed m-0">
                Support our architecture array instantly using cards/UPI via Razorpay, instant scanner interface, or link directly to your enterprise GitHub space.
              </p>
            </div>

            {/* Micro-Console Channel Actuators */}
            <div className="space-y-3 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Razorpay Gateway Link */}
                <a
                  href="https://razorpay.me/@ajay-dhangar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-2 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider text-center text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-xs flex items-center justify-center gap-1.5 border border-transparent hover:no-underline hover:text-white"
                >
                  <FaCreditCard className="text-xs shrink-0" /> <span>RAZORPAY</span> <FaArrowUp className="rotate-45 text-[9px]" />
                </a>
                
                {/* GitHub Shell Link */}
                <a
                  href="https://github.com/sponsors/ajay-dhangar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-2 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider text-center text-slate-950 bg-zinc-100 hover:bg-zinc-200 transition-all shadow-xs flex items-center justify-center gap-1.5 border border-transparent hover:no-underline hover:text-slate-950"
                >
                  <FaGithub className="text-xs shrink-0" /> <span>GITHUB</span> <FaArrowUp className="rotate-45 text-[9px]" />
                </a>

                {/* Instant Modal Trigger for UPI */}
                <button
                  type="button"
                  onClick={() => setShowUpiModal(true)}
                  className="py-3 px-2 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider text-center text-emerald-400 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800/60 transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FaQrcode className="text-xs text-emerald-400 shrink-0" /> <span>UPI SCANNER</span>
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-zinc-500 tracking-wide text-center">
                <FaTerminal className="text-[8px]" /> standard structural rerouting to external encryption micro-layers
              </div>
            </div>
          </div>

        </div>
      </div>
      {showUpiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full relative p-6 flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <button 
              type="button"
              onClick={() => setShowUpiModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <FaTimes className="text-sm" />
            </button>
            <div className="w-full max-w-[280px] rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 bg-white p-1 shadow-xs">
              <img 
                src="/algo/img/upi-scanner.jpeg" 
                alt="UPI Scanner Portal" 
                className="w-full h-auto object-contain block"
              />
            </div>
            <p className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 mt-4 text-center leading-relaxed max-w-[240px]">
              Accepts payments through Google Pay, PhonePe, Paytm, or BHIM UPI apps directly.
            </p>
          </div>
        </div>
      )}

      <div className="mt-20 border-t border-slate-200 dark:border-zinc-800/60 pt-16 mx-auto">
        
        {/* Terminal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)] border border-[var(--ifm-color-primary)]/10 mb-3">
              <FaHeart className="text-[10px]" /> Core Infrastructure Backers
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-50 tracking-tight m-0">
              Verified Core Sponsors
            </h2>
            <p className="text-sm font-normal text-slate-500 dark:text-zinc-400 max-w-xl mt-1 m-0">
              Ranked dynamically by total contribution value. Query individual nodes using control matrix.
            </p>
          </div>

          {/* Filtering Control Matrix Container */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800/80 p-1.5 rounded-xl w-full md:w-auto">
            <div className="relative flex-1 sm:flex-initial min-w-[160px]">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-xs" />
              <input 
                type="text" 
                placeholder="Search matrix..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-zinc-50 placeholder-slate-400 focus:outline-none focus:border-[var(--ifm-color-primary)] font-mono"
              />
            </div>

            {/* Field B: Route Dropdown Registry */}
            <div className="flex items-center gap-1 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg px-2 py-1">
              <FaFilter className="text-slate-400 text-[10px]" />
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value as any)}
                className="bg-transparent border-0 text-xs text-slate-700 dark:text-zinc-300 font-mono focus:outline-none cursor-pointer"
              >
                <option value="all">ALL PIPELINES</option>
                <option value="github">GITHUB CHANNEL</option>
                <option value="razorpay">RAZORPAY</option>
                <option value="upi">UPI NETWORK</option>
              </select>
            </div>

            {/* Field C: Sort Vector Toggle */}
            <button 
              type="button"
              onClick={() => setSortBy(prev => prev === 'value' ? 'name' : 'value')}
              className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-lg p-2 text-slate-600 dark:text-zinc-400 flex items-center gap-1.5 text-xs font-mono transition-all cursor-pointer"
              title={sortBy === 'value' ? 'Sorting by Tier/Contribution' : 'Sorting Alphabetically'}
            >
              <FaSortAmountDown className="text-[11px]" />
              <span className="hidden sm:inline">{sortBy === 'value' ? 'RANKING' : 'A-Z'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Grid */}
        {processedSponsors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {processedSponsors.map((sponsor) => (
              <div 
                key={sponsor.id} 
                className="group bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between space-y-4 hover:shadow-xs transition-all relative overflow-hidden"
              >
                {/* Horizontal Top Highlight Strip Accentuated by Tier Status */}
                <div className={`absolute top-0 left-0 w-full h-[2px] ${
                  sponsor.tier === 'Platinum' ? 'bg-amber-400' : sponsor.tier === 'Gold' ? 'bg-slate-400' : 'bg-amber-700'
                }`} />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={sponsor.avatar} 
                      alt={sponsor.name} 
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-zinc-900"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-50 m-0 group-hover:text-[var(--ifm-color-primary)] transition-colors">
                        {sponsor.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 block">
                        {sponsor.role || `${sponsor.tier} Node`}
                      </span>
                    </div>
                  </div>

                  {/* Channel Micro-Marker Identifier */}
                  <div className="text-xs text-slate-400 dark:text-zinc-500">
                    {sponsor.type === 'github' && <FaGithub className="text-zinc-700 dark:text-zinc-400" />}
                    {sponsor.type === 'razorpay' && <FaCreditCard className="text-blue-500" />}
                    {sponsor.type === 'upi' && <FaQrcode className="text-emerald-500" />}
                  </div>
                </div>

                {/* Card Sub-Tier Status Layout */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-zinc-900/60 pt-3">
                  <div className="flex items-center gap-1">
                    <FaMedal className={`text-xs ${
                      sponsor.tier === 'Platinum' ? 'text-amber-400' : sponsor.tier === 'Gold' ? 'text-slate-400' : 'text-amber-700'
                    }`} />
                    <span className="font-mono text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      {sponsor.tier}
                    </span>
                  </div>
                  
                  {sponsor.link && sponsor.link !== '#' ? (
                    <a 
                      href={sponsor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono font-bold text-[var(--ifm-color-primary)] hover:underline flex items-center gap-1"
                    >
                      VERIFY <FaExternalLinkAlt className="text-[8px]" />
                    </a>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-400 dark:text-zinc-600 select-none">
                      SECURE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Output Interface Template */
          <div className="border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl py-12 px-4 text-center font-mono text-xs text-slate-400 dark:text-zinc-500">
            No pipeline parameters match the active sequence search criteria.
          </div>
        )}
      </div>

    </div>
  );
}
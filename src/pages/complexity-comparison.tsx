import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { autoComplexities, ComplexityItem } from '../data/complexityData';

export default function ComplexityDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [selectedAsset, setSelectedAsset] = useState<ComplexityItem>(autoComplexities[0]);
  const [animateProgress, setAnimateProgress] = useState(false);

  // Trigger internal bar chart micro-animations on mount or selection shift
  useEffect(() => {
    setAnimateProgress(false);
    const timer = setTimeout(() => setAnimateProgress(true), 50);
    return () => clearTimeout(timer);
  }, [selectedAsset, activeCategory, riskFilter]);

  // Combined search, category tab, and dropdown risk-filtering pipeline
  const filteredItems = useMemo(() => {
    return autoComplexities.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesRisk = riskFilter === 'All' || item.efficiency_rating === riskFilter;
      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [searchTerm, activeCategory, riskFilter]);

  // Fallback if filters completely drain the array to prevent boundary errors
  useEffect(() => {
    if (filteredItems.length > 0 && !filteredItems.includes(selectedAsset)) {
      setSelectedAsset(filteredItems[0]);
    }
  }, [filteredItems, selectedAsset]);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Optimal': return 'var(--ifm-color-success)';
      case 'Stable': return 'var(--ifm-color-info)';
      case 'Dangerous': return 'var(--ifm-color-danger)';
      default: return 'var(--ifm-color-secondary)';
    }
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Optimal': return 'badge--success';
      case 'Stable': return 'badge--info';
      case 'Dangerous': return 'badge--danger';
      default: return 'badge--secondary';
    }
  };

  return (
    <Layout
      title="Architecture Matrix Console"
      description="Professional analytics workstation tracking resource scale overheads."
    >
      <main className="container padding-vert--lg">
        
        {/* Sleek Breadcrumb & Telemetry Header */}
        <div className="margin-bottom--lg" style={{ borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '1.5rem' }}>
          <div className="text--muted small text--uppercase font-code margin-bottom--xs">System Workstation // Analytics Platform</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="margin--none" style={{ fontWeight: 800, fontSize: '2.2rem', letterSpacing: '-0.5px' }}>
              Algorithm Performance Matrix
            </h1>
            <div className="font-code small text--muted">
              Active Registry: <span className="text--primary">{filteredItems.length} active metrics</span>
            </div>
          </div>
        </div>

        {/* Multi-Tier Filter & Dropdown Control Console */}
        <div className="row margin-bottom--xl" style={{ rowGap: '1rem', alignItems: 'center' }}>
          <div className="col col--4">
            <input 
              type="text" 
              placeholder="Search index structures, kernels..." 
              className="button"
              style={{ 
                width: '100%', cursor: 'text', textAlign: 'left', 
                backgroundColor: 'var(--ifm-color-emphasis-100)', 
                border: '1px solid var(--ifm-color-emphasis-300)',
                color: 'var(--ifm-font-color-base)', padding: '0.65rem 1rem',
                borderRadius: '8px', boxShadow: 'none'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="col col--3">
            {/* Live Filter Risk Dropdown */}
            <select
              className="button button--secondary"
              style={{ 
                width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
                border: '1px solid var(--ifm-color-emphasis-300)',
                backgroundColor: 'var(--ifm-color-emphasis-100)',
                color: 'var(--ifm-font-color-base)', cursor: 'pointer',
                textAlign: 'start'
              }}
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
            >
              <option value="All">⚠️ Filter by Risk Profile (All)</option>
              <option value="Optimal">🟢 Optimal Scale</option>
              <option value="Stable">🔵 Stable Allocation</option>
              <option value="Dangerous">🔴 High Operational Risk</option>
            </select>
          </div>

          <div className="col col--5">
            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              {['All', 'Data Structure', 'Sorting'].map((cat) => (
                <button
                  key={cat}
                  className={`button ${activeCategory === cat ? 'button--primary' : 'button--secondary'}`}
                  style={{ 
                    borderRadius: '8px', fontSize: '0.85rem', padding: '0.65rem 1.2rem',
                    border: activeCategory === cat ? 'none' : '1px solid var(--ifm-color-emphasis-300)',
                    backgroundColor: activeCategory === cat ? 'var(--ifm-color-primary)' : 'transparent',
                    color: activeCategory === cat ? 'var(--ifm-color-emphasis-100)' : 'var(--ifm-color-emphasis-700)'
                  }}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Split Console Dashboard Architecture */}
        <div className="row">
          
          {/* Main Left Controller Area (Data Table/Cards) */}
          <div className="col col--8 margin-bottom--xl">
            
            {/* Desktop Engineering Table View */}
            <div className="d-none d-md-block" style={{ backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)', overflow: 'hidden' }}>
              <table className="table margin--none" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--ifm-color-emphasis-300)', background: 'var(--ifm-color-emphasis-100)' }}>
                    <th style={{ padding: '1rem' }}>Structure Profile</th>
                    <th style={{ padding: '1rem' }}>Best Case</th>
                    <th style={{ padding: '1rem' }}>Avg. Case</th>
                    <th style={{ padding: '1rem' }}>Worst Case</th>
                    <th style={{ padding: '1rem' }}>Space Overhead</th>
                    <th style={{ padding: '1rem', width: '20%' }}>Scale Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text--center padding--lg text--muted">No metrics match active query parameters.</td>
                    </tr>
                  ) : (
                    filteredItems.map((item, idx) => (
                      <tr 
                        key={idx} 
                        onClick={() => setSelectedAsset(item)}
                        style={{ 
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          backgroundColor: selectedAsset?.title === item.title ? 'var(--ifm-color-table-light)' : 'transparent',
                          borderBottom: '1px solid var(--ifm-color-emphasis-200)'
                        }}
                      >
                        <td style={{ padding: '1rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--ifm-color-primary)' }}>{item.title}</span>
                          <div className="small text--muted font-code" style={{ fontSize: '0.75rem' }}>{item.category}</div>
                        </td>
                        <td style={{ padding: '1rem' }} className="font-code text--success"><InlineMath math={item.time_best} /></td>
                        <td style={{ padding: '1rem' }} className="font-code text--warning"><InlineMath math={item.time_average} /></td>
                        <td style={{ padding: '1rem' }} className="font-code text--danger"><InlineMath math={item.time_worst} /></td>
                        <td style={{ padding: '1rem' }} className="font-code text--info"><InlineMath math={item.space} /></td>
                        
                        {/* Interactive Inline Mini Chart Bar Component */}
                        <td style={{ padding: '1rem', verticalAlign: 'middle' }}>
                          <div style={{ background: 'var(--ifm-color-emphasis-200)', width: '100%', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ 
                              background: getRatingColor(item.efficiency_rating),
                              width: animateProgress ? `${item.performance_score}%` : '0%',
                              height: '100%', borderRadius: '3px',
                              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                            }} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>            
          </div>

          {/* Right Side Workstation Diagnostics Inspector */}
          <div className="col col--4">
            {selectedAsset ? (
              <div style={{
                position: 'sticky', 
                top: 'calc(var(--ifm-navbar-height) + 1rem)',
                backgroundColor: 'var(--ifm-background-surface-color)',
                border: '1px solid var(--ifm-color-emphasis-300)', 
                borderRadius: '12px',
                boxShadow: 'var(--ifm-global-shadow-md)', 
                overflow: 'hidden'
              }}>
                {/* Card Header Profile Banner */}
                <div className="padding--md" style={{ background: 'var(--ifm-color-emphasis-100)', borderBottom: '1px solid var(--ifm-color-emphasis-300)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="font-code small text--muted">Telemetry Readout</span>
                    <span className={`badge ${getRatingBadge(selectedAsset.efficiency_rating)}`}>
                      {selectedAsset.performance_score}/100 Score
                    </span>
                  </div>
                  <h3 className="margin-top--xs margin-bottom--none" style={{ fontSize: '1.5rem' }}>
                    {selectedAsset.title}
                  </h3>
                </div>

                {/* Card Body Interactive Inspection Modules */}
                <div className="padding--md">
                  {/* High Fidelity Animated Processing Graph */}
                  <div className="margin-bottom--md" style={{ background: 'var(--ifm-color-emphasis-100)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-200)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className="font-code small margin-bottom--xs">
                      <span>Scaling Engine Velocity</span>
                      <strong style={{ color: getRatingColor(selectedAsset.efficiency_rating) }}>
                        {selectedAsset.performance_score}%
                      </strong>
                    </div>
                    {/* Native SVG Vector Chart Area */}
                    <svg width="100%" height="40" style={{ background: 'transparent', overflow: 'visible' }}>
                      {/* Background track bar shadow layer */}
                      <rect width="100%" height="16" rx="8" fill="var(--ifm-color-emphasis-200)" y="12" />
                      {/* Dynamic Foreground Animated Progress Track */}
                      <rect
                        width={animateProgress ? `${selectedAsset.performance_score}%` : '0%'}
                        height="16" 
                        rx="8"
                        fill={getRatingColor(selectedAsset.efficiency_rating)}
                        y="12"
                        style={{ transition: 'width 1.2s cubic-bezier(0.075, 0.82, 0.165, 1)' }}
                      />
                    </svg>
                    <div className="text--muted small font-code" style={{ fontSize: '0.65rem', marginTop: '4px', textAlign: 'right' }}>
                      *Higher values represent efficient structural scaling thresholds
                    </div>
                  </div>

                  {/* Notes Module */}
                  <div className="margin-bottom--md">
                    <p className="small text--italic" style={{ lineHeight: '1.5', margin: 0 }}>
                      "{selectedAsset.notes}"
                    </p>
                  </div>

                  {/* System Attributes Grid */}
                  <div className="margin-bottom--md" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{ border: '1px solid var(--ifm-color-emphasis-200)', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                      <div className="small text--muted">Thread Safety</div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {selectedAsset.concurrency_safe ? '✅ Thread-Safe' : '⚠️ Lock Required'}
                      </span>
                    </div>

                    <div style={{ border: '1px solid var(--ifm-color-emphasis-200)', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                      <div className="small text--muted">Source Registry</div>
                      <Link className="small" to="/docs/category/basic-data-structure">
                        View Blueprint &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Technical Analysis Footer Block */}
                  <div style={{ background: 'var(--ifm-color-emphasis-100)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                    <b style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>Scaling Blueprint:</b>
                    <p className="margin--none small text--muted" style={{ lineHeight: '1.4' }}>
                      This core scaling matrix states that input operations handling items expand along a runtime curve trending towards execution parameters.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text--center text--muted padding--lg">Select an asset profile to view detailed diagnostics.</div>
            )}
          </div>

        </div>
      </main>
    </Layout>
  );
}
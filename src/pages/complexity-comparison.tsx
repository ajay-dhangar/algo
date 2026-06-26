import React from 'react';
import Layout from '@theme/Layout';
import autoComplexities from '../data/auto-complexities.json';

export default function ComplexityComparison() {
  return (
    <Layout
      title="Algorithm Complexity Comparison"
      description="Compare time and space complexities of all documented algorithms"
    >
      <main className="container margin-vert--lg">
        <h1>Algorithm Complexity Comparison</h1>
        <p>This table is automatically generated from the documentation metadata.</p>
        
        {autoComplexities.length === 0 ? (
          <div className="alert alert--info">
            No algorithms with complexity metadata found yet.
          </div>
        ) : (
          <table style={{ width: '100%', display: 'table', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--ifm-color-emphasis-300)' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Algorithm</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Best</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Average</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Worst</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Space</th>
              </tr>
            </thead>
            <tbody>
              {autoComplexities.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <strong>{item.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
                      {item.path}
                    </div>
                  </td>
                  <td style={{ padding: '0.5rem', color: 'var(--ifm-color-success)' }}>{item.time_best}</td>
                  <td style={{ padding: '0.5rem', color: 'var(--ifm-color-warning)' }}>{item.time_average}</td>
                  <td style={{ padding: '0.5rem', color: 'var(--ifm-color-danger)' }}>{item.time_worst}</td>
                  <td style={{ padding: '0.5rem', color: 'var(--ifm-color-info)' }}>{item.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </Layout>
  );
}

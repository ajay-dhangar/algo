import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import autoComplexitiesRaw from '../data/auto-complexities.json';

interface ComplexityData {
  title: string;
  path: string;
  time_best: string;
  time_average: string;
  time_worst: string;
  space: string;
}

const autoComplexities = autoComplexitiesRaw as ComplexityData[];

export default function ComplexityComparison() {
  return (
    <Layout
      title="Algorithm Complexity Comparison"
      description="Compare time and space complexities of all documented algorithms"
    >
      <main className="container margin-vert--lg">
        <h1>
          <Translate id="complexity.comparison.title">Algorithm Complexity Comparison</Translate>
        </h1>
        <p>
          <Translate id="complexity.comparison.description">This table is automatically generated from the documentation metadata.</Translate>
        </p>
        
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
                    <Link to={`/${item.path.replace(/\.mdx?$/, '')}`}>
                      <strong>{item.title}</strong>
                    </Link>
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

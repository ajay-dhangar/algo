import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

interface ComplexityData {
  title: string;
  path: string;
  time_best: string;
  time_average: string;
  time_worst: string;
  space: string;
}

const autoComplexities: ComplexityData[] = [
  {
    title: "Array",
    path: "docs/basic-data-structures/array",
    time_best: "O(1)",
    time_average: "O(1)",
    time_worst: "O(n)",
    space: "O(n)"
  },
  {
    title: "Hash Map",
    path: "docs/basic-data-structures/hash-map",
    time_best: "O(1)",
    time_average: "O(1)",
    time_worst: "O(n)",
    space: "O(n)"
  },
  {
    title: "Bubble Sort",
    path: "docs/extra/algorithms/sorting-algorithms/bubble-sort",
    time_best: "O(n)",
    time_average: "O(n^2)",
    time_worst: "O(n^2)",
    space: "O(1)"
  },
  {
    title: "Merge Sort",
    path: "docs/extra/algorithms/sorting-algorithms/merge-sort",
    time_best: "O(n log n)",
    time_average: "O(n log n)",
    time_worst: "O(n log n)",
    space: "O(n)"
  }
];

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
          <Translate id="complexity.comparison.description">This table provides a reference for the time and space complexities of common data structures and algorithms.</Translate>
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

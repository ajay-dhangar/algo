import React from 'react';
import complexityData from '@site/src/data/algorithm-complexities.json';
import styles from './styles.module.css';

function formatBoolean(value) {
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  return 'N/A';
}

export default function ComplexityTable({ algorithms = [] }) {
  const selectedAlgorithms =
    algorithms.length > 0
      ? algorithms.map((name) => [name, complexityData[name]]).filter(([, data]) => data)
      : Object.entries(complexityData);

  if (selectedAlgorithms.length === 0) {
    return (
      <div className={styles.notice}>
        No matching algorithm complexity data found.
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.complexityTable}>
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Category</th>
            <th>Best</th>
            <th>Average</th>
            <th>Worst</th>
            <th>Space</th>
            <th>Stable</th>
            <th>In-place</th>
          </tr>
        </thead>
        <tbody>
          {selectedAlgorithms.map(([name, data]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{data.category}</td>
              <td>{data.best}</td>
              <td>{data.average}</td>
              <td>{data.worst}</td>
              <td>{data.space}</td>
              <td>{formatBoolean(data.stable)}</td>
              <td>{formatBoolean(data.inPlace)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from "react";
import { algorithmComplexities } from "../../data/algorithmComplexities";
import styles from "./styles.module.css";

interface Algorithm {
  name: string;
  category: string;
  best: string;
  average: string;
  worst: string;
  space: string;
}

const ComplexityComparisonTable: React.FC = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);

  const handleSelection = (name: string) => {
    setSelectedAlgorithms((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const filteredAlgorithms: Algorithm[] =
    algorithmComplexities.filter((algo) =>
      selectedAlgorithms.includes(algo.name)
    );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Interactive Time & Space Complexity Comparison
      </h2>

      <p className={styles.description}>
        Select one or more algorithms to compare their complexities.
      </p>

      <div className={styles.selectionContainer}>
        {algorithmComplexities.map((algo) => (
          <label key={algo.name} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedAlgorithms.includes(algo.name)}
              onChange={() => handleSelection(algo.name)}
            />
            {algo.name}
          </label>
        ))}
      </div>

      {filteredAlgorithms.length > 0 ? (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Category</th>
                <th>Best Case</th>
                <th>Average Case</th>
                <th>Worst Case</th>
                <th>Space</th>
              </tr>
            </thead>

            <tbody>
              {filteredAlgorithms.map((algo) => (
                <tr key={algo.name}>
                  <td>{algo.name}</td>
                  <td>{algo.category}</td>
                  <td>{algo.best}</td>
                  <td>{algo.average}</td>
                  <td>{algo.worst}</td>
                  <td>{algo.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.emptyState}>
          Please select at least one algorithm.
        </div>
      )}
    </div>
  );
};

export default ComplexityComparisonTable;
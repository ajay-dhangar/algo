import React from 'react';

export interface Problem {
  name: string;
  link: string;
  difficulty: string; // Keep string to support case-insensitive and whitespace-robust parsing
  platform: string;
}

interface PracticeProblemsProps {
  problems: Problem[];
}

const getDifficultyBadgeClass = (difficulty: string) => {
  const norm = difficulty.trim().toLowerCase();
  if (norm === 'easy') {
    return 'badge badge--success';
  } else if (norm === 'medium') {
    return 'badge badge--warning';
  } else if (norm === 'hard') {
    return 'badge badge--danger';
  }
  return 'badge badge--secondary';
};

export default function PracticeProblems({ problems }: PracticeProblemsProps) {
  if (!problems || problems.length === 0) return null;

  return (
    <div className="margin-bottom--md" style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px' }}>Problem Name</th>
            <th style={{ textAlign: 'left', padding: '12px', width: '150px' }}>Platform</th>
            <th style={{ textAlign: 'center', padding: '12px', width: '120px' }}>Difficulty</th>
            <th style={{ textAlign: 'center', padding: '12px', width: '120px' }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid var(--ifm-color-emphasis-300)' }}>
              <td style={{ padding: '12px', fontWeight: '500' }}>{problem.name}</td>
              <td style={{ padding: '12px' }}>
                <span className="badge badge--secondary" style={{ fontSize: '0.85rem' }}>
                  {problem.platform}
                </span>
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <span 
                  className={getDifficultyBadgeClass(problem.difficulty)}
                  style={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '12px'
                  }}
                >
                  {problem.difficulty.trim()}
                </span>
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--outline button--primary button--sm"
                  style={{ textDecoration: 'none' }}
                >
                  Solve
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

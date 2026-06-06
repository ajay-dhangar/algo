import React, { useState, useEffect } from 'react';

interface ProgressData {
  [key: string]: boolean | string;
}

const ProgressDashboard: React.FC = () => {
  const [progress, setProgress] = useState<ProgressData>({});

  useEffect(() => {
    const load = () => {
      try {
        const saved = localStorage.getItem('algo_progress');
        if (saved) setProgress(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    };
    load();
    window.addEventListener('progressUpdated', load);
    return () => window.removeEventListener('progressUpdated', load);
  }, []);

  const completedTopics = Object.entries(progress)
    .filter(([key, val]) => !key.endsWith('_title') && val === true)
    .map(([key]) => ({
      id: key,
      title: (progress[`${key}_title`] as string) || key
    }));

  const completedCount = completedTopics.length;
  const totalCount = Object.keys(progress).filter(k => !k.endsWith('_title')).length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div style={{ margin: '24px 0' }}>
      {/* Stats Card */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        padding: '20px 24px',
        color: 'white',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '17px' }}>📊 Your Learning Progress</h3>
        <div style={{
          background: 'rgba(255,255,255,0.25)',
          borderRadius: '8px',
          height: '10px',
          overflow: 'hidden',
          marginBottom: '14px'
        }}>
          <div style={{
            background: '#4caf50',
            height: '100%',
            width: `${pct}%`,
            borderRadius: '8px',
            transition: 'width 0.6s ease'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span>✅ Completed: {completedCount}</span>
          <span>📚 Tracked: {totalCount}</span>
          <span>📈 {pct}%</span>
        </div>
      </div>

      {/* Completed list */}
      {completedTopics.length > 0 && (
        <div style={{
          background: '#f6f8fa',
          borderRadius: '10px',
          padding: '16px 20px',
          border: '1px solid #e1e4e8'
        }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: '#24292e' }}>
            Recently Completed:
          </h4>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {completedTopics.slice(-5).reverse().map(topic => (
              <li key={topic.id} style={{
                padding: '7px 0',
                borderBottom: '1px solid #e1e4e8',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>✅</span> {topic.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {completedTopics.length === 0 && (
        <p style={{ color: '#6a737d', fontSize: '13px', textAlign: 'center', margin: '8px 0' }}>
          No topics completed yet. Start learning and mark topics as done!
        </p>
      )}
    </div>
  );
};

export default ProgressDashboard;
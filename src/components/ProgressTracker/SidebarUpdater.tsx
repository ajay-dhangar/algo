import React, { useEffect, useState } from 'react';
import { safeJsonParse } from '../../utils/safeStorage';


interface ProgressData {
  [key: string]: boolean | string;
}

const SidebarUpdater: React.FC = () => {
  const [progress, setProgress] = useState<ProgressData>({});

  useEffect(() => {
    const load = () => {
      try {
        setProgress(safeJsonParse<ProgressData>('algo_progress', {}));
      } catch (e) {
        console.error(e);
      }
    };
    load();
    window.addEventListener('progressUpdated', load);
    return () => window.removeEventListener('progressUpdated', load);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      const links = document.querySelectorAll('.menu__link');
      links.forEach(link => {
        link.querySelector('.completion-badge')?.remove();
        const linkText = link.textContent?.trim() || '';
        for (const [key, val] of Object.entries(progress)) {
          if (!key.endsWith('_title') && val === true) {
            const title = progress[`${key}_title`] as string;
            if (title && (linkText.includes(title) || title.includes(linkText))) {
              const badge = document.createElement('span');
              badge.className = 'completion-badge';
              badge.textContent = '✓';
              badge.style.cssText = 'margin-left:6px;opacity:0.85;';
              link.appendChild(badge);
              break;
            }
          }
        }
      });
    }, 150);
    return () => clearTimeout(id);
  }, [progress]);

  return null;
};

export default SidebarUpdater;
import React, { useEffect, useState } from 'react';
import { syncAlgoProgress } from '../../utils/safeStorage';
import { getProgressSnapshot, onProgressUpdate } from '../../utils/progressStore';


interface ProgressData {
  [key: string]: boolean | string;
}

/** Normalizes sidebar link text / stored titles for exact comparison. */
const normalizeLabel = (text: string): string => text.toLowerCase().replace(/\s+/g, ' ').trim();

/**
 * Derives the doc topicId (e.g. "dsa-problems-easy-two-sum-problem") that a
 * sidebar link's href maps to, or null for non-doc links.
 *
 * Sidebar hrefs look like "/algo/docs/dsa-problems/easy/two-sum-problem" and
 * progress keys are built from the doc id with "/" replaced by "-", so the two
 * can be matched exactly — no fuzzy title matching required.
 */
const docTopicIdFromHref = (href: string | null): string | null => {
  if (!href) return null;
  const segments = href.split('/').filter(Boolean);
  const docsIndex = segments.indexOf('docs');
  if (docsIndex === -1) return null;
  return segments.slice(docsIndex + 1).join('-');
};

const SidebarUpdater: React.FC = () => {
  const [progress, setProgress] = useState<ProgressData>({});

  useEffect(() => {
    const load = () => {
      try {
        const snapshot = getProgressSnapshot();
        const flat: ProgressData = {};
        for (const [topicId, entry] of Object.entries(snapshot.topics)) {
          flat[topicId] = entry.completed;
          if (entry.title) flat[`${topicId}_title`] = entry.title;
        }
        setProgress(flat);
      } catch {
        // getProgressSnapshot returns empty fallback on failure.
      }
    };
    
    // Initial fetch from supabase if authenticated
    syncAlgoProgress().then(load).catch(load);

    const unsub = onProgressUpdate(load);
    return unsub;
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      const links = Array.from(document.querySelectorAll<HTMLElement>('.menu__link'));

      // Clear any stale badges first.
      links.forEach(link => link.querySelector('.completion-badge')?.remove());

      const completed: Array<{ key: string; title: string }> = [];
      for (const [key, val] of Object.entries(progress)) {
        if (val === true && !key.endsWith('_title') && !key.endsWith('_updatedAt') && !key.endsWith('_url')) {
          const title = typeof progress[`${key}_title`] === 'string' ? (progress[`${key}_title`] as string) : '';
          completed.push({ key, title: title.trim() });
        }
      }

      const matchedKeys = new Set<string>();
      /** Appends a completion badge to a sidebar link (idempotent). */
      const addBadge = (link: HTMLElement) => {
        if (link.querySelector('.completion-badge')) return;
        const badge = document.createElement('span');
        badge.className = 'completion-badge';
        badge.textContent = '✓';
        badge.style.cssText = 'margin-left:6px;opacity:0.85;';
        link.appendChild(badge);
      };

      // Primary: exact href-to-topicId match. Unambiguous even for
      // near-duplicate titles like "Two Sum" / "Two Sum II".
      for (const link of links) {
        const docTopicId = docTopicIdFromHref(link.getAttribute('href'));
        if (!docTopicId) continue;
        const entry = completed.find(item => item.key === docTopicId);
        if (entry) {
          matchedKeys.add(entry.key);
          addBadge(link);
        }
      }

      // Fallback for legacy entries whose stored key is not the doc id (e.g.
      // keys derived from the page title instead of the path). Only exact
      // normalized title equality is allowed so near-duplicates never badge the
      // wrong link.
      for (const entry of completed) {
        if (matchedKeys.has(entry.key) || !entry.title) continue;
        const link = links.find(l =>
          !l.querySelector('.completion-badge') &&
          normalizeLabel(l.textContent ?? '') === normalizeLabel(entry.title)
        );
        if (link) addBadge(link);
      }
    }, 150);
    return () => clearTimeout(id);
  }, [progress]);

  return null;
};

export default SidebarUpdater;

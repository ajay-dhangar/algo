import React, { useCallback, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { FiDownload, FiImage, FiCheck, FiAlertCircle, FiLoader, FiX } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import ShareResultCard from './ShareResultCard';
import { renderShareCardToPngBlob } from '../../utils/shareResultImage';
import { slugify } from '../../utils/slugUtils';
import styles from './ShareResultModal.module.css';

export interface ShareResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  score: number;
  total: number;
  siteName?: string;
}

type ActionStatus = 'idle' | 'working' | 'done' | 'error';
const RESET_DELAY_MS = 2500;

function getShareSlug(value: string): string {
  return slugify(value, 'quiz-result');
}

export default function ShareResultModal({
  isOpen,
  onClose,
  topic,
  score,
  total,
  siteName = 'Algo',
}: ShareResultModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, { isOpen, onClose });

  const [downloadStatus, setDownloadStatus] = useState<ActionStatus>('idle');
  const [copyStatus, setCopyStatus] = useState<ActionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const downloadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset all action state when the modal opens so stale errors from a
  // previous session are never visible before the user takes any action.
  useEffect(() => {
    if (isOpen) {
      setDownloadStatus('idle');
      setCopyStatus('idle');
      setErrorMessage('');
      if (downloadTimeoutRef.current) clearTimeout(downloadTimeoutRef.current);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (downloadTimeoutRef.current) clearTimeout(downloadTimeoutRef.current);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const shareText = `I scored ${score}/${total} on the ${topic} quiz on ${siteName}! 🎯`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleDownload = useCallback(async () => {
    setDownloadStatus('working');
    setErrorMessage('');
    try {
      const blob = await renderShareCardToPngBlob(topic, score, total, siteName);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${getShareSlug(topic)}-quiz-result.png`;
      link.click();
      URL.revokeObjectURL(url);
      setDownloadStatus('done');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Download failed.');
      setDownloadStatus('error');
    } finally {
      downloadTimeoutRef.current = setTimeout(() => setDownloadStatus('idle'), RESET_DELAY_MS);
    }
  }, [topic, score, total, siteName]);

  const handleCopyImage = useCallback(async () => {
    setCopyStatus('working');
    setErrorMessage('');
    try {
      const blob = await renderShareCardToPngBlob(topic, score, total, siteName);
      const ClipboardItemCtor = typeof window !== 'undefined' ? (window as any).ClipboardItem : undefined;

      if (navigator.clipboard && ClipboardItemCtor) {
        await navigator.clipboard.write([new ClipboardItemCtor({ 'image/png': blob })]);
      } else {
        // Clipboard image writes aren't supported everywhere (e.g. Firefox) —
        // fall back to a direct PNG download so the action still succeeds.
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${getShareSlug(topic)}-quiz-result.png`;
        link.click();
        URL.revokeObjectURL(url);
      }
      setCopyStatus('done');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Copy failed.');
      setCopyStatus('error');
    } finally {
      copyTimeoutRef.current = setTimeout(() => setCopyStatus('idle'), RESET_DELAY_MS);
    }
  }, [topic, score, total, siteName]);

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(
      shareUrl,
    )}`;
    openShareWindow(url);
  };

  const handleShareLinkedIn = () => {
    // LinkedIn's share endpoint only accepts a URL — it doesn't support
    // prefilled post text, so the caption is left for the user to add.
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    openShareWindow(url);
  };

  if (!isOpen) return null;

  const downloadLabel = { idle: 'Download PNG', working: 'Preparing…', done: 'Downloaded!', error: 'Try again' }[
    downloadStatus
  ];
  const copyLabel = { idle: 'Copy image', working: 'Copying…', done: 'Copied!', error: 'Try again' }[copyStatus];

  const renderStatusIcon = (status: ActionStatus, IdleIcon: React.ComponentType<{ size?: number }>) => {
    if (status === 'working') return <FiLoader size={16} className={styles.spin} />;
    if (status === 'done') return <FiCheck size={16} />;
    if (status === 'error') return <FiAlertCircle size={16} />;
    return <IdleIcon size={16} />;
  };

  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-result-modal-title"
        className={styles.modal}
      >
        <div className={styles.header}>
          <h2 id="share-result-modal-title" className={styles.title}>
            Share your result
          </h2>
          <button type="button" onClick={onClose} aria-label="Close share dialog" className={styles.closeButton}>
            <FiX size={18} />
          </button>
        </div>

        <div className={styles.preview}>
          <ShareResultCard topic={topic} score={score} total={total} siteName={siteName} />
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={handleDownload} disabled={downloadStatus === 'working'} className={styles.button}>
            {renderStatusIcon(downloadStatus, FiDownload)}
            <span>{downloadLabel}</span>
          </button>
          <button type="button" onClick={handleCopyImage} disabled={copyStatus === 'working'} className={styles.button}>
            {renderStatusIcon(copyStatus, FiImage)}
            <span>{copyLabel}</span>
          </button>
          <button type="button" onClick={handleShareTwitter} className={clsx(styles.button, styles.twitterButton)}>
            <FaXTwitter size={16} />
            <span>Share on X</span>
          </button>
          <button type="button" onClick={handleShareLinkedIn} className={clsx(styles.button, styles.linkedinButton)}>
            <FaLinkedin size={16} />
            <span>Share on LinkedIn</span>
          </button>
        </div>

        {errorMessage && (downloadStatus === 'error' || copyStatus === 'error') && (
          <p className={styles.errorText} role="status">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

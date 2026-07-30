import React from 'react';
import ShareResultCard, { SHARE_CARD_WIDTH, SHARE_CARD_HEIGHT } from '../components/Quiz/ShareResultCard';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not render the share card image.'));
    img.src = src;
  });
}

/**
 * Renders <ShareResultCard /> to a PNG Blob by serializing it to SVG markup
 * (via react-dom/server, dynamically imported so it isn't part of the main
 * bundle) and rasterizing that SVG onto a canvas at 2x scale.
 *
 * Deliberately not a screenshot of the live quiz page — this produces a
 * fixed, predictable image regardless of the reader's theme/viewport.
 */
export async function renderShareCardToPngBlob(
  topic: string,
  score: number,
  total: number,
  siteName?: string,
): Promise<Blob> {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const markup = renderToStaticMarkup(
    <ShareResultCard topic={topic} score={score} total={total} siteName={siteName} />,
  );
  const svgMarkup = `<?xml version="1.0" encoding="UTF-8"?>${markup}`;

  const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const img = await loadImage(svgUrl);
    const scale = 2; // render at 2x for crisper downloads/clipboard copies
    const canvas = document.createElement('canvas');
    canvas.width = SHARE_CARD_WIDTH * scale;
    canvas.height = SHARE_CARD_HEIGHT * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas rendering is not supported in this browser.');

    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, SHARE_CARD_WIDTH, SHARE_CARD_HEIGHT);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the image.'))), 'image/png');
    });
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

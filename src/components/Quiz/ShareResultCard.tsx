import React from 'react';

export interface ShareResultCardProps {
  topic: string;
  score: number;
  total: number;
  siteName?: string;
  tagline?: string;
}

// Standard OG-image aspect ratio so the exported PNG looks right when
// unfurled on Twitter/X and LinkedIn.
export const SHARE_CARD_WIDTH = 1200;
export const SHARE_CARD_HEIGHT = 630;

function resultLabelFor(percentage: number): string {
  if (percentage === 100) return 'Perfect score!';
  if (percentage >= 80) return 'Great job!';
  if (percentage >= 50) return 'Nice work!';
  return 'Keep practicing!';
}

/**
 * Purpose-built SVG "result card" — deliberately not a screenshot of the
 * quiz UI. Rendering our own fixed layout means the shared image always
 * looks the same regardless of the reader's theme, viewport, or whatever
 * CSS happens to be on the quiz page, and it rasterizes safely to a canvas
 * (no external fonts/images that could taint the canvas).
 */
export default function ShareResultCard({
  topic,
  score,
  total,
  siteName = 'Algo',
  tagline = 'Practice DSA for free',
}: ShareResultCardProps) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const resultLabel = resultLabelFor(percentage);

  return (
    <svg
      width={SHARE_CARD_WIDTH}
      height={SHARE_CARD_HEIGHT}
      viewBox={`0 0 ${SHARE_CARD_WIDTH} ${SHARE_CARD_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily="Arial, Helvetica, sans-serif"
      role="img"
      aria-label={`I scored ${score} out of ${total} on the ${topic} quiz on ${siteName}`}
    >
      <defs>
        <linearGradient id="share-card-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <linearGradient id="share-card-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <rect width={SHARE_CARD_WIDTH} height={SHARE_CARD_HEIGHT} fill="url(#share-card-bg)" />

      {/* Subtle dot grid backdrop */}
      <g opacity="0.12">
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 20 }).map((__, col) => (
            <circle key={`${row}-${col}`} cx={col * 64 + 30} cy={row * 64 + 30} r="1.5" fill="#ffffff" />
          )),
        )}
      </g>

      {/* Brand */}
      <text x="64" y="96" fontSize="32" fontWeight="900" fill="#ffffff" letterSpacing="1">
        {siteName.toUpperCase()}
      </text>
      <rect x="64" y="110" width="64" height="6" rx="3" fill="url(#share-card-accent)" />

      {/* Topic */}
      <text x="64" y="230" fontSize="46" fontWeight="800" fill="#ffffff">
        {topic}
      </text>
      <text x="64" y="266" fontSize="22" fontWeight="500" fill="#c7d2fe">
        Quiz Result
      </text>

      {/* Score */}
      <text x="64" y="410" fontSize="150" fontWeight="900" fill="#ffffff">
        {score}
        <tspan fontSize="64" fill="#a5b4fc">
          {' '}
          / {total}
        </tspan>
      </text>

      {/* Percentage badge */}
      <rect x="64" y="438" width="130" height="50" rx="25" fill="url(#share-card-accent)" />
      <text x="94" y="472" fontSize="24" fontWeight="800" fill="#ffffff">
        {percentage}%
      </text>

      {/* Result label */}
      <text x="212" y="472" fontSize="26" fontWeight="700" fill="#ffffff">
        {resultLabel}
      </text>

      {/* Footer */}
      <text x="64" y="580" fontSize="20" fontWeight="500" fill="#94a3b8">
        {tagline} — learn more at {siteName}
      </text>
    </svg>
  );
}

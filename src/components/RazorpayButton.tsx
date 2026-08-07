import React, { useEffect, useRef, useState } from 'react';

interface RazorpayButtonProps {
  buttonId?: string;
  className?: string;
}

export default function RazorpayButton({
  buttonId = 'pl_TMiTv5XswAtZVk',
  className = '',
}: RazorpayButtonProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.children.length === 0) {
      const form = document.createElement('form');
      const script = document.createElement('script');

      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', buttonId);
      script.async = true;

      script.onload = () => setIsLoaded(true);

      form.appendChild(script);
      container.appendChild(form);
    }
  }, [buttonId]);

  return (
    <div className={`relative min-h-[44px] flex items-center justify-center ${className}`}>
      {!isLoaded && (
        <div className="w-full h-11 bg-zinc-900 border border-zinc-800 animate-pulse rounded-xl flex items-center justify-center text-[10px] font-mono text-zinc-500">
          INITIALIZING GATEWAY...
        </div>
      )}
      <div
        ref={containerRef}
        className={`w-full flex justify-center transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
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

    // Clear any previously injected form+script so that a changed buttonId
    // (or a remount) always injects a fresh script with the correct ID.
    // Without this, the children.length guard would silently skip the
    // re-injection and leave the old payment button ID loaded.
    container.innerHTML = '';
    setIsLoaded(false);

    const form = document.createElement('form');
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', buttonId);
    script.async = true;

    script.onload = () => setIsLoaded(true);

    form.appendChild(script);
    container.appendChild(form);

    // Cleanup: clear the container if the component unmounts or buttonId
    // changes before the script finishes loading.
    return () => {
      container.innerHTML = '';
    };
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
      / />
  );
}
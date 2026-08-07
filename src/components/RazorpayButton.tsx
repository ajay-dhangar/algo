import React, { useEffect, useRef } from 'react';

export default function RazorpayButton(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length === 0) {
      const form = document.createElement('form');
      const script = document.createElement('script');
      
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute('data-payment_button_id', 'pl_TMiTv5XswAtZVk');
      script.async = true;

      form.appendChild(script);
      containerRef.current.appendChild(form);
    }
  }, []);

  return (
    <div 
      className="flex justify-center items-center transition-transform hover:scale-105" 
      ref={containerRef} 
    />
  );
}

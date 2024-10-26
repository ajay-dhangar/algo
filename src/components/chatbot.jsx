import React, { useEffect } from 'react';

const ChatbotScript = () => {
  useEffect(() => {
    window.embeddedChatbotConfig = {
      chatbotId: "lb8tTNFhXryOebzVM1edo",
      domain: "www.chatbase.co",
      customStyles: {
        position: 'fixed',
        left: '20px',
        bottom: '20px',
        zIndex: '1000', // Ensures it stays on top of other elements
      }
    };

    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute('chatbotId', "lb8tTNFhXryOebzVM1edo");
    script.setAttribute('domain', "www.chatbase.co");
    script.defer = true;

    document.body.appendChild(script);

    // Cleanup function to remove the script if needed
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything
};

export default ChatbotScript;

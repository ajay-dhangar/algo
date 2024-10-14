import React, { useState } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import ContributeSection from "./ContributeSection";
import TechnologiesSection from "./TechnologiesSection";
import GetInvolvedSection from "./GetInvolvedSection";
import PopularAlgorithmsSection from "./PopularAlgorithmsSection";
import UserTestimonialsSection from "./UserTestimonialsSection";
import CallToActionSection from "./CallToActionSection";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

// Styled-components for the floating button and chatbot container
const ChatbotButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #3077fc;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:hover {
    background-color: #1758d1;
  }
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 80px;
  left: 20px;
  z-index: 1000;
`;

const steps = [
  {
    id: "1",
    message: "Hi! How can I assist you today?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: ({ previousValue }) => {
      const input = previousValue.toLowerCase();
      if (input.includes("hi") || input.includes("hello") || input.includes("hii") || input.includes("hey") || input.includes("") || input.includes(" ")  ) {
        return "Hello there! How can I help you today?";
      } else if(input.includes("what") || input.includes("which") || input.includes("how")){
        return "Please refer our website, we have included many features"
      } else if (input.includes("help")) {
        return "I'm here to help! What specific help do you need?";
      } else if(input.includes("image") || input.includes("images")){
        return "I can't provide the images right now, anything else...";
      } else if (input.includes("features")) {
        return "Our platform has various features like Algorithms, Practice, and Quizzes. Would you like to know more about any specific feature?";
      } else if (input.includes("pricing")) {
        return "We offer competitive pricing plans. Do you want to see a comparison of our plans?";
      } else {
        return "Thanks for your input! Is there anything else you'd like to ask?";
      }
    },
    trigger: "4",
  },
  {
    id: "4",
    user: true,
    trigger: "5",
  },
  {
    id: "5",
    message: ({ previousValue }) => {
      const input = previousValue.toLowerCase();
      if (input.includes("yes")) {
        return "Great! What else can I assist you with?";
      } else {
        return "Let me know if you have any questions.";
      }
    },
    trigger: "6",
  },
  {
    id: "6",
    user: true,
    trigger: "7",
  },
  {
    id: "7",
    message: "Let us know if there's more you need!",
    trigger: "8",
  },
  {
    id: "8",
    user: true,
    trigger: "9",
  },
  {
    id: "9",
    message: "Thanks for staying with us! Any further questions?",
    trigger: "10",
  },
  {
    id: "10",
    user: true,
    trigger: "11",
  },
  {
    id: "11",
    message: "Feel free to ask anything else!",
    trigger: "12",
  },
  {
    id: "12",
    user: true,
    trigger: "13",
  },
  {
    id: "13",
    message: "We are happy to assist you. Do you have more questions?",
    trigger: "14",
  },
  {
    id: "14",
    user: true,
    trigger: "15",
  },
  {
    id: "15",
    message: "Thanks! We are always here to help. Anything else?",
    trigger: "16",
  },
  {
    id: "16",
    user: true,
    trigger: "17",
  },
  {
    id: "17",
    message: "Great! Let us know if you need more assistance.",
    end: true,
  },
];

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#00bfff",
  headerFontColor: "#fff",
  botBubbleColor: "#00bfff",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const Homepage: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ContributeSection />
      <TechnologiesSection />
      <GetInvolvedSection />
      <PopularAlgorithmsSection />
      <UserTestimonialsSection />
      <CallToActionSection />

      {/* Floating Chatbot Button */}
      <ChatbotButton onClick={toggleChatbot}>
        {isChatbotOpen ? "×" : "💬"}
      </ChatbotButton>

      {/* Chatbot Container */}
      {isChatbotOpen && (
        <ChatbotContainer>
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={steps}
              floating={false}
              headerTitle="Support Chat"
              style={{
                width: "300px",  // Adjusted width
                height: "400px", // Adjusted height
                overflowY: "auto", // Allow scrolling for overflow content
              }}
              // Custom style to reduce input height
              inputStyle={{
                padding: "5px 10px 0px 10px", // Decrease padding for smaller input
                height: "50px", // Decrease input height
              }}
              // Ensure the chat messages don't overflow and remain visible
              contentStyle={{
                height: "calc(100% - 60px)", // Adjust content height to fit header and input
                overflowY: "auto",
              }}
            />
          </ThemeProvider>
        </ChatbotContainer>
      )}
    </div>
  );
};

export default Homepage;

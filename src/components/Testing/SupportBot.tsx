import React from "react";
import ChatBot from "react-simple-chatbot";
import Joi from "joi";

// 1. Structural schema definition blueprint using standard Joi syntax rules
const algoSessionSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.empty": "Name input field cannot be blank.",
    "string.min": "Name must contain at least 3 characters.",
    "string.max": "Name must be under 20 characters.",
    "string.alphanum": "Name must contain only alphanumeric characters.",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email input field cannot be blank.",
    "string.email": "Please enter a valid active email configuration address (e.g., user@domain.com).",
  }),
});

function SupportBot() {
  
  // 2. Custom inline bubble validator wrapper execution method using Joi logic
  const validateStepField = (fieldName: "username" | "email", rawInputString: string) => {
    // Validate an isolated single-field schema path snippet profile extraction rule
    const singleFieldSchema = algoSessionSchema.extract(fieldName);
    const { error } = singleFieldSchema.validate(rawInputString);

    if (error) {
      // Return the exact error string directly into the ChatBot wrapper bubble warning display alert
      return error.message;
    }
    return true;
  };

  // 3. Complete execution payload schema confirmation handler logic pipeline routine
  const handleEndSession = ({ steps }: { steps: any; values: any[] }) => {
    const rawSessionData = {
      username: steps['wait-for-name']?.value,
      email: steps['wait-for-email']?.value,
    };

    // Final security confirmation data validation parse block run
    const { error, value } = algoSessionSchema.validate(rawSessionData, { abortEarly: true });

    if (error) {
      // Native system pop-up window fallback notification catch array execution routine logic
      alert(`Critical Processing Data Error: ${error.message}`);
      return;
    }

    // Process output package delivery data logic layer execution run stream block
    alert(`Success!\nUser verified: ${value.username}\nEmail verified: ${value.email}\nData saved to your Algo site database successfully.`);
  };

  const conversationFlow = [
    {
      id: "1",
      message: "Welcome to AlgoStation! Let's build your developer profile. What is your name?",
      trigger: "wait-for-name",
    },
    {
      id: "wait-for-name",
      user: true,
      // Inline validator execution using the dynamic Joi single field checker function wrapper logic
      validator: (value: string) => validateStepField("username", value),
      trigger: "greet-user",
    },
    {
      id: "greet-user",
      message: "Hi {previousValue}! What type of algorithmic tracking platform features are you building?",
      trigger: "select-focus",
    },
    {
      id: "select-focus",
      options: [
        { value: "quantitative-trading", label: "Quantitative/Trading Algos", trigger: "lead-capture" },
        { value: "dsa-academic", label: "Data Structures & Core Theory", trigger: "lead-capture" },
      ],
    },
    {
      id: "lead-capture",
      message: "Perfect choice. Enter your email profile connection link to authorize workspace script deployments:",
      trigger: "wait-for-email",
    },
    {
      id: "wait-for-email",
      user: true,
      // Inline validator execution using the dynamic Joi single field checker function wrapper logic
      validator: (value: string) => validateStepField("email", value),
      trigger: "conclusion",
    },
    {
      id: "conclusion",
      message: "Configuration data checks passed! Preparing your tailored environment dashboard setup window display.",
      end: true,
    },
  ];

  return (
    <div className="bot-container" style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <ChatBot 
        steps={conversationFlow} 
        handleEnd={handleEndSession}
        headerTitle="AlgoStation Config Assistant"
      />
    </div>
  );
}

export default SupportBot;
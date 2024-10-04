import React from "react";
import GiscusComponent from "../../components/GiscusComponent";

/**
 * FAQ Page
 * 
 * This component renders the Q&A section of the website where users can ask and answer questions
 * using the Giscus GitHub Discussions widget.
 * 
 * @returns {JSX.Element} The rendered Q&A page component
 */
const FAQ: React.FC = () => { 
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have any questions about Algo? Feel free to ask, and our community will help!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-10">
          {/* <GiscusComponent /> */}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
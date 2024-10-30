import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Algo?",
    answer:
      "Algo is an open-source platform designed to help developers learn, implement, and contribute to algorithmic solutions across various programming languages.",
  },
  {
    question: "How can I contribute to Algo?",
    answer:
      "You can contribute by submitting pull requests to our GitHub repository, adding new algorithms, improving existing ones, or enhancing the documentation.",
  },
  {
    question: "Do I need prior experience to contribute?",
    answer:
      "No prior experience is required! We welcome contributors of all skill levels. Whether you're a beginner or an experienced developer, your contributions are valuable.",
  },
  {
    question: "How can I get support?",
    answer:
      "You can reach out to us via our Discord community, submit issues on GitHub, or contact us directly through the Contact page.",
  },
  {
    question: "Where can I practice algorithms?",
    answer:
      "You can practice algorithms on websites like LeetCode, Codeforces, and CodeHarborHub.",
  },
  // Add more FAQs
  {
    question: "Is Algo free to use?",
    answer: "Yes, Algo is completely free and open-source for everyone to use.",
  },
  {
    question: "Can I suggest new features?",
    answer:
      "Yes, you can suggest new features by submitting an issue on GitHub or contacting the team directly.",
  },
  {
    question: "How often is the platform updated?",
    answer:
      "We aim to update the platform regularly with new features, algorithms, and improvements based on community feedback and contributions.",
  },
  {
    question: "Can I use Algo in my personal or commercial projects?",
    answer:
      "Yes, Algo is open-source and licensed under the MIT License, which allows you to use it in both personal and commercial projects.",
  },
  {
    question: "How can I report bugs or issues?",
    answer:
      "You can report bugs by submitting an issue on our GitHub repository or contacting us directly through the support page.",
  },
  {
    question: "Does Algo support multiple programming languages?",
    answer:
      "Yes, Algo supports solutions in a variety of programming languages such as Python, Java, C++, and more.",
  },
  {
    question: "How do I stay updated with new features or announcements?",
    answer:
      "You can stay updated by joining our Discord community or subscribing to our newsletter for announcements and updates.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0); // Start with the first question open
  const [visibleCount, setVisibleCount] = useState<number>(5); // Start with 5 visible FAQs

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index === 0 ? index : index); // Collapse the first question when others are clicked
  };

  const loadMoreFAQs = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 3 more FAQs
  };

  return (
    <Layout
      title="FAQ"
      description="Find answers to the most common questions about Algo."
    >
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Header Section */}
        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Find answers to the most common questions about Algo.
          </motion.p>
        </section>

        {/* FAQ Items */}
        <section className="container mx-auto py-8 px-6 md:px-12">
          <motion.div
            className="max-w-4xl mx-auto space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {faqs.slice(0, visibleCount).map((faq, index) => (
              <motion.div
                key={index}
                className="bg-blue-100 dark:bg-blue-950 rounded-lg shadow-lg overflow-hidden"
              >
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-bold text-blue-950 dark:text-[#BFECFF]">
                    {faq.question}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-300 text-3xl">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="px-4  text-[#654520] dark:text-[#98DED9] font-semibold">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          {/* Load More Button */}
{visibleCount < faqs.length && (
  <div className="text-center mt-8">
    <button
      onClick={loadMoreFAQs}
      className="bg-blue-900 p-4 text-lg text-white rounded hover:bg-blue-800 transition duration-300"
    >
      Load More FAQs
    </button>
  </div>
)}
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;

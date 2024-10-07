import React from "react";
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
];

const FAQ: React.FC = () => {
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
            className="max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;

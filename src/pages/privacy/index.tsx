import React from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout title="Privacy Policy" description="Privacy policy of the DSA website">
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Privacy <span className="text-blue-600 dark:text-yellow-400">Policy</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information.
          </motion.p>
        </section>

        {/* Information Collection */}
        <section className="container mx-auto py-12 px-6 md:px-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">1. Information We Collect</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We collect information from users in several ways, including the following:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 dark:text-gray-300 mt-4">
            <li>Personal Information: This may include your name, email address, and any other details you provide when registering or contacting us.</li>
            <li>Usage Data: We collect data on how you use the website, such as the pages you visit and the features you access.</li>
            <li>Cookies: We use cookies to enhance your user experience and analyze website traffic.</li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section className="container mx-auto py-12 px-6 md:px-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">2. How We Use Your Information</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            The data we collect is used for the following purposes:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 dark:text-gray-300 mt-4">
            <li>To provide and improve our services.</li>
            <li>To communicate with you regarding updates, newsletters, or support inquiries.</li>
            <li>To personalize your experience on the website.</li>
            <li>To analyze traffic and user behavior to improve website performance.</li>
          </ul>
        </section>

        {/* Sharing Information */}
        <section className="container mx-auto py-12 px-6 md:px-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">3. Sharing Your Information</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We do not share your personal information with third parties except in the following cases:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 dark:text-gray-300 mt-4">
            <li>If required by law or legal processes.</li>
            <li>To protect the rights and property of our website.</li>
            <li>With trusted partners who help us operate the website and provide our services.</li>
          </ul>
        </section>

        {/* Security */}
        <section className="container mx-auto py-12 px-6 md:px-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">4. Security</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We take security measures to protect your personal information. However, please be aware that no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        {/* Your Rights */}
        <section className="container mx-auto py-12 px-6 md:px-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">5. Your Rights</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            You have the right to access, correct, or delete your personal information at any time. Contact us if you wish to exercise these rights.
          </p>
        </section>

        {/* Contact Us */}
        <section className="container mx-auto py-12 px-6 md:px-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">6. Contact Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            If you have any questions or concerns regarding this Privacy Policy, feel free to contact us at <a href="mailto:support@algowebsite.com" className="text-blue-600 dark:text-yellow-400">support@algowebsite.com</a>.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;

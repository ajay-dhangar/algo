import React from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";

const TermsAndConditions: React.FC = () => {
  return (
    <Layout
      title="Terms and Conditions"
      description="Read our terms and conditions before using our platform."
    >
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Terms and <span className="text-blue-600 dark:text-yellow-400">Conditions</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Please read these terms and conditions carefully before using our platform.
          </motion.p>
        </section>

        <section className="container mx-auto py-12 px-6 md:px-12 text-left">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                By accessing or using our platform, you agree to be bound by these terms and conditions. If you do not agree 
                with any part of the terms, you must not use the platform. Continued use of the platform following any updates 
                to these terms will be deemed your acceptance of those changes.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                User Obligations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                As a user, you are responsible for maintaining the confidentiality of your account information, including your 
                password, and for all activities that occur under your account. You agree not to use the platform for any unlawful 
                purpose or in violation of any applicable laws or regulations. You also agree not to interfere with the security 
                or performance of the platform or attempt to access unauthorized features.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                You further agree that you will not:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-4">
                <li>Submit false or misleading information.</li>
                <li>Use the platform to infringe upon any intellectual property or other rights of third parties.</li>
                <li>Engage in any activity that disrupts or interferes with the platform’s functionality.</li>
                <li>Distribute viruses or any other harmful technologies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Intellectual Property
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                All content on this platform, including but not limited to text, graphics, logos, icons, and images, is the property 
                of the platform or its content suppliers and is protected by copyright, trademark, and other intellectual property 
                laws. You agree not to reproduce, duplicate, copy, sell, or exploit any portion of the platform’s content without 
                express permission from the owner.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Disclaimer of Warranties
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The platform is provided on an "as-is" and "as-available" basis without any warranties of any kind, either express 
                or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, 
                or non-infringement. We do not guarantee that the platform will be error-free or uninterrupted, nor do we make any 
                warranties about the results that may be obtained from using the platform.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                In no event will we be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of 
                or related to your use of the platform, even if we have been advised of the possibility of such damages. You agree 
                that your sole remedy for dissatisfaction with the platform is to discontinue its use.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Governing Law and Jurisdiction
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. You 
                agree to submit to the exclusive jurisdiction of the courts located in [Your Jurisdiction] for any disputes arising 
                out of or relating to your use of the platform.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Termination
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We reserve the right to terminate or suspend your access to the platform at any time, without notice, for conduct 
                that we believe violates these terms, is harmful to other users, or is illegal. Upon termination, your right to 
                use the platform will cease immediately.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Changes to Terms and Conditions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting. It is 
                your responsibility to review these terms regularly. Continued use of the platform after changes are posted constitutes 
                your acceptance of the modified terms.
              </p>
            </div>

            
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;

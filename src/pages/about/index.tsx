import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const About: React.FC = () => {
  return (
    <Layout
      title="About Us"
      description="Learn more about our mission and team members."
    >
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <section className="noise-bg py-16 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white mt-8 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-blue-600 dark:text-yellow-400">Us</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-16 mb-10 px-2 space-y-4 md:px-8 md:space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Algo is an open-source platform that enables developers to explore
            algorithms, solve problems, and contribute to open-source projects.
            Our mission is to make algorithms accessible to everyone by
            providing a collaborative environment to learn, create, and share.
            We believe in the power of community-driven projects and the impact
            they can have on the world. Join us in our mission to build a global
            platform that enables people to learn from each other and grow
            together.
          </motion.p>

          <motion.button
            className="bg-blue-600 dark:bg-yellow-400 text-white dark:text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-yellow-500 transition duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Get Started Now
          </motion.button>
        
        </section>

        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="md:w-1/2 md:pr-12 text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our mission is to build a global platform that enables people to
                explore algorithms, solve problems, and contribute to
                open-source projects while learning from each other in a
                collaborative environment.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                We believe in the power of community-driven projects and the
                impact they can have on the world. Join us in our mission to
                make algorithms accessible to everyone.
              </p>
            </div>
            <motion.img
              src="/algo/images/mission.jpg"
              alt="Our Mission"
              className="md:w-1/2 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            />
          </motion.div>
        </section>

        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8">
            Meet Our{" "}
            <span className="text-blue-600 dark:text-yellow-400">Team</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Our team is a diverse group of individuals who are passionate about
            algorithms, open-source, and community-driven projects.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="/algo/images/team-member-1.jpg"
                alt="Team Member 1"
              />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Ajay Dhangar
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Founder & CEO</p>
              <div className="flex justify-center space-x-4 mt-4">
                <Link
                  to="https://github.com/ajay-dhangar"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaGithub className="w-6 h-6" />
                </Link>
                <Link
                  to="https://linkedin.com/in/ajay-dhangar"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaLinkedin className="w-6 h-6" />
                </Link>
                <Link
                  to="https://twitter.com/CodesWithAjay"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaTwitter className="w-6 h-6" />
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="/algo/images/team-member-2.jpg"
                alt="Team Member 2"
              />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Jane Doe
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chief Technology Officer
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <Link
                  to="#"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaGithub className="w-6 h-6" />
                </Link>
                <Link
                  to="#"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaLinkedin className="w-6 h-6" />
                </Link>
                <Link
                  to="#"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaTwitter className="w-6 h-6" />
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="/algo/images/team-member-3.jpg"
                alt="Team Member 3"
              />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                John Smith
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Lead Developer</p>
              <div className="flex justify-center space-x-4 mt-4">
                <Link
                  href="#"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaGithub className="w-6 h-6" />
                </Link>
                <Link
                  to="#"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaLinkedin className="w-6 h-6" />
                </Link>
                <Link
                  to="#"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
                >
                  <FaTwitter className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default About;

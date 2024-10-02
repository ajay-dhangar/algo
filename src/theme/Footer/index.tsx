import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-200">
      <div className="container mx-auto py-10 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-4">Algo</h2>
            <p className="text-gray-400">
              Your go-to platform for exploring algorithms, open-source collaboration, and learning by doing.
            </p>
          </div>

          <div className="flex mt-6 md:mt-0 space-x-6">
            <a
              href="https://github.com/ajay-dhangar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/ajay-dhangar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/CodesWithAjay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <ul className="flex space-x-8 text-gray-400 mb-6 md:mb-0">
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-200">
                Contact
              </a>
            </li>
          </ul>
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Algo. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

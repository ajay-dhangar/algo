import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "@docusaurus/Link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-200">
      <div className="container mx-auto py-12 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-8 mb-8 space-y-8 md:space-y-0">
          <div className="text-center md:text-left md:w-1/3">
            <h2 className="text-3xl font-extrabold text-white mb-4">Algo</h2>
            <p className="text-gray-400">
              Your go-to platform for exploring algorithms, open-source
              collaboration, and learning by doing.
            </p>
          </div>
          <div className="flex justify-center space-x-12 md:w-1/3">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li className="list-none">
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Docs
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-4">Community</h3>
              <ul className="space-y-2">
                <li className="list-none">
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Discord
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition duration-200"
                  >
                    Contributors
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center md:w-1/3 space-x-6">
            <Link
              to="https://github.com/ajay-dhangar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <FaGithub className="w-6 h-6" />
            </Link>
            <Link
              to="https://linkedin.com/in/ajay-dhangar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <FaLinkedin className="w-6 h-6" />
            </Link>
            <Link
              to="https://twitter.com/CodesWithAjay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              <FaTwitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <ul className="flex space-x-8 text-gray-400 mb-6 md:mb-0">
            <li className="list-none">
              <Link to="#" className="hover:text-white transition duration-200">
                Features
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="#"
                className="hover:text-white transition duration-200"
              >
                About Us
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="#"
                className="hover:text-white transition duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Algo, Inc. Built with Docusaurus.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

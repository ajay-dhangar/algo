import React from "react";
import { FaGithub, FaLinkedin, FaDiscord, FaTwitter } from "react-icons/fa";
import Link from "@docusaurus/Link";

const Footer = () => {
  return (
    <footer className="bg-[#1a1b26] text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div className="md:col-span-1">
            <div className="mb-6">
              <img
                src="/algo/logo/logo.png"
                alt="Algo Logo"
                className="w-16 h-16"
              />

              <span className="relative top-[-25px] text-3xl text-bold font-semibold ml-2 gradient-text">
                Algo
              </span>

              <div>
                {/* <h2 className="text-xl font-semibold text-white">Algo</h2> */}
                <p className="text-gray-300 mt-1">
                  A platform to learn and practice DSA with a collection of
                  algorithms and data structures in various languages.
                </p>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <Link
                to="https://github.com/ajay-dhangar"
                target="_blank"
                aria-label="GitHub"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6366F1] transition-colors duration-300"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                to="https://linkedin.com/in/ajay-dhangar"
                target="_blank"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6366F1] transition-colors duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </Link>
              <Link
                to="https://twitter.com/CodesWithAjay"
                target="_blank"
                aria-label="Twitter"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6366F1] transition-colors duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </Link>
              <Link
                to="#"
                target="_blank"
                aria-label="Discord"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6366F1] transition-colors duration-300"
              >
                <FaDiscord className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="pl-32">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3 pl-0">
              <li className="list-none">
                <Link
                  to="/algo/docs/"
                  className="text-gray-400 hover:text-[#61dafb] transition-colors duration-300"
                >
                  Documentation
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/algo/blog/"
                  className="text-gray-400 hover:text-[#61dafb] transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="#"
                  className="text-gray-400 hover:text-[#61dafb] transition-colors duration-300"
                >
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Community</h3>
            <ul className="space-y-3 pl-0">
              <li className="list-none">
                <Link
                  to="#"
                  className="text-gray-400 hover:text-[#61dafb] transition-colors duration-300"
                >
                  Join Discord
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/algo/contributors"
                  className="text-gray-400 hover:text-[#61dafb] transition-colors duration-300"
                >
                  Contributors
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="#"
                  className="text-gray-400 hover:text-[#61dafb] transition-colors duration-300"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0 text-sm text-gray-400">
            <li className="list-none">
              <Link
                to="#"
                className="hover:text-[#61dafb] transition-colors duration-300"
              >
                Features
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="/algo/about/"
                className="hover:text-[#61dafb] transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="/algo/contact/"
                className="hover:text-[#61dafb] transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="#"
                className="hover:text-[#61dafb] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Algo, Inc. Built with Docusaurus.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
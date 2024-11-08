import React, { useEffect } from "react";
import { FaGithub, FaLinkedin, FaDiscord, FaTwitter } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import Link from "@docusaurus/Link";

const Footer = () => {
  useEffect(() => {
    // Create script element for GTranslate
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/popup.js";
    script.defer = true;
    document.body.appendChild(script);

    // Set GTranslate settings
    window.gtranslateSettings = {
      default_language: "en",
      detect_browser_language: true,
      wrapper_selector: ".gtranslate_wrapper",
    };

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-[#1a1b26] text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div className="md:col-span-1">
            <div className="mb-6">
              <Link
              to="/">
                <img
                  src="/algo/logo/logo.png"
                  alt="Algo Logo"
                  className="w-16 h-16"
                />

                <span className="relative top-[-25px] text-3xl text-bold font-semibold ml-2 gradient-text">
                  Algo
                </span>
              </Link>

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
                aria-label="X"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6366F1] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                >
                  <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                </svg>
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
          <div className="md:pl-32">
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
                  to="/docs/"
                  className="text-gray-400 hover:text-[#61dafb] transition-colors duration-300"
                >
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="md:pl-32">
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
          <ul className="flex flex-nowrap justify-center items-center pl-0 md:justify-start space-x-4 mb-4 md:mb-0 text-xs md:text-sm text-gray-400">
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
            <li className="list-none">
              <div className="gtranslate_wrapper"></div>
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

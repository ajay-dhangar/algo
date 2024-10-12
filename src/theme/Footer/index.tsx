import React from "react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "@docusaurus/Link";

const Footer = () => {
  return (
    <footer className="bg-[#1a1b26] text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="border border-gray-700 p-4 rounded-lg bg-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-white text-center">Algo</h3>
            <p className="text-sm text-gray-300 text-center">
              Your go-to platform for exploring algorithms, open-source collaboration, and learning by doing.
            </p>
            <div className="flex space-x-4 mt-4 justify-center">
              <Link to="https://github.com/ajay-dhangar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link to="https://linkedin.com/in/ajay-dhangar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link to="https://twitter.com/CodesWithAjay" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                <FaXTwitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="border border-gray-700 p-4 rounded-lg bg-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-white text-center">Resources</h3>
            <ul className="space-y-2 text-sm text-[#6366F1] list-none">
              <li className="text-center ml-[-22px]"><Link to="/algo/docs/" className="hover:text-[#61dafb] transition duration-200">Documentation</Link></li>
              <li className="text-center ml-[-22px]"><Link to="/algo/blog/" className="hover:text-[#61dafb] transition duration-200">Blog</Link></li>
              <li className="text-center ml-[-22px]"><Link to="#" className="hover:text-[#61dafb] transition duration-200">Tutorials</Link></li>
            </ul>
          </div>

          <div className="border border-gray-700 p-4 rounded-lg bg-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-white text-center">Community</h3>
            <ul className="space-y-2 text-sm text-[#6366F1] list-none">
              <li className="text-center ml-[-22px]"><Link to="#" className="hover:text-[#61dafb] transition duration-200">Join Discord</Link></li>
              <li className="text-center ml-[-22px]"><Link to="#" className="hover:text-[#61dafb] transition duration-200">Contributors</Link></li>
              <li className="text-center ml-[-22px]"><Link to="#" className="hover:text-[#61dafb] transition duration-200">Events</Link></li>
            </ul>
          </div>

          <div className="border border-gray-700 p-4 rounded-lg bg-gray-800 transition-transform transform hover:scale-105 hover:bg-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-white text-center">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[#6366F1] list-none">
              <li className="text-center ml-[-22px]"><Link to="#" className="hover:text-[#61dafb] transition duration-200">Features</Link></li>
              <li className="text-center ml-[-22px]"><Link to="/algo/about/" className="hover:text-[#61dafb] transition duration-200">About Us</Link></li>
              <li className="text-center ml-[-22px]"><Link to="/algo/contact/" className="hover:text-[#61dafb] transition duration-200">Contact</Link></li>
              <li className="text-center ml-[-22px]"><Link to="#" className="hover:text-[#61dafb] transition duration-200">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col justify-center items-center bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-white-500 mt-4 md:mt-0 hover:text-[#61dafb] transition duration-200">
            &copy; 2024 Algo, Inc. Built with Docusaurus.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import Link from "@docusaurus/Link";

const Footer = () => {
  return (
    <footer className="bg-[#1a1b26] text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/algo/logo/algo.png" alt="Algo Logo" className="h-8 w-8 mr-3" />
              <h2 className="text-3xl font-bold text-[#6366F1]">Algo</h2>
            </div>
            <p className="text-sm mb-4">
              Your go-to platform for exploring algorithms, open-source
              collaboration, and learning by doing.
            </p>
            <div className="flex space-x-4">
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
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-[#6366F1]">
              <li><Link to="/algo/docs/" className="hover:text-[#61dafb] transition duration-200">Documentation</Link></li>
              <li><Link to="/algo/blog/" className="hover:text-[#61dafb] transition duration-200">Blog</Link></li>
              <li><Link to="#" className="hover:text-[#61dafb] transition duration-200">Tutorials</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Community</h3>
            <ul className="space-y-2 text-sm text-[#6366F1]">
              <li><Link to="#" className="hover:text-[#61dafb] transition duration-200 flex items-center">Join Discord</Link></li>
              <li><Link to="#" className="hover:text-[#61dafb] transition duration-200">Contributors</Link></li>
              <li><Link to="#" className="hover:text-[#61dafb] transition duration-200">Events</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0 text-[#6366F1]">
            <li><Link to="#" className="text-sm hover:text-[#61dafb] transition duration-200">Features</Link></li>
            <li><Link to="/algo/about/" className="text-sm hover:text-[#61dafb] transition duration-200">About Us</Link></li>
            <li><Link to="/algo/contact/" className="text-sm hover:text-[#61dafb] transition duration-200">Contact</Link></li>
            <li><Link to="#" className="text-sm hover:text-[#61dafb] transition duration-200">Privacy Policy</Link></li>
          </ul>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Algo, Inc. Built with Docusaurus.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

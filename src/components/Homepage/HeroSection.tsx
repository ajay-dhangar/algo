import React from "react";
import Link from "@docusaurus/Link";
import { FaGithub, FaArrowRight } from "react-icons/fa";

const HeroSection: React.FC = () => {
  return (
    // <section className="relative bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
    //   <div className="max-w-4xl text-center">
    //     <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
    //       Data Structures & Algorithms
    //     </h1>
    //     <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
    //       Learn, Implement, and Contribute to Open Source Algorithms. Build your
    //       understanding from the basics to advanced topics.
    //     </p>
    //     <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
    //       <Link
    //         to="/docs"
    //         className="flex items-center px-6 py-3 text-lg font-medium hover:text-white text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
    //       >
    //         Explore Algorithms <FaArrowRight className="ml-2" />
    //       </Link>
    //       <Link
    //         to="https://github.com/ajay-dhangar/algo"
    //         className="flex items-center px-6 py-3 text-lg font-medium text-[var(--ifm-color-primary)] border-2 border-blue-600 dark:border-white rounded-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-blue-600"
    //       >
    //         View on GitHub <FaGithub className="ml-2" />
    //       </Link>
    //     </div>
    //   </div>

    //   {/* Background Circles for Modern Design */}
    //   <div className="absolute inset-0 pointer-events-none overflow-hidden">
    //     <div className="absolute -top-20 -left-10 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl"></div>
    //     <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
    //   </div>
    // </section>
    <section className="relative bg-gradient-to-br from-blue-50 via-gray-100 to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-screen flex items-center justify-center px-6 py-12">
  <div className="max-w-5xl text-center space-y-6">
    {/* Heading */}
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
      Master Data Structures & Algorithms 🚀
    </h1>

    {/* Subheading */}
    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
      Learn, Implement, and Contribute to Open Source Algorithms. Build your
      knowledge from the ground up with hands-on projects.
    </p>

    {/* Buttons Section */}
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
      <Link
        to="/docs"
        className="flex items-center px-8 py-4 text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 ease-in-out shadow-xl transform hover:scale-105"
      >
        Explore Algorithms <FaArrowRight className="ml-2" />
      </Link>

      <Link
        to="https://github.com/ajay-dhangar/algo"
        className="flex items-center px-8 py-4 text-xl font-semibold border-2 border-blue-600 text-blue-600 dark:border-white dark:text-white rounded-full transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-blue-600 shadow-lg"
      >
        View on GitHub <FaGithub className="ml-2" />
      </Link>
    </div>
  </div>

  {/* New Animated Circles for Modern Look */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-32 -left-16 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-32 -right-16 w-80 h-80 bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse delay-500"></div>
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-300 via-transparent to-pink-300 opacity-10"></div>
  </div>
</section>

  );
};

export default HeroSection;

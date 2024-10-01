import React from "react";

const TechnologiesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12">
          Technologies Used
        </h2>

        {/* Technologies Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Our project leverages cutting-edge technologies to ensure a seamless
          user experience and robust functionality. Here's a glimpse of what
          powers the Algo Web App.
        </p>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Technology 1: React */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <img
              src="/algo/images/jsx.svg"
              alt="React"
              className="h-12 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              React
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A JavaScript library for building user interfaces.
            </p>
          </div>

          {/* Technology 2: TypeScript */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <img
              src="/algo/images/tsx.svg"
              alt="TypeScript"
              className="h-12 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              TypeScript
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A superset of JavaScript that adds static typing.
            </p>
          </div>

          {/* Technology 3: Tailwind CSS */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <img
              src="/algo/images/tailwindcss.svg"
              alt="Tailwind CSS"
              className="h-12 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tailwind CSS
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A utility-first CSS framework for rapid UI development.
            </p>
          </div>

          {/* Technology 4: Docusaurus */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <img
              src="/algo/images/docusaurus.svg"
              alt="Docusaurus"
              className="h-12 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Docusaurus
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A static site generator designed for documentation.
            </p>
          </div>

          {/* Technology 5: Node.js */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <img
              src="/algo/images/node-js.svg"
              alt="Node.js"
              className="h-12 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Node.js
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A JavaScript runtime built on Chrome's V8 engine.
            </p>
          </div>

          {/* Technology 6: GitHub */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <img
              src="/algo/images/github.svg"
              alt="GitHub"
              className="h-12 mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              GitHub
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A platform for version control and collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;

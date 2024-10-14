import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDatabase,
  FaJs,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

const technologies = [
  { name: "React", icon: <FaReact />, color: "text-blue-500" },
  { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
  {
    name: "GitHub",
    icon: <FaGithub />,
    color: "text-gray-600 dark:text-gray-300",
  },
  { name: "MongoDB", icon: <FaDatabase />, color: "text-green-600" },
  { name: "JavaScript", icon: <FaJs />, color: "text-yellow-500" },
  { name: "HTML5", icon: <FaHtml5 />, color: "text-red-500" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "text-blue-600" },
  {
    name: "Tailwind CSS",
    icon: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg"
        alt="Tailwind CSS"
        className="h-12 w-12"
      />
    ),
    color: "text-blue-500",
  },
  {
    name: "TypeScript",
    icon: (
      <img
        src="https://cdn.worldvectorlogo.com/logos/typescript.svg"
        alt="TypeScript"
        className="h-12 w-12"
      />
    ),
    color: "text-blue-500",
  },
  {
    name: "Docusaurus",
    icon: (
      <img
        src="https://docusaurus.io/img/docusaurus_keytar.svg"
        alt="Docusaurus"
        className="h-12 w-12"
      />
    ),
    color: "text-blue-500",
  },
  {
    name: "Markdown",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/57/Markdown-mark-purple.svg"
        alt="Markdown"
        className="h-12 w-12"
      />
    ),
    color: "text-blue-500",
  },
];

const TechnologiesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Technologies{" "}
          <span className="text-indigo-500 dark:text-yellow-400">We Use</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Our project is built using a variety of cutting-edge technologies and
          tools. These help ensure high performance, scalability, and
          maintainability.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl"
            >
              <div className={`text-6xl ${tech.color} mb-4`}>{tech.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {tech.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;

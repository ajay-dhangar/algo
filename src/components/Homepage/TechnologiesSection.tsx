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
    <section className="py-20 bg-blue-100 dark:bg-gray-950 overflow-hidden">
  <div className="container mx-auto px-4 text-center">
    
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-6">
      Technologies{" "}
      <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        We Use
      </span>
    </h2>

    <p className="max-w-3xl mx-auto text-lg text-var(--ifm-color-primary) mb-16 leading-relaxed">
      Our project is powered by modern technologies focused on speed,
      scalability, performance, and developer experience.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {technologies.map((tech, index) => (
        <div
          key={index}
          className="group relative bg-white/70 dark:bg-gray-800/60
            backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8
            overflow-hidden cursor-pointer transition-all duration-500 ease-out
            hover:-translate-y-3 hover:rotate-1 hover:shadow-[0_20px_50px_rgba(99,102,241,0.35)]"
        >
          <div className="relative z-10 flex flex-col items-center">
            
            <div
              className={`text-6xl mb-5 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12
                ${tech.color}`}
            >
              {tech.icon}
            </div>

            <h3 className="
              text-xl font-bold
              text-gray-800 dark:text-white
              transition duration-300
              group-hover:text-indigo-500 dark:group-hover:text-yellow-400
            ">
              {tech.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default TechnologiesSection;

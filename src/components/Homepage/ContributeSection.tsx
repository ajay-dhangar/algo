import Link from "@docusaurus/Link";
import React from "react";
import { FaGithub, FaCodeBranch, FaFileCode } from "react-icons/fa";

const ContributeSection: React.FC = () => {
  const contributions = [
    {
      icon: <FaGithub />,
      title: "Fork the Repository",
      description:
        "Start by forking the repository to your GitHub account. This will allow you to work on your own copy of the project.",
      link: "https://github.com/ajay-dhangar/algo/fork",
    },
    {
      icon: <FaCodeBranch />,
      title: "Create a New Branch",
      description:
        "Once forked, create a new branch for your feature or bug fix. This ensures that your changes can be reviewed independently.",
    },
    {
      icon: <FaFileCode />,
      title: "Submit a Pull Request",
      description:
        "After making your changes, submit a pull request. Our team will review your contribution and get back to you soon.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-5">
          Want to{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Contribute?
          </span>
        </h2>

        <p className="text-lg text-var(--ifm-color-primary) mb-14 max-w-3xl mx-auto leading-relaxed">
          Join us in building an amazing open-source project. Whether you're a
          seasoned developer or a beginner, we welcome all contributions.
          Here's how you can get involved.
        </p>
        <div className="grid gap-10 md:grid-cols-3">
          {contributions.map((item, index) => {
            const Card = (
              <div
                className="group relative overflow-hidden flex flex-col items-center text-center
                  bg-white/70 dark:bg-gray-800/70
                  backdrop-blur-lg border border-gray-200 dark:border-gray-700
                  p-8 rounded-2xl shadow-md transition-all duration-500 ease-out
                  hover:-translate-y-3 hover:shadow-2xl hover:border-indigo-500/40 cursor-pointer h-full
                "
              >
                <div
                  className="relative z-10 mb-6 text-5xl text-indigo-500 dark:text-yellow-400
                    transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                >
                  {item.icon}
                </div>
                <h3
                  className="relative z-10 text-2xl font-bold text-gray-800 dark:text-white
                    mb-4 transition-colors duration-300 group-hover:text-indigo-500"
                >
                  {item.title}
                </h3>
                <p
                  className="relative z-10 text-var(--ifm-color-primary) leading-relaxed
                    transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                >
                  {item.description}
                </p>
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 
                  bg-gradient-to-r from-indigo-500 to-purple-500 
                  transition-all duration-500 group-hover:w-full"
                />
              </div>
            );

            return item.link ? (
              <a key={index} href={item.link} target="_blank" rel="noopener noreferrer"
              >
                {Card}
              </a>
            ) : (
              <div key={index}>{Card}</div>
            );
          })}
        </div>
        <div className="mt-14">
          <Link
            to="https://github.com/ajay-dhangar/algo"
            className=" inline-flex items-center gap-3
              px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold
              shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:text-gray-100"
          >
          <FaGithub className="text-xl" />
            Contribute on GitHub
            </Link>
        </div>
      </div>
    </section>
  );
};

export default ContributeSection;
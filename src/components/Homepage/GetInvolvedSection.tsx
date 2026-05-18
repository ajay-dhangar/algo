import React from "react";
import Link from "@docusaurus/Link";

const GetInvolvedSection: React.FC = () => {
  const cards = [
    {
      title: "Hackathons",
      description:
        "Participate in our hackathons to showcase your skills and win exciting prizes!",
      link: "https://hacktoberfest.com/",
    },
    {
      title: "Workshops",
      description:
        "Join our workshops to learn about the latest technologies and best practices in software development.",
      link: "#",
    },
    {
      title: "Community Meetups",
      description:
        "Connect with fellow contributors and share ideas at our regular community meetups.",
      link: "https://www.linkedin.com/in/ajay-dhangar/",
    },
    {
      title: "Mentorship Programs",
      description:
        "Sign up for our mentorship programs to get guidance from experienced developers in the industry.",
      link: "#",
    },
    {
      title: "Online Courses",
      description:
        "Enroll in our online courses to gain valuable skills and certifications.",
      link: "#",
    },
    {
      title: "Open Source Contributions",
      description:
        "Contribute to our project and enhance your coding skills while making a positive impact!",
      link: "https://github.com/ajay-dhangar/algo",
    },
  ];

  return (
    <section
      className="
      relative overflow-hidden
      py-24 px-6
      bg-gradient-to-b
      from-white
      via-blue-50
      to-white
      dark:from-gray-950
      dark:via-gray-900
      dark:to-black
    "
    >
      <div className="container mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="
            text-4xl md:text-5xl
            font-extrabold
            tracking-tight
            text-gray-900 dark:text-white
            mb-6
          "
          >
            Get Involved{" "}
            <span
              className="text-[var(--ifm-color-primary)]"
            >
              Today
            </span>
          </h2>

          <p
            className="
            max-w-3xl mx-auto
            text-lg leading-relaxed
          "
          >
            Join our vibrant community and participate in events, workshops,
            and open-source programs designed to sharpen your skills and
            connect you with passionate developers worldwide.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="
                group relative overflow-hidden rounded-3xl
                border border-white/10 bg-white/70 dark:bg-white/5
                backdrop-blur-xl p-8 shadow-lg shadow-black/5
                transition-all duration-500
                hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/40"
            >
              <div className="relative z-10 flex flex-col h-full">
                <h3
                  className="text-2xl font-bold mb-4
                  text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors duration-300"
                >
                  {card.title}
                </h3>
              </div>
            </div>
          ))}

          {/* Event 1 */}
          <div className=" flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:bg-[#3b82f6]  group transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-white mb-2">
              Hackathons
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Participate in our hackathons to showcase your skills and win
              exciting prizes!
            </p>

            <div className="flex justify-center">
              <a
                href="https://hacktoberfest.com/"
                className="inline-block bg-blue-600 text-white px-4 py-2 cursor-pointer rounded shadow transition hover:bg-blue-700  hover:text-white pointer-events-auto z-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>

            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>

          {/* Event 2 */}
          <div className=" flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:bg-[#3b82f6] group transform hover:scale-105 duration-300">
            <h3 className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Workshops
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Join our workshops to learn about the latest technologies and
              best practices in software development.
            </p>

            <div className="flex justify-center">
              <a
                href="#"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700 hover:text-white cursor-pointer pointer-events-auto z-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>

            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>

          {/* Event 3 */}
          <div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:bg-[#3b82f6] group transform hover:scale-105 duration-300">
            <h3 className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Community Meetups
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Connect with fellow contributors and share ideas at our regular
              community meetups.
            </p>

            <div className="flex justify-center">
              <a
                href="https://www.linkedin.com/in/ajay-dhangar/"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700 hover:text-white cursor-pointer pointer-events-auto z-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>

            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>

          {/* Event 4 */}
          <div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:bg-[#3b82f6] group transform hover:scale-105 duration-300">
            <h3 className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Mentorship Programs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Sign up for our mentorship programs to get guidance from
              experienced developers in the industry.
            </p>
            <div className="flex justify-center">
              <a
                href="#"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700 hover:text-white cursor-pointer pointer-events-auto z-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>

            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>

          {/* Event 5 */}
          <div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:bg-[#3b82f6] group transform hover:scale-105 duration-300">
            <h3 className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Online Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Enroll in our online courses to gain valuable skills and
              certifications.
            </p>

            <div className="flex justify-center">
              <a
                href="#"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700 hover:text-white cursor-pointer pointer-events-auto z-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>
          {/* Event 6 */}
          <div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:bg-[#3b82f6] group transform hover:scale-105 duration-300">
            <h3 className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Open Source Contributions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
              Contribute to our project and enhance your coding skills while
              making a positive impact!
            </p>
            <div className="flex justify-center">
              <a
                href="https://github.com/ajay-dhangar/algo"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700 hover:text-white cursor-pointer pointer-events-auto z-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>

            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;

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
    }
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
              className="
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              bg-clip-text
              text-transparent
            "
            >
              Today
            </span>
          </h2>

          <p
            className="
            max-w-3xl mx-auto
            text-lg leading-relaxed
            text-gray-600 dark:text-gray-400
          "
          >
            Join our vibrant community and participate in events,
            workshops, and open-source programs designed to sharpen your
            skills and connect you with passionate developers worldwide.
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

                <p
                  className="text-gray-600 dark:text-gray-300
                  leading-relaxed mb-8 flex-grow"
                >
                  {card.description}
                </p>

                <div className="flex justify-center">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center
                      px-5 py-3 rounded-xl font-medium
                      text-white bg-gradient-to-r
                      from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20
                      transition-all duration-300
                      hover:scale-105 hover:shadow-blue-500/40
                      hover:from-blue-500 hover:to-cyan-400 hover:text-gray-100"
                  > Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link to="/community"
            className="inline-flex items-center gap-2 px-8 py-4
              rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black
              font-semibold shadow-lg
              transition-all duration-300 hover:scale-105
              hover:shadow-2xl hover:text-gray-100"
          >
            Join Our Community
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
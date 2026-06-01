import React from "react";
import EventCard from "./EventCard";

const events = [
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
  },
  {
    title: "Online Courses",
    description:
      "Enroll in our online courses to gain valuable skills and certifications.",
  },
  {
    title: "Open Source Contributions",
    description:
      "Contribute to our project and enhance your coding skills while making a positive impact!",
    link: "https://github.com/ajay-dhangar/algo",
  },
];
const GetInvolvedSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Get Involved{" "}
          <span className="text-blue-600 dark:text-yellow-400">
            Today
          </span>
        </h2>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          
          {/* Component Header Block */}
          <div className="text-center mb-20 mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Get Involved <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">Today</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Become part of a highly active ecosystem. Pick your entry path below to refine your production engineering toolkit and collaborate with engineers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                description={event.description}
                link={event.link}
              />
            ))}
          </div>
        </div>
      </div>                 
    </section>
  );
};
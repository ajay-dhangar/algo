import React from "react";
import EventCard from "./EventCard";
// import Link from "@docusaurus/Link";

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

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Join our vibrant community and participate in various events and
          programs to enhance your skills, contribute to open-source, and meet
          like-minded individuals. Here’s how you can get involved!
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.title}
              title={event.title}
              description={event.description}
              link={event.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
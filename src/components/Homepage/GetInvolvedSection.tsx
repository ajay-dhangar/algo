import React from "react";
import Link from "@docusaurus/Link";

const GetInvolvedSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Get Involved{" "}
          <span className="text-blue-600 dark:text-yellow-400">Today</span>
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Join our vibrant community and participate in various events and
          programs to enhance your skills, contribute to open-source, and meet
          like-minded individuals. Here’s how you can get involved!
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          
        <div className=" flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
    Hackathons
  </h3>
  <p className="text-gray-600 dark:text-gray-300 mb-4">
    Participate in our hackathons to showcase your skills and win exciting prizes!
  </p>
  {/* Center the button */}
  <div className="flex justify-center">
    <Link
      to="#"
      className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700"
    >
      Learn More
    </Link>
  </div>
  <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
</div>


          <div className=" flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Workshops
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join our workshops to learn about the latest technologies and best
              practices in software development.
            </p>
            <div className="flex justify-center">
    <Link
      to="#"
      className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700"
    >
      Learn More
    </Link>
  </div>
            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>

          {/* Event 3 */}
          <div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Community Meetups
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Connect with fellow contributors and share ideas at our regular
              community meetups.
            </p>
            <div className="flex justify-center">
    <Link
      to="#"
      className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700"
    >
      Learn More
    </Link>
  </div>
            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>

          {/* Event 4 */}
          <div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Mentorship Programs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sign up for our mentorship programs to get guidance from
              experienced developers in the industry.
            </p>
            <div className="flex justify-center">
    <Link
      to="#"
      className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700"
    >
      Learn More
    </Link>
  </div>
            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>

          {/* Event 5 */}
          {/* Event 5 */}
<div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
    Online Courses
  </h3>
  <p className="text-gray-600 dark:text-gray-300 mb-4">
    Enroll in our online courses to gain valuable skills and certifications.
  </p>
  {/* Center the button */}
  <div className="flex justify-center">
    <Link
      to="#"
      className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700"
    >
      Learn More
    </Link>
  </div>
  <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
</div>


          <div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Open Source Contributions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Contribute to our project and enhance your coding skills while
              making a positive impact!
            </p>
            <div className="flex justify-center">
    <Link
      to="#"
      className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700"
    >
      Learn More
    </Link>
  </div>
            <div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;

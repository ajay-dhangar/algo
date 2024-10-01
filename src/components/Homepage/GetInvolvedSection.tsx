import React from "react";

const GetInvolvedSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12">
          Get Involved
        </h2>

        {/* Events Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join our vibrant community and participate in various events and
          programs to enhance your skills, contribute to open-source, and meet
          like-minded individuals. Here’s how you can get involved!
        </p>

        {/* Events and Programs List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Event 1 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Hackathons
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Participate in our hackathons to showcase your skills and win
              exciting prizes!
            </p>
            <a
              href="#"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600"
            >
              Learn More
            </a>
          </div>

          {/* Event 2 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Workshops
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join our workshops to learn about the latest technologies and
              best practices in software development.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600"
            >
              Learn More
            </a>
          </div>

          {/* Event 3 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Community Meetups
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Connect with fellow contributors and share ideas at our regular
              community meetups.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600"
            >
              Learn More
            </a>
          </div>

          {/* Event 4 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Mentorship Programs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sign up for our mentorship programs to get guidance from
              experienced developers in the industry.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600"
            >
              Learn More
            </a>
          </div>

          {/* Event 5 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Online Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enroll in our online courses to gain valuable skills and
              certifications.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600"
            >
              Learn More
            </a>
          </div>

          {/* Event 6 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Open Source Contributions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Contribute to our project and enhance your coding skills while
              making a positive impact!
            </p>
            <a
              href="#"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded transition hover:bg-blue-600"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
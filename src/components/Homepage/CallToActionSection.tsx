import React from "react";

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Ready to Master Algorithms?
        </h2>
        <p className="text-lg mb-8">
          Join our community of learners and take your skills to the next level!
        </p>
        <a
          href="#"
          className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default CallToActionSection;

import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: 'Fast Performance',
    description: 'Our algorithm solutions are optimized for the fastest performance.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-500 dark:text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h2l3 9 4-16 4 16 3-9h2" />
      </svg>
    ),
  },
  {
    title: 'Multiple Language Support',
    description: 'We support solutions in Python, JavaScript, Java, and more.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-500 dark:text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2H3v6h18V9z" />
      </svg>
    ),
  },
  {
    title: 'Beginner-Friendly',
    description: 'Comprehensive guides and easy-to-follow documentation for all levels.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-500 dark:text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Open Source',
    description: 'Contribute to the repository and grow with the community.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-500 dark:text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.866 0-7 3.134-7 7 0 1.74 1.28 3 3 3s3-1.26 3-3c0-1.74-1.28-3-3-3v-2h6v2c0-1.74-1.28-3-3-3z" />
      </svg>
    ),
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-2">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Why Choose <span className="text-indigo-400 dark:text-yellow-400">Algo?</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Explore the key features that make our algorithm library the best resource for learners and developers.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
       <div
        key={index}
      className="
        group relative overflow-hidden
        flex flex-col items-center text-center
        bg-white/80 dark:bg-brown-900/70
        backdrop-blur-lg
        border border-gray-200 dark:border-brown-700
        p-8 rounded-2xl
        shadow-md
        transition-all duration-500 ease-out
        hover:-translate-y-3
        hover:shadow-2xl
        hover:border-blue-500/40
        cursor-pointer
      ">
      <div
        className="
          relative z-10 mb-6
          text-5xl
          transition-all duration-500
          group-hover:scale-110
          group-hover:rotate-6
        "
      >
        {feature.icon}
      </div>
      <h3
        className="relative z-10 text-xl 
        font-bold text-gray-800 
        dark:text-white mb-4 
        transition-colors duration-300 
        group-hover:text-blue-500">
        {feature.title}
      </h3>
      <p
        className="relative z-10 text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
        {feature.description}
      </p>
      <div
         className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"
         />
         </div>
        ))}
       </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
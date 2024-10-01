import React from "react";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Software Engineer",
    feedback: "The Algo Web App has transformed the way I learn algorithms. The interactive interface is fantastic!",
    imageUrl: "https://github.com/ajay-dhangar.png",
  },
  {
    name: "John Doe",
    role: "Data Scientist",
    feedback: "I love the clean design and ease of use. Highly recommend for anyone looking to improve their algorithm skills!",
    imageUrl: "https://github.com/ajay-dhangar.png",
  },
  {
    name: "Emily Davis",
    role: "Computer Science Student",
    feedback: "The visual explanations and animations make complex algorithms much easier to understand!",
    imageUrl: "https://github.com/ajay-dhangar.png",
  },
];

const UserTestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12">
          What Our Users Say
        </h2>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 duration-300">
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {testimonial.role}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                "{testimonial.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonialsSection;

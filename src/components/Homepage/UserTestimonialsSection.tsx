import React from "react";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const UserTestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          What Our{" "}
          <span className="text-blue-600 dark:text-yellow-400">Users Say</span>
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 text-center mb-12"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          Here are some testimonials from our users who have used our services.
        </motion.p>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <img
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                  />
                </div>

                {/* Feedback */}
                <p className="text-gray-600 dark:text-gray-300 text-lg text-center mb-4">
                  "{testimonial.feedback}"
                </p>

                {/* User Info */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UserTestimonialsSection;

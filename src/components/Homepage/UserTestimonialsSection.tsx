import React from "react";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const UserTestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            What Our{" "}
            <span className="text-blue-600 dark:text-yellow-400">
              Users Say
            </span>
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Trusted by users who love our platform experience.
          </p>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.02,
                }}
                className="relative bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border border-gray-200 dark:border-gray-700 text-center max-w-3xl mx-auto"
              >
                {/* Quote */}
                <div className="absolute top-5 right-8 text-6xl text-blue-100 dark:text-gray-700 font-bold">
                  ”
                </div>

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  />
                </div>

                {/* Feedback */}
                <p className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  “{testimonial.feedback}”
                </p>

                {/* User Info */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>

                  <p className="text-blue-600 dark:text-yellow-400 font-medium mt-2">
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
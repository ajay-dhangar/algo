import React from "react";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>

          <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trusted by hundreds of users who love our platform and experience.
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          centeredSlides={false}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="!pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="!h-auto flex"
            >
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group relative flex flex-col justify-between w-full min-h-[420px] rounded-3xl border border-white/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 shadow-lg transition-all duration-500 hover:shadow-2xl overflow-hidden"
              >
                {/* Decorative Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/5 to-cyan-400/10" />

                {/* Quote Icon */}
                <div className="absolute top-5 right-6 text-6xl font-bold text-blue-100 dark:text-gray-700">
                  ”
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="mb-6">
                    <div className="p-[3px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg">
                      <img
                        src={testimonial.avatar}
                        alt={`${testimonial.name} avatar`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-900"
                      />
                    </div>
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic mb-8">
                    “{testimonial.feedback}”
                  </p>
                </div>

                {/* User Info */}
                <div className="relative z-10 text-center mt-auto">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-blue-600 dark:text-cyan-400 font-semibold mt-2">
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
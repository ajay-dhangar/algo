import React from "react";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "@docusaurus/router";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const UserTestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-[var(--ifm-color-primary)]/5 blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px]" />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16 mx-auto max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            What Our{" "}
            <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover how developers, students, and open-source contributors
            optimize their theoretical engineering implementations using our
            codebase.
          </p>
        </motion.div>

        {/* Swiper Container */}
        <div className="relative mx-auto max-w-4xl px-4 sm:px-12">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={40}
            loop={true}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".custom-swiper-next",
              prevEl: ".custom-swiper-prev",
            }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            className="!pb-14"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div
                  className="
                  relative h-full flex flex-col md:flex-row items-center md:items-stretch gap-8 sm:gap-10
                  bg-white dark:bg-gray-900/40 
                  backdrop-blur-md rounded-3xl p-8 sm:p-10
                  border border-slate-200/80 dark:border-slate-800/80 
                  shadow-xl shadow-slate-100/40 dark:shadow-none
                "
                >
                  <FaQuoteLeft className="absolute top-8 right-8 text-7xl sm:text-8xl text-slate-100/70 dark:text-gray-800/40 pointer-events-none -z-10 select-none" />

                  {/* Avatar */}
                  <div className="flex flex-col items-center justify-center text-center md:border-r md:border-slate-100 dark:md:border-slate-800/60 md:pr-10 md:min-w-[200px]">
                    <div className="relative group/avatar mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--ifm-color-primary)] to-indigo-500 opacity-20 blur-md transition-opacity duration-300 group-hover/avatar:opacity-40" />
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        loading="lazy"
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-md"
                      />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-[var(--ifm-color-primary)] mt-1.5 max-w-[180px]">
                      {testimonial.role}
                    </p>
                  </div>

                  {/* Feedback */}
                  <div className="flex flex-col justify-center flex-1">
                    <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                      "{testimonial.feedback}"
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button
            className="custom-swiper-prev absolute left-[-15px] sm:left-[-25px] top-1/2 -translate-y-1/2 z-20
              hidden xs:flex items-center justify-center w-10 h-10 rounded-full
              bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400
              border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg
              hover:text-[var(--ifm-color-primary)] transition-all duration-200"
            aria-label="Previous Review"
          >
            <FaChevronLeft className="h-3 w-3" />
          </button>

          <button
            className="custom-swiper-next absolute right-[-15px] sm:right-[-25px] top-1/2 -translate-y-1/2 z-20
              hidden xs:flex items-center justify-center w-10 h-10 rounded-full
              bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400
              border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg
              hover:text-[var(--ifm-color-primary)] transition-all duration-200"
            aria-label="Next Review"
          >
            <FaChevronRight className="h-3 w-3" />
          </button>

          {/* Pagination */}
          <div className="custom-swiper-pagination absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2" />

          {/* ✅ CTA BUTTON → REVIEW FORM PAGE */}
          <div className="flex justify-center mt-12">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full
                bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500
                text-white font-bold shadow-xl hover:shadow-2xl
                hover:scale-105 transition-all duration-300"
            >
              Write a Review
              <span className="text-lg">✍️</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Swiper styles */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          background: #94a3b8 !important;
          opacity: 0.4;
          width: 8px;
          height: 8px;
          transition: all 0.2s ease;
        }

        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: var(--ifm-color-primary) !important;
          opacity: 1 !important;
          width: 24px;
          border-radius: 4px;
        }

        html[data-theme="dark"]
          .custom-swiper-pagination
          .swiper-pagination-bullet-active {
          background: #fff !important;
        }
      `}</style>
    </section>
  );
};

export default UserTestimonialsSection;

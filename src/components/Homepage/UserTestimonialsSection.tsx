import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, FreeMode } from "swiper/modules";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaArrowRight, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "@docusaurus/Link";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

const featuredTestimonials = [
  {
    name: "Ajay Dhangar",
    role: "Founder, CodeHarborHub",
    avatar: "https://avatars.githubusercontent.com/u/99037494?v=4",
    feedback: "Building this platform has been a journey of passion. Our goal is to make high-quality engineering education accessible to everyone, everywhere.",
    rating: 5,
  },
  {
    name: "Rohan Sharma",
    role: "B.Tech Learner",
    avatar: "https://i.pravatar.cc/150?img=11",
    feedback: "The visual execution walkthroughs changed my entire perspective on dynamic programming. I went from failing to mastering it in weeks.",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Core Contributor",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    feedback: "Contributing to Algo helped me overcome imposter syndrome. Fixing a minor typo led to fixing core logic bugs, thanks to a supportive community.",
    rating: 4.5,
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?u=michael",
    feedback: "The depth of coverage for graph algorithms is impressive. The production-grade implementations helped me prepare for senior-level interviews.",
    rating: 5,
  },
  {
    name: "Prakash Patel",
    role: "CS Student",
    avatar: "https://i.pravatar.cc/150?u=priya",
    feedback: "I love how each algorithm comes with detailed complexity metrics. It makes learning theory practical and helps in understanding performance trade-offs.",
    rating: 5,
  },
  {
    name: "Danny Wilson",
    role: "Tech Lead",
    avatar: "https://i.pravatar.cc/150?u=david",
    feedback: "This is the premium destination for code reference standards. The focus on clean, optimized code makes it a valuable resource for any engineering team.",
    rating: 5,
  },
];

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
            modules={[Autoplay, Navigation, Pagination, FreeMode]}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 1.2,
              },
            }}
            spaceBetween={40}
            loop={true}
            speed={8000}
            freeMode={true}
            autoplay={{
              delay: 0,
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
            {featuredTestimonials.map((testimonial, index) => (
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
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-3 text-yellow-500">
                      {typeof testimonial.rating === "number" && (
                        <div className="flex gap-1 mb-3 text-yellow-500">
                          {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                            <FaStar key={i} className="w-4 h-4 fill-current filter drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
                          ))}
                          {testimonial.rating % 1 !== 0 && (
                            <FaStarHalfAlt className="w-4 h-4 fill-current filter drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
                          )}
                        </div>
                      )}
                    </div>
                    
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
        </div>
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link
            to="/reviews#all-reviews"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2.5
              px-8 py-4 rounded-xl
              border-2 border-transparent
              bg-yellow-400 hover:bg-yellow-500
              text-slate-900 hover:text-slate-950 font-bold text-base
              shadow-md hover:shadow-xl transition-all duration-200
              no-underline hover:no-underline
            "
          >
            <FaStar className="text-base" />
            View All Testimonials
          </Link>

          <Link
            to="/reviews#write-review"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2.5
              px-8 py-4 rounded-full
              border-2 border-[var(--ifm-color-primary)]
              bg-transparent hover:bg-[var(--ifm-color-primary)] hover:text-white
              text-[var(--ifm-color-primary)] font-bold text-base
              shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200
              no-underline hover:no-underline
            "
          >
            Write a Review
            <FaArrowRight className="text-base" />
          </Link>
        </motion.div>
      </div>

      {/* Swiper styles */}
      <style jsx global>{`
        .testimonial-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

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

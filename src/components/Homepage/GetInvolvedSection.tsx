import React from "react";
import Link from "@docusaurus/Link";
import { 
  FaTrophy, 
  FaLaptopCode, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaGraduationCap, 
  FaCode,
  FaArrowRight
} from "react-icons/fa";

interface InvolvementCard {
  title: string;
  description: string;
  link: string;
  icon: React.ReactElement;
  actionLabel?: string;
}

const cards: InvolvementCard[] = [
  {
    title: "Hackathons",
    description: "Participate in global sprints to showcase engineering architectures, smash bugs, and claim ecosystem prizes.",
    link: "https://hacktoberfest.com/",
    icon: <FaTrophy />,
    actionLabel: "View Hackathons",
  },
  {
    title: "Workshops",
    description: "Join interactive, live technical deeper dives highlighting core performance stacks and software design patterns.",
    link: "#", // Simulates coming soon status
    icon: <FaLaptopCode />,
  },
  {
    title: "Community Meetups",
    description: "Connect with core contributors and share functional engineering patterns during our recurring technical mixers.",
    link: "https://www.linkedin.com/in/ajay-dhangar/",
    icon: <FaUsers />,
    actionLabel: "Join Network",
  },
  {
    title: "Mentorship Programs",
    description: "Get 1-on-1 code architecture guidance from staff developers and engineering veterans across the tech industry.",
    link: "#", // Simulates coming soon status
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "Online Courses",
    description: "Enroll in guided programmatic curricular paths focused on clean sorting systems, algorithms, and micro-structures.",
    link: "#", // Simulates coming soon status
    icon: <FaGraduationCap />,
  },
  {
    title: "Open Source Initiatives",
    description: "Submit pull requests, write clean reference documentation, and elevate algorithmic structures inside our repository.",
    link: "https://github.com/ajay-dhangar/algo",
    icon: <FaCode />,
    actionLabel: "Start Contributing",
  },
];

const GetInvolvedSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950">
      {/* Structural Neon Ambient Orbs */}
      <div className="absolute top-1/3 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--ifm-color-primary)]/5 blur-[120px]" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Component Header Block */}
        <div className="text-center mb-20 mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Get Involved <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">Today</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Become part of a highly active ecosystem. Pick your entry path below to refine your production engineering toolkit and collaborate with engineers worldwide.
          </p>
        </div>

        {/* 3-Column Responsive Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {cards.map((card, index) => {
            const isPlaceholder = card.link === "#";
            
            // Build out individual modular structural card block layout
            const CardContent = (
              <div className="
                relative flex flex-col justify-between h-full p-6 sm:p-8
                bg-white dark:bg-gray-900/40
                backdrop-blur-md rounded-2xl
                border border-slate-200/80 dark:border-slate-800/80
                shadow-sm group-hover:shadow-xl
                transition-all duration-300 ease-out
                group-hover:-translate-y-1.5
              "
              >
                {/* Active Focus Border Highlight Dynamic Frame Overlay */}
                <div className={`absolute inset-0 border border-transparent rounded-2xl transition-colors duration-300 pointer-events-none ${!isPlaceholder ? "group-hover:border-[var(--ifm-color-primary)]/30" : ""}`} />

                <div>
                  {/* Top Panel: Card Icon Badge Indicator */}
                  <div className={`
                    mb-6 inline-flex p-3 rounded-xl border transition-all duration-300
                    ${isPlaceholder 
                      ? "bg-slate-50 dark:bg-slate-900 text-slate-400 border-slate-200/60 dark:border-slate-800" 
                      : "bg-blue-50/50 dark:bg-blue-950/30 text-[var(--ifm-color-primary)] border-blue-100/50 dark:border-blue-900/20 group-hover:scale-110 group-hover:bg-[var(--ifm-color-primary)] group-hover:text-white group-hover:border-transparent"
                    }
                  `}>
                    {React.cloneElement(card.icon, { className: "h-5 w-5 sm:h-6 sm:w-6" })}
                  </div>

                  {/* Context Text Block Layout */}
                  <h3 className={`text-xl font-bold tracking-tight mb-3 transition-colors duration-200 ${isPlaceholder ? "text-slate-500 dark:text-slate-400" : "text-slate-900 dark:text-white group-hover:text-[var(--ifm-color-primary)]"}`}>
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Panel Actions Footer Layout */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between text-sm font-bold">
                  {isPlaceholder ? (
                    <span className="text-xs font-mono font-medium tracking-wider px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/40 dark:border-slate-700/50">
                      COMING SOON
                    </span>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-[var(--ifm-color-primary)]">
                      <span>{card.actionLabel || "Explore Program"}</span>
                      <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  )}
                </div>
              </div>
            );

            // Conditional Routing Architecture Evaluator
            if (isPlaceholder) {
              return (
                <div key={index} className="group opacity-75 cursor-not-allowed select-none">
                  {CardContent}
                </div>
              );
            }

            const isExternal = card.link.startsWith("http");

            return isExternal ? (
              <a 
                key={index} 
                href={card.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ifm-color-primary)]"
              >
                {CardContent}
              </a>
            ) : (
              <Link 
                key={index} 
                to={card.link} 
                className="group no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ifm-color-primary)]"
              >
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;

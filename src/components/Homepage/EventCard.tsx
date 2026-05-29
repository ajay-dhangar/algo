import React from "react";

interface EventCardProps {
  title: string;
  description: string;
  link?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <div className="flex flex-col justify-between relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg transition-transform hover:shadow-2xl hover:bg-[#3b82f6] group transform hover:scale-105 duration-300">
      
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-white mb-2">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-slate-50">
          {description}
        </p>
      </div>

      {link && (
        <div className="flex justify-center">
          <a
            href={link}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700 hover:text-white cursor-pointer pointer-events-auto z-10"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      )}

<div className="absolute inset-0 bg-blue-100 opacity-10 rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default EventCard;
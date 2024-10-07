import Layout from "@theme/Layout";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTag } from "react-icons/fa";

const Blogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const blogPosts = [
    { id: 1, title: "Understanding Time Complexity", tag: "Theory", summary: "Learn the basics of time complexity analysis." },
    { id: 2, title: "Top 5 Sorting Algorithms", tag: "Sorting", summary: "Explore the most common sorting algorithms and their use cases." },
    { id: 3, title: "Graph Theory Basics", tag: "Graphs", summary: "Introduction to graph theory and essential algorithms." },
    // Add more blog posts here
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = selectedTag === "All" || post.tag === selectedTag;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const tags = ["All", "Theory", "Sorting", "Graphs"];

  return (
    <Layout title="Blogs" description="Read the latest blog posts on various topics.">
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-8">
      <div className="container mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Blogs
        </motion.h1>

        <motion.div
          className="flex justify-center items-center space-x-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600" />
            <input
              type="text"
              placeholder="Search Blog Posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <FaTag className="absolute left-3 top-3 text-[var(--ifm-color-primary)] dark:bg-gray-700 dark:border-gray-600" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
            >
              {tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Blog Posts List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
              <button className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 border-1 border-blue-600">
                Read More
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </Layout>
  );
};

export default Blogs;
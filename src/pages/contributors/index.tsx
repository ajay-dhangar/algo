import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import axios from "axios";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12); // Show 12 contributors initially

  useEffect(() => {
    async function fetchContributors() {
      let allContributors: Contributor[] = [];
      let page = 1;

      try {
        while (true) {
          const response = await axios.get(
            `https://api.github.com/repos/ajay-dhangar/algo/contributors`,
            {
              params: {
                per_page: 100,
                page,
              },
            }
          );
          const data: Contributor[] = response.data;
          if (data.length === 0) break;
          allContributors.push(...data); // Use push for better performance
          page++;
        }
        setContributors(allContributors);
      } catch (error) {
        // Improved error handling
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("Failed to load contributors. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  const loadMoreContributors = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Load 12 more contributors
  };

  return (
    <Layout title="Contributors" description="Meet the contributors of Algo.">
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Amazing Contributors
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A huge thanks to everyone who has contributed to making Algo a
            success.
          </motion.p>
        </section>

        <section className="container mx-auto py-8 px-6 md:px-12">
          {loading ? (
            <motion.p
              className="text-center text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Loading contributors...
            </motion.p>
          ) : error ? (
            <motion.p
              className="text-center text-lg text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {contributors.slice(0, visibleCount).map((contributor) => (
                <motion.div
                  key={contributor.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden"
                  >
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="w-full h-85 rounded-t-xl transition duration-300 transform hover:scale-105 object-top object-cover"
                    />
                  </a>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {contributor.login}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Contributions: {contributor.contributions}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {visibleCount < contributors.length && (
            <div className="text-center mt-10">
              <motion.button
                onClick={loadMoreContributors}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 transform hover:scale-105 border-none"
                whileHover={{ scale: 1.1 }}
              >
                Load More Contributors
              </motion.button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Contributors;

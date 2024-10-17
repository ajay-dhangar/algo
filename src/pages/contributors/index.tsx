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
  const [visibleCount, setVisibleCount] = useState<number>(6); // Show 6 contributors initially

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
          allContributors = [...allContributors, ...data];
          page++;
        }
        setContributors(allContributors);
      } catch (error) {
        setError("Failed to load contributors. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  const loadMoreContributors = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Load 6 more contributors
  };

  return (
    <Layout title="Contributors" description="Meet the contributors of Algo.">
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Header Section */}
        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Contributors
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Meet the people who have contributed to making Algo better.
          </motion.p>
        </section>

        {/* Contributors Grid */}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {contributors.slice(0, visibleCount).map((contributor) => (
                <motion.div
                  key={contributor.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="w-full h-48 object-cover"
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

          {/* Load More Button */}
          {visibleCount < contributors.length && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreContributors}
                className="bg-blue-900 p-4 text-lg text-white rounded hover:bg-blue-800 transition duration-300"
              >
                Load More Contributors
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Contributors;

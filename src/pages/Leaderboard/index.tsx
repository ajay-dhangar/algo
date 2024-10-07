import Layout from "@theme/Layout";
import React from "react";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

const Leaderboard: React.FC = () => {
  const leaders = [
    { name: "Ajay Dhangar", points: 1500, rank: 1 },
    { name: "Jane Doe", points: 1450, rank: 2 },
    { name: "John Smith", points: 1420, rank: 3 },
  ];

  return (
    <Layout title="Leaderboard" description="Leaderboard of the top coders">
      <section className="relative bg-gray-100 dark:bg-gray-900 py-16 px-8">
        <div className="container mx-auto text-center max-w-5xl">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Leaderboard
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            See where you rank against other coders!
          </motion.p>

          <div className="bg-white dark:bg-gray-800 p-14 rounded-lg shadow-lg m-0 mx-auto w-full max-w-3xl flex justify-center items-center">
            <table className="w-full table-fixed text-left">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="py-3 px-20 text-gray-700 dark:text-gray-300 text-center">Rank</th>
                  <th className="py-3 px-20 text-gray-700 dark:text-gray-300 text-center">Name</th>
                  <th className="py-3 px-20 text-gray-700 dark:text-gray-300 text-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader) => (
                  <tr key={leader.rank} className="border-b border-gray-300 dark:border-gray-700">
                    <td className="py-3 px-4 text-center">
                      {leader.rank === 1 ? (
                        <FaCrown className="text-yellow-500 inline-block" />
                      ) : (
                        leader.rank
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200 text-center">{leader.name}</td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200 text-center">{leader.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Leaderboard;

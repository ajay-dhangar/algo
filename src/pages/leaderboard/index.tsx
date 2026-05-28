import Layout from "@theme/Layout";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import axios from "axios";
import { buildApiUrl, useApiBaseUrl } from "../../utils/api";

const Leaderboard: React.FC = () => {
  const fallbackLeaders = [
    { username: "Ajay Dhangar", totalScore: 1500, attemptsCount: 15 },
    { username: "Jane Doe", totalScore: 1450, attemptsCount: 12 },
    { username: "John Smith", totalScore: 1420, attemptsCount: 10 },
  ];

  const [leaders, setLeaders] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = useApiBaseUrl();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(buildApiUrl(apiBaseUrl, "/api/leaderboard"));
        if (res.data?.success && Array.isArray(res.data.leaderboard)) {
          setLeaders(res.data.leaderboard);
          setIsLive(true);
        } else {
          setLeaders(fallbackLeaders);
          setIsLive(false);
        }
      } catch (e) {
        console.warn("Leaderboard API offline, falling back to mock data:", e);
        setLeaders(fallbackLeaders);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <Layout title="Leaderboard" description="Leaderboard of the top coders">
      <section className="relative bg-gray-100 dark:bg-gray-900 py-16 px-8 min-h-screen">
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

          <div className="bg-white dark:bg-gray-800 p-8 md:p-14 rounded-2xl shadow-xl mx-auto w-full max-w-3xl border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">Rankings</h2>
              <div>
                {isLive ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-800">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live DB Mode
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Offline Mock Mode
                  </span>
                )}
              </div>
            </div>

            {loading ? (
              <div className="py-10 text-gray-500 dark:text-gray-400">Loading rankings...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-bold uppercase text-xs w-1/4 text-center">Rank</th>
                      <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-bold uppercase text-xs w-2/5">Name</th>
                      <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-bold uppercase text-xs w-1/4 text-center">Score / Points</th>
                      <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-bold uppercase text-xs w-1/4 text-center">Attempts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaders.map((leader, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                        <td className="py-4 px-6 text-center font-semibold">
                          {index === 0 ? (
                            <FaCrown className="text-yellow-500 inline-block text-xl" />
                          ) : index === 1 ? (
                            <span className="text-gray-400 text-lg">🥈</span>
                          ) : index === 2 ? (
                            <span className="text-amber-600 text-lg">🥉</span>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">
                          {leader.username}
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-blue-600 dark:text-blue-400">
                          {leader.totalScore}
                        </td>
                        <td className="py-4 px-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                          {leader.attemptsCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Leaderboard;

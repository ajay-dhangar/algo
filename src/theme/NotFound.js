import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: "theme.NotFound.title",
          message: "Page Not Found",
        })}
      />

      <Layout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-6">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-extrabold mb-6 text-gray-800 dark:text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              404
            </motion.h1>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page"
              >
                Page Not Found
              </Translate>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Translate
                id="theme.NotFound.p1"
                description="The first paragraph of the 404 page"
              >
                We could not find the page you were looking for.
              </Translate>
            </motion.p>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Translate
                id="theme.NotFound.p2"
                description="The second paragraph of the 404 page"
              >
                The page may have been moved, deleted, or the URL may be
                incorrect.
              </Translate>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 rounded-xl
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold text-lg
                transition-all duration-300
                hover:scale-105 shadow-lg"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Layout>
    </>
  );
}
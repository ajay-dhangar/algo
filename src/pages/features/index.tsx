import React from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom"; // For React Router v5
// import { useNavigate } from "react-router-dom"; // Uncomment this if using React Router v6

const features = [
  {
    title: "Blogs",
    description: "Read and explore insightful blogs on DSA and programming concepts.",
  },
  {
    title: "Quizzes",
    description: "Test your knowledge with quizzes on various DSA topics.",
  },
  {
    title: "Algorithms",
    description: "Learn and implement popular algorithms in different languages.",
  },
  {
    title: "Challenges",
    description: "Take on coding challenges to sharpen your problem-solving skills.",
  },
  {
    title: "Roadmap",
    description: "Follow a comprehensive roadmap to master DSA.",
  },
  {
    title: "Coding Resources",
    description: "Access curated coding resources to help you learn more effectively.",
  },
  {
    title: "Practice",
    description: "Practice coding problems in various difficulty levels to improve.",
  },
  {
    title: "Community",
    description: "Join a vibrant community of learners and developers.",
  },
  {
    title: "Tutorials",
    description: "Watch tutorials to understand DSA concepts in detail.",
  },
  {
    title: "Contests",
    description: "Participate in regular coding contests to challenge yourself.",
  },
  {
    title: "Leaderboard",
    description: "Compete with others on the leaderboard by solving challenges and participating in contests.",
  },
  {
    title: "Code Editor",
    description: "Practice coding directly in your browser with a built-in code editor.",
  },
];

const Features: React.FC = () => {
  const history = useHistory(); // For React Router v5
  // const navigate = useNavigate(); // Uncomment this if using React Router v6

  const handleCardClick = (title: string) => {
    if (title === "Tutorials") {
      history.push("/algo/docs/"); // Redirect to /algo/docs for Tutorials
    } else if(title == "Quizzes"){
        history.push("/algo/quizes/");
    } else if(title == "Algorithms"){
        history.push("/algo/docs/")
    } else if(title == "Coding Resources"){
        history.push("/algo/resources")
    }
    else {
      const encodedTitle = encodeURIComponent(title);
      history.push(`/algo/${encodedTitle}`); // Redirect to /algo/{encodedTitle} for other features
    }
  };

  return (
    <Layout
      title="Features"
      description="Learn more about the features of our platform."
    >
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Features of Algo
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Explore the amazing features that make learning Data Structures and Algorithms easy and fun.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center cursor-pointer"
                onClick={() => handleCardClick(feature.title)} // Pass the title to the handler
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default Features;

import React from "react";
import Layout from "@theme/Layout";
import Header from "../../components/Header";
import QuizCard from "../../components/QuizCard";
import quizData from "../../data/quizData";

const Quizes: React.FC = () => (
  <Layout
    title="Quizzes"
    description="Practice your coding skills with quizzes on data structures and algorithms."
  >
    <section className="relative bg-gray-100 dark:bg-gray-900 py-16 px-8">
      <Header
        title="Test Your Data Structures Skills"
        description="Practice your coding skills with quizzes on data structures and algorithms. Each quiz contains a set of questions to test your knowledge on a specific topic. Click on the 'See Solutions' button to view the answers and explanations."
      />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {quizData.map((quiz, index) => (
          <QuizCard
            key={index}
            title={quiz.title}
            description={quiz.description}
            link={quiz.link}
          />
        ))}
      </div>
    </section>
  </Layout>
);

export default Quizes;

import React from "react";

interface Props {
  currentQuestion: number;
  totalQuestions: number;
}

const QuestionProgress: React.FC<Props> = ({
  currentQuestion,
  totalQuestions
}) => {

  const progress =
    ((currentQuestion + 1) / totalQuestions) * 100;

  return (

    <div className="mb-6" aria-label="Quiz progress">

      <div className="
      flex
      justify-between
      text-sm
      mb-2
      text-gray-600
      dark:text-gray-400
      ">

        <span aria-live="polite">
          Question {currentQuestion + 1}
        </span>

        <span>
          Total: {totalQuestions}
        </span>

      </div>

      <div
        role="progressbar"
        aria-valuenow={currentQuestion + 1}
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
        aria-label={"Question " + (currentQuestion + 1) + " of " + totalQuestions}
      className="
      w-full
      h-3
      bg-gray-300
      rounded-full
      ">

        <div
          className="
          h-3
          bg-blue-600
          rounded-full
          transition-all
          duration-300
          "

          style={{
            width: `${progress}%`
          }}
        / />

    </div>

  );

};

export default QuestionProgress;

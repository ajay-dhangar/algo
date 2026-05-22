import React from "react";

interface Props {

  questions: any[];

  currentQuestion: number;

  userAnswers: string[];

  setCurrentQuestionIndex:
  React.Dispatch<
  React.SetStateAction<number>
  >;

}

const QuestionNavigator:
React.FC<Props> = ({

  questions,

  currentQuestion,

  userAnswers,

  setCurrentQuestionIndex

}) => {

  return (

    <div
    className="
    flex
    gap-2
    overflow-x-auto
    pb-2
    mb-6
    ">

      {

        questions.map((_, idx) => (

          <button
          title={`Question ${idx+1}`}

            key={idx}

            onClick={() =>
              setCurrentQuestionIndex(idx)
            }

            className={`

            w-10
            h-10
            rounded-full

            ${

              currentQuestion === idx

                ?

                "bg-blue-600 text-white"

                :

                userAnswers[idx] !== undefined

?

"bg-green-600 text-white"

:

"bg-gray-300 text-black"

            }

            `}

          >

            {idx + 1}

          </button>

        ))

      }

    </div>

  );

};

export default QuestionNavigator;
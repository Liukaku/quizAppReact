import React, { useEffect, useState } from "react";
import { Answer, Question, QuestionType } from "./types";
import AddAnswerSection from "./AddAnswerSection";
import ReorderAnswer from "./addAnswerTypes/listAnswers/ReorderAnswer";
import SingleAnswer from "./addAnswerTypes/listAnswers/SingleAnswer";

type Props = {
  SaveQuestion: Function;
  questionToEdit: Question | null;
  deleteAnswer: DeleteAnswer;
  updateAnswerOrder: UpdateAnswerOrder;
};

interface DeleteAnswer {
  (questionOrder: number, answerOrder: number): void;
}

interface UpdateAnswerOrder {
  (questionOrder: number, answerOrder: number): void;
}

const AddQuestion = ({
  SaveQuestion,
  questionToEdit,
  deleteAnswer,
  updateAnswerOrder,
}: Props) => {
  const [questionTitle, updateTitle] = useState<string>("");
  const [questionType, updateType] = useState<QuestionType | "">("");
  const [questionOrder, updateOrder] = useState<number>(1);
  const [questionAnswer, updateAnswer] = useState<Array<Answer>>([]);
  const [modalContent, updateModalContent] = useState<JSX.Element | null>(null);
  const [errorText, updateErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (questionToEdit !== null) {
      updateTitle(questionToEdit.questionTitle);
      updateType(questionToEdit.type);
      updateOrder(questionToEdit.order);
      updateAnswer(questionToEdit.answer);
    }
  }, [questionToEdit]);

  useEffect(() => {
    if (questionAnswer.length > 0) {
      const hasCorrectAnswer = questionAnswer.some((answer) => {
        return answer.correct;
      });

      if (hasCorrectAnswer) {
        updateErrorText(null);
      }
    }
  }, [questionAnswer]);

  useEffect(() => {
    const hasAnswerTitle = questionTitle !== "";
    if (hasAnswerTitle) {
      updateErrorText(null);
    }
  }, [questionTitle]);

  const answerTypeExplanation: Record<string, string> = {
    SINGLE_CHOICE: "Select one answer",
    MULTI_CHOICE: "Select multiple answers",
    ORDER: "Put the answers in the correct order",
  };

  const updateQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("update question");
    const hasCorrectAnswer = questionAnswer.some((answer) => {
      return answer.correct;
    });
    if (!hasCorrectAnswer) {
      console.log("no correct answer");
      updateErrorText("Please select a correct answer");
      return;
    }
    if (questionTitle == "") {
      updateErrorText("Please enter a question title");
      return;
    }
    if (questionType !== "") {
      const question: Question = {
        questionTitle: questionTitle,
        order: 0,
        type: questionType,
        answer: questionAnswer,
      };
      SaveQuestion(question);
      updateAnswer([]);
      updateTitle("");
      updateType("");
      updateOrder(1);
      updateErrorText(null);
    }
  };

  const updateSelectedAnswer = (n: number, answerType: QuestionType) => {
    const selections = questionAnswer.map((answer, i) => {
      switch (answerType) {
        case "SINGLE_CHOICE":
          if (answer.correct) {
            answer.correct = false;
          }
          if (i === n) {
            answer.correct = true;
          }
          break;
        case "MULTI_CHOICE":
          if (i === n) {
            answer.correct = !answer.correct;
          }
          break;
        case "ORDER":
          break;
      }

      return answer;
    });
    updateAnswer([...selections]);
  };

  const deleteSelectedAnswer = (n: number) => {
    if (questionToEdit !== null) {
      deleteAnswer(questionOrder, n);
    }
    const selections = questionAnswer.filter((answer, i) => {
      return i !== n;
    });

    selections.map((answer, i) => {
      answer.order = i + 1;
    }); // update order

    updateAnswer([...selections]);
  };

  const moveQuestionUp = (n: number) => {
    if (n === 0) return;
    const currentAnswers = questionAnswer;
    const answer = currentAnswers[n];
    currentAnswers.splice(n, 1);
    currentAnswers.splice(n - 1, 0, answer);
    currentAnswers.map((answer, i) => {
      answer.order = i;
    }); // update order
    updateAnswer([...currentAnswers]);
  };

  const moveQuestionDown = (n: number) => {
    if (n === questionAnswer.length - 1) return;
    const currentAnswers = questionAnswer;
    const answer = currentAnswers[n];
    currentAnswers.splice(n, 1);
    currentAnswers.splice(n + 1, 0, answer);
    currentAnswers.map((answer, i) => {
      answer.order = i;
    }); // update order
    updateAnswer([...currentAnswers]);
  };

  const updateQuestionType = (questionType: QuestionType) => {
    if (questionAnswer.length > 0) {
      updateModalContent(
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-xl font-bold">Are you sure?</p>
          <p className="text-lg text-black">
            Changing the question type will change the answer types as well. A
            new correct answer will need to be selected.
          </p>
          <div className="flex flex-row justify-center w-full">
            <button
              className="w-1/2 p-2 m-2 text-white bg-red-500 rounded-md"
              onClick={() => {
                updateModalContent(null);
              }}
            >
              Cancel
            </button>
            <button
              className="w-1/2 p-2 m-2 text-white bg-green-500 rounded-md"
              onClick={() => {
                const newAnswers = questionAnswer.map((answer) => {
                  answer.correct = false;
                  answer.answerType = questionType;
                  return answer;
                });
                updateAnswer(newAnswers);
                updateModalContent(null);
                updateType(questionType);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      );
    } else {
      updateType(questionType);
    }
    updateType(questionType);
  };

  return (
    <form className="flex flex-wrap w-full">
      {modalContent !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-md z-50">
            {modalContent}
          </div>
        </div>
      )}
      <input
        className="w-full"
        type="text"
        id="questionTitle"
        placeholder="Enter your question here..."
        value={questionTitle}
        onChange={(e) => {
          updateTitle(e.target.value);
        }}
        required
      />
      <div className="lg:w-3/12 w-1/2 mx-auto my-2">
        <div>
          <input
            type={"radio"}
            id="single"
            name="questionType"
            value={"Single Choice"}
            checked={questionType === "SINGLE_CHOICE"}
            onChange={(e) => {
              updateQuestionType("SINGLE_CHOICE");
            }}
          ></input>
          <label htmlFor="single">Single Choice</label>
        </div>
        <div>
          <input
            type={"radio"}
            id="multi"
            name="questionType"
            value={"Multiple Choice"}
            checked={questionType === "MULTI_CHOICE"}
            onChange={(e) => {
              updateQuestionType("MULTI_CHOICE");
            }}
          ></input>
          <label htmlFor="multi">Multiple Choice</label>
        </div>
        <div>
          <input
            type={"radio"}
            id="reorder"
            name="questionType"
            value={"Re-order"}
            checked={questionType === "ORDER"}
            onChange={(e) => {
              updateQuestionType("ORDER");
            }}
          ></input>
          <label htmlFor="reorder">Re-Order</label>
        </div>
      </div>
      <div className="w-full text-center font-bold text-lg">
        {answerTypeExplanation[questionType]}
      </div>
      <AddAnswerSection
        type={questionType}
        currentAnswers={questionAnswer}
        updateAnswers={updateAnswer}
      />
      {questionAnswer && (
        <div className=" w-full">
          {questionAnswer.map((answer, n) => {
            if (answer.answerType === "ORDER") {
              return (
                <ReorderAnswer
                  answer={answer}
                  orderNo={n}
                  questionAnswer={questionAnswer}
                  updateSelectedAnswer={updateSelectedAnswer}
                  deleteSelectedAnswer={deleteSelectedAnswer}
                  moveQuestionUp={moveQuestionUp}
                  moveQuestionDown={moveQuestionDown}
                />
              );
            } else {
              return (
                <SingleAnswer
                  answer={answer}
                  orderNo={n}
                  questionAnswer={questionAnswer}
                  updateSelectedAnswer={updateSelectedAnswer}
                  deleteSelectedAnswer={deleteSelectedAnswer}
                  moveQuestionUp={moveQuestionUp}
                  moveQuestionDown={moveQuestionDown}
                />
              );
            }
          })}
        </div>
      )}
      <div className="w-full">
        {errorText && (
          <h1 className="text-red-500 font-extrabold text-2xl text-center">
            {errorText}
          </h1>
        )}
      </div>
      <button
        className="shadowBox w-full mt-5 py-2"
        type="submit"
        onClick={(e) => updateQuestion(e)}
      >
        Save Question
      </button>
    </form>
  );
};

export default AddQuestion;

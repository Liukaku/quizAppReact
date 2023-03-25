import React, { useEffect, useState } from "react";
import { Answer, Question, QuestionType } from "./types";
import AddAnswerSection from "./AddAnswerSection";
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
  const [questionOrder, updateOrder] = useState<number>(0);
  const [questionAnswer, updateAnswer] = useState<Array<Answer>>([]);

  useEffect(() => {
    console.log(questionToEdit);
    if (questionToEdit !== null) {
      updateTitle(questionToEdit.questionTitle);
      updateType(questionToEdit.type);
      updateOrder(questionToEdit.order);
      updateAnswer(questionToEdit.answer);
    }
  }, [questionToEdit]);

  const updateQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (questionTitle !== "" && questionType !== "") {
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
      updateOrder(0);
    }
  };

  const updateSelectedAnswer = (n: number) => {
    const selections = questionAnswer.map((answer, i) => {
      if (answer.correct) {
        answer.correct = false;
      }
      if (i === n) {
        answer.correct = true;
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

  return (
    <form className="flex flex-wrap w-full">
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
            checked={questionType === "SINGLE-CHOICE"}
            onClick={(e) => {
              updateType("SINGLE-CHOICE");
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
            checked={questionType === "MULTI-CHOICE"}
            onClick={(e) => {
              updateType("MULTI-CHOICE");
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
            onClick={(e) => {
              updateType("ORDER");
            }}
          ></input>
          <label htmlFor="reorder">Re-Order</label>
        </div>
      </div>
      <AddAnswerSection
        type={questionType}
        currentAnswers={questionAnswer}
        updateAnswers={updateAnswer}
      />
      {questionAnswer && (
        <div className=" w-full">
          {questionAnswer.map((answer, n) => {
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
          })}
        </div>
      )}
      <button
        className="formButton"
        type="submit"
        onClick={(e) => updateQuestion(e)}
      >
        Save Question
      </button>
    </form>
  );
};

export default AddQuestion;

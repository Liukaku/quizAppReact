import React, { useEffect, useState } from "react";
import { Answer, Question, QuestionType } from "./types";
import AddAnswerSection from "./AddAnswerSection";

type Props = {
  SaveQuestion: Function;
  questionToEdit: Question | null;
};

const AddQuestion = ({ SaveQuestion, questionToEdit }: Props) => {
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
              <div key={answer.id} className="flex w-full justify-between">
                <div contentEditable className="w-1/3">
                  {answer.title}
                </div>
                <div>{answer.order}</div>
                <div className="w-1/3 justify-around flex">
                  <label htmlFor={`${answer.id}-${new Date().getTime()}`}>
                    Correct Answer?
                  </label>
                  <input
                    type="radio"
                    name="singleChoice"
                    checked={answer.correct}
                    onChange={() => {
                      updateSelectedAnswer(n);
                    }}
                    id={`${answer.id}`}
                  />
                </div>
              </div>
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

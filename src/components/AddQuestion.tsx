import React from "react";
import { Question } from "./types";

type Props = {
  SaveQuestion: Function;
};

const AddQuestion = ({ SaveQuestion }: Props) => {
  const updateQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const question: Question = {
      questionTitle: "",
      order: 0,
      type: "MULTI-CHOICE",
      answer: [""],
    };
    SaveQuestion();
  };

  return (
    <form className="flex flex-wrap">
      <input
        className="w-full"
        type="text"
        id="questionTitle"
        placeholder="Enter your question here..."
        required
      />
      <div className="lg:w-3/12 w-1/2 mx-auto my-2">
        <div>
          <input
            type={"radio"}
            id="single"
            name="questionType"
            value={"Single Choice"}
          ></input>
          <label htmlFor="single">Single Choice</label>
        </div>
        <div>
          <input
            type={"radio"}
            id="multi"
            name="questionType"
            value={"Multiple Choice"}
          ></input>
          <label htmlFor="multi">Multiple Choice</label>
        </div>
        <div>
          <input
            type={"radio"}
            id="reorder"
            name="questionType"
            value={"Re-order"}
          ></input>
          <label htmlFor="reorder">Re-Order</label>
        </div>
      </div>
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

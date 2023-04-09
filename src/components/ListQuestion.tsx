import React from "react";
import { Question } from "./types";

type Props = {
  question: Question;
  editQuestionAnswers: Function;
  deleteQuestion: Function;
};

const ListQuestion = ({
  question,
  editQuestionAnswers,
  deleteQuestion,
}: Props) => {
  return (
    <div
      key={`${question.order}`}
      className={`w-full ${
        (question.order + 1) % 2 === 0 ? `bg-zinc-900` : `bg-zinc-600`
      } flex py-1 duration-300 ease-in-out`}
      id={`question-${question.order}`}
    >
      <div
        className={`w-3/12 
        border-r-slate-400 border-r break-words`}
      >
        {question.questionTitle}
      </div>
      <div className={`w-3/12 border-r-slate-400 border-r text-center`}>
        {question.type}
      </div>
      <div className={`w-3/12 border-r-slate-400 border-r text-center`}>
        {question.order}
      </div>
      <div
        className={`w-1/12 text-center cursor-pointer hover:bg-pink-500 ease-in-out duration-300`}
        onClick={() => {
          editQuestionAnswers(question);
        }}
      >
        Edit
      </div>
      <div
        className="w-2/12 text-center cursor-pointer hover:bg-red-400 ease-in-out duration-300"
        onClick={() => deleteQuestion(question.order - 1)}
      >
        Delete
      </div>
    </div>
  );
};

export default ListQuestion;

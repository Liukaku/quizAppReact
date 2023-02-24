import React from "react";
import { Question } from "./types";

type Props = {
  question: Question;
};

const ListQuestion = ({ question }: Props) => {
  const lighten = (id: string, inOrOut: string) => {
    if (inOrOut === "IN") {
      if (document.getElementById(id)?.style) {
        document.getElementById(id).style.backgroundColor = "rgb(213, 86, 86";
      }
    } else {
      if (document.getElementById(id)?.style) {
        document.getElementById(id).style.backgroundColor = "";
      }
    }
  };

  return (
    <div
      key={`${question.order}`}
      className={`w-full ${
        (question.order + 1) % 2 === 0 ? `bg-zinc-900` : `bg-zinc-600`
      } flex py-1 duration-300 ease-in-out`}
      onMouseEnter={() => {
        lighten(`question-${question.order}`, "IN");
      }}
      onMouseLeave={() => {
        lighten(`question-${question.order}`, "OUT");
      }}
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
    </div>
  );
};

export default ListQuestion;

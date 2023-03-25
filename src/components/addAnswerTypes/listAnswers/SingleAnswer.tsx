import { Answer } from "@/components/types";
import React from "react";

type Props = {
  answer: Answer;
  orderNo: number;
  questionAnswer: Array<Answer>;
  updateSelectedAnswer: UpdateSelectedAnswer;
  deleteSelectedAnswer: UpdateSelectedAnswer;
  moveQuestionUp: UpdateSelectedAnswer;
  moveQuestionDown: UpdateSelectedAnswer;
};

interface UpdateSelectedAnswer {
  (orderNo: number): void;
}

const SingleAnswer = ({
  answer,
  orderNo,
  questionAnswer,
  updateSelectedAnswer,
  deleteSelectedAnswer,
  moveQuestionUp,
  moveQuestionDown,
}: Props) => {
  return (
    <div key={answer.id} className="flex w-full justify-between">
      <div className="w-4/12">{answer.title}</div>
      <div>{answer.order}</div>
      <div className="w-5/12 justify-around flex">
        <label htmlFor={`${answer.id}-${new Date().getTime()}`}>
          Correct Answer?
        </label>
        <input
          type="radio"
          name="singleChoice"
          checked={answer.correct}
          onChange={() => {
            updateSelectedAnswer(orderNo);
          }}
          id={`${answer.id}`}
        />
        <div
          className={`text-red-600 font-black cursor-pointer hover:blur-sm duration-100 ease-in-out ${
            questionAnswer.length > 1 ? `w-1/12` : `w-2/12 text-center`
          }`}
          onClick={(e) => {
            deleteSelectedAnswer(orderNo);
          }}
        >
          X
        </div>
        <div
          className={`${orderNo > 0 ? `cursor-pointer` : ``} ${
            questionAnswer.length > 1 ? `w-1/12` : `w-0`
          }`}
          onClick={() => moveQuestionUp(orderNo)}
        >
          {orderNo > 0 && "▲"}
        </div>
        <div
          className={`${
            orderNo < questionAnswer.length - 1 ? `cursor-pointer` : ``
          } ${questionAnswer.length > 1 ? `w-1/12` : `w-0`}`}
          onClick={() => moveQuestionDown(orderNo)}
        >
          {orderNo < questionAnswer.length - 1 && "▼"}
        </div>
      </div>
    </div>
  );
};

export default SingleAnswer;

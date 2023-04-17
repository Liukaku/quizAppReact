import React from "react";
import PropTypes from "prop-types";
import { Answer, QuestionType } from "@/components/types";

type Props = {
  answer: Answer;
  orderNo: number;
  questionAnswer: Array<Answer>;
  updateSelectedAnswer: UpdateSelectedAnswer;
  deleteSelectedAnswer: DeleteOrMoveSelectedAnswer;
  moveQuestionUp: DeleteOrMoveSelectedAnswer;
  moveQuestionDown: DeleteOrMoveSelectedAnswer;
};

interface UpdateSelectedAnswer {
  (orderNo: number, answerType: QuestionType): void;
}

interface DeleteOrMoveSelectedAnswer {
  (orderNo: number): void;
}

const ReorderAnswer = ({
  answer,
  orderNo,
  questionAnswer,
  updateSelectedAnswer,
  deleteSelectedAnswer,
  moveQuestionUp,
  moveQuestionDown,
}: Props) => {
  return (
    <div className="flex w-full justify-between border-2 border-black hover:border-2 hover:border-zinc-800 duration-150 ease-linear">
      <div className="w-4/12">{answer.title}</div>
      <div className="w-1/12">{answer.order}</div>
      <div className="w-5/12 justify-around flex">
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

export default ReorderAnswer;

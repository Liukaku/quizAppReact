import React from "react";
import { Answer, Question, QuestionType } from "./types";
import MultiChoice from "./addAnswerTypes/multiChoice";
import SingleChoice from "./addAnswerTypes/singleChoice";
import OrderType from "./addAnswerTypes/orderType";

type Props = {
  type: QuestionType | "";
  currentAnswers: Array<Answer>;
  updateAnswers: Function;
};

const AddAnswerSection = ({ type, currentAnswers, updateAnswers }: Props) => {
  switch (type) {
    case "MULTI_CHOICE":
      return (
        <MultiChoice
          currentAnswers={currentAnswers}
          sendAnswersToParent={updateAnswers}
        />
      );
    case "SINGLE_CHOICE":
      return (
        <SingleChoice
          currentAnswers={currentAnswers}
          sendAnswersToParent={updateAnswers}
        />
      );
    case "ORDER":
      return (
        <OrderType
          currentAnswers={currentAnswers}
          sendAnswersToParent={updateAnswers}
        />
      );

    default:
      return (
        <div className=" w-full text-center">Please select an answer type</div>
      );
  }
};

export default AddAnswerSection;

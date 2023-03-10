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
    case "MULTI-CHOICE":
      return <MultiChoice />;
    case "SINGLE-CHOICE":
      return (
        <SingleChoice
          currentAnswers={currentAnswers}
          sendAnswersToParent={updateAnswers}
        />
      );
    case "ORDER":
      return <OrderType />;

    default:
      return <div className=" w-full">Default</div>;
  }
};

export default AddAnswerSection;

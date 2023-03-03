import React from "react";
import { Question, QuestionType } from "./types";
import MultiChoice from "./addAnswerTypes/multiChoice";
import SingleChoice from "./addAnswerTypes/singleChoice";
import OrderType from "./addAnswerTypes/orderType";

type Props = {
  type: QuestionType | "";
  updateAnswers: Function;
};

const AddAnswerSection = ({ type, updateAnswers }: Props) => {
  switch (type) {
    case "MULTI-CHOICE":
      return <MultiChoice />;
    case "SINGLE-CHOICE":
      return <SingleChoice sendAnswersToParent={updateAnswers} />;
    case "ORDER":
      return <OrderType />;

    default:
      return <div className=" w-full">Default</div>;
  }
};

export default AddAnswerSection;

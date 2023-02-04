import { Questions } from "@/pages/setup";
import React from "react";
import AddQuestion from "./AddQuestion";

interface Props {
  sectionTitle: string;
  sectionImgUrl: string;
  questions: Questions;
}

const EditSections = ({ sectionTitle, sectionImgUrl, questions }: Props) => {
  return (
    <div className=" w-5/12 mx-auto">
      <h1 className="text-center">{sectionTitle}</h1>
      <AddQuestion />
      {questions.map((question, n) => {
        return <div>{question.questionTitle}</div>;
      })}
    </div>
  );
};

export default EditSections;

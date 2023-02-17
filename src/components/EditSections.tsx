import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import AddQuestion from "./AddQuestion";
import { CTX, Questions, Quiz } from "./types";

interface Props {
  sectionTitle: string;
  sectionImgUrl: string;
  questions: Questions;
  updateMode: Function;
}

const EditSections = ({
  sectionTitle,
  sectionImgUrl,
  questions,
  updateMode,
}: Props) => {
  const [quiz, updateQuiz]: Array<Quiz & Dispatch<SetStateAction<Quiz>>> =
    useContext<any>(CTX);
  const [sectionQuestions, updateQuestions] = useState(questions);

  const saveQuestion = () => {
    const currentQuestions = sectionQuestions;
    currentQuestions.push();
    // updateQuestions();
  };

  return (
    <div className=" w-5/12 mx-auto">
      <h1 className="text-center">{sectionTitle}</h1>
      <AddQuestion SaveQuestion={saveQuestion} />
      {questions.map((question, n) => {
        return <div>{question.questionTitle}</div>;
      })}
      <button className="formButton bg-red-800" onClick={() => updateMode()}>
        Edit Sections
      </button>
    </div>
  );
};

export default EditSections;

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AddQuestion from "./AddQuestion";
import { CTX, Question, Questions, Quiz } from "./types";
import AddAnswerSection from "./AddAnswerSection";
import ListQuestion from "./ListQuestion";

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
  const [sectionQuestions, updateQuestions] = useState(quiz.Questions);

  useEffect(() => {
    if (quiz.Questions.length !== sectionQuestions.length) {
      updateQuestions([...quiz.Questions]);
    }
  }, [sectionQuestions]);

  const saveQuestion = (question: Question) => {
    const currentQuestions = quiz;
    const newQuestion = question;
    console.log(currentQuestions);
    newQuestion.order = currentQuestions.Questions.length;
    console.log(newQuestion);
    currentQuestions.Questions.push(newQuestion);
    updateQuiz({ ...currentQuestions });
  };

  return (
    <div className=" w-5/12 mx-auto">
      <h1 className="text-center">{sectionTitle}</h1>
      <AddQuestion SaveQuestion={saveQuestion} />
      <div>
        {sectionQuestions.map((question: Question, n) => {
          return <ListQuestion question={question} />;
        })}
      </div>
      <button className="formButton bg-red-800" onClick={() => updateMode()}>
        Edit Sections
      </button>
    </div>
  );
};

export default EditSections;

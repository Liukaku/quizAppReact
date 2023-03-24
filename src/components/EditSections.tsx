import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AddQuestion from "./AddQuestion";
import { Answer, CTX, Question, Questions, Quiz } from "./types";
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
  const [questionToEdit, updateQuestionToEdit] = useState<Question | null>(
    null
  );

  useEffect(() => {
    if (quiz.Questions.length !== sectionQuestions.length) {
      updateQuestions([...quiz.Questions]);
    }
  }, [sectionQuestions]);

  const saveQuestion = (question: Question) => {
    const currentQuestions = quiz;
    const newQuestion = question;
    if (questionToEdit == null) {
      newQuestion.order = currentQuestions.Questions.length;
      currentQuestions.Questions.push(newQuestion);
    } else {
      newQuestion.order = questionToEdit.order;
      currentQuestions.Questions[questionToEdit.order] = newQuestion;
      updateQuestionToEdit(null);
    }
    updateQuiz({ ...currentQuestions });
  };

  const editQuestionAnswers = (question: Question) => {
    updateQuestionToEdit(question);
  };

  return (
    <div className="lg:w-5/12 w-8/12 mx-auto">
      <h1 className="text-center">{sectionTitle}</h1>
      <AddQuestion
        SaveQuestion={saveQuestion}
        questionToEdit={questionToEdit}
      />
      <div>
        {sectionQuestions.map((question: Question, n) => {
          return (
            <ListQuestion
              question={question}
              editQuestionAnswers={editQuestionAnswers}
            />
          );
        })}
      </div>
      <button className="formButton bg-red-800" onClick={() => updateMode()}>
        Edit Sections
      </button>
    </div>
  );
};

export default EditSections;

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AddQuestion from "./AddQuestion";
import {
  Answer,
  CTX,
  Question,
  QuestionRecord,
  Questions,
  Quiz,
} from "./types";
import AddAnswerSection from "./AddAnswerSection";
import ListQuestion from "./ListQuestion";

interface Props {
  sectionKey: string;
  sectionTitle: string;
  sectionImgUrl: string;
  questions: Questions;
  updateMode: Function;
}

const EditSections = ({
  sectionKey,
  sectionTitle,
  sectionImgUrl,
  questions,
  updateMode,
}: Props) => {
  const [quiz, updateQuiz]: Array<Quiz & Dispatch<SetStateAction<Quiz>>> =
    useContext<any>(CTX);
  const [sectionQuestions, updateQuestions] = useState<Array<Question>>(
    quiz.Questions[sectionKey] ?? []
  );
  const [questionToEdit, updateQuestionToEdit] = useState<Question | null>(
    null
  );

  useEffect(() => {
    if (quiz.Questions[sectionKey] != null) {
      if (quiz.Questions[sectionKey].length !== sectionQuestions.length) {
        updateQuestions([...quiz.Questions[sectionKey]]);
      }
    }
  }, [sectionQuestions]);

  const saveQuestion = (question: Question) => {
    const currentQuestions = quiz;
    let currentSection = currentQuestions.Questions[sectionKey] ?? [];
    const newQuestion = question;
    if (questionToEdit == null) {
      newQuestion.order = currentSection.length + 1;
      currentSection.push(newQuestion);
      currentQuestions.Questions[sectionKey] = currentSection;
    } else {
      newQuestion.order = questionToEdit.order;
      currentSection[questionToEdit.order] = newQuestion;
      updateQuestionToEdit(null);
    }
    updateQuiz({ ...currentQuestions });
    updateQuestions([...currentSection]);
  };

  const editQuestionAnswers = (question: Question) => {
    updateQuestionToEdit(question);
  };

  const deleteAnswer = (questionNum: number, answerNum: number) => {
    console.log(questionNum, answerNum);
    const currentQuestions = quiz;
    currentQuestions.Questions[sectionKey][questionNum].answer.splice(
      answerNum,
      1
    );
    currentQuestions.Questions[sectionKey][questionNum].answer.map(
      (answer, i) => {
        answer.order = i;
      }
    );
    updateQuiz({ ...currentQuestions });
  };

  const updateAnswerOrder = (questionNum: number, answerNum: number) => {
    const currentQuestions = quiz; // get current state
    const answer =
      currentQuestions.Questions[sectionKey][questionNum].answer[answerNum]; // get answer
    currentQuestions.Questions[sectionKey][questionNum].answer.splice(
      answerNum,
      1
    ); // remove answer
    currentQuestions.Questions[sectionKey][questionNum].answer.splice(
      answerNum - 1,
      0,
      answer
    ); // add answer to new position
    currentQuestions.Questions[sectionKey][questionNum].answer.map(
      (answer, i) => {
        answer.order = i;
      }
    ); // update order
    updateQuiz({ ...currentQuestions }); // update state
  };

  const deleteQuestionAndAnswers = (questionOrder: number) => {
    const currentQuestions = quiz;
    currentQuestions.Questions[sectionKey].splice(questionOrder, 1);
    currentQuestions.Questions[sectionKey].map((question, i) => {
      question.order = i;
    });
    updateQuiz({ ...currentQuestions });
    updateQuestions([...currentQuestions.Questions[sectionKey]]);
  };

  return (
    <div className="lg:w-5/12 w-8/12 mx-auto">
      <h1 className="text-center">{sectionTitle}</h1>
      <AddQuestion
        SaveQuestion={saveQuestion}
        questionToEdit={questionToEdit}
        deleteAnswer={deleteAnswer}
        updateAnswerOrder={updateAnswerOrder}
      />
      <div>
        {sectionQuestions.map((question: Question, n) => {
          return (
            <ListQuestion
              question={question}
              editQuestionAnswers={editQuestionAnswers}
              deleteQuestion={deleteQuestionAndAnswers}
            />
          );
        })}
      </div>
      <button
        className="shadowBox w-full mt-5 py-2 text-zinc-300 rounded-md"
        onClick={() => updateMode()}
      >
        Edit Sections
      </button>
    </div>
  );
};

export default EditSections;

import EditSections from "@/components/EditSections";
import NewSection from "@/components/NewSection";
import {
  EditMode,
  SectionEdit,
  Questions,
  SectionVal,
  CTX,
  Quiz,
} from "@/components/types";
import React, { useEffect, useState } from "react";

function QuizSetup() {
  const [quizState, updateQuiz] = useState<Quiz>({
    Sections: {},
    Questions: {},
  });

  useEffect(() => {
    console.log(quizState);
  }, [quizState]);
  const [editMode, updateMode] = useState<EditMode>("SECTIONS");
  const [sectionEdit, selectSection] = useState<SectionEdit>(null);

  const [questions, updateQuestions] = useState<Questions>({});

  const editSectionBtn = (sectionKey: string) => {
    updateMode("QUESTIONS");
    selectSection(`${sectionKey}`);
  };

  const goBack = () => {
    if (editMode === "QUESTIONS") {
      updateMode("SECTIONS");
    } else {
      updateMode("QUESTIONS");
    }
  };

  return (
    <CTX.Provider value={[quizState, updateQuiz]}>
      <div>
        <NewSection />
        {editMode === "SECTIONS" ? (
          <div>
            {Object.values(quizState.Sections).length > 0 &&
              Object.keys(quizState.Sections).map((sec: string, n: number) => {
                return (
                  <div
                    className="md:w-3/12 w-7/12 mx-auto my-5 aspect-video flex justify-center items-center first:rounded-t-lg last:rounded-b-lg"
                    style={{
                      background: `url(${quizState.Sections[sec].background})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    key={`section${n}`}
                  >
                    <h1
                      onClick={() => editSectionBtn(sec)}
                      className="text-center text-xl border-2 px-5 py-2 backdrop-blur-sm cursor-pointer hover:px-6 hover:py-3 hover:text-2xl ease-in-out duration-500 bg-opacity-30 bg-zinc-700"
                    >
                      Update section
                      <br />
                      <span
                        className=" border-b-0 hover:border-b
                "
                      >
                        {quizState.Sections[sec].name}
                      </span>
                    </h1>
                  </div>
                );
              })}
          </div>
        ) : (
          sectionEdit && (
            <EditSections
              sectionKey={sectionEdit}
              sectionTitle={quizState.Sections[sectionEdit].name}
              sectionImgUrl={quizState.Sections[sectionEdit].name}
              questions={questions}
              updateMode={goBack}
            />
          )
        )}
      </div>
    </CTX.Provider>
  );
}

export default QuizSetup;

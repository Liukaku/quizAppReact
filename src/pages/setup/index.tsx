import EditSections from "@/components/EditSections";
import React, { useState } from "react";

type Sections = Record<string, SectionVal>;
type SectionVal = {
  name: string;
  background: string;
};
export type Questions = Array<Question>;
type Question = {
  questionTitle: string;
  order: number;
  type: "SINGLE-CHOICE" | "MULTI-CHOICE" | "ORDER";
  answer: Array<string>;
};
type EditMode = "SECTIONS" | "QUESTIONS";
type SectionEdit = string | null;

function QuizSetup() {
  const [sections, updateSections] = useState<Sections>({});
  const [editMode, updateMode] = useState<EditMode>("SECTIONS");
  const [sectionEdit, selectSection] = useState<SectionEdit>(null);
  const [sectionTitle, updateTitle] = useState("");
  const [sectionUrl, updateUrl] = useState("");
  const [questions, updateQuestions] = useState<Questions>([]);

  const submitNewSection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentSections = sections;
    currentSections[Object.keys(currentSections).length.toString()] = {
      name: sectionTitle,
      background: sectionUrl,
    };
    updateSections(currentSections);
    updateTitle("");
    updateUrl("");
  };

  const editSectionBtn = (sectionKey: number) => {
    updateMode("QUESTIONS");
    selectSection(`${sectionKey}`);
  };

  return (
    <div>
      <div className="w-8/12 mx-auto">
        <form
          className="w-1/2 mx-auto flex flex-wrap"
          onSubmit={(e) => {
            submitNewSection(e);
          }}
        >
          <label className="w-full" htmlFor="sectionTitle">
            Section Title
          </label>
          <input
            className="w-full"
            id="sectionTitle"
            type={"text"}
            placeholder="Please enter section title here"
            required={true}
            value={sectionTitle}
            onChange={(e) => {
              updateTitle(e.target.value);
            }}
          />
          <label className="w-full" htmlFor="sectionUrl">
            Section Intro Background Image
          </label>
          <input
            className="w-full"
            id="sectionUrl"
            type={"text"}
            placeholder="Please enter image URL here"
            required={true}
            value={sectionUrl}
            onChange={(e) => {
              updateUrl(e.target.value);
            }}
          />

          <button type="submit" className="w-full border border-zinc-700">
            Create New Section
          </button>
        </form>
      </div>
      {editMode === "SECTIONS" ? (
        <div>
          {Object.values(sections).length > 0 &&
            Object.values(sections).map((sec: SectionVal, n: number) => {
              return (
                <div
                  className="w-3/12 mx-auto my-5 aspect-video flex justify-center items-center rounded-sm"
                  style={{
                    background: `url(${sec.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  key={`section${n}`}
                >
                  <h1
                    onClick={() => editSectionBtn(n)}
                    className="text-center text-xl border-2 px-5 py-2 backdrop-blur-sm cursor-pointer hover:px-6 hover:py-3 hover:text-2xl ease-in-out duration-500 bg-opacity-30 bg-zinc-700"
                  >
                    Update section
                    <br />
                    <span
                      className=" border-b-0 hover:border-b
                "
                    >
                      {sec.name}
                    </span>
                  </h1>
                </div>
              );
            })}
        </div>
      ) : (
        sectionEdit && (
          <EditSections
            sectionTitle={sections[sectionEdit].name}
            sectionImgUrl={sections[sectionEdit].name}
            questions={questions}
          />
        )
      )}
    </div>
  );
}

export default QuizSetup;

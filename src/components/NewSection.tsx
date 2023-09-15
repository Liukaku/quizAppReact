import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CTX, Quiz, Sections } from "./types";

const NewSection = () => {
  const [quiz, updateQuiz]: Array<Quiz & Dispatch<SetStateAction<Quiz>>> =
    useContext<any>(CTX);

  const [sections, updateSections] = useState<Sections>(quiz.Sections);
  const [sectionTitle, updateTitle] = useState("");
  const [sectionUrl, updateUrl] = useState("");

  useEffect(() => {
    const currentState = quiz;
    updateQuiz({
      Sections: { ...sections },
      Questions: currentState.Questions,
      owner: currentState.owner,
    });
  }, [sections]);

  const submitNewSection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentSections = sections;
    currentSections[new Date().getTime().toString()] = {
      name: sectionTitle,
      background: sectionUrl,
      order: Object.keys(currentSections).length,
    };
    updateSections(currentSections);
    const currentState = quiz;
    updateQuiz({
      Sections: { ...currentSections },
      Questions: currentState.Questions,
      owner: currentState.owner,
    });
    updateTitle("");
    updateUrl("");

    // post the new section to the database
    fetch("http://localhost:4002/sectionEdit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: sectionTitle,
        background: sectionUrl,
        order: Object.keys(currentSections).length,
        ownerId: quiz.owner,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        updateSections(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="w-8/12 mx-auto">
      {" "}
      <form
        className="md:w-1/2 mx-auto flex flex-wrap"
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
  );
};

export default NewSection;

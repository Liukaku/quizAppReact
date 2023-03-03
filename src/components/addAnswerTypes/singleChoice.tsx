import React, { useEffect, useState } from "react";

type Answer = {
  title: string;
  order: number;
  correct: boolean;
  id: string;
};

type Props = {
  sendAnswersToParent: Function;
};

const SingleChoice = ({ sendAnswersToParent }: Props) => {
  const [answers, updateAnswers] = useState<Array<Answer>>([]);
  const [answerTitle, updateTitle] = useState("");
  const [answerSelection, updationSelection] = useState(0);

  useEffect(() => {
    sendAnswersToParent(answers);
    return () => {};
  }, [answers]);

  const addOption = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentAnswers = answers;
    const answer = {
      title: answerTitle,
      order: currentAnswers.length,
      correct: answerSelection === currentAnswers.length,
      id: `${answerTitle}-${new Date().getTime()}`,
    };

    currentAnswers.push(answer);
  };
  return (
    <div className=" w-full">
      <div className="w-full flex justify-evenly">
        <input
          type="text"
          name=""
          id=""
          placeholder="Answer Title"
          value={answerTitle}
          onChange={(e) => {
            updateTitle(e.target.value);
          }}
        />
        <div>
          <label htmlFor={`${answerTitle}-${new Date().getTime()}`}>
            Correct Answer?
          </label>
          <input
            type="radio"
            name="singleChoice"
            id={`${answerTitle}-${new Date().getTime()}`}
          />
        </div>
        <button onClick={(e) => addOption(e)}>Create Answer</button>
      </div>
    </div>
  );
};

export default SingleChoice;

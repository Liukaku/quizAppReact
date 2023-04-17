import React, { useEffect, useRef, useState } from "react";
import { Answer } from "../types";

type Props = {
  currentAnswers: Array<Answer>;
  sendAnswersToParent: Function;
};

const OrderType = ({ currentAnswers, sendAnswersToParent }: Props) => {
  const [answers, updateAnswers] = useState<Array<Answer>>(currentAnswers);
  const [answerTitle, updateTitle] = useState("");
  const correctSelectedRef = useRef<HTMLInputElement>(null);
  const [answerSelection, updateSelection] = useState(0);

  useEffect(() => {
    sendAnswersToParent(answers);
    return () => {};
  }, [answers]);

  useEffect(() => {
    updateAnswers(currentAnswers);
    return () => {};
  }, [currentAnswers]);

  const addOption = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentAnswers = answers;
    const answer: Answer = {
      title: answerTitle,
      order: currentAnswers.length + 1,
      correct: correctSelectedRef.current?.checked ? true : false,
      id: `${answerTitle}-${new Date().getTime()}`,
      answerType: "SINGLE_CHOICE",
    };

    if (answer.correct) {
      currentAnswers.forEach((oldAnswer, n) => {
        if (oldAnswer.correct) {
          currentAnswers[n].correct = false;
        }
      });
    }

    currentAnswers.push(answer);
    updateAnswers([...currentAnswers]);
    updateTitle("");
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
        <button onClick={(e) => addOption(e)}>Create Answer</button>
      </div>
    </div>
  );
};

export default OrderType;

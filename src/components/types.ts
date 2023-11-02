import React from "react";

export const CTX = React.createContext<(Quiz & any) | null>(null);

export type Quiz = {
  owner: OwnerDetails;
  Sections: Sections;
  Questions: Questions;
};

export type OwnerDetails = {
  id: number;
  ownerName: string;
  quizName: string;
};

export type Sections = Record<string, SectionVal>;

export type SectionVal = {
  name: string;
  background: string;
  order: number;
};

export type Questions = QuestionRecord;

export type QuestionRecord = Record<string, Array<Question>>;

export type QuestionType = "SINGLE_CHOICE" | "MULTI_CHOICE" | "ORDER";

export type Question = {
  questionTitle: string;
  order: number;
  type: QuestionType;
  answer: Array<Answer>;
  id: number | "null" | null;
};

export type Answer = {
  title: string;
  order: number;
  correct: boolean;
  id: number;
  answerType: QuestionType;
};

export type EditMode = "SECTIONS" | "QUESTIONS" | "LOADING";

export type SectionEdit = string | null;

export interface ServerSideProps {
  base: string;
}

export interface ApiRes {
  message: string;
  newId: number;
  response: {
    owner: string;
    name: string;
  };
}

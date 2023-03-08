import React from "react";

export const CTX = React.createContext<(Quiz & any) | null>(null);

export type Quiz = {
  Sections: Sections;
  Questions: Questions;
};

export type Sections = Record<string, SectionVal>;

export type SectionVal = {
  name: string;
  background: string;
};

export type Questions = Array<Question>;

export type QuestionType = "SINGLE-CHOICE" | "MULTI-CHOICE" | "ORDER";

export type Question = {
  questionTitle: string;
  order: number;
  type: QuestionType;
  answer: Array<Answer>;
};

export type Answer = {
  title: string;
  order: number;
  correct: boolean;
  id: string;
};

export type EditMode = "SECTIONS" | "QUESTIONS";

export type SectionEdit = string | null;

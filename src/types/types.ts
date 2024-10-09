export type Question = {
  question: string;
  answer: Array<string>;
};

export type ThemaContent = {
  // index: number;
  title: string;
  data: Array<Question>;
};

export type Surface = "home" | "training";

export const ModeTypes = {
  default: "default",
  minimum: "minimum",
};
export type ModeType = (typeof ModeTypes)[keyof typeof ModeTypes];

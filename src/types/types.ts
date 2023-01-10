export type Question = {
  question: string;
  answer: Array<string>;
};

export type ThemaContent = {
  index: number;
  title: string;
  data: Array<Question>;
};

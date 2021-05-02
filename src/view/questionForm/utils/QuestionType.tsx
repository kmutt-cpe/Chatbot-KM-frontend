export type QuestionType = {
  question: string;
  answer: string;
  subcategoryId: string;
  categoryId: string;
};

export type ErrorQuestionType = {
  question?: string;
  answer?: string;
  subcategoryId?: string;
  categoryId?: string;
};

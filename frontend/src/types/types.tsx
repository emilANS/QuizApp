export interface Answer {
  content: string;
  edit: boolean;
  id: string;
  questionId: string;
  isCorrect: boolean;
  score: number;
}

export interface QuestionInterface {
  name: string;
  contentQuestion: string;
  answers: Answer[] | [];
  id: string;
}

export interface QuizInterface {
  questions: QuestionInterface[];
  quizName: string;
}

export interface QuizFromBackendInterface {
  questions: QuestionInterface[];
  id: string;
  name: string;
}

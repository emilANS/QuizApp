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

export interface QuestionFromBackendInterface {
  name: string;
  contentQuestion: string;
  answers: AnswerFromBackendInterface[] | [];
  id: string;
}

export interface AnswerFromBackendInterface {
  content: string;
  edit: boolean;
  id: string;
  questionId: string;
  correct: boolean;
  score: number;
}

export interface QuizFromBackendInterface {
  questions: QuestionFromBackendInterface[];
  id: string;
  name: string;
}

export interface individualAnsweredQuestionInterface {
  correctlyAnswered: boolean;
  indexAnswer: number;
}

export interface AnsweredQuestionsInterface {
  contestedAnswers: individualAnsweredQuestionInterface[] | [];
  correctAnswers: number;
  incorrectAnswers: number;
}

import type { QuestionInterface } from "../types/types";

import AnswerItem from "./AnswerItem";

interface QuestionItemProps {
  question: QuestionInterface;
  questionIndex: number;
  addAnswer: (indexQuestion: number) => void;
  changeQuestionContent: (indexQuestion: number, inputTextValue: string) => void;
  removeQuestion: (indexQuestion: number) => void;
  changeAnswerContent: (answerIndex: number, questionIndex: number, newContent: string) => void;
  copyText: (text: string) => void;
  removeAnswer: (questionIndex: number, answerIndex: number) => void;
  makeAnswerCorrect: (questionIndex: number, answerIndex: number) => void;
  makeAnswerIncorrect: (questionIndex: number, answerIndex: number) => void;
  changeScoreOfAnswer: (newScore: number, questionIndex: number, answerIndex: number) => void;
}

export default function QuestionItem({
  question,
  questionIndex,
  addAnswer,
  changeQuestionContent,
  removeQuestion,
  changeAnswerContent,
  copyText,
  removeAnswer,
  makeAnswerCorrect,
  makeAnswerIncorrect,
  changeScoreOfAnswer,
}: QuestionItemProps) {
  return (
    <>
      <div key={question.id}>
        <h2>question {questionIndex + 1}</h2>

        {question.contentQuestion.length === 0 && <h2>You need to write a content for this question!</h2>}

        <h2>Content Question: {question.contentQuestion}</h2>

        <h2>Number of answers {question.answers.length}</h2>

        <button onClick={() => addAnswer(questionIndex)}>+</button>

        <button onClick={() => removeQuestion(questionIndex)}>Remove Question</button>

        <input
          onChange={(event) => changeQuestionContent(questionIndex, event?.target.value)}
          id={`${question.id}-question-content-input`}
          placeholder="What is the question"
        ></input>

        <AnswerItem
          answers={question.answers}
          questionIndex={questionIndex}
          changeAnswerContent={(answerIndex, questionIndex, newContent) => changeAnswerContent(answerIndex, questionIndex, newContent)}
          copyText={(text) => copyText(text)}
          removeAnswer={(questionIndex, answerIndex) => removeAnswer(questionIndex, answerIndex)}
          makeAnswerCorrect={(questionIndex, answerIndex) => makeAnswerCorrect(questionIndex, answerIndex)}
          makeAnswerIncorrect={(questionIndex, answerIndex) => makeAnswerIncorrect(questionIndex, answerIndex)}
          changeScoreOfAnswer={(newScore, questionIndex, answerIndex) => changeScoreOfAnswer(newScore, questionIndex, answerIndex)}
        />

        <hr></hr>
      </div>
    </>
  );
}

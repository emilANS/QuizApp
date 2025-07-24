import type { Answer } from "../types/types";

interface AnswerItemProps {
  answers: Answer[];
  questionIndex: number;
  changeAnswerContent: (answerIndex: number, questionIndex: number, newContent: string) => void;
  copyText: (text: string) => void;
  removeAnswer: (questionIndex: number, answerIndex: number) => void;
  makeAnswerCorrect: (questionIndex: number, answerIndex: number) => void;
  makeAnswerIncorrect: (questionIndex: number, answerIndex: number) => void;
  changeScoreOfAnswer: (newScore: number, questionIndex: number, answerIndex: number) => void;
}

export default function AnswerItem({ answers, questionIndex, changeAnswerContent, copyText, removeAnswer, makeAnswerCorrect, makeAnswerIncorrect, changeScoreOfAnswer }: AnswerItemProps) {
  return (
    <>
      {answers.map((answer, idx) => {
        return (
          <div key={answer.id}>
            <h2>{idx + 1}</h2>

            <h3>{answer.content}</h3>

            {answer.content.length === 0 && <h1>You can't let this answer without content</h1>}

            <h2>Score of this answer: {answer.score}</h2>

            <input defaultValue={10} min={1} max={5000} type="number" onChange={(event) => changeScoreOfAnswer(parseInt(event.target.value), questionIndex, idx)} placeholder="Give a score to this question"></input>

            <input onChange={(event) => changeAnswerContent(idx, questionIndex, event.target.value)} placeholder="Put a content for the answer"></input>

            <button onClick={() => copyText(answer.content)}>Copy content to clipboard</button>

            <button onClick={() => removeAnswer(questionIndex, idx)}>Delete this answer</button>

            {answer.isCorrect ? (
              <div>
                <h2>You indicated this answer as correct</h2>

                <button onClick={() => makeAnswerIncorrect(questionIndex, idx)}>Mark this answer as incorrect</button>
              </div>
            ) : (
              <button onClick={() => makeAnswerCorrect(questionIndex, idx)}>Is this the correct answer</button>
            )}
          </div>
        );
      })}
    </>
  );
}

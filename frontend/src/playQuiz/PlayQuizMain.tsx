import { useEffect, useState } from "react";
import { urlToBackend } from "../repeatedValues/urlToBackend";
import axios from "axios";
import type { QuizFromBackendInterface } from "../types/types";

export function PlayQuizMain() {
  const quizSelected = sessionStorage.getItem("quizSelected");

  const [quiz, setQuiz] = useState<QuizFromBackendInterface | null>(null);

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    axios.get(`${urlToBackend}/quiz/getQuizByName`, { params: { quizName: quizSelected } }).then((res) => {
      setQuiz(res.data);
    });
  }, []);

  function nextAnswer(choosedAnswer: string) {
    
  }

  return (
    <div>
      <h1>Welcome to {quiz?.name}</h1>

      {/* {quiz?.questions.map((question, idx) => {
        return (
          <div key={crypto.randomUUID()}>
            <h3>Question {idx + 1}.</h3>

            <h2>{question.name}</h2>

            <h2>{question.contentQuestion}</h2>

            {{question.answers.map(answer => {
              return(
                <div key={crypto.randomUUID()}>
                  <button>{answer.content}</button>
                </div>
              )
            })}}

              

          </div>
        );
      })} */}

      <h2>{quiz?.questions[progress].contentQuestion}</h2>

      {quiz?.questions[progress].answers.map((answer) => {
        return (
          <div>
            <button onClick={() => nextAnswer(answer.content)}>{answer.content}</button>
          </div>
        );
      })}
    </div>
  );
}

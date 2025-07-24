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

  function nextAnswer(choosedAnswer: string, idxAnswer: number) {
    let isCorrect = checkIfAnswerIsCorrect(idxAnswer);

    console.log(isCorrect);

    // IF progress is less than the answers list length continue incrementing the progress, NOTE: this is for avoid crashing the page
    if (progress + 1 < quiz?.questions[progress].answers.length) {
      setProgress(progress + 1);
    }
  }

  function checkIfAnswerIsCorrect(idxAnswer: number) {
    if (quiz?.questions[progress].answers[idxAnswer].isCorrect) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <h1>Welcome to {quiz?.name}</h1>

      <h2>{quiz?.questions[progress].contentQuestion}</h2>

      {quiz?.questions[progress].answers.map((answer, idxAnswer) => {
        return (
          <div>
            <button onClick={() => nextAnswer(answer.content, idxAnswer)}>{answer.content}</button>
          </div>
        );
      })}
    </div>
  );
}

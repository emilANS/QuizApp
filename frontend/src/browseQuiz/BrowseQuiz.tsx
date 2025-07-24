import axios from "axios";
import { useEffect, useState } from "react";
import { urlToBackend } from "../repeatedValues/urlToBackend";

import type { QuizFromBackendInterface } from "../types/types";

export function BrowseQuiz() {
  const [quizzes, setQuizzes] = useState<QuizFromBackendInterface[] | null>(null);

  useEffect(() => {
    axios
      .get(`${urlToBackend}/quiz/getAllQuizzesNames`)
      .then((res) => {
        if (res.data) {
          setQuizzes(res.data);
        }

        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error when receiving quizzes from backend: ", err);
      });
  }, []);

  console.log(quizzes);

  function playQuiz(quiz: QuizFromBackendInterface) {
    sessionStorage.setItem("quizSelected", quiz.name);

    window.location.pathname = "/browse-quizzes/play-quiz";
  }

  return (
    <div>
      <h1>Browse Quizzes!</h1>

      {quizzes?.map((quiz) => {
        return (
          <div key={crypto.randomUUID()}>
            <h1>{quiz.name}</h1>

            <button onClick={() => playQuiz(quiz)}>Play this quiz!</button>
          </div>
        );
      })}
    </div>
  );
}

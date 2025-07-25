import { useEffect, useState } from "react";
import { urlToBackend } from "../repeatedValues/urlToBackend";
import axios from "axios";
import type { AnsweredQuestionsInterface, QuizFromBackendInterface } from "../types/types";

export function PlayQuizMain() {
  const quizSelected = sessionStorage.getItem("quizSelected");

  const [quiz, setQuiz] = useState<QuizFromBackendInterface | null>(null);

  const [progress, setProgress] = useState<number>(0);

  const [answered, setAnswered] = useState<AnsweredQuestionsInterface>({ contestedAnswers: [], correctAnswers: 0, incorrectAnswers: 0 });

  const [userFinishQuiz, setUserFinishQuiz] = useState<boolean>(false);

  const [calification, setCalification] = useState<number>(0);

  useEffect(() => {
    axios.get(`${urlToBackend}/quiz/getQuizByName`, { params: { quizName: quizSelected } }).then((res) => {
      setQuiz(res.data);
    });
  }, [quizSelected]);

  function nextAnswer(idxAnswer: number) {
    const isCorrect: boolean = checkIfAnswerIsCorrect(idxAnswer);

    const newContestedAnswers = [...answered.contestedAnswers, { correctlyAnswered: isCorrect, indexAnswer: idxAnswer }];

    const newCorrectAnswers = isCorrect ? answered.correctAnswers + 1 : answered.correctAnswers;

    const newIncorrectAnswers = isCorrect ? answered.incorrectAnswers : answered.incorrectAnswers + 1;

    setAnswered({
      contestedAnswers: newContestedAnswers,
      correctAnswers: newCorrectAnswers,
      incorrectAnswers: newIncorrectAnswers,
    });

    // IF progress is less than the answers list length continue incrementing the progress, NOTE: this is for avoid crashing the page
    if (quiz) {
      if (progress + 1 < quiz?.questions.length) {
        setProgress(progress + 1);
      }

      if (progress + 1 === quiz?.questions.length) {
        const totalQuestions = newContestedAnswers.length;
        const calification = (newCorrectAnswers / totalQuestions) * 100;
        setCalification(calification);
        setUserFinishQuiz(true);
      }
    }
  }

  function checkIfAnswerIsCorrect(idxAnswer: number) {
    if (quiz?.questions[progress].answers[idxAnswer].correct) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <h1>Welcome to {quiz?.name}</h1>

      <h2>{quiz?.questions[progress].contentQuestion}</h2>

      {!userFinishQuiz &&
        quiz?.questions[progress].answers.map((answer, idxAnswer) => {
          return (
            <div key={crypto.randomUUID()}>
              <button onClick={() => nextAnswer(idxAnswer)}>{answer.content}</button>
            </div>
          );
        })}

      {userFinishQuiz && (
        <div>
          <h2>You finish the quiz!</h2>
          <h3>Your results are:</h3>

          <h2>Correct answers: {answered.correctAnswers}</h2>
          {answered.incorrectAnswers == 0 ? <h2>You didn't have any incorrect answers Congratulations!</h2> : <h2>Incorrect answers: {answered.incorrectAnswers}</h2>}

          <h1>Your calification: {calification}</h1>
        </div>
      )}
    </div>
  );
}

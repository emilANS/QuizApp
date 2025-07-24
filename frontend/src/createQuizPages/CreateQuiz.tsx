import { useState } from "react";

import type { Answer, QuestionInterface, QuizInterface } from "../types/types.tsx";
import QuestionItem from "../createQuizComponents/QuestionItem.tsx";
import axios from "axios";
import { urlToBackend } from "../repeatedValues/urlToBackend.ts";

export default function CreateQuiz() {
  const [questionsData, setQuestionsData] = useState<QuestionInterface[]>([]);

  const [quiz, setQuiz] = useState<QuizInterface>({ quizName: "", questions: questionsData });

  function addQuestion() {
    setQuestionsData([...questionsData, { name: "", contentQuestion: "", answers: [], id: crypto.randomUUID() }]);
  }

  function changeQuestionContent(indexQuestion: number, inputTextValue: string) {
    setQuestionsData(() => {
      return questionsData.map((question, idx) => {
        let updatedQuestionContent: QuestionInterface = question;

        if (idx === indexQuestion) {
          updatedQuestionContent = { ...question, contentQuestion: inputTextValue };
        }

        return updatedQuestionContent;
      });
    });
  }

  function addAnswer(indexQuestion: number) {
    setQuestionsData((prevState) =>
      prevState.map((obj, idx) => {
        if (idx === indexQuestion) {
          return {
            ...obj,
            answers: [...obj.answers, { content: "", edit: false, id: crypto.randomUUID(), isCorrect: false, score: 10, questionId: questionsData[indexQuestion].id }],
          };
        }
        return obj;
      })
    );
  }

  function removeQuestion(indexQuestion: number) {
    setQuestionsData(questionsData.filter((_, idx) => indexQuestion !== idx));
  }

  function removeAnswer(indexQuestion: number, indexAnswer: number) {
    setQuestionsData((prevState) =>
      prevState.map((question, idx) => {
        let answerData: Answer[] = question.answers;

        if (indexQuestion === idx) {
          answerData = question.answers.filter((_, indexAnswerFilter) => indexAnswerFilter !== indexAnswer);
        }

        return { ...question, answers: answerData };
      })
    );
  }

  function changeAnswerContent(indexAnswer: number, indexQuestion: number, newContent: string) {
    setQuestionsData(() => {
      return questionsData.map((question, idx) => {
        let updatedAnswers: Answer[] = question.answers;

        if (indexQuestion === idx) {
          updatedAnswers = question.answers.map((answer, answerIdx) => {
            if (answerIdx === indexAnswer) {
              return { ...answer, content: newContent, edit: false };
            }

            return answer;
          });
        }

        return { ...question, answers: updatedAnswers, edit: false };
      });
    });
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  function makeAnswerCorrect(questionIndex: number, answerIndex: number) {
    setQuestionsData(() => {
      return questionsData.map((question, indexQuestionMap) => {
        let updatedAnswer: Answer[] = question.answers;
        if (questionIndex === indexQuestionMap) {
          updatedAnswer = updatedAnswer.map((answer, indexAnswerMap) => {
            if (answerIndex === indexAnswerMap) {
              return { ...answer, isCorrect: true };
            }

            return answer;
          });
        }

        return { ...question, answers: updatedAnswer };
      });
    });
  }

  function makeAnswerIncorrect(questionIndex: number, answerIndex: number) {
    setQuestionsData(() => {
      return questionsData.map((question, indexQuestionMap) => {
        let updatedAnswer: Answer[] = question.answers;
        if (questionIndex === indexQuestionMap) {
          updatedAnswer = updatedAnswer.map((answer, indexAnswerMap) => {
            if (answerIndex === indexAnswerMap) {
              return { ...answer, isCorrect: false };
            }

            return answer;
          });
        }

        return { ...question, answers: updatedAnswer };
      });
    });
  }

  function changeScoreOfAnswer(newScore: number, questionIndex: number, answerIndex: number) {
    setQuestionsData(() => {
      return questionsData.map((question, indexQuestionMap) => {
        let updatedAnswer: Answer[] = question.answers;
        if (questionIndex === indexQuestionMap) {
          updatedAnswer = updatedAnswer.map((answer, indexAnswerMap) => {
            if (answerIndex === indexAnswerMap) {
              return { ...answer, score: newScore };
            }

            return answer;
          });
        }

        return { ...question, answers: updatedAnswer };
      });
    });
  }

  function saveQuizToDb() {
    
    setQuiz({ ...quiz, questions: questionsData });
    console.log(quiz);

    axios
      .post(`${urlToBackend}/quiz/createQuiz`, quiz, {
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h1>Create your quiz</h1>

      <input onChange={(e) => setQuiz({ ...quiz, quizName: e.target.value })} placeholder="Title"></input>

      <h1>Number of questions {questionsData.length}</h1>

      <button onClick={addQuestion}>+</button>

      {questionsData.map((question, questionIndex) => {
        return (
          <QuestionItem
            question={question}
            questionIndex={questionIndex}
            addAnswer={addAnswer}
            changeQuestionContent={changeQuestionContent}
            removeQuestion={removeQuestion}
            changeAnswerContent={changeAnswerContent}
            copyText={copyText}
            removeAnswer={removeAnswer}
            makeAnswerCorrect={makeAnswerCorrect}
            makeAnswerIncorrect={makeAnswerIncorrect}
            changeScoreOfAnswer={changeScoreOfAnswer}
          />
        );
      })}

      <button onClick={saveQuizToDb}>Create Quiz!</button>
    </div>
  );
}

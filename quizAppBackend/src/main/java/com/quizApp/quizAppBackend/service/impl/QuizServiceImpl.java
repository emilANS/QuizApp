package com.quizApp.quizAppBackend.service.impl;

import com.quizApp.quizAppBackend.dto.AnswerDTO;
import com.quizApp.quizAppBackend.dto.CreateQuizDTO;
import com.quizApp.quizAppBackend.dto.QuestionDTO;
import com.quizApp.quizAppBackend.dto.QuizNameDTO;
import com.quizApp.quizAppBackend.model.Answer;
import com.quizApp.quizAppBackend.model.Question;
import com.quizApp.quizAppBackend.model.Quiz;
import com.quizApp.quizAppBackend.repository.AnswerRepository;
import com.quizApp.quizAppBackend.repository.QuestionRepository;
import com.quizApp.quizAppBackend.repository.QuizRepository;
import com.quizApp.quizAppBackend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizByName(String quizName) {
        return quizRepository.findByQuizName(quizName);
    }

    public List<QuizNameDTO> getAllQuizzesNames() {
        return quizRepository.findAll().stream()
                .map(quiz -> new QuizNameDTO(quiz.getQuizName()))
                .collect(Collectors.toList());
    }

    public void saveQuiz(CreateQuizDTO quizDTO) {

        Quiz quiz = new Quiz();

        quiz.setQuizName(quizDTO.quizName);

        List<Question> questionsList = new ArrayList<>();

        for (QuestionDTO questionDTO: quizDTO.getQuestions()) {

            Question question = new Question();

            question.setName(questionDTO.getName());
            question.setQuiz(quiz);
            question.setContentQuestion(questionDTO.getContentQuestion());

            List<Answer> answerList = new ArrayList<>();
            for (AnswerDTO answerDTO: questionDTO.answers) {
                Answer answer = new Answer();

                answer.setContent(answerDTO.getContent());
                answer.setQuestion(question);
                answer.setScore(answerDTO.getScore());
                answer.setCorrect(answerDTO.getIsCorrect());

                answerList.add(answer);
            }

            question.setAnswers(answerList);

            questionsList.add(question);
        }

        quiz.setQuestions(questionsList);

        quizRepository.save(quiz);
    }
}

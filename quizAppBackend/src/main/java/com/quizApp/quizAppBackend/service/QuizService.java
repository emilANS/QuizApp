package com.quizApp.quizAppBackend.service;

import com.quizApp.quizAppBackend.dto.CreateQuizDTO;
import com.quizApp.quizAppBackend.dto.QuizNameDTO;
import com.quizApp.quizAppBackend.model.Quiz;

import java.util.List;

public interface QuizService {
    void saveQuiz(CreateQuizDTO dto);
    List<Quiz> getAllQuizzes();
    public List<QuizNameDTO> getAllQuizzesNames();
    public Quiz getQuizByName(String quizName);
}

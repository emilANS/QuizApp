package com.quizApp.quizAppBackend.dto;

import com.quizApp.quizAppBackend.model.Question;

import java.util.ArrayList;
import java.util.List;

public class QuizDTO {
    public Long id;

    public String quizName;

    public List<QuestionDTO> questions = new ArrayList<>();
}

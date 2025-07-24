package com.quizApp.quizAppBackend.dto;

import java.util.ArrayList;
import java.util.List;

public class CreateQuizDTO {
    public String quizName;

    public List<QuestionDTO> questions = new ArrayList<>();

    public String getQuizName() {
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }

}

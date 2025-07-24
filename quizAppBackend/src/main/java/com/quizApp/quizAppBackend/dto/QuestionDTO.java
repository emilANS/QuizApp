package com.quizApp.quizAppBackend.dto;

import com.quizApp.quizAppBackend.model.Quiz;

import java.util.List;

public class QuestionDTO {

    public String id;
    public String name;
    public String contentQuestion;
    public List<AnswerDTO> answers;
    public Quiz quiz;

    public List<AnswerDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerDTO> answers) {
        this.answers = answers;
    }

    public String getContentQuestion() {
        return contentQuestion;
    }

    public void setContentQuestion(String contentQuestion) {
        this.contentQuestion = contentQuestion;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

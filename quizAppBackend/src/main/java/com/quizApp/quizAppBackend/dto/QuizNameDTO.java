package com.quizApp.quizAppBackend.dto;

public class QuizNameDTO {
    private String name;

    public QuizNameDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
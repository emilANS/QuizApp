package com.quizApp.quizAppBackend.repository;

import com.quizApp.quizAppBackend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Quiz findByQuizName(String quizName);
}

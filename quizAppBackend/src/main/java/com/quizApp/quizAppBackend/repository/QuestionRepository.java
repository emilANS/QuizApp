package com.quizApp.quizAppBackend.repository;

import com.quizApp.quizAppBackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}

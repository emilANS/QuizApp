package com.quizApp.quizAppBackend.repository;

import com.quizApp.quizAppBackend.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}

package com.quizApp.quizAppBackend.controller;

import com.quizApp.quizAppBackend.dto.CreateQuizDTO;
import com.quizApp.quizAppBackend.dto.QuizNameDTO;
import com.quizApp.quizAppBackend.model.Quiz;
import com.quizApp.quizAppBackend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/createQuiz")
    public ResponseEntity<String> createQuiz(@RequestBody CreateQuizDTO quiz) {
        quizService.saveQuiz(quiz);

        return ResponseEntity.ok("Quiz saved successfully");
    }

    @GetMapping("/getQuiz")
    public List<Quiz> getQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/getAllQuizzesNames")
    public List<QuizNameDTO> getAllQuizzesNames() {
        return quizService.getAllQuizzesNames();
    }

    @GetMapping("/getQuizByName")
    public Quiz getQuizByName(@RequestParam String quizName) {
        return quizService.getQuizByName(quizName);
    }
}

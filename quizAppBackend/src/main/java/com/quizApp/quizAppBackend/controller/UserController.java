package com.quizApp.quizAppBackend.controller;

import com.quizApp.quizAppBackend.model.User;
import com.quizApp.quizAppBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registerUser")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (userService.verifyRepeatedUsername(user.getUsername()).equals("already_existing_username")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username_already_exists");
        } else {
            userService.saveUser(user);
        }

        return ResponseEntity.ok("user_registered_successfully");
    }

    @PostMapping("/loginUser")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        if (userService.matchCredentialsToLogin(user).equals("user_encountered_ready_to_login")) {
            return ResponseEntity.ok("user_login_success");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("failed_to_login_user_no_credentials_match");
    }
}

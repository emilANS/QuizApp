package com.quizApp.quizAppBackend.service;

import com.quizApp.quizAppBackend.model.User;

public interface UserService {
    User obtainById(Long id);

    String verifyRepeatedUsername(String username);

    void saveUser(User user);

    String matchCredentialsToLogin(User user);
}

package com.quizApp.quizAppBackend.service.impl;

import com.quizApp.quizAppBackend.model.User;
import com.quizApp.quizAppBackend.repository.UserRepository;
import com.quizApp.quizAppBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User obtainById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public String verifyRepeatedUsername(String username) {
        return userRepository.findByUsername(username).isPresent()
                ? "already_existing_username"
                : "no_existing_yet_username";
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public String matchCredentialsToLogin(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent() && userRepository.findByPassword(user.getPassword()).isPresent()) {
            return "user_encountered_ready_to_login";
        }

        return "no_user_encountered_cancelling_login";
    }

}

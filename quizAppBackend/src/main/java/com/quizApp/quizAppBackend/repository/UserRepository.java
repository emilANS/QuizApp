package com.quizApp.quizAppBackend.repository;

import com.quizApp.quizAppBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByPassword(String password);
}

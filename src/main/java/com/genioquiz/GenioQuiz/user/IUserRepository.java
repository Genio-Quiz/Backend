package com.genioquiz.GenioQuiz.user;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<UserModel, UUID> {
	UserModel findByUsername(String username);
    UserModel findById(long id);
    UserModel findByEmail(String email);
    UserModel createUser(UserModel user);
    void deleteUser(UserModel user);
    UserModel updateUser(UserModel user);
    UserModel login(String email, String password);
}

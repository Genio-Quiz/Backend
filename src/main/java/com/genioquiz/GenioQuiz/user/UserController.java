package com.genioquiz.GenioQuiz.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.favre.lib.crypto.bcrypt.BCrypt;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private IUserRepository userRepository;

	@PostMapping("/create")
	public ResponseEntity create(@RequestBody UserModel userModel) {
		var user = this.userRepository.findByUsername(userModel.getUsername());
		if (user.isPresent()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
		}
		
		System.out.println("Hello from Java!");
		var passwordHashred =	BCrypt.withDefaults()
						.hashToString(12, userModel.getPassword().toCharArray());

		userModel.setPassword(passwordHashred);

		var userCreated = this.userRepository.save(userModel);
		return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
	}
	
	@GetMapping("/")
	public ResponseEntity findAll() {
		System.out.println("Hello from Java!");
		var users = this.userRepository.findAll();

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(users);
	}
}
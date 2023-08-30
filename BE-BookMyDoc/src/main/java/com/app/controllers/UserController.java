package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Login;
import com.app.dto.Passwordbasedencryption;
import com.app.dto.SaltValue;
import com.app.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Transactional
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private SaltValue saltval;

	@PostMapping("/login")
	public ResponseEntity<?> loginCheck(@RequestBody Login login) {
		// System.out.println(login.getPassword()); //for password view
		String encryption = Passwordbasedencryption.generateSecurePassword(login.getPassword(), saltval.getSalt());
		login.setPassword(encryption);
		// System.out.println(login.getPassword()); //for printing encrypted password
		return ResponseEntity.ok().body(userService.getLogin(login.getEmail(), login.getPassword()));
	}

	@GetMapping("/getQuestionAnswer")
	public ResponseEntity<?> getQuestionAnswer(@RequestParam("email") String email) {
		return ResponseEntity.status(HttpStatus.FOUND).body(userService.getQuestionAnswer(email));
	}

	@PostMapping(value = "/changePassword/{email}")
	public ResponseEntity<?> changePassword(@PathVariable("email") String email, @RequestBody String password) {

		boolean flag = true;
		try {
			String encryption = Passwordbasedencryption.generateSecurePassword(password, saltval.getSalt());
			flag = userService.changePassword(email, encryption);
		} catch (Exception e) {
			flag = false;
		}
		return ResponseEntity.status(HttpStatus.FOUND).body(flag);
	}

}

package com.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.QuestionAnswer;
import com.app.entities.User;
import com.app.repositories.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	public User getLogin(String email, String password) {
		User user;
		Optional<User> login = userRepo.getLogin(email, password);
		try {
			user = login.get();
		} catch (Exception e) {
			user = null;
		}
		return user;
	}

	public QuestionAnswer getQuestionAnswer(String email) {
		QuestionAnswer qa = new QuestionAnswer();
		qa.setQuestion(userRepo.getQuestion(email)); // here que is Question class variable so it can take id & question
		qa.setAnswer(userRepo.getAnswer(email)); // here it will take only ans
		return qa;
	}

	public boolean changePassword(String email, String pwd) {
		int n = userRepo.changePassword(email, pwd);

		return n == 1;
	}

}

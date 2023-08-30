package com.app.services;

import com.app.dto.QuestionAnswer;
import com.app.entities.User;

public interface UserService {

	User getLogin(String email, String password);

	QuestionAnswer getQuestionAnswer(String email);

	boolean changePassword(String email, String encryption);

}

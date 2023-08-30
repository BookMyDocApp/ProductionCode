package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Login {

	@NotBlank(message = "Email can't be blank")
	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "password can't be blank")
	@Size(min = 8, max = 100)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=]).*$", message = "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.")
	private String password;

}

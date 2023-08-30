package com.app.dto;

import com.app.entities.Questions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuestionAnswer {

	private Questions question;

	private String answer;

}

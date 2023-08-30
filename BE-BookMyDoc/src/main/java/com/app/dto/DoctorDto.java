package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DoctorDto {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String contactNo;
	private String gender;
	private String answer;
	private String qualification;
	private String specialization;
	private String department;
	private String type;
	private String area;
	private String city;
	private String state;
	private int roleId;
	private int questionId;
	private int experience;
	private int imrNo;
	private int pinCode;

}

package com.app.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PatientDto {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String contactNo;
	private String gender;
	private String answer;
	private String area;
	private String city;
	private String state;
	private String bloodGroup;
	private String diabetes;
	private String bloodPressure;
	private int roleId;
	private int questionId;
	private int pinCode;
	private Date birthDate;

}

package com.app.dto;

import java.sql.Date;
import java.sql.Time;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointmentDto {

	private Date date;
	private int doctorId;
	private int patientId;
	private int statusId;
	private Time slot;
}

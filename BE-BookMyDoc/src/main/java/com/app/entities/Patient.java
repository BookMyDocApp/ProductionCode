package com.app.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "patients")
@NoArgsConstructor
@Getter
@Setter
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "patient_id")
	private int patientId;

	@Column
	private Date birthDate;

	@Column(name = "blood_group", length = 50)
	private String bloodGroup;

	@Column(length = 50)
	private String diabetes;

	@Column(name = "blood_pressure", length = 50)
	private String bloodPressure;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User userId;

	public Patient(Date birthdate, String blood_group, String diabetes, String blood_pressure, User user_id) {
		super();
		this.birthDate = birthdate;
		this.bloodGroup = blood_group;
		this.diabetes = diabetes;
		this.bloodPressure = blood_pressure;
		this.userId = user_id;
	}

}

package com.app.entities;

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
@Table(name = "doctors")
//@PrimaryKeyJoinColumn(name="user_id")
@NoArgsConstructor
@Getter
@Setter
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "doctor_id")
	private int doctorId;

	@Column(length = 50)
	private String qualification;

	@Column(length = 50)
	private String specialization;

	@Column(length = 50)
	private String department;

	@Column(length = 50)
	private String type;

	@Column
	private int experience;

	@Column(name = "imr_no")
	private int imrNo;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User userId;

	public Doctor(String qualification, String specialization, String department, String type, int experience,
			int imr_no, User user_id) {
		super();
		this.qualification = qualification;
		this.specialization = specialization;
		this.department = department;
		this.type = type;
		this.experience = experience;
		this.imrNo = imr_no;
		this.userId = user_id;
	}

}

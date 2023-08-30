package com.app.entities;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "appointments")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "app_id")
	private int appointmentId;

	// @JsonFormat(pattern = "YYYY-MM-DD")
	@Column
	private Date date;

	@ManyToOne
	@JoinColumn(name = "status_id")
	private AppointmentStatus statusId;

	@ManyToOne
	@JoinColumn(name = "doctor_id")
	private Doctor doctorId;

	@ManyToOne
	@JoinColumn(name = "patient_id")
	private Patient patientId;

	@Column
	private Time slot;

	@Column
	private byte[] prescription;

	public Appointment(Date date, AppointmentStatus status_id, Doctor doctor_id, Patient patient_id, Time slot,
			byte[] prescription) {
		super();

		this.date = date;
		this.statusId = status_id;
		this.doctorId = doctor_id;
		this.patientId = patient_id;
		this.slot = slot;
		this.prescription = prescription;
	}

	public Appointment(Date date, AppointmentStatus status_id, Doctor doctor_id, Patient patient_id, Time slot) {
		super();
		this.date = date;
		this.statusId = status_id;
		this.doctorId = doctor_id;
		this.patientId = patient_id;
		this.slot = slot;
	}

}

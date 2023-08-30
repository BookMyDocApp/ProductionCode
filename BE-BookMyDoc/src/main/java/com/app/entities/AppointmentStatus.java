package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "appointment_status")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointmentStatus {

	@Id
	@Column(name = "status_id")
	private int statusId;

	@Column(length = 50)
	private String status;

}

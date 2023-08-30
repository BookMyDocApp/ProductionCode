package com.app.entities;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.app.dto.ScheduleID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "schedules")
@IdClass(ScheduleID.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Schedule {

	@Id
	@Column(name = "doctor_id")
	private int doctorId;

	@Id
	private Date date;

	@Column(name = "start_time")
	private Time startTime;

	@Column(name = "end_time")
	private Time endTime;

}

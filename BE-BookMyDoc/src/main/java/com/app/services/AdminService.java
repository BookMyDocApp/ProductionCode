package com.app.services;

import java.util.List;

import com.app.entities.Appointment;

public interface AdminService {

	List<Appointment> cancellationRequestedAppointments();

	boolean approveAppointmentCancellation(int app_id);

	List<Appointment> getAllAppointments();

	void deleteByUId(int uid);

}
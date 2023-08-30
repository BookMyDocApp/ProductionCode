package com.app.services;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDto;
import com.app.dto.PatientDto;
import com.app.entities.Appointment;
import com.app.entities.Patient;

public interface PatientService {

	ApiResponse registerPatient(PatientDto patient);
	
	List<Patient> getAllPatients();

	Patient getPatientByUId(int user_id);

	Patient getPatientByPId(int patient_id);

	Appointment addAppointment(AppointmentDto app);

	List<Appointment> getAppointmentsofPatient(int pid);

	boolean appointmentCancellationRequest(int app_id);

	

}

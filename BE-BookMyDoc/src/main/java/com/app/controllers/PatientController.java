package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentDto;
import com.app.dto.PatientDto;
import com.app.entities.Appointment;
import com.app.entities.Patient;
import com.app.services.PatientService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class PatientController {

	@Autowired
	private PatientService patientService;

	@PostMapping("/registerPatient")
	public ResponseEntity<?> registerNewPatient(@RequestBody PatientDto patient) {
		return ResponseEntity.status(HttpStatus.CREATED).body(patientService.registerPatient(patient));
	}

	@GetMapping("/getAllPatients")
	public ResponseEntity<?> getAllPatients() {
		List<Patient> patients = patientService.getAllPatients();

		if (!patients.isEmpty()) {
			return ResponseEntity.ok(patients);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No patients found");
		}
	}

	@GetMapping("/getPatientByUId")
	public ResponseEntity<?> getPatientByUId(@RequestParam("user_id") int user_id) {
		Patient patient = patientService.getPatientByUId(user_id);

		if (patient != null) {
			return ResponseEntity.ok(patient);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
		}
	}

	@GetMapping("/getPatientByPId")
	public ResponseEntity<?> getPatientByPId(@RequestParam("patient_id") int patient_id) {
		Patient patient = patientService.getPatientByPId(patient_id);

		if (patient != null) {
			return ResponseEntity.ok(patient);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
		}
	}

	@PostMapping("/addAppointment")
	public ResponseEntity<?> addAppointment(@RequestBody AppointmentDto app) {
		Appointment addedAppointment = patientService.addAppointment(app);
		return ResponseEntity.status(HttpStatus.CREATED).body(addedAppointment);
	}

	@GetMapping("/getAppointmentsofPatient")
	public ResponseEntity<?> getAppointmentsofPatient(@RequestParam("patient_id") int pid) {
		List<Appointment> appointments = patientService.getAppointmentsofPatient(pid);

		if (!appointments.isEmpty()) {
			return ResponseEntity.ok(appointments);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No appointments found for the specified patient");
		}
	}

	@GetMapping("/appointmentCancellationRequest")
	public ResponseEntity<?> appointmentCancellationRequest(@RequestParam("app_id") int app_id) {
		boolean cancellationRequested = patientService.appointmentCancellationRequest(app_id);

		if (cancellationRequested) {
			return ResponseEntity.ok("Appointment cancellation requested");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Appointment cancellation request failed");
		}
	}
}

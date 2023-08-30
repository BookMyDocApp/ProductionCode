package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Appointment;
import com.app.services.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Transactional
public class AdminController {

	@Autowired
	private AdminService adminService;

	@GetMapping("/cancellationRequestedAppointments")
	public ResponseEntity<?> cancellationRequestedAppointments() {
		List<Appointment> appointments = adminService.cancellationRequestedAppointments();

		if (!appointments.isEmpty()) {
			return ResponseEntity.ok(appointments);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No cancellation requested appointments found");
		}
	}

	@GetMapping("/approveAppointmentCancellation")
	public ResponseEntity<?> approveAppointmentCancellation(@RequestParam("app_id") int app_id) {
		boolean cancellationApproved = adminService.approveAppointmentCancellation(app_id);

		if (cancellationApproved) {
			return ResponseEntity.ok("Appointment cancellation approved");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Appointment cancellation approval failed");
		}
	}

	@GetMapping("/getAllAppointments")
	public ResponseEntity<?> getAllAppointments() {
		List<Appointment> appointments = adminService.getAllAppointments();

		if (!appointments.isEmpty()) {
			return ResponseEntity.ok(appointments);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No appointments found");
		}
	}

	@DeleteMapping("/deleteByUId")
	public void deleteByUId(@RequestParam("user_id") int uid) {
		//adminService.deleteByUId(uid);
		adminService.deleteByUId(uid);
	}

}

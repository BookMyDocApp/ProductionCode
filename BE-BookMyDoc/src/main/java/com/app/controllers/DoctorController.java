package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.DoctorDto;
import com.app.dto.SlotSchedule;
import com.app.entities.Appointment;
import com.app.entities.Doctor;
import com.app.entities.Schedule;
import com.app.services.DoctorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Transactional
public class DoctorController {

	@Autowired
	private DoctorService doctorService;

	@PostMapping("/registerDoctor")
	public ResponseEntity<?> registerDoctor(@RequestBody DoctorDto doc) {

		Doctor registeredDoctor = doctorService.register(doc);
		if (registeredDoctor != null)
			return ResponseEntity.status(HttpStatus.CREATED).body(registeredDoctor);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Doctor registeration failed..!!");

	}

	@GetMapping("/getAllDoctors")
	public ResponseEntity<?> getAllDoctors() {

		List<Doctor> doctors = doctorService.getAllDoctors();
		if (!doctors.isEmpty())
			return ResponseEntity.ok(doctors);
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found..!!");

	}

	@GetMapping("/getDoctorByUId")
	public ResponseEntity<?> getDoctorByUId(@RequestParam("user_id") int user_id) {
		Doctor doctor = doctorService.getDoctorByUId(user_id);

		if (doctor != null) {
			return ResponseEntity.ok(doctor);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found..!!");
		}
	}

	@GetMapping("/getDoctorByDId")
	public ResponseEntity<?> getDoctorByDId(@RequestParam("doctor_id") int doctor_id) {
		Doctor doctor = doctorService.getDoctorByDId(doctor_id);

		if (doctor != null) {
			return ResponseEntity.ok(doctor);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found..!!");
		}
	}

	@GetMapping("/getDoctorsByDept")
	public ResponseEntity<?> getDoctorsByDept(@RequestParam("department") String dept) {
		List<Doctor> doctors = doctorService.getDoctorsByDept(dept);

		if (!doctors.isEmpty()) {
			return ResponseEntity.ok(doctors);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No doctors found in the specified department");
		}
	}

	@PostMapping("/addSchedule")
	public ResponseEntity<?> addSchedule(@RequestBody Schedule sch) {
		try {
			Schedule addedSchedule = doctorService.addSchedule(sch);
			return ResponseEntity.status(HttpStatus.CREATED).body(addedSchedule);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Schedule addition failed");
		}
	}

	@GetMapping("/getAllDepartments")
	public ResponseEntity<?> getDepartments() {
		List<String> departments = doctorService.getDepartments();

		if (!departments.isEmpty()) {
			return ResponseEntity.ok(departments);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No departments found");
		}
	}

	@GetMapping("/getSchedule")
	public ResponseEntity<?> getSchedule(@RequestParam("doctor_id") int did) {
		List<SlotSchedule> schedule = doctorService.getSchedule(did);

		if (!schedule.isEmpty()) {
			return ResponseEntity.ok(schedule);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No schedule found for the specified doctor");
		}
	}

	@GetMapping("/getAppointmentsofDoctor")
	public ResponseEntity<?> getAppointmentsofDoctor(@RequestParam("doctor_id") int did) {
		List<Appointment> appointments = doctorService.getAppointmentsofDoctor(did);

		if (!appointments.isEmpty()) {
			return ResponseEntity.ok(appointments);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No appointments found for the specified doctor");
		}
	}

}

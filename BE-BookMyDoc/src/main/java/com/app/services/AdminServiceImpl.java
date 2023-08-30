package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Appointment;
import com.app.entities.AppointmentStatus;
import com.app.entities.Doctor;
import com.app.entities.Patient;
import com.app.entities.User;
import com.app.repositories.AddressRepository;
import com.app.repositories.AppointmentRepository;
import com.app.repositories.DoctorRepository;
import com.app.repositories.PatientRepository;
import com.app.repositories.UserRepository;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AppointmentRepository appointmentRepo;

	@Autowired
	private DoctorRepository doctorRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AddressRepository addressRepo;

	private PatientRepository patientRepo;

	public List<Appointment> cancellationRequestedAppointments() {
		AppointmentStatus as = new AppointmentStatus(4, "cancellation requested");
		return appointmentRepo.cancellationRequestedAppointments(as);
	}

	public boolean approveAppointmentCancellation(int app_id) {
		AppointmentStatus as = new AppointmentStatus(3, "cancelled");
		boolean flag = false;
		int a = appointmentRepo.approveAppointmentCancellation(app_id, as);

		if (a == 1)
			flag = true;

		return flag;
	}

	public List<Appointment> getAllAppointments() {
		return appointmentRepo.findAll();
	}

	public void deleteByUId(int uid) {

		User user = userRepo.findById(uid).get();
		if (user.getRoleId().getRoleId() == 1) {
			addressRepo.deleteById(user.getAddressId().getAddressId());
		} else if (user.getRoleId().getRoleId() == 2) {
			addressRepo.deleteById(user.getAddressId().getAddressId());
			Doctor doctor = doctorRepo.getDoctorByUId(user);
			doctorRepo.deleteById(doctor.getDoctorId());
		} else if (user.getRoleId().getRoleId() == 3) {
			addressRepo.deleteById(user.getAddressId().getAddressId());
			Patient patient = patientRepo.getPatientByUId(user).get();
			patientRepo.deleteById(patient.getPatientId());
		}
		userRepo.deleteById(uid);
	}

}

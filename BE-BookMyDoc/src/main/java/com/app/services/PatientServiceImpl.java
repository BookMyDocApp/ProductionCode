package com.app.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.AppointmentDto;
import com.app.dto.Passwordbasedencryption;
import com.app.dto.PatientDto;
import com.app.dto.SaltValue;
import com.app.entities.Address;
import com.app.entities.Appointment;
import com.app.entities.AppointmentStatus;
import com.app.entities.Doctor;
import com.app.entities.Patient;
import com.app.entities.Questions;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repositories.AddressRepository;
import com.app.repositories.AppointmentRepository;
import com.app.repositories.DoctorRepository;
import com.app.repositories.PatientRepository;
import com.app.repositories.QuestionsRepository;
import com.app.repositories.RoleRepository;
import com.app.repositories.UserRepository;

@Service
@Transactional
@SuppressWarnings("unused")
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private QuestionsRepository questionRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AddressRepository addressRepo;

	@Autowired
	private AppointmentRepository appointmentRepo;

	@Autowired
	private DoctorRepository doctorRepo;

	@Autowired
	private SaltValue saltval;

	@Autowired // by type : field level DI
	private ModelMapper mapper;

	public ApiResponse registerPatient(PatientDto patient) {
		Role role = new Role(3, "Patient");

		Questions question = new Questions(patient.getQuestionId());

		Address address = new Address(patient.getArea(), patient.getCity(), patient.getState(), patient.getPinCode());
		addressRepo.save(address);

		String encryption = Passwordbasedencryption.generateSecurePassword(patient.getPassword(), saltval.getSalt());

		User user = new User(patient.getFirstName(), patient.getLastName(), patient.getEmail(), encryption,
				patient.getContactNo(), patient.getGender(), patient.getAnswer(), address, role, question);
		userRepo.save(user);

		Patient newPatient = new Patient(patient.getBirthDate(), patient.getBloodGroup(), patient.getDiabetes(),
				patient.getBloodPressure(), user);
		patientRepo.save(newPatient);

		return new ApiResponse("new patient added");
	}

	public List<Patient> getAllPatients() {
		return patientRepo.findAll();
	}

	public Patient getPatientByUId(int user_id) {
		User user = userRepo.findById(user_id).orElseThrow(() -> new ResourceNotFoundException("Invalid User Id"));

		return patientRepo.getPatientByUId(user)
				.orElseThrow(() -> new ResourceNotFoundException("Patient not found for the given User"));
	}

	public Patient getPatientByPId(int patient_id) {
		Patient oldPatient2 = patientRepo.findById(patient_id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Patient Id"));
		return oldPatient2;
	}

	public Appointment addAppointment(AppointmentDto app) {
		Doctor doc = doctorRepo.getDoctorByDId(app.getDoctorId());
		Patient pat = getPatientByPId(app.getPatientId());
		AppointmentStatus as = new AppointmentStatus();
		as.setStatusId(app.getStatusId());
		Appointment a = new Appointment(app.getDate(), as, doc, pat, app.getSlot());
		return appointmentRepo.save(a);
	}

	public List<Appointment> getAppointmentsofPatient(int pid) {
		Patient p = getPatientByPId(pid);
		return appointmentRepo.getAppointmentsofPatient(p);
	}

	public boolean appointmentCancellationRequest(int app_id) {
		AppointmentStatus as = new AppointmentStatus(4, "cancellation requested");
		boolean flag = false;
		int a = appointmentRepo.appointmentCancellationRequest(app_id, as);

		if (a == 1)
			flag = true;

		return flag;
	}

}

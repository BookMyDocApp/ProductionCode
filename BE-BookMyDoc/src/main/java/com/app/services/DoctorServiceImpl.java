package com.app.services;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.DoctorDto;
import com.app.dto.Passwordbasedencryption;
import com.app.dto.SaltValue;
import com.app.dto.SlotSchedule;
import com.app.dto.Slots;
import com.app.entities.Address;
import com.app.entities.Appointment;
import com.app.entities.Doctor;
import com.app.entities.Questions;
import com.app.entities.Role;
import com.app.entities.Schedule;
import com.app.entities.User;
import com.app.repositories.AddressRepository;
import com.app.repositories.AppointmentRepository;
import com.app.repositories.DoctorRepository;
import com.app.repositories.QuestionsRepository;
import com.app.repositories.RoleRepository;
import com.app.repositories.ScheduleRepository;
import com.app.repositories.UserRepository;

@Service
@Transactional
@SuppressWarnings("unused")
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private DoctorRepository doctorRrepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private QuestionsRepository questionRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AddressRepository addressRepo;

	@Autowired
	private ScheduleRepository scheduleRepo;

	@Autowired
	private AppointmentRepository appointmentRepo;

	@Autowired
	private SaltValue saltval;

	public Doctor register(DoctorDto doc) {
		Role role = new Role(2, "Doctor");
		Questions que = new Questions(doc.getQuestionId());
		Address add = new Address(doc.getArea(), doc.getCity(), doc.getState(), doc.getPinCode());
		addressRepo.save(add);

		String encryption = Passwordbasedencryption.generateSecurePassword(doc.getPassword(), saltval.getSalt());

		User u = new User(doc.getFirstName(), doc.getLastName(), doc.getEmail(), encryption, doc.getContactNo(),
				doc.getGender(), doc.getAnswer(), add, role, que);
		userRepo.save(u);

		Doctor dr = new Doctor(doc.getQualification(), doc.getSpecialization(), doc.getDepartment(), doc.getType(),
				doc.getExperience(), doc.getImrNo(), u);
		return doctorRrepo.save(dr);
	}

	public List<Doctor> getAllDoctors() {
		return doctorRrepo.findAll();
	}

	public Doctor getDoctorByUId(int user_id) {
		User u = userRepo.findById(user_id).get(); // findById returns optional---use get method to retrieve

		return doctorRrepo.getDoctorByUId(u);
	}

	public Doctor getDoctorByDId(int doctor_id) {
		return doctorRrepo.findById(doctor_id).orElseThrow(() -> new ResourceNotFoundException("Doctor not found for the given DoctorId"));
	}

	public List<Doctor> getDoctorsByDept(String dept) {
		return doctorRrepo.getDoctorsByDept(dept);
	}

	public Schedule addSchedule(Schedule sch) {
		return scheduleRepo.save(sch);
	}

	public List<String> getDepartments() {
		return doctorRrepo.getDepartments();
	}

	public List<SlotSchedule> getSchedule(int did) {
		List<Schedule> list = scheduleRepo.getByDoctorId(did);
		List<SlotSchedule> sl = new ArrayList<>();

		for (Schedule s : list) {
			SlotSchedule ss = new SlotSchedule();
			System.out.println(s.getDate());
			ss.setDate(s.getDate());

			try {
				LocalTime st = s.getStartTime().toLocalTime();
				LocalTime et = s.getEndTime().toLocalTime();
				List<Slots> tl = new ArrayList<>();
				do {
					Slots slot = new Slots();
					slot.setSlotTime(st);
					;
					tl.add(slot);
					st = st.plusMinutes(30);
				} while (!(st.equals(et)));
				ss.setSlots(tl);
				sl.add(ss);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		// changing status if slot is already booked
		Doctor d = doctorRrepo.getDoctorByDId(did);

		List<Appointment> app_list = appointmentRepo.getAppointmentsofDoctor(d);

		for (SlotSchedule ssl : sl) {
			for (Appointment ap : app_list) {
				if (ssl.getDate().equals(ap.getDate())) {

					for (Slots slots : ssl.getSlots()) {
						LocalTime ti = ap.getSlot().toLocalTime();
						if (slots.getSlotTime().equals(ti)) {
							slots.setStatus(0);
						}
					}
				}
			}
		}
		return sl;
	}

	public List<Appointment> getAppointmentsofDoctor(int did) {
		Doctor doc = getDoctorByDId(did);

		return appointmentRepo.getAppointmentsofDoctor(doc);
	}
}

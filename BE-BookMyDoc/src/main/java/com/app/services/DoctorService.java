package com.app.services;

import java.util.List;

import com.app.dto.DoctorDto;
import com.app.dto.SlotSchedule;
import com.app.entities.Appointment;
import com.app.entities.Doctor;
import com.app.entities.Schedule;

public interface DoctorService {

	Doctor register(DoctorDto doc);

	List<Doctor> getAllDoctors();

	Doctor getDoctorByUId(int user_id);

	Doctor getDoctorByDId(int doctor_id);

	List<Doctor> getDoctorsByDept(String dept);

	Schedule addSchedule(Schedule sch);

	List<String> getDepartments();

	List<SlotSchedule> getSchedule(int did);

	List<Appointment> getAppointmentsofDoctor(int did);

}

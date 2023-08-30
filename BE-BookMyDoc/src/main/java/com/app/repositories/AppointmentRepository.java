package com.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.Appointment;
import com.app.entities.AppointmentStatus;
import com.app.entities.Doctor;
import com.app.entities.Patient;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

	@Query("Select a from Appointment a where a.doctorId = :did and a.statusId = 1")
	public List<Appointment> getAppointmentsofDoctor(@Param("did") Doctor did);

	@Query("Select a from Appointment a where a.patientId = :pid ")
	public List<Appointment> getAppointmentsofPatient(@Param("pid") Patient pid);

	// This method is from patient service
	@Modifying
	@Query("update Appointment a set a.statusId= :as where a.appointmentId = :aid")
	public int appointmentCancellationRequest(@Param("aid") int aid, @Param("as") AppointmentStatus as);

	@Query("Select a from Appointment a where a.statusId= :as")
	public List<Appointment> cancellationRequestedAppointments(@Param("as") AppointmentStatus as);

	@Modifying
	@Query("update Appointment a set a.statusId= :as where a.appointmentId = :aid")
	public int approveAppointmentCancellation(@Param("aid") int aid, @Param("as") AppointmentStatus as);
}

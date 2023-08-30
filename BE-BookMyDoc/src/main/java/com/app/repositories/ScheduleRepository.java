package com.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.ScheduleID;
import com.app.entities.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, ScheduleID> {

	@Query("select s from Schedule s where s.doctorId = :did")
	public List<Schedule> getByDoctorId(@Param("did") int did);

}

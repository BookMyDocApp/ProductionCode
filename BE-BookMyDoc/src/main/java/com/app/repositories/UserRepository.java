package com.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.Questions;
import com.app.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	@Query("select u from User u where u.email= :email and u.password= :password")
	public Optional<User> getLogin(@Param("email") String email, @Param("password") String password);

	@Query("select questionId from User u where u.email = :email") // due to many to one relation ship here question																// table details will be lifted
	public Questions getQuestion(@Param("email") String email);

	@Query("select answer from User u where u.email = :email") // only answer from user table lifted here
	public String getAnswer(@Param("email") String email);

	@Modifying
	@Query("update User u set u.password = :pwd where u.email = :email")
	public int changePassword(@Param("email") String email, @Param("pwd") String pwd);
}

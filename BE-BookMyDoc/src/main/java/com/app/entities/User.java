package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
//@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int userId;

	@Column(name = "first_name",length = 50)
	private String firstName;
	
	@Column(name = "last_name",length = 50)
	private String lastName;
	
	@Column(length = 50)
	private String email;
	
	@Column(length = 100)
	private String password;
	
	@Column(length = 50)
	private String gender;
	
	@Column(length = 50)
	private String answer;

	@Column(name = "contact_no",length = 50)
	private String contactNo;

	@OneToOne
	@JoinColumn(name = "address_id")
	private Address addressId;

	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role roleId;

	@ManyToOne
	@JoinColumn(name = "question_id")
	private Questions questionId;

	public User(String fname, String lname, String email, String password, String contact_no, String gender,
			String answer, Address address_id, Role role_id, Questions question_id) {
		super();
		this.firstName = fname;
		this.lastName = lname;
		this.email = email;
		this.password = password;
		this.contactNo = contact_no;
		this.gender = gender;
		this.answer = answer;
		this.addressId = address_id;
		this.roleId = role_id;
		this.questionId = question_id;
	}

}

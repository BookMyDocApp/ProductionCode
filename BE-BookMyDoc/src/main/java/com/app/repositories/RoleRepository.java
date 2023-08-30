package com.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}

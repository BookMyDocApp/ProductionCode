package com.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {

}

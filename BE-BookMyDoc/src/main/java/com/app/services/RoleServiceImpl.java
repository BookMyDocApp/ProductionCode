package com.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.repositories.RoleRepository;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

	@SuppressWarnings("unused")
	@Autowired
	private RoleRepository roleRepo;
}

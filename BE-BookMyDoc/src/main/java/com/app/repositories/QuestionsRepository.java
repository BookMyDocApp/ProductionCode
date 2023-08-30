package com.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Questions;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions, Integer> {

}

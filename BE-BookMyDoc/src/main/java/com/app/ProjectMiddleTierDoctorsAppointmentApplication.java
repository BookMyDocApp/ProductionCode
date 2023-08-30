package com.app;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages ="com.app.*")
public class ProjectMiddleTierDoctorsAppointmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectMiddleTierDoctorsAppointmentApplication.class, args);
	}
	
	@Bean // <bean id , class , scope ...../>
	public ModelMapper myModelMapper() {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		// set property matching convention between DTO n entity : as strict
		return mapper; // config class method rets --> model mapper instance to SC --it will be managed
						// as spring bean by SC
	}
}

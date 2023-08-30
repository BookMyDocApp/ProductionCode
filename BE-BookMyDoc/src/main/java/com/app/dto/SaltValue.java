package com.app.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class SaltValue {
	@Value("${spring.saltvalue}")
	private String salt;

}

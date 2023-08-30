package com.app.dto;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Slots {

	private LocalTime slotTime;

	private int status;

	public Slots() {
		super();
		this.status = 1;
	}

}

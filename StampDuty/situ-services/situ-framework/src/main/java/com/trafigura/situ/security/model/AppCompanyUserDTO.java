package com.trafigura.situ.security.model;

import java.util.List;

import lombok.Data;

@Data
public class AppCompanyUserDTO {
	
	private AppCompanyDTO appCompanyDTO;
	
	private List<com.trafigura.situ.security.model.AppUserDTO> usersList;

}

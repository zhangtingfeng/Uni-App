package com.trafigura.situ.security.model;

import com.googlecode.jmapper.annotations.JMap;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
public class AppRolesDTO {

	@JMap
	private List<AppPrivilegesDTO> privileges;

	@JMap
	private String name;
}

package com.trafigura.situ.security.model;

import com.googlecode.jmapper.annotations.JMap;
import lombok.Data;

import java.util.Collection;

@Data
public class AppPrivilegesDTO {

	@JMap
	private String privilegeRef;

	@JMap
	private String privilegeValue;

	@JMap
	private String privilegeType;

}

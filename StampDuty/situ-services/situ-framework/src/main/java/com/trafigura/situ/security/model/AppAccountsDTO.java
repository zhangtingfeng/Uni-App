package com.trafigura.situ.security.model;

import com.googlecode.jmapper.annotations.JMap;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
public class AppAccountsDTO implements UserDetails {

	@JMap
	private Long userId;

	@JMap
	private String username;

	@JMap
	private String firstName;

	@JMap
	private String lastName;

	@JMap
	private String email;

	@JMap
	private String chineseName;

	@JMap
	private String phoneNumber;

	@JMap
	private boolean accountNonExpired;

	@JMap
	private boolean accountNonLocked;

	@JMap
	private boolean credentialsNonExpired;

	@JMap
	private boolean enabled;

	@JMap
	private List<AppRolesDTO> roles;

	@JMap
	private List<AppCompanyDTO> accountCompanies;

	@JMap
	private List<GrantedAuthority> authorities;


	@Override
	public String getPassword() {
		return "";
	}
}

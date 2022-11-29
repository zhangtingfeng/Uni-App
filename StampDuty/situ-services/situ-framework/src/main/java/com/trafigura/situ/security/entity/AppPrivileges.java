package com.trafigura.situ.security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

/**
 * @author atul.sultania
 *
 */
@Entity
@Table(name="APP_PRIVILEGES")
public class AppPrivileges {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	@Column(name ="PRIVILEGE_REF",unique = true)
	private String privilegeRef  ;
	
	@Column(name ="PRIVILEGE_VALUE")
	private String privilegeValue  ;
	
	@Column(name ="PRIVILEGE_TYPE")
	private String privilegeType;  

	@JsonIgnore
	@ManyToMany(mappedBy = "privileges")
	private Collection<AppRoles> roles;

	public AppPrivileges() {
		super();
	}

	public AppPrivileges(final String privilegeRef) {
		super();
		this.privilegeRef = privilegeRef;
	}

	public Long getId() {
		return id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	

	public String getPrivilegeRef() {
		return privilegeRef;
	}

	public void setPrivilegeRef(String privilegeRef) {
		this.privilegeRef = privilegeRef;
	}

	public String getPrivilegeValue() {
		return privilegeValue;
	}

	public void setPrivilegeValue(String privilegeValue) {
		this.privilegeValue = privilegeValue;
	}

	public String getPrivilegeType() {
		return privilegeType;
	}

	public void setPrivilegeType(String privilegeType) {
		this.privilegeType = privilegeType;
	}

	public Collection<AppRoles> getRoles() {
		return roles;
	}

	public void setRoles(final Collection<AppRoles> roles) {
		this.roles = roles;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((privilegeRef == null) ? 0 : privilegeRef.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AppPrivileges other = (AppPrivileges) obj;
		if (privilegeRef == null) {
			if (other.privilegeRef != null)
				return false;
		} else if (!privilegeRef.equals(other.privilegeRef))
			return false;
		return true;
	}

	@Override
	public String toString() {
		final StringBuilder builder = new StringBuilder();
		builder.append("Privilege [privilegeRef=").append(privilegeRef).append("]").append("[id=").append(id).append("]");
		return builder.toString();
	}
	
}

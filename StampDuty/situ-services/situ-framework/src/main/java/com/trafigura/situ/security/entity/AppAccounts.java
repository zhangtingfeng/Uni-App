package com.trafigura.situ.security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.trafigura.onedesk.domain.Auditable;
import com.trafigura.situ.annotation.ValidEmail;
import com.trafigura.situ.security.model.AccountStatus;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * @author Harish.Krishnamurthy
 *
 */
@Entity
@Table(name="APP_ACCOUNTS")
public class AppAccounts extends Auditable implements UserDetails {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="USER_ID")
	private Long userId;

	@ValidEmail
	@Column(name="USER_NAME",unique = true)
	private String username;

	@JsonIgnore
	@Column(name="ENCRYPTED_PASSWORD")
	private String password;

	@Column(name="FIRST_NAME")
	private String firstName;

	@Column(name="LAST_NAME")
	private String lastName;

	@Column(name="EMAIL_ID")
	private String email;

	@Column(name="CHINESE_NAME")
	private String chineseName;

	@Column(name="PHONE_NUMBER")
	private String phoneNumber;

	@JsonIgnore
	@Column(name="ACCOUNT_NON_EXPIRED")
	private boolean accountNonExpired;

	@JsonIgnore
	@Column(name="ACCOUNT_NON_LOCKED")
	private boolean accountNonLocked;

	@JsonIgnore
	@Column(name="CREDENTIALS_NON_EXPIRED")
	private boolean credentialsNonExpired;

	@Column(name="IS_ENABLED")
	private boolean enabled;

	@Transient
	@JsonInclude
	private String roleString;

	@Transient
	private String tempPassword;

	@Transient
	private AccountStatus accountStatus;

	@Transient
	private String displayModifiedDate;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "APP_ACCOUNTS_ROLES", joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "id"))
	private Collection<AppRoles> roles;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "APP_ACCOUNTS_COMPANY", joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "APP_COMPANY_ID", referencedColumnName = "APP_COMPANY_ID"))
	private List<AppCompany> accountCompanies = new ArrayList<>();

	public AppAccounts() {
		this.accountNonExpired = true;
		this.accountNonLocked = true;
		this.credentialsNonExpired = true;
		this.enabled = true;
	}

	@Override
	public boolean isAccountNonExpired() {
		return accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	@Transient
	private Collection<GrantedAuthority> authorities = Collections.emptyList();

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@JsonIgnore
	public List<GrantedAuthority> createAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<>();
		roles.forEach(role -> {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
			role.getPrivileges().forEach(priv -> {
				authorities.add(new SimpleGrantedAuthority(priv.getPrivilegeRef()));

			});
		});
		return authorities;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	public Collection<AppRoles> getRoles() {
		return roles;
	}

	public void setRoles(Collection<AppRoles> roles) {
		this.roles = roles;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getUsername() {
		return username.toLowerCase();
	}

	public void setUsername(String username) {
		this.username = username.toLowerCase();
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getChineseName() {
		return chineseName;
	}

	public void setChineseName(String chineseName) {
		this.chineseName = chineseName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	/**
	 * Returns the hashcode of the {@code username}.
	 */
	@Override
	public int hashCode() {
		return username.hashCode();
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("Account user id: ").append(userId);
		sb.append("Username: ").append(this.username).append("; ");
		sb.append("Enabled: ").append(this.enabled).append("; ");
		sb.append("FirstName: ").append(firstName).append("; ");
		sb.append("LastName: ").append(lastName)
				.append("; ");
		sb.append("Email: ").append(email).append("; ");
		sb.append("PhoneNumber: ").append(phoneNumber).append("; ");
		sb.append("ChineseName: ").append(chineseName).append("; ");

		if (!authorities.isEmpty()) {
			sb.append("Granted Authorities: ");

			boolean first = true;
			for (GrantedAuthority auth : authorities) {
				if (!first) {
					sb.append(",");
				}
				first = false;

				sb.append(auth);
			}
		}
		else {
			sb.append("Not granted any authorities");
		}

		return sb.toString();
	}

	public List<AppCompany> getAccountCompanies() {
		return accountCompanies != null ? accountCompanies : Collections.emptyList();
	}

	public void setAccountCompanies(List<AppCompany> accountCompanies) {
		this.accountCompanies = accountCompanies;
	}

	public void enhanceGrantedAuthorities(){
		authorities = createAuthorities();
		this.getAccountCompanies();
	}

	public String getRoleString() {
		return roleString;
	}

	public void setRoleString(String roleString) {
		this.roleString = roleString;
	}

	public String getTempPassword() {
		return tempPassword;
	}

	public void setTempPassword(String tempPassword) {
		this.tempPassword = tempPassword;
	}

	public AccountStatus getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(AccountStatus accountStatus) {
		this.accountStatus = accountStatus;
	}

	public String getDisplayModifiedDate() {
		return displayModifiedDate;
	}

	public void setDisplayModifiedDate(String displayModifiedDate) {
		this.displayModifiedDate = displayModifiedDate;
	}
/*public List<CompanyLite> getCompanies() {
		return companies;
	}

	public void setCompanies(List<CompanyLite> companies) {
		this.companies = companies;
	}*/
}

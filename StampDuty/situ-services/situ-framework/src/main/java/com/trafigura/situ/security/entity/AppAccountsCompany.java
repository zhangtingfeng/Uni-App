package com.trafigura.situ.security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


/**
 * @author Harish.Krishnamurthy
 *
 */
@Entity
@Table(name = "APP_ACCOUNTS_COMPANY")
public class AppAccountsCompany {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long accountCompanyid;

	@Column(name = "APP_COMPANY_ID")
	private Long companyId;
	
	@Column(name = "USER_ID")
	private String userId;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="APP_COMPANY_ID",insertable = false, updatable = false)
	private AppCompany appCompany;
	
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="USER_ID",insertable = false, updatable = false)
	private AppAccounts appAccount;
	
	@Transient
	@JsonInclude
	private List<AppAccounts> accounts = new ArrayList<>();

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Long getAccountCompanyid() {
		return accountCompanyid;
	}

	public void setAccountCompanyid(Long accountCompanyid) {
		this.accountCompanyid = accountCompanyid;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public AppCompany getAppCompany() {
		return appCompany;
	}

	public void setAppCompany(AppCompany appCompany) {
		this.appCompany = appCompany;
	}

	public AppAccounts getAppAccount() {
		return appAccount;
	}

	public void setAppAccount(AppAccounts appAccount) {
		this.appAccount = appAccount;
	}

	public List<AppAccounts> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<AppAccounts> accounts) {
		this.accounts = accounts;
	}

	@Override
	public int hashCode() {

		return appCompany.getCompanyCode().hashCode();
	}

	@Override
	public boolean equals(Object arg0) {
		if (!(arg0 instanceof AppAccountsCompany)) {
			return false;
		}
		return this.appCompany.getCompanyCode().equals(((AppAccountsCompany) arg0).getAppCompany().getCompanyCode());
	}
	
}

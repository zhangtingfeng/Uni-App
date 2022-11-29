package com.trafigura.situ.security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RelationTargetAuditMode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author Harish.Krishnamurthy
 */
@Entity
@Table(name = "APP_COMPANY")
public class AppCompany {


    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "APP_COMPANY_ID")
    private Long id;

    @Column(name = "COMPANY_CODE")
    private String companyCode;

    @Column(name = "CHINESE_CP_NAME")
    private String chineseCpName;

    @Column(name = "COMPANY_NAME")
    private String companyName;

    @Column(name = "PRIMARY_EMAIL")
    private String primaryEmail;

    @Column(name = "PRIMARY_PHONE_NUMBER")
    private String primaryPhoneNumber;

    @Column(name = "LE_ENTITY_ID")
    @JsonIgnore
    private String legalEntityId;

    @Column(name = "LE_ACCOUNT_ID")
    private String legalAccountId;

    @OneToOne(mappedBy = "appCompany", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    @NotAudited
    @JsonIgnore
    private AppCompanyImage companyImage;

    @JsonIgnore
    @ManyToMany(mappedBy = "accountCompanies")
	/*
	 * @JoinTable(name = "APP_ACCOUNTS", joinColumns = @JoinColumn(name =
	 * "APP_COMPANY_ID", referencedColumnName = "APP_COMPANY_ID"),
	 * inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName =
	 * "USER_ID"))
	 */
    private Collection<AppAccounts> users=new ArrayList<>();

    public String getLegalEntityId() {
        return legalEntityId;
    }

    public void setLegalEntityId(String legalEntityId) {
        this.legalEntityId = legalEntityId;
    }

    public String getLegalAccountId() {
        return legalAccountId;
    }

    public void setLegalAccountId(String legalAccountId) {
        this.legalAccountId = legalAccountId;
    }



    public AppCompany() {

    }

    public AppCompany(String companyCode) {
        this.companyCode = companyCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }


    public String getChineseCpName() {
        return chineseCpName;
    }

    public void setChineseCpName(String chineseCpName) {
        this.chineseCpName = chineseCpName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPrimaryEmail() {
        return primaryEmail;
    }

    public void setPrimaryEmail(String primaryEmail) {
        this.primaryEmail = primaryEmail;
    }

    public String getPrimaryPhoneNumber() {
        return primaryPhoneNumber;
    }

    public void setPrimaryPhoneNumber(String primaryPhoneNumber) {
        this.primaryPhoneNumber = primaryPhoneNumber;
    }

    public AppCompanyImage getCompanyImage() {
        return companyImage;
    }

    public void setCompanyImage(AppCompanyImage companyImage) {
        this.companyImage = companyImage;
    }

    @Override
    public int hashCode() {

        return companyCode.hashCode();
    }

    @Override
    public boolean equals(Object arg0) {
        if (!(arg0 instanceof AppCompany)) {
            return false;
        }
        return this.companyCode.equals(((AppCompany) arg0).companyCode);
    }

    public Collection<AppAccounts> getUsers() {
        return users;
    }

    public void setUsers(Collection<AppAccounts> users) {
        this.users = users;
    }
}

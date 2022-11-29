package com.trafigura.situ.security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "APP_COMPANY_IMAGES")
public class AppCompanyImage {

	@Id
	@Column(name = "APP_COMPANY_ID")
	private Long companyId;

	@Column(name = "COMPANY_IMAGE")
	@Lob
	private byte[] companyImage;

	@OneToOne(fetch = FetchType.LAZY)
	@MapsId
	@JoinColumn(name = "APP_COMPANY_ID")
	@JsonIgnore
	private AppCompany appCompany;

	@Column(name = "IMAGE_MIME_TYPE")
	private String imageMimeType = "image/png";

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	@JsonIgnore
	public byte[] getCompanyImage() {
		return companyImage;
	}

	@JsonIgnore
	public void setCompanyImage(byte[] companyImage) {
		this.companyImage = companyImage;
	}

	public AppCompany getAppCompany() {
		return appCompany;
	}

	public void setAppCompany(AppCompany appCompany) {
		this.appCompany = appCompany;
	}

	public String getImageMimeType() {
		return imageMimeType;
	}

	public void setImageMimeType(String imageMimeType) {
		this.imageMimeType = imageMimeType;
	}
}

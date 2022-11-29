package com.trafigura.situ.model;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class DocumentInfoVO {
	private Long docID;

	private String docType;

	private String snapshotYear;

	private String snapshotMonth;

	private String groupCompanyCode;

	private String groupCompanyCNName;

	private String fileName;

	private String active;

	private String uploadStatus;

	private String systemMessage;

	private Long messageCount;

	private String createdBy;

	private LocalDateTime createdTimestamp;

}

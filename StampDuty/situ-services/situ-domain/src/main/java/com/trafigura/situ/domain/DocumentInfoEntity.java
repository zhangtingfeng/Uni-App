package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

/**
 * @author Harish.Krishnamurthy
 *
 */
@Entity
@Table(name="DOCUMENT_INFO")
@Data
@EntityListeners(AuditingEntityListener.class)
public class DocumentInfoEntity extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DOC_ID", nullable = false)
	private Long docID;

	@Column(name="DOC_TYPE")
	private String docType;

	@Column(name="SNAPSHOT_YEAR")
	private String snapshotYear;

	@Column(name="SNAPSHOT_MONTH")
	private String snapshotMonth;

	@Column(name="GROUPCOMPANY_CODE")
	private String groupCompanyCode;

	@Column(name = "GROUPCOMPANY_CNNAME")
	private String groupCompanyCNName;

	@Column(name="FILE_NAME")
	private String fileName;

	@Column(name="ACTIVE")
	private String active;

	@Column(name="UPLOAD_STATUS")
	private String uploadStatus;

	@Column(name="MESSAGE_COUNT")
	private Long messageCount;

	@OneToOne(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
	@Fetch(FetchMode.SELECT)
	@Lazy
	@JoinColumn(name = "BODY_ID")
	private DocumentBodyEntity body;

}

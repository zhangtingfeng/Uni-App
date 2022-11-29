package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="ARAP_TO_CPMAPPING", indexes = {@Index(name = "IDX_CPMAPPING_ACCOUNT_CODE", columnList = "ACCOUNT_CODE"), @Index(name = "IDX_CPMAPPING_GC_CODE", columnList = "GROUPCOMPANY_CODE")})
@Data
public class ARAPToCPMappingEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long ID;

    @Column(name="DOC_ID")
    private Long docID;

    @Column(name="GROUPCOMPANY_CODE")
    private String groupCompanyCode;

    @Column(name = "GROUPCOMPANY_CNNAME")
    private String groupCompanyCNName;

    @Column(name="SHEETNAME")
    private String sheetName;

    @Column(name="LINE_NUMBER")
    private Long lineNumber;

    @Column(name = "CP_NAME")
    private String CPName;

    @Column(name = "ACCOUNT_CODE")
    private String accountCode;

    @Column(name = "ACCOUNT_NAME")
    private String accountName;


}

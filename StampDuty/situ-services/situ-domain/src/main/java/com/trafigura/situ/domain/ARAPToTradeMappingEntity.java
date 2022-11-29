package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ARAP_TO_TRADEMAPPING", indexes = {@Index(name = "IDX_TRADEMAPPING_T8", columnList = "T8"), @Index(name = "IDX_TRADEMAPPING_T9", columnList = "T9")})
//@Table(name = "ARAP_TO_TRADEMAPPING")
@Data
public class ARAPToTradeMappingEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long ID;

    @Column(name = "DOC_ID")
    private Long docID;

    @Column(name = "GROUPCOMPANY_CODE")
    private String groupCompanyCode;

    @Column(name = "GROUPCOMPANY_CNNAME")
    private String groupCompanyCNName;

    @Column(name = "SHEETNAME")
    private String sheetName;

    @Column(name = "LINE_NUMBER")
    private Long lineNumber;

    @Column(name = "ACCOUNT_CODE")
    private String accountCode;

    @Column(name = "T8")
    private String t8;

    @Column(name = "T9")
    private String t9;

    @Column(name = "T3")
    private String t3;

}

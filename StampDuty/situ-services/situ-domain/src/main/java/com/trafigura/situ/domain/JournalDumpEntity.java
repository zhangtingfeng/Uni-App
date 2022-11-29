package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "JOURNAL_DUMP")
@Data
public class JournalDumpEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

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

    @Column(name = "PERIOD")
    private String period;

    @Column(name = "BASE_AMOUNT")
    private BigDecimal baseAmount;

    @Column(name = "T3")
    private String t3;

    @Column(name = "T5")
    private String t5;

    @Column(name = "T8")
    private String t8;

    @Column(name = "T9")
    private String t9;

    @Column(name = "CONTRACT_NO")
    private String contractNo;

    @Column(name = "QUOTA_ID")
    private String quotaID;

    @Column(name = "ASSIGNMENT_ID")
    private String assignmentID;

    @Column(name = "DIRECTION")
    private String direction;

    @Column(name = "VAT_EXCLUSIVE_AMOUNT")
    private BigDecimal vatExclusiveAmount;

    @Column(name = "CURRENCY")
    private String Currency;

    @Column(name = "SETTLEMENT_DATE")
    private LocalDate settlementDate;

    @Column(name = "COMMODITY")
    private String commodity;
}
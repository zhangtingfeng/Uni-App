package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class JournalDumpVO {
    private Long id;

    private Long docID;

    private String groupCompanyCode;

    private String groupCompanyCNName;

    private String sheetName;

    private Long lineNumber;

    @JsonProperty(value = "Period")
    private String period;

    @JsonProperty(value = "Base Amount")
    private String baseAmount;

    @JsonProperty(value = "T3  COMMODITY Analysis Code")
    private String t3;

    @JsonProperty(value = "T5  COST CODE Analysis Code")
    private String t5;

    @JsonProperty(value = "T8  DEAL NO. (SALE) Analysis Code")
    private String t8;

    @JsonProperty(value = "T9  PARCEL NO.(PURCHASE) Analysis Code")
    private String t9;

    private String contractNo;

    private String quotaID;

    private String assignmentID;

    private String direction;

    private BigDecimal vatExclusiveAmount;

    private String Currency;

    private LocalDate settlementDate;

    private String commodity;
}

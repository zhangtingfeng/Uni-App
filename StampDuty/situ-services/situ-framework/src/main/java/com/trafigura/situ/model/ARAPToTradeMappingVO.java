package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ARAPToTradeMappingVO {

    private Long ID;

    private Long docID;

    private String groupCompanyCode;

    private String groupCompanyCNName;

    private String sheetName;

    private Long lineNumber;

    @JsonProperty(value = "Account Code")
    private String accountCode;

    @JsonProperty(value = "T8  DEAL NO. (SALE) Analysis Code")
    private String t8;

    @JsonProperty(value = "T9  PARCEL NO.(PURCHASE) Analysis Code")
    private String t9;

    @JsonProperty(value = "T3  COMMODITY Analysis Code")
    private String t3;
}

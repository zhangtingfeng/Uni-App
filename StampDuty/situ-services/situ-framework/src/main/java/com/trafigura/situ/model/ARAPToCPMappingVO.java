package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ARAPToCPMappingVO {

    private Long ID;

    private Long docID;

    private String groupCompanyCode;

    private String groupCompanyCNName;

    private String sheetName;

    private Long lineNumber;

    @JsonProperty(value = "CP Name")
    private String CPName;

    @JsonProperty(value = "Account Code")
    private String accountCode;

    @JsonProperty(value = "Account Name")
    private String accountName;
}

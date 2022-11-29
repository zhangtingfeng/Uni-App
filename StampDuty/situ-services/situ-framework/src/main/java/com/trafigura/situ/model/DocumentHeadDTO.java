package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DocumentHeadDTO {
    @JsonProperty(value = "docType")
    private String docType;

    @JsonProperty(value = "fileName")
    private String fileName;

    @JsonProperty(value = "snapshotYear")
    private String snapshotYear;

    @JsonProperty(value = "snapshotMonth")
    private String snapshotMonth;

    @JsonProperty(value = "GroupCompanyCode")
    private String groupCompanyCode;

    @JsonProperty(value = "GroupCompanyCNName")
    private String groupCompanyCNName;
}

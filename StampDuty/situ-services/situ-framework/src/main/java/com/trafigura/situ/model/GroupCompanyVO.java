package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GroupCompanyVO {
    @JsonProperty(value = "groupCompanyID")
    private Long groupCompanyID;

    @JsonProperty(value = "groupCompanyCode")
    private String groupCompanyCode;

    @JsonProperty(value = "groupCompanyCNName")
    private String groupCompanyCNName;

    @JsonProperty(value = "groupCompanyENName")
    private String groupCompanyENName;

    @JsonProperty(value = "gcStampDutyTemplateID")
    private String gcStampDutyTemplateID;
}

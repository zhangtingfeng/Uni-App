package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GCStampDutyTemplateVO {
    @JsonProperty(value = "gcStampDutyTemplateID")
    private Long gcStampDutyTemplateID;

    @JsonProperty(value = "gcStampDutyTemplateName")
    private String gcStampDutyTemplateName;
}

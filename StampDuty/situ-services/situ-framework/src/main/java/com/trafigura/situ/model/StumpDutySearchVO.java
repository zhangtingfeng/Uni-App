package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class StumpDutySearchVO {
    @JsonProperty(value = "snapshotYear_from")
    private String snapshotYearFrom;

    @JsonProperty(value = "snapshotMonth_from")
    private String snapshotMonthFrom;

    @JsonProperty(value = "snapshotYear_to")
    private String snapshotYearTo;

    @JsonProperty(value = "snapshotMonth_to")
    private String snapshotMonthTo;

    @JsonProperty(value = "groupCompanyCode")
    private String groupCompanyCode;

    @JsonProperty(value = "includeInterCompanyTrade")
    private boolean includeInterCompanyTrade;
}

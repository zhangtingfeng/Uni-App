package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RateConfigurationVO {

    @JsonProperty(value = "ID")
    private Long ID;

    @JsonProperty(value = "TaxableItem")
    private String taxableItem;

    @JsonProperty(value = "Rate")
    private BigDecimal rate;

    @JsonProperty(value = "DisplayCNText")
    private String displayCNText;

    @JsonProperty(value = "ValidFrom")
    private LocalDate validFrom;

    @JsonProperty(value = "ValidTo")
    private LocalDate validTo;

    private String createdBy;

    private LocalDateTime createdTimestamp;

}

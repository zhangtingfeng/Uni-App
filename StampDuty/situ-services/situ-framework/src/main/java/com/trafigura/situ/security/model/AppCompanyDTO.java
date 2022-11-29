package com.trafigura.situ.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.googlecode.jmapper.annotations.JMap;
import lombok.Data;

@Data
public class AppCompanyDTO {

    @JMap
    @JsonIgnore
    private Long id;

    @JMap
    private String companyCode;

    @JMap
    private String chineseCpName;

    @JMap
    private String companyName;

    @JMap
    private String primaryEmail;

    @JMap
    private String primaryPhoneNumber;

    @JMap
    private String legalEntityId;

    @JMap
    private String legalAccountId;

}

package com.trafigura.situ.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class LegalEntityDetailsVO {

    private Long ID;

    private Long docID;

    private String sheetName;

    private Long lineNumber;

    @JsonProperty(value = "客户名称")
    private String LECNName;

    @JsonProperty(value = "客户英文名称")
    private String LEENName;

    @JsonProperty(value = "纳税人识别号")
    private String LETaxID;

    //对方名称获取失败原因
    private String mappingFailMessage;

}

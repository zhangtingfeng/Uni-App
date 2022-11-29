package com.trafigura.situ.model;

import lombok.Data;

@Data
public class SystemMessageVO {
    private Long messageID;

    private Long docID;

    private String sheetName;

    private Long lineNumber;

    private String message;
}

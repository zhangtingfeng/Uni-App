package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="SYSTEM_MESSAGE")
@Data
public class SystemMessageEntity extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MESSAGE_ID", nullable = false)
    private Long messageID;

    @Column(name = "DOC_ID")
    private Long docID;

    @Column(name="SHEETNAME")
    private String sheetName;

    @Column(name = "LINE_NUMBER")
    private Long lineNumber;

    @Column(name = "MESSAGE")
    private String message;
}

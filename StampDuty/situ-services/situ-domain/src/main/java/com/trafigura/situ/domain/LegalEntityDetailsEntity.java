package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "LEGALENTITY_DETAILS", indexes = {@Index(name = "IDX_LEGALENTITY_LE_CNNAME", columnList = "LE_CNNAME")})
@Data
public class LegalEntityDetailsEntity extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long ID;

    @Column(name = "DOC_ID")
    private Long docID;

    @Column(name = "SHEETNAME")
    private String sheetName;

    @Column(name = "LINE_NUMBER")
    private Long lineNumber;

    @Column(name = "LE_CNNAME")
    private String LECNName;

    @Column(name = "LE_ENNAME")
    private String LEENName;

    @Column(name = "LE_TAXID")
    private String LETaxID;
}

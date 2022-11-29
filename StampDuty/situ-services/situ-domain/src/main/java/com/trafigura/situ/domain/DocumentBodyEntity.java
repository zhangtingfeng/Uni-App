package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;


@Entity
@Table(name = "DOCUMENT_BODY")
@Data
public class DocumentBodyEntity extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "DOC_BODY")
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    private byte[] docBody;

    @OneToOne(mappedBy = "body", cascade = {CascadeType.ALL})
    private DocumentInfoEntity documentInfo;
}

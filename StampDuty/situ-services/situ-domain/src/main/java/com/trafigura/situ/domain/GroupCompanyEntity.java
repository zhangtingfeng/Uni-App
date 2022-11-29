package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name="GROUP_COMPANY")
@Audited
@Data
@EntityListeners(AuditingEntityListener.class)
public class GroupCompanyEntity extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GROUPCOMPANY_ID", nullable = false)
    private Long groupCompanyID;

    @Column(name = "GROUPCOMPANY_CODE")
    private String groupCompanyCode;

    @Column(name = "GROUPCOMPANY_CNNAME")
    private String groupCompanyCNName;

    @Column(name = "GROUPCOMPANY_ENNAME")
    private String groupCompanyENName;

    @Column(name = "GC_STAMPDUTY_TEMPLATE_ID")
    private Long gcStampDutyTemplateID;

}

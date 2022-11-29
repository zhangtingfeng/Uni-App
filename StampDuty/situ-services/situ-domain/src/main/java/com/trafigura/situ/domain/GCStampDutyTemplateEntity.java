package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name="GC_STAMP_DUTY_TEMPLATE")
@Data
@EntityListeners(AuditingEntityListener.class)
public class GCStampDutyTemplateEntity extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GC_STAMPDUTY_TEMPLATE_ID", nullable = false)
    private Long gcStampDutyTemplateID;

    @Column(name = "GC_STAMPDUTY_TEMPLATE_NAME")
    private String gcStampDutyTemplateName;

    @Column(name = "GC_STAMPDUTY_TEMPLATE_FILE_NAME")
    private String gcStampDutyTemplateFileName;
}

package com.trafigura.situ.domain;

import com.trafigura.onedesk.domain.Auditable;
import lombok.Data;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "RATE_CONFIGURATION")
@Audited
@Data
public class RateConfigurationEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long ID;

    @Column(name = "TAXABLE_ITEM")
    private String taxableItem;

    @Column(name = "RATE", precision = 19, scale = 6)
    private BigDecimal rate;

    @Column(name = "DISPLAY_CN_TEXT")
    private String displayCNText;

    @Column(name = "VALID_FROM")
    private LocalDate validFrom;

    @Column(name = "VALID_TO")
    private LocalDate validTo;

}

package com.trafigura.situ.repository;

import com.trafigura.situ.domain.GCStampDutyTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GCStampDutyTemplateRepository extends JpaRepository<GCStampDutyTemplateEntity, Long> {
}

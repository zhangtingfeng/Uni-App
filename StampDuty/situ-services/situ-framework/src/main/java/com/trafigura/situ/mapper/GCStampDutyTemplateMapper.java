package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.GCStampDutyTemplateEntity;
import com.trafigura.situ.model.GCStampDutyTemplateVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GCStampDutyTemplateMapper {
    GCStampDutyTemplateVO entityToVO(GCStampDutyTemplateEntity gcStampDutyTemplateEntity);

    GCStampDutyTemplateEntity VOToEntity(GCStampDutyTemplateVO gcStampDutyTemplateVO);
}

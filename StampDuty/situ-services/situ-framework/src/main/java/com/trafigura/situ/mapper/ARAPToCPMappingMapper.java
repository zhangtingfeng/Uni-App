package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.ARAPToCPMappingEntity;
import com.trafigura.situ.model.ARAPToCPMappingVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ARAPToCPMappingMapper {
    ARAPToCPMappingVO entityToVO(ARAPToCPMappingEntity arapToCPMappingEntity);

    ARAPToCPMappingEntity VOToEntity(ARAPToCPMappingVO arapToCPMappingVO);

}

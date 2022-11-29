package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.ARAPToTradeMappingEntity;
import com.trafigura.situ.model.ARAPToTradeMappingVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ARAPToTraderMappingMapper {

    ARAPToTradeMappingVO entityToVO(ARAPToTradeMappingEntity arapToTradeMappingEntity);

    ARAPToTradeMappingEntity VOToEntity(ARAPToTradeMappingVO arapToTradeMappingVO);
}

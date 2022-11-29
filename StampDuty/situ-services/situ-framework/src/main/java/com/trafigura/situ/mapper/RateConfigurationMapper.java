package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.RateConfigurationEntity;
import com.trafigura.situ.model.RateConfigurationVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RateConfigurationMapper {


    RateConfigurationVO entityToVO(RateConfigurationEntity rateConfigurationEntity);

    RateConfigurationEntity VOToEntity(RateConfigurationVO rateConfigurationVO);
}

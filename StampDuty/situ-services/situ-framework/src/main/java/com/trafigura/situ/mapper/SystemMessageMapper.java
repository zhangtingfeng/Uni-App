package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.SystemMessageEntity;
import com.trafigura.situ.model.SystemMessageVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SystemMessageMapper {

    SystemMessageVO entityToVO(SystemMessageEntity systemMessageEntity);

    SystemMessageEntity VOToEntity(SystemMessageVO systemMessageVO);
}

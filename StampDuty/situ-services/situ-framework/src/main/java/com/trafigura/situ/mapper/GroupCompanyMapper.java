package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.GroupCompanyEntity;
import com.trafigura.situ.model.GroupCompanyVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GroupCompanyMapper {
    GroupCompanyVO entityToVO(GroupCompanyEntity groupCompanyEntity);

    GroupCompanyEntity VOToEntity(GroupCompanyVO groupCompanyVO);
}

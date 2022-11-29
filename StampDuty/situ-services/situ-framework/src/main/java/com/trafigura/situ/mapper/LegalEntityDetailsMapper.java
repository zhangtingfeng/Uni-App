package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.LegalEntityDetailsEntity;
import com.trafigura.situ.model.LegalEntityDetailsVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LegalEntityDetailsMapper {


    LegalEntityDetailsVO entityToVO(LegalEntityDetailsEntity legalEntityDetailsEntity);

    LegalEntityDetailsEntity VOToEntity(LegalEntityDetailsVO legalEntityDetailsVO);
}

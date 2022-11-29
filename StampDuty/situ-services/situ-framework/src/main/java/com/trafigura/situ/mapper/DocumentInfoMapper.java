package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.DocumentInfoEntity;
import com.trafigura.situ.model.DocumentInfoVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DocumentInfoMapper {

    DocumentInfoVO entityToVO(DocumentInfoEntity documentInfoEntity);

    DocumentInfoEntity VOToEntity(DocumentInfoVO documentInfoVO);
//    @Mappings({
//            @Mapping(target ="docBody", ignore =true),
//            })
//    DocumentInfoVO entityToVONoBody(DocumentInfoEntity documentInfoEntity);
}

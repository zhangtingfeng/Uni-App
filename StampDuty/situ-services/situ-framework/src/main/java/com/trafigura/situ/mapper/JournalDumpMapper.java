package com.trafigura.situ.mapper;

import com.trafigura.situ.domain.JournalDumpEntity;
import com.trafigura.situ.model.JournalDumpVO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface JournalDumpMapper {

    JournalDumpVO entityToVO(JournalDumpEntity journalDumpEntity);

    JournalDumpEntity VOToEntity(JournalDumpVO journalDumpVO);

}

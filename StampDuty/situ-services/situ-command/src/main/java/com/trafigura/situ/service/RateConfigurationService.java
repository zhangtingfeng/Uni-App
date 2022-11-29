package com.trafigura.situ.service;

import com.trafigura.situ.domain.RateConfigurationEntity;
import com.trafigura.situ.exception.SituException;
import com.trafigura.situ.mapper.RateConfigurationMapper;
import com.trafigura.situ.model.RateConfigurationVO;
import com.trafigura.situ.repository.RateConfigurationRepository;
import com.trafigura.situ.utils.MessageDefine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.List;

@Service
public class RateConfigurationService {
    @Autowired
    RateConfigurationRepository rateConfigurationRepository;
    @Autowired
    RateConfigurationMapper rateConfigurationMapper;

    public RateConfigurationVO saveConfiguration(RateConfigurationVO rateConfigurationVO) {

        Long id = rateConfigurationVO.getID();
        LocalDate validFrom = rateConfigurationVO.getValidFrom();
        if (rateConfigurationVO.getTaxableItem() == null || rateConfigurationVO.getTaxableItem().isBlank()) {
            throw new SituException(MessageFormat.format(MessageDefine.error_isNull, "税目"));
        }
        if (rateConfigurationVO.getRate() == null) {
            throw new SituException(MessageFormat.format(MessageDefine.error_isNull, "税率"));
        }
        if (rateConfigurationVO.getDisplayCNText() == null || rateConfigurationVO.getDisplayCNText().isBlank()) {
            throw new SituException(MessageFormat.format(MessageDefine.error_isNull, "税率（中文）"));
        }
        if (validFrom == null) {
            throw new SituException(MessageFormat.format(MessageDefine.error_isNull, "起效日期"));
        }
        LocalDate validTo = rateConfigurationVO.getValidTo() != null ? rateConfigurationVO.getValidTo() : LocalDate.parse("9999-12-31");

        if (id == null && !CollectionUtils.isEmpty(rateConfigurationRepository.findByValidToIsNull())) {
            throw new SituException(MessageDefine.error_validToIsNull);
        }
        if (validFrom.isAfter(validTo)) {
            throw new SituException(MessageFormat.format(MessageDefine.error_DateReversed, validFrom, validTo));
        }
        List<RateConfigurationEntity> entityListFrom = rateConfigurationRepository.findByValidFromBetween(validFrom, validTo);
        List<RateConfigurationEntity> entityListTo = rateConfigurationRepository.findByValidToBetween(validFrom, validTo);
        if (id != null) {
            entityListFrom.removeIf(e -> e.getID().equals(id));
            entityListTo.removeIf(e -> e.getID().equals(id));
        }

        if (CollectionUtils.isEmpty(entityListFrom) && CollectionUtils.isEmpty(entityListTo)) {
            return rateConfigurationMapper.entityToVO(rateConfigurationRepository.save(rateConfigurationMapper.VOToEntity(rateConfigurationVO)));
        } else {
            throw new SituException(MessageFormat.format(MessageDefine.error_DateDuplicate, validFrom, rateConfigurationVO.getValidTo()));
        }
    }

    public Boolean deleteConfiguration(Long id) {

        try {
            rateConfigurationRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            throw new SituException(MessageFormat.format(MessageDefine.error_RateNotExist, id.toString()));
        }
        return true;
    }
}

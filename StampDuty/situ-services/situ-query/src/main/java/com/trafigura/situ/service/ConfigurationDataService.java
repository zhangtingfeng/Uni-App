package com.trafigura.situ.service;

import com.trafigura.situ.exception.SituException;
import com.trafigura.situ.mapper.RateConfigurationMapper;
import com.trafigura.situ.model.RateConfigurationVO;
import com.trafigura.situ.repository.RateConfigurationRepository;
import com.trafigura.situ.utils.MessageDefine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConfigurationDataService {

    @Autowired
    RateConfigurationRepository rateConfigurationRepository;
    @Autowired
    RateConfigurationMapper rateConfigurationMapper;

    public RateConfigurationVO getRateByID(Long rateConfigurationID) {
        return rateConfigurationMapper.entityToVO(rateConfigurationRepository.findById(rateConfigurationID)
                .orElseThrow(() -> new SituException(MessageFormat.format(MessageDefine.error_RateNotExist, rateConfigurationID))));
    }

    public List<RateConfigurationVO> getRateConfigurationVOInfoList() {
        return rateConfigurationRepository.findAll().stream().map(e -> rateConfigurationMapper.entityToVO(e)).collect(Collectors.toList());
    }


}

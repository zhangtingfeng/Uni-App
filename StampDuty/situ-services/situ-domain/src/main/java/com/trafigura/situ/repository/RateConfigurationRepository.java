package com.trafigura.situ.repository;

import com.trafigura.situ.domain.RateConfigurationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RateConfigurationRepository extends JpaRepository<RateConfigurationEntity, Long> {

    List<RateConfigurationEntity> findByValidFromBetween(LocalDate validFrom, LocalDate validTo);

    List<RateConfigurationEntity> findByValidToBetween(LocalDate validFrom, LocalDate validTo);

    List<RateConfigurationEntity> findByValidToIsNull();

//    @Query(value = "Select r from RateConfigurationEntity as r where r.validFrom <= :actualSettlementDate and (r.validTo is null or r.validTo >= :actualSettlementDate)" )
//    RateConfigurationEntity findRateData(@Param("actualSettlementDate") LocalDate actualSettlementDate);

//    void deleteByRateConfigurationID(Long rateConfigurationID);
}

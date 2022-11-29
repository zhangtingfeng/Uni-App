package com.trafigura.situ.repository;

import com.trafigura.situ.domain.ARAPToCPMappingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
public interface ARAPToCPMappingRepository extends JpaRepository<ARAPToCPMappingEntity, Long> {

    @Transactional
    @Modifying
    void deleteByGroupCompanyCode(String groupCompanyCode);

    //ARAPToCPMappingEntity findByAccountCode(String accountCode);

    List<ARAPToCPMappingEntity> findByGroupCompanyCodeAndAccountCode(String groupCompanyCode, String accountCode);

    ARAPToCPMappingEntity findTopByGroupCompanyCodeAndAccountCode(String groupCompanyCode, String accountCode);
}

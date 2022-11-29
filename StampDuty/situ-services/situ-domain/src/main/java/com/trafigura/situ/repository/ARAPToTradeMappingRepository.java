package com.trafigura.situ.repository;

import com.trafigura.situ.domain.ARAPToTradeMappingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ARAPToTradeMappingRepository extends JpaRepository<ARAPToTradeMappingEntity, Long> {
    @Transactional
    @Modifying
    void deleteByGroupCompanyCode(String groupCompanyCode);

    @Query(nativeQuery = true, value = "Select * from ARAP_TO_TRADEMAPPING where GROUPCOMPANY_CODE=:groupCompanyCode and T8 like CONCAT('%',:t8,'%') and t3=:t3")
    List<ARAPToTradeMappingEntity> searchByT8(@Param("groupCompanyCode") String groupCompanyCode, @Param("t8") String t8, @Param("t3") String t3);


    @Query(nativeQuery = true, value = "Select * from ARAP_TO_TRADEMAPPING where GROUPCOMPANY_CODE=:groupCompanyCode and T9 like CONCAT('%',:t9,'%') and t3=:t3")
    List<ARAPToTradeMappingEntity> searchByT9(@Param("groupCompanyCode") String groupCompanyCode, @Param("t9") String t9, @Param("t3") String t3);

    ARAPToTradeMappingEntity findTopByGroupCompanyCodeAndT3AndT8(String groupCompanyCode, String t3, String t8);

    ARAPToTradeMappingEntity findTopByGroupCompanyCodeAndT3AndT9(String groupCompanyCode, String t3, String t9);

}

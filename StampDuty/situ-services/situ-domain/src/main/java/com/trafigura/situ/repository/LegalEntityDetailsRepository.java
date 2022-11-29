package com.trafigura.situ.repository;

import com.trafigura.situ.domain.LegalEntityDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LegalEntityDetailsRepository extends JpaRepository<LegalEntityDetailsEntity, Long> {
    List<LegalEntityDetailsEntity> findByLECNName(String leCNName);

//    LegalEntityDetailsEntity findByLETaxID(String leTaxID);

//    @Query("Select LETaxID from LegalEntityDetailsEntity where LECNName = :leCNName limit 1")
//    String findTaxIDByLeCNName(@Param("leCNName") String leCNName);
    LegalEntityDetailsEntity findTopByLECNName(String leCNName);
    @Transactional
    @Modifying
    @Query("delete from LegalEntityDetailsEntity e where e.LETaxID in :leTaxIDs")
    void deleteByLETaxID(@Param("leTaxIDs") List<String> leTaxIDList);

}

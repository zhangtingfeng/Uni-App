package com.trafigura.situ.repository;

import com.trafigura.situ.domain.GroupCompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupCompanyRepository extends JpaRepository<GroupCompanyEntity, Long> {
    @Query("Select groupCompanyCNName from GroupCompanyEntity")
    List<String> getGroupCompanyNameList();

//    @Query("Select groupCompanyCNName from GroupCompanyEntity where groupCompanyCode=:groupCompanyCode")
//    String getGroupCompanyNameByCode(@Param("groupCompanyCode") String groupCompanyCode);

    GroupCompanyEntity findByGroupCompanyCode(String groupCompanyCode);
}

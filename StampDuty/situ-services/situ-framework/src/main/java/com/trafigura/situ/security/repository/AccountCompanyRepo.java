package com.trafigura.situ.security.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.trafigura.situ.security.entity.AppAccounts;
import com.trafigura.situ.security.entity.AppCompany;
import com.trafigura.situ.security.entity.AppCompanyImage;

import java.util.Optional;


@Repository(value = "companyRepo")
public interface AccountCompanyRepo extends JpaRepository<AppCompany, Long> {

    @Query("select aci from AppCompanyImage aci where aci.companyId = :appCompanyId")
    public Optional<AppCompanyImage> findAppCompanyImage(@Param("appCompanyId") Long appCompanyId);

}

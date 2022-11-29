package com.trafigura.situ.repository;

import com.trafigura.situ.domain.DocumentInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DocumentInfoRepository extends JpaRepository<DocumentInfoEntity, Long> {

    DocumentInfoEntity findByDocID(Long docID);

    List<DocumentInfoEntity> findByGroupCompanyCodeAndSnapshotYearAndSnapshotMonthAndDocTypeAndActive(String groupCompanyCode, String snapshotYear, String snapshotMonth,String docType,String active);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update DOCUMENT_INFO set ACTIVE=:active where DOC_ID=:docID")
    void updateActiveByDocID(@Param("active") String active, @Param("docID") Long docID);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update DOCUMENT_INFO set UPLOAD_STATUS=:uploadStatus, ACTIVE=:active, MESSAGE_COUNT=:messageCount where DOC_ID=:docID")
    void update(@Param("uploadStatus") String uploadStatus, @Param("active") String active, @Param("messageCount") Long messageCount, @Param("docID") Long docID);

}

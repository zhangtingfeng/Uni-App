package com.trafigura.situ.repository;

import com.trafigura.situ.domain.SystemMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SystemMessageRepository extends JpaRepository<SystemMessageEntity, Long> {

    List<SystemMessageEntity> findByDocID(Long docID);

}

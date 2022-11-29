package com.trafigura.situ.service;

import com.trafigura.situ.domain.DocumentInfoEntity;
import com.trafigura.situ.repository.DocumentInfoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppDownloadDataQryService {
    @Autowired
    DocumentInfoRepository documentInfoRepository;
    private final static Logger logger = LoggerFactory.getLogger(AppDownloadDataQryService.class);
    public DocumentInfoEntity getDocInfoByDocID(Long docID) {
        logger.info("getDocInfoByDocID Start");
        return documentInfoRepository.findByDocID(docID);
    }


}

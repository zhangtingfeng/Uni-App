package com.trafigura.situ.util;

import com.trafigura.situ.domain.DocumentBodyEntity;
import com.trafigura.situ.domain.DocumentInfoEntity;
import com.trafigura.situ.domain.SystemMessageEntity;
import com.trafigura.situ.exception.SituException;
import com.trafigura.situ.model.DocumentHeadDTO;
import com.trafigura.situ.model.DocumentInfoVO;
import com.trafigura.situ.repository.DocumentInfoRepository;
import com.trafigura.situ.repository.SystemMessageRepository;
import com.trafigura.situ.utils.MessageDefine;
import com.trafigura.situ.utils.UploadUtil;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UploadServiceUtil {

    @Autowired
    DocumentInfoRepository documentInfoRepository;
    @Autowired
    SystemMessageRepository systemMessageRepository;

    public SystemMessageEntity createSystemMessage(Long docID, String sheetName, Long lineNumber, String message) {
        SystemMessageEntity systemMessageEntity = new SystemMessageEntity();
        systemMessageEntity.setDocID(docID);
        systemMessageEntity.setSheetName(sheetName);
        systemMessageEntity.setLineNumber(lineNumber);
        systemMessageEntity.setMessage(message);
        return systemMessageEntity;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Long saveExcelFileBody(byte[] body, DocumentHeadDTO documentHeadDTO) {
        DocumentInfoEntity documentInfoEntity = new DocumentInfoEntity();
        documentInfoEntity.setDocType(documentHeadDTO.getDocType());
        documentInfoEntity.setSnapshotYear(documentHeadDTO.getSnapshotYear());
        documentInfoEntity.setSnapshotMonth(documentHeadDTO.getSnapshotMonth());
        documentInfoEntity.setGroupCompanyCode(documentHeadDTO.getGroupCompanyCode());
        documentInfoEntity.setGroupCompanyCNName(documentHeadDTO.getGroupCompanyCNName());
        documentInfoEntity.setFileName(documentHeadDTO.getFileName());
        documentInfoEntity.setActive(MessageDefine.active_No);
        documentInfoEntity.setUploadStatus(MessageDefine.uploadStatus_Fail);
        DocumentBodyEntity documentBodyEntity = new DocumentBodyEntity();
        documentBodyEntity.setDocumentInfo(documentInfoEntity);
        documentBodyEntity.setDocBody(body);
        documentInfoEntity.setBody(documentBodyEntity);

        documentInfoEntity = documentInfoRepository.save(documentInfoEntity);

        return documentInfoEntity.getDocID();
    }

    public DocumentInfoVO updateUploadSuccessResult(DocumentHeadDTO documentHeadDTO, Long docID, boolean setNoActive) {
        DocumentInfoVO retVal = new DocumentInfoVO();
        if (setNoActive) {
            List<DocumentInfoEntity> lastDocumentInfoEntityList =
                    documentInfoRepository.findByGroupCompanyCodeAndSnapshotYearAndSnapshotMonthAndDocTypeAndActive(
                            documentHeadDTO.getGroupCompanyCode(),
                            documentHeadDTO.getSnapshotYear(),
                            documentHeadDTO.getSnapshotMonth(),
                            documentHeadDTO.getDocType(), MessageDefine.active_Yes);
            if (CollectionUtils.isNotEmpty(lastDocumentInfoEntityList)) {
                DocumentInfoEntity lastDocumentInfoEntity = lastDocumentInfoEntityList.get(0);
                documentInfoRepository.updateActiveByDocID(MessageDefine.active_No, lastDocumentInfoEntity.getDocID());
            }
        }
        updateUploadSuccessResult(docID);
        retVal.setDocID(docID);
        retVal.setUploadStatus(MessageDefine.uploadStatus_Success);
        retVal.setSystemMessage(MessageDefine.info_uploadSuccess);
        return retVal;
    }

    public void updateUploadFailResult(List<SystemMessageEntity> systemMessageEntityList, Long docID) {
        long messageCount = systemMessageEntityList.size();
        if (messageCount > UploadUtil.errorLimit) messageCount = UploadUtil.errorLimit;
        systemMessageRepository.saveAll(systemMessageEntityList);
        updateUploadFailResult(messageCount, docID);
        throw new SituException(MessageDefine.error_dataError);
    }

    private void updateUploadSuccessResult(Long docID) {
        updateUploadResult(MessageDefine.uploadStatus_Success, MessageDefine.active_Yes, null, docID);
    }

    private void updateUploadFailResult(Long messageCount, Long docID) {
        updateUploadResult(MessageDefine.uploadStatus_Fail, MessageDefine.active_No, messageCount, docID);
    }

    private void updateUploadResult(String success, String active, Long messageCount, Long docID) {
        documentInfoRepository.update(success, active, messageCount, docID);
    }


}

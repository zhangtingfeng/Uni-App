package com.trafigura.situ.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.trafigura.situ.domain.SystemMessageEntity;
import com.trafigura.situ.exception.ResourceNotFoundException;
import com.trafigura.situ.exception.SituException;
import com.trafigura.situ.mapper.LegalEntityDetailsMapper;
import com.trafigura.situ.model.DocumentHeadDTO;
import com.trafigura.situ.model.DocumentInfoVO;
import com.trafigura.situ.model.LegalEntityDetailsVO;
import com.trafigura.situ.repository.LegalEntityDetailsRepository;
import com.trafigura.situ.util.UploadServiceUtil;
import com.trafigura.situ.utils.MessageDefine;
import com.trafigura.situ.utils.UploadUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UploadLegalEntityDetailsService {
    @Autowired
    UploadServiceUtil uploadServiceUtil;
    @Autowired
    LegalEntityDetailsRepository legalEntityDetailsRepository;
    @Autowired
    LegalEntityDetailsMapper legalEntityDetailsMapper;
    List<SystemMessageEntity> systemMessageList;
    private final static Logger logger = LoggerFactory.getLogger(UploadLegalEntityDetailsService.class);
    public DocumentInfoVO uploadLegalEntityDetails(MultipartFile documentToStore, DocumentHeadDTO documentHeadDTO) throws Exception {
        logger.info("uploadLegalEntityDetails Start");
        DocumentInfoVO retVal = new DocumentInfoVO();

        Long docID = null;
        String sheetName = "";

        try {
            byte[] body = documentToStore.getBytes();
            docID = uploadServiceUtil.saveExcelFileBody(body, documentHeadDTO);
            logger.info("uploadLegalEntityDetails docID: " + docID.toString());
            sheetName = "客户视图";
            systemMessageList = new ArrayList<>();
            List<LegalEntityDetailsVO> legalEntityDetailsVOList = parseExcel(body, docID, sheetName);
            logger.info("uploadLegalEntityDetails read " + sheetName + " Sheet success");
            if (CollectionUtils.isEmpty(systemMessageList)) {
                logger.info("uploadLegalEntityDetails no data error");
                retVal = saveLegalEntityDetails(documentHeadDTO, docID, legalEntityDetailsVOList);
            } else {
                logger.info("uploadLegalEntityDetails found data error");
                uploadServiceUtil.updateUploadFailResult(systemMessageList, docID);
            }
        } catch (IOException ex) {
            logger.info("uploadLegalEntityDetails " + MessageDefine.error_fileIOError);
            throw new SituException(MessageDefine.error_fileIOError);
        } catch (ResourceNotFoundException ex) {
            logger.info("uploadLegalEntityDetails " + MessageFormat.format(MessageDefine.error_sheetNotExist, sheetName));
            throw new SituException(MessageFormat.format(MessageDefine.error_sheetNotExist, sheetName));
        } finally {
            retVal.setDocID(docID);
        }
        return retVal;
    }

    @Transactional
    private DocumentInfoVO saveLegalEntityDetails(DocumentHeadDTO documentHeadDTO, Long docID, List<LegalEntityDetailsVO> legalEntityDetailsVOList) {
        logger.info("saveLegalEntityDetails Start");
        legalEntityDetailsRepository.deleteByLETaxID(legalEntityDetailsVOList.stream().map(LegalEntityDetailsVO::getLETaxID).collect(Collectors.toList()));
        logger.info("saveLegalEntityDetails deleteByLETaxID success");
        legalEntityDetailsRepository.saveAll(legalEntityDetailsVOList.stream().map(e -> legalEntityDetailsMapper.VOToEntity(e)).collect(Collectors.toList()));
        logger.info("saveLegalEntityDetails legalEntityDetailsVOList save success");
        return uploadServiceUtil.updateUploadSuccessResult(documentHeadDTO, docID, false);
    }

    private List<LegalEntityDetailsVO> parseExcel(byte[] body, Long docID, String sheetName) throws Exception {
        logger.info("parseExcel Start");
        XSSFWorkbook workbook;
        workbook = new XSSFWorkbook(new ByteArrayInputStream(body));

        final XSSFSheet dataSheet = workbook.getSheet(sheetName);
        if (dataSheet == null) {
            logger.info("parseExcel " + "Sheet: [" + sheetName + "] not exist.");
            throw new ResourceNotFoundException("Sheet: [" + sheetName + "] not exist.");
        }
        final XSSFRow header = dataSheet.getRow(0);
        final LinkedHashMap<Short, String> fieldColumnMapping = new LinkedHashMap<>();
        for (short i = header.getFirstCellNum(); i < header.getLastCellNum(); i++) {
            final XSSFCell cell = header.getCell(i);
            final String cellVal = cell.getStringCellValue();
            fieldColumnMapping.put(i, cellVal);
        }
        logger.info("parseExcel load excel head");
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        //final ArrayList<LegalEntityDetailsVO> importLists = new ArrayList<>();
        final HashMap<String, LegalEntityDetailsVO> importLists = new HashMap<>();
        final ArrayList<String> dataColumns = new ArrayList<>(Arrays.asList(
                "客户名称",
                "客户英文名称",
                "纳税人识别号"));
        logger.info("parseExcel load excel detail");
        for (int rowNum = Math.max(1, dataSheet.getFirstRowNum()); rowNum <= dataSheet.getLastRowNum(); rowNum++) {
            final XSSFRow rowItem = dataSheet.getRow(rowNum);
            if (rowItem == null) break;
            final HashMap<String, String> json = new HashMap<>();
//            final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MMM-yyyy");
            for (Map.Entry<Short, String> entry : fieldColumnMapping.entrySet()) {
                if (!dataColumns.contains(entry.getValue())) continue;

                final XSSFCell cell = rowItem.getCell(entry.getKey());
                String v;
                if (cell != null) {
                    switch (entry.getValue()) {
                        case "客户名称":
                        case "客户英文名称":
                        case "纳税人识别号":
                            cell.setCellType(Cell.CELL_TYPE_STRING);
                            v = cell.getStringCellValue();
                            break;
                        default:
                            try {
                                v = cell.getRichStringCellValue().getString();
                            } catch (Exception e) {
                                e.printStackTrace();
                                v = "";
                            }
                    }

//                    switch (cell.getCellType()) {
//                        case Cell.CELL_TYPE_STRING:
//                            v = cell.getStringCellValue();
//                            break;
//                        case Cell.CELL_TYPE_NUMERIC:
//                            if (DateUtil.isCellDateFormatted(cell)) {
//                                final Date dateCellValue = cell.getDateCellValue();
//                                v = simpleDateFormat.format(dateCellValue);
//                            } else {
//                                v = BigDecimal.valueOf(cell.getNumericCellValue()).setScale(0, RoundingMode.HALF_UP).toPlainString();
//                            }
//                            break;
//
//                        default:
//                            try {
//                                v = cell.getRichStringCellValue().getString();
//                            } catch (Exception e) {
//                                e.printStackTrace();
//                                v = "";
//                            }
//                    }
                    if (!ObjectUtils.isEmpty(v)) {
                        json.put(entry.getValue(), v);
                    }
                }
            }

            if (json.size() == 0) {
                //continue;
                break;
            }
            final String jsonBody = objectMapper.writeValueAsString(json);
            final LegalEntityDetailsVO vo = objectMapper.readValue(jsonBody, LegalEntityDetailsVO.class);
            vo.setDocID(docID);
            vo.setSheetName(sheetName);
            Long lineNumber = (long) (rowNum + 1);
            vo.setLineNumber(lineNumber);
            if (importLists.get(vo.getLETaxID()) != null) {
                systemMessageList.add(uploadServiceUtil.createSystemMessage(docID, sheetName, lineNumber,
                        "Duplicate tax ID : [" + vo.getLETaxID() + "] , please check the file."));
                if (!CollectionUtils.isEmpty(systemMessageList) && systemMessageList.size() >= UploadUtil.errorLimit) {
                    systemMessageList.add(uploadServiceUtil.createSystemMessage(vo.getDocID(), vo.getSheetName(), null,
                            MessageFormat.format(MessageDefine.error_errorLimit, UploadUtil.errorLimit)));
                    return new ArrayList<>(importLists.values());
                }
            }
            importLists.put(vo.getLETaxID(), vo);
            //importLists.add(vo);
        }
        return new ArrayList<>(importLists.values());
    }
}

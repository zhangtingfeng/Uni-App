package com.trafigura.situ.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.trafigura.situ.domain.SystemMessageEntity;
import com.trafigura.situ.exception.ResourceNotFoundException;
import com.trafigura.situ.exception.SituException;
import com.trafigura.situ.mapper.JournalDumpMapper;
import com.trafigura.situ.model.DocumentHeadDTO;
import com.trafigura.situ.model.DocumentInfoVO;
import com.trafigura.situ.model.JournalDumpVO;
import com.trafigura.situ.repository.JournalDumpRepository;
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
import java.math.BigDecimal;
import java.text.MessageFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class UploadJournalDumpService {
    @Autowired
    UploadServiceUtil uploadServiceUtil;
    @Autowired
    JournalDumpRepository journalDumpRepository;
    @Autowired
    JournalDumpMapper journalDumpMapper;
    List<SystemMessageEntity> systemMessageList;
    private final static Logger logger = LoggerFactory.getLogger(UploadJournalDumpService.class);

    public DocumentInfoVO uploadJournalDump(MultipartFile documentToStore, DocumentHeadDTO documentHeadDTO) throws Exception {
        logger.info("uploadJournalDump Start");
        String sheetName = documentHeadDTO.getSnapshotYear() + documentHeadDTO.getSnapshotMonth();
        logger.info("uploadJournalDump sheetName: " + sheetName);
        DocumentInfoVO retVal = new DocumentInfoVO();
        Long docID = null;
        try {
            byte[] body = documentToStore.getBytes();
            docID = uploadServiceUtil.saveExcelFileBody(body, documentHeadDTO);
            logger.info("uploadJournalDump docID: " + docID.toString());
            systemMessageList = new ArrayList<>();
            List<JournalDumpVO> journalDumpVOList = parseExcel(body, docID, documentHeadDTO, sheetName);
            logger.info("uploadJournalDump read " + sheetName + " Sheet success");
            if (CollectionUtils.isEmpty(systemMessageList)) {
                logger.info("uploadJournalDump no data error");
                retVal = saveJournalDump(documentHeadDTO, docID, journalDumpVOList);
            } else {
                logger.info("uploadJournalDump found data error");
                uploadServiceUtil.updateUploadFailResult(systemMessageList, docID);
            }
        } catch (IOException ex) {
            logger.info("uploadJournalDump " + MessageDefine.error_fileIOError);
            throw new SituException(MessageDefine.error_fileIOError);
        } catch (ResourceNotFoundException ex) {
            logger.info("uploadJournalDump " + MessageFormat.format(MessageDefine.error_sheetNotExist, sheetName));
            throw new SituException(MessageFormat.format(MessageDefine.error_sheetNotExist, sheetName));
        } finally {
            retVal.setDocID(docID);
        }
        return retVal;
    }

    @Transactional
    private DocumentInfoVO saveJournalDump(DocumentHeadDTO documentHeadDTO, Long docID, List<JournalDumpVO> journalDumpVOList) {
        logger.info("saveJournalDump Start");
        String groupCompanyCode = documentHeadDTO.getGroupCompanyCode();
        logger.info("saveJournalDump groupCompanyCode: " + groupCompanyCode);
        String period = documentHeadDTO.getSnapshotYear() + "/0" + documentHeadDTO.getSnapshotMonth();
        logger.info("saveJournalDump period: " + period);
        journalDumpRepository.deleteByGroupCompanyCodeAndPeriod(groupCompanyCode, period);
        logger.info("saveJournalDump deleteByGroupCompanyCodeAndPeriod success");
        journalDumpRepository.saveAll(journalDumpVOList.stream().map(vo -> journalDumpMapper.VOToEntity(vo)).collect(Collectors.toList()));
        logger.info("saveJournalDump journalDumpVOList save success");
        return uploadServiceUtil.updateUploadSuccessResult(documentHeadDTO, docID, true);
    }

    private boolean checkData(JournalDumpVO journalDumpVO, String correctPeriod) {
//        logger.info("checkData Start");
        boolean isDataCorrect = true;
        if (!correctPeriod.equalsIgnoreCase(journalDumpVO.getPeriod())) {
//            logger.info("checkData data error: " + "Row No." + journalDumpVO.getLineNumber() + ": Period [" + journalDumpVO.getPeriod() + "] is not correct.");
            systemMessageList.add(uploadServiceUtil.createSystemMessage(journalDumpVO.getDocID(), journalDumpVO.getSheetName(), journalDumpVO.getLineNumber(),
                    "Row No." + journalDumpVO.getLineNumber() + ": Period [" + journalDumpVO.getPeriod() + "] is not correct."));
            isDataCorrect = false;
            if (systemMessageList.size() >= UploadUtil.errorLimit) {
//                logger.info("checkData over error limit");
                return false;
            }
        }
        try {
            new BigDecimal(journalDumpVO.getBaseAmount());
        } catch (NumberFormatException ex) {
//            logger.info("checkData data error: " + "Row No." + journalDumpVO.getLineNumber() + ": Base Amount [" + journalDumpVO.getBaseAmount() + "] is not number.");
            systemMessageList.add(uploadServiceUtil.createSystemMessage(journalDumpVO.getDocID(), journalDumpVO.getSheetName(), journalDumpVO.getLineNumber(),
                    "Row No." + journalDumpVO.getLineNumber() + ": Base Amount [" + journalDumpVO.getBaseAmount() + "] is not number."));
            isDataCorrect = false;
            if (systemMessageList.size() >= UploadUtil.errorLimit) {
//                logger.info("checkData over error limit");
                return false;
            }
        }
        if (!"I01".equalsIgnoreCase(journalDumpVO.getT5())
                && !"C01".equals(UploadUtil.upperCaseString(journalDumpVO.getT5()))) {
//            logger.info("checkData data error: " + "Row No." + journalDumpVO.getLineNumber() + ": T5 COST CODE Analysis Code  [" + journalDumpVO.getT5() + "] is not 'I01' or 'C01'.");
            systemMessageList.add(uploadServiceUtil.createSystemMessage(journalDumpVO.getDocID(), journalDumpVO.getSheetName(), journalDumpVO.getLineNumber(),
                    "Row No." + journalDumpVO.getLineNumber() + ": T5 COST CODE Analysis Code  [" + journalDumpVO.getT5() + "] is not 'I01' or 'C01'."));
            isDataCorrect = false;
            if (systemMessageList.size() >= UploadUtil.errorLimit) {
//                logger.info("checkData over error limit");
                return false;
            }
        } else if ("I01".equalsIgnoreCase(journalDumpVO.getT5())) {
            if (isNotMatchT8T9(journalDumpVO.getT8())) {
//                logger.info("checkData data error: " + "Row No." + journalDumpVO.getLineNumber() + ": T8 DEAL NO. (SALE) Analysis Code [" + journalDumpVO.getT8() + "] cannot be recognized. ");
                systemMessageList.add(uploadServiceUtil.createSystemMessage(journalDumpVO.getDocID(), journalDumpVO.getSheetName(), journalDumpVO.getLineNumber(),
                        "Row No." + journalDumpVO.getLineNumber() + ": T8 DEAL NO. (SALE) Analysis Code [" + journalDumpVO.getT8() + "] cannot be recognized. "));
                isDataCorrect = false;
                if (systemMessageList.size() >= UploadUtil.errorLimit) {
//                    logger.info("checkData over error limit");
                    return false;
                }
            }
        } else if ("C01".equalsIgnoreCase(journalDumpVO.getT5())) {
            if (isNotMatchT8T9(journalDumpVO.getT9())) {
//                logger.info("checkData data error: " + "Row No." + journalDumpVO.getLineNumber() + ": T9 PARCEL NO. (PURCHASE) Analysis Code [" + journalDumpVO.getT9() + "] cannot be recognized.");
                systemMessageList.add(uploadServiceUtil.createSystemMessage(journalDumpVO.getDocID(), journalDumpVO.getSheetName(), journalDumpVO.getLineNumber(),
                        "Row No." + journalDumpVO.getLineNumber() + ": T9 PARCEL NO. (PURCHASE) Analysis Code [" + journalDumpVO.getT9() + "] cannot be recognized."));
                isDataCorrect = false;
                if (systemMessageList.size() >= UploadUtil.errorLimit) {
//                    logger.info("checkData over error limit");
                    return false;
                }
            }
        }
        return isDataCorrect;
    }

    private boolean isNotMatchT8T9(final String t8t9) {
        logger.info("isNotMatchT8T9 Start");
        String T8T9_PATTERN = "\\d+\\.\\d+|\\d+[SP]\\.\\d+|.+\\.TFS\\d+";
        Pattern pattern;
        Matcher matcher;
        pattern = Pattern.compile(T8T9_PATTERN);
        matcher = pattern.matcher(t8t9);
        return !matcher.matches();
    }

    public List<JournalDumpVO> parseExcel(byte[] body,
                                          Long docID,
                                          DocumentHeadDTO documentHeadDTO,
                                          String sheetName) throws Exception {
        logger.info("parseExcel Start");
        String groupCompanyCode = documentHeadDTO.getGroupCompanyCode();
        logger.info("parseExcel groupCompanyCode: "  + groupCompanyCode);
        String groupCompanyCNName = documentHeadDTO.getGroupCompanyCNName();
        logger.info("parseExcel groupCompanyCNName: "  + groupCompanyCNName);
        String correctPeriod = documentHeadDTO.getSnapshotYear() + "/0" + documentHeadDTO.getSnapshotMonth();
        logger.info("parseExcel correctPeriod: "  + correctPeriod);

        XSSFWorkbook workbook = new XSSFWorkbook(new ByteArrayInputStream(body));
        final XSSFSheet dataSheet = workbook.getSheet(sheetName);
        if (dataSheet == null) {
            logger.info("parseExcel " + "Sheet: [" + sheetName + "] not exist.");
            throw new ResourceNotFoundException("Sheet: [" + sheetName + "] not exist.");
        }
        logger.info("parseExcel load excel head");
        final XSSFRow header = dataSheet.getRow(0);
        final LinkedHashMap<Short, String> fieldColumnMapping = new LinkedHashMap<>();
        for (short i = header.getFirstCellNum(); i < header.getLastCellNum(); i++) {
            final XSSFCell cell = header.getCell(i);
            final String cellVal = cell.getStringCellValue();
            fieldColumnMapping.put(i, cellVal);
        }
        logger.info("parseExcel load excel detail");
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        final ArrayList<JournalDumpVO> importLists = new ArrayList<>();
        //final HashMap<MultiKey, Object> importLists = new HashMap<>();
        final ArrayList<String> dataColumns = new ArrayList<>(Arrays.asList(
                "Period",
                "Base Amount",
                "T3  COMMODITY Analysis Code",
                "T5  COST CODE Analysis Code",
                "T8  DEAL NO. (SALE) Analysis Code",
                "T9  PARCEL NO.(PURCHASE) Analysis Code"));

        for (int rowNum = Math.max(1, dataSheet.getFirstRowNum()); rowNum <= dataSheet.getLastRowNum(); rowNum++) {
            final XSSFRow rowItem = dataSheet.getRow(rowNum);
            if (rowItem == null) break;
            final HashMap<String, String> json = new HashMap<>();
            //DataFormatter formatter = new DataFormatter();
            //final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MMM-yyyy");
//            final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            for (Map.Entry<Short, String> entry : fieldColumnMapping.entrySet()) {
                if (!dataColumns.contains(entry.getValue())) continue;

                final XSSFCell cell = rowItem.getCell(entry.getKey());
                String v;

                if (cell != null) {
                    switch (entry.getValue()) {
                        case "Period":
                        case "T3  COMMODITY Analysis Code":
                        case "T5  COST CODE Analysis Code":
                        case "T8  DEAL NO. (SALE) Analysis Code":
                        case "T9  PARCEL NO.(PURCHASE) Analysis Code":
                            cell.setCellType(Cell.CELL_TYPE_STRING);
                            v = cell.getStringCellValue();
                            break;
                        case "Base Amount":
                            cell.setCellType(Cell.CELL_TYPE_NUMERIC);
                            v = BigDecimal.valueOf(cell.getNumericCellValue()).toPlainString();
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
//                                if ("Base Amount".equalsIgnoreCase(entry.getValue())
//                                        || "T8  DEAL NO. (SALE) Analysis Code".equalsIgnoreCase(entry.getValue())
//                                        || "T9  PARCEL NO.(PURCHASE) Analysis Code".equalsIgnoreCase(entry.getValue())) {
//                                    //v = BigDecimal.valueOf(cell.getNumericCellValue()).toPlainString();
//                                    v = BigDecimal.valueOf(cell.getNumericCellValue()).toPlainString();
//                                } else {
//                                    v = BigDecimal.valueOf(cell.getNumericCellValue()).setScale(0, RoundingMode.HALF_UP).toPlainString();
//                                }
//                            }
//                            break;
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
            final JournalDumpVO vo = objectMapper.readValue(jsonBody, JournalDumpVO.class);
            vo.setDocID(docID);
            vo.setGroupCompanyCode(groupCompanyCode);
            vo.setGroupCompanyCNName(groupCompanyCNName);
            vo.setSheetName(sheetName);
            vo.setLineNumber((long) (rowNum + 1));
            if (checkData(vo, correctPeriod) && CollectionUtils.isEmpty(systemMessageList)) {
                importLists.add(setVOData(vo));
            } else {
                if (!CollectionUtils.isEmpty(systemMessageList) && systemMessageList.size() >= UploadUtil.errorLimit) {
                    systemMessageList.add(uploadServiceUtil.createSystemMessage(vo.getDocID(), vo.getSheetName(), null,
                            MessageFormat.format(MessageDefine.error_errorLimit, UploadUtil.errorLimit)));
                    return importLists;
                }
            }
        }
        return importLists;
    }

    private JournalDumpVO setVOData(JournalDumpVO vo) {
        if (vo.getT5() != null && vo.getT5().equalsIgnoreCase("I01")) {
            vo.setContractNo(UploadUtil.convertQuotaIDToContractNo(vo.getT8(), vo.getGroupCompanyCode(), vo.getT3()));
            vo.setQuotaID(vo.getT8());
            vo.setDirection("SALE");
        } else if (vo.getT5() != null && vo.getT5().equalsIgnoreCase("C01")) {
            vo.setContractNo(UploadUtil.convertQuotaIDToContractNo(vo.getT9(), vo.getGroupCompanyCode(), vo.getT3()));
            vo.setQuotaID(vo.getT9());
            vo.setDirection("PURCHASE");
        }
        vo.setAssignmentID("");
        vo.setVatExclusiveAmount(new BigDecimal(vo.getBaseAmount()));
        vo.setCurrency("CNY");
        vo.setSettlementDate(com.trafigura.situ.utils.UploadUtil.getLastDayOfMonth(vo.getPeriod()));
        vo.setCommodity(vo.getT3());
        return vo;
    }

}

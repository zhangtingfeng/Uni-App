package com.trafigura.situ.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.trafigura.situ.exception.ResourceNotFoundException;
import com.trafigura.situ.exception.SituException;
import com.trafigura.situ.mapper.ARAPToTraderMappingMapper;
import com.trafigura.situ.model.ARAPToTradeMappingVO;
import com.trafigura.situ.model.DocumentHeadDTO;
import com.trafigura.situ.model.DocumentInfoVO;
import com.trafigura.situ.repository.ARAPToTradeMappingRepository;
import com.trafigura.situ.util.UploadServiceUtil;
import com.trafigura.situ.utils.MessageDefine;
import org.apache.commons.collections.keyvalue.MultiKey;
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
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UploadARAPToTradeMappingService {
    @Autowired
    UploadServiceUtil uploadServiceUtil;
    @Autowired
    ARAPToTradeMappingRepository arapToTradeMappingRepository;
    @Autowired
    ARAPToTraderMappingMapper arapToTraderMappingMapper;

    private final static Logger logger = LoggerFactory.getLogger(UploadARAPToTradeMappingService.class);

    public DocumentInfoVO uploadARAPToTradeMapping(MultipartFile documentToStore, DocumentHeadDTO documentHeadDTO) throws Exception {
        logger.info("uploadARAPToTradeMapping Start");
        String groupCompanyCode = documentHeadDTO.getGroupCompanyCode();
        logger.info("uploadARAPToTradeMapping groupCompanyCode: " + groupCompanyCode);
        String groupCompanyCNName = documentHeadDTO.getGroupCompanyCNName();
        logger.info("uploadARAPToTradeMapping groupCompanyCNName: " + groupCompanyCNName);
        String sheetName = "";
        DocumentInfoVO retVal = new DocumentInfoVO();
        Long docID = null;
        try {
            byte[] body = documentToStore.getBytes();
            docID = uploadServiceUtil.saveExcelFileBody(body, documentHeadDTO);
            logger.info("uploadARAPToTradeMapping docID: " + docID.toString());
            sheetName = "AR";
            List<ARAPToTradeMappingVO> arToTradeMappingVOList = parseExcel(body, docID, groupCompanyCode, groupCompanyCNName, sheetName);
            logger.info("uploadARAPToTradeMapping read AR Sheet success");
            sheetName = "AP";
            List<ARAPToTradeMappingVO> apToTradeMappingVOList = parseExcel(body, docID, groupCompanyCode, groupCompanyCNName, sheetName);
            logger.info("uploadARAPToTradeMapping read AP Sheet success");
            retVal = saveARAPToTradeMapping(documentHeadDTO, docID, arToTradeMappingVOList, apToTradeMappingVOList);
        } catch (IOException ex) {
            logger.info("uploadARAPToTradeMapping " + MessageDefine.error_fileIOError);
            throw new SituException(MessageDefine.error_fileIOError);
        } catch (ResourceNotFoundException ex) {
            logger.info("uploadARAPToTradeMapping " + MessageFormat.format(MessageDefine.error_sheetNotExist, sheetName));
            throw new SituException(MessageFormat.format(MessageDefine.error_sheetNotExist, sheetName));
        } finally {
            retVal.setDocID(docID);
        }
        return retVal;
    }

    @Transactional
    private DocumentInfoVO saveARAPToTradeMapping(DocumentHeadDTO documentHeadDTO, Long docID,
                                                  List<ARAPToTradeMappingVO> arToTradeMappingVOList,
                                                  List<ARAPToTradeMappingVO> apToTradeMappingVOList) {
        logger.info("saveARAPToTradeMapping Start");
        String groupCompanyCode = documentHeadDTO.getGroupCompanyCode();
        logger.info("saveARAPToTradeMapping groupCompanyCode: " + groupCompanyCode);
        arapToTradeMappingRepository.deleteByGroupCompanyCode(groupCompanyCode);
        logger.info("saveARAPToTradeMapping deleteByGroupCompanyCode success");
        arapToTradeMappingRepository.saveAll(arToTradeMappingVOList.stream().map(vo -> arapToTraderMappingMapper.VOToEntity(vo)).collect(Collectors.toList()));
        logger.info("saveARAPToTradeMapping arToTradeMappingVOList save success");
        arapToTradeMappingRepository.saveAll(apToTradeMappingVOList.stream().map(vo -> arapToTraderMappingMapper.VOToEntity(vo)).collect(Collectors.toList()));
        logger.info("saveARAPToTradeMapping apToTradeMappingVOList save success");
        return uploadServiceUtil.updateUploadSuccessResult(documentHeadDTO, docID, true);
    }

    public List<ARAPToTradeMappingVO> parseExcel(byte[] body,
                                                 Long docID,
                                                 String groupCompanyCode,
                                                 String groupCompanyCNName,
                                                 String sheetName) throws Exception {
        logger.info("parseExcel Start");
        XSSFWorkbook workbook;
        workbook = new XSSFWorkbook(new ByteArrayInputStream(body));

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
        //final ArrayList<Object> importLists = new ArrayList<>();
        final ArrayList<String> dataColumns = new ArrayList<>(Arrays.asList(
                "Account Code",
                "T8  DEAL NO. (SALE) Analysis Code",
                "T9  PARCEL NO.(PURCHASE) Analysis Code",
                "T3  COMMODITY Analysis Code"));

        final HashMap<MultiKey, ARAPToTradeMappingVO> importLists = new HashMap<>();
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
                        case "Account Code":
                        case "T3  COMMODITY Analysis Code":
                        case "T8  DEAL NO. (SALE) Analysis Code":
                        case "T9  PARCEL NO.(PURCHASE) Analysis Code":
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
//                                if ("T8  DEAL NO. (SALE) Analysis Code".equalsIgnoreCase(entry.getValue())
//                                        || "T9  PARCEL NO.(PURCHASE) Analysis Code".equalsIgnoreCase(entry.getValue())) {
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
            final ARAPToTradeMappingVO vo = objectMapper.readValue(jsonBody, ARAPToTradeMappingVO.class);
            vo.setDocID(docID);
            vo.setGroupCompanyCode(groupCompanyCode);
            vo.setGroupCompanyCNName(groupCompanyCNName);
            vo.setSheetName(sheetName);
            vo.setLineNumber((long) (rowNum + 1));
            importLists.put(new MultiKey(vo.getAccountCode(), vo.getT8(), vo.getT9(), vo.getT3()), vo);
        }
        return new ArrayList<>(importLists.values());
    }
}

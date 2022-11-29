package com.trafigura.situ.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.trafigura.situ.exception.ResourceNotFoundException;
import com.trafigura.situ.exception.SituException;
import com.trafigura.situ.mapper.ARAPToCPMappingMapper;
import com.trafigura.situ.model.ARAPToCPMappingVO;
import com.trafigura.situ.model.DocumentHeadDTO;
import com.trafigura.situ.model.DocumentInfoVO;
import com.trafigura.situ.repository.ARAPToCPMappingRepository;
import com.trafigura.situ.util.UploadServiceUtil;
import com.trafigura.situ.utils.MessageDefine;
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
public class UploadARAPToCPMappingService {
    @Autowired
    UploadServiceUtil uploadServiceUtil;
    @Autowired
    ARAPToCPMappingRepository arapToCPMappingRepository;
    @Autowired
    ARAPToCPMappingMapper arapToCPMappingMapper;

    private final static Logger logger = LoggerFactory.getLogger(UploadARAPToCPMappingService.class);

    public DocumentInfoVO uploadARAPToCPMapping(MultipartFile documentToStore, DocumentHeadDTO documentHeadDTO) throws Exception {
        logger.info("uploadARAPToCPMapping Start");
        String groupCompanyCode = documentHeadDTO.getGroupCompanyCode();
        logger.info("uploadARAPToCPMapping groupCompanyCode: " + groupCompanyCode);
        String groupCompanyCNName = documentHeadDTO.getGroupCompanyCNName();
        logger.info("uploadARAPToCPMapping groupCompanyCNName: " + groupCompanyCNName);
        String sheetName = "";
        DocumentInfoVO retVal = new DocumentInfoVO();
        Long docID = null;
        try {
            byte[] body = documentToStore.getBytes();
            docID = uploadServiceUtil.saveExcelFileBody(body, documentHeadDTO);
            logger.info("uploadARAPToCPMapping docID: " + docID.toString());
            sheetName = "AR";
            List<ARAPToCPMappingVO> arToCPMappingVOList = parseExcel(body, docID, groupCompanyCode, groupCompanyCNName, sheetName);
            logger.info("uploadARAPToCPMapping read AR Sheet success");
            sheetName = "AP";
            List<ARAPToCPMappingVO> apToCPMappingVOList = parseExcel(body, docID, groupCompanyCode, groupCompanyCNName, sheetName);
            logger.info("uploadARAPToCPMapping read AP Sheet success");
            retVal = saveARAPToCPMapping(documentHeadDTO, docID, arToCPMappingVOList, apToCPMappingVOList);
        } catch (IOException ex) {
            logger.info("uploadARAPToCPMapping " + MessageDefine.error_fileIOError);
            throw new SituException(MessageDefine.error_fileIOError);
        } catch (ResourceNotFoundException ex) {
            logger.info("uploadARAPToCPMapping " + MessageFormat.format(MessageDefine.error_sheetNotExist, sheetName));
            throw new SituException(MessageFormat.format(MessageDefine.error_sheetNotExist, sheetName));
        } finally {
            retVal.setDocID(docID);
        }
        return retVal;
    }

    @Transactional
    private DocumentInfoVO saveARAPToCPMapping(DocumentHeadDTO documentHeadDTO, Long docID,
                                               List<ARAPToCPMappingVO> arToCPMappingVOList,
                                               List<ARAPToCPMappingVO> apToCPMappingVOList) {
        logger.info("saveARAPToCPMapping Start");
        String groupCompanyCode = documentHeadDTO.getGroupCompanyCode();
        logger.info("saveARAPToCPMapping groupCompanyCode: " + groupCompanyCode);
        arapToCPMappingRepository.deleteByGroupCompanyCode(groupCompanyCode);
        logger.info("saveARAPToCPMapping deleteByGroupCompanyCode success");
        arapToCPMappingRepository.saveAll(arToCPMappingVOList.stream().map(vo -> arapToCPMappingMapper.VOToEntity(vo)).collect(Collectors.toList()));
        logger.info("saveARAPToCPMapping arToCPMappingVOList save success");
        arapToCPMappingRepository.saveAll(apToCPMappingVOList.stream().map(vo -> arapToCPMappingMapper.VOToEntity(vo)).collect(Collectors.toList()));
        logger.info("saveARAPToCPMapping apToCPMappingVOList save success");
        return uploadServiceUtil.updateUploadSuccessResult(documentHeadDTO, docID, true);
    }

    public List<ARAPToCPMappingVO> parseExcel(byte[] body,
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
        final ArrayList<ARAPToCPMappingVO> importLists = new ArrayList<>();
        //final HashMap<MultiKey, Object> importLists = new HashMap<>();
        final ArrayList<String> dataColumns = new ArrayList<>(Arrays.asList(
                "CP Name",
                "Account Code",
                "Account Name"));

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
                        case "CP Name":
                        case "Account Code":
                        case "Account Name":
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
//                                if ("CP Name".equalsIgnoreCase(entry.getValue())
//                                        || "Account Name".equalsIgnoreCase(entry.getValue())) {
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
            final ARAPToCPMappingVO vo = objectMapper.readValue(jsonBody, ARAPToCPMappingVO.class);
            vo.setDocID(docID);
            vo.setGroupCompanyCode(groupCompanyCode);
            vo.setGroupCompanyCNName(groupCompanyCNName);
            vo.setSheetName(sheetName);
            vo.setLineNumber((long) (rowNum + 1));
            importLists.add(vo);
        }
        //return new ArrayList<>(importLists.values());
        return importLists;
    }
}

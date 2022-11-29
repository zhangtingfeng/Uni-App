package com.trafigura.situ.service;

import com.trafigura.situ.domain.ARAPToCPMappingEntity;
import com.trafigura.situ.domain.ARAPToTradeMappingEntity;
import com.trafigura.situ.domain.LegalEntityDetailsEntity;
import com.trafigura.situ.mapper.DocumentInfoMapper;
import com.trafigura.situ.mapper.LegalEntityDetailsMapper;
import com.trafigura.situ.mapper.SystemMessageMapper;
import com.trafigura.situ.model.*;
import com.trafigura.situ.repository.*;
import com.trafigura.situ.utils.GroupCompany;
import com.trafigura.situ.utils.MessageDefine;
import com.trafigura.situ.utils.UploadUtil;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.*;
import org.drools.core.io.impl.ClassPathResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StampDutyDataQryService {
    @Autowired
    DocumentInfoRepository documentRepository;
    @Autowired
    DocumentInfoMapper documentInfoMapper;
    @Autowired
    SystemMessageRepository systemMessageRepository;
    @Autowired
    SystemMessageMapper systemMessageMapper;
    @Autowired
    JournalDumpRepository journalDumpRepository;
    @Autowired
    LegalEntityDetailsRepository legalEntityDetailsRepository;
    @Autowired
    LegalEntityDetailsMapper legalEntityDetailsMapper;
    @Autowired
    ARAPToTradeMappingRepository arapToTradeMappingRepository;
    @Autowired
    ARAPToCPMappingRepository arapToCPMappingRepository;
    @Autowired
    GroupCompany groupCompany;
    @Autowired
    ConfigurationDataService configurationDataService;
    private final static Logger logger = LoggerFactory.getLogger(StampDutyDataQryService.class);

    private String stampDutyReportExcelFileType = ".xlsx";

    public List<DocumentInfoVO> getDocInfo() {
        logger.info("getDocInfo Start");
        return documentRepository.findAll(Sort.by(Sort.Direction.DESC, "docID")).stream()
                .map(e -> documentInfoMapper.entityToVO(e)).collect(Collectors.toList());
    }

    public List<SystemMessageVO> getMessageInfo(Long docID) {
        logger.info("getMessageInfo Start");
        return systemMessageRepository.findByDocID(docID).stream()
                .map(e -> systemMessageMapper.entityToVO(e)).collect(Collectors.toList());
    }

    public List<ReportGenerationVO> getStampDutyReportData(StumpDutySearchVO stumpDutySearchVO) {
        logger.info("getStampDutyReportData Start");
        String groupCompanyCode = stumpDutySearchVO.getGroupCompanyCode();
        logger.info("getStampDutyReportData groupCompanyCode: " + groupCompanyCode);
        LocalDate startDate = UploadUtil.getFirstDayOfMonth(stumpDutySearchVO.getSnapshotYearFrom(), stumpDutySearchVO.getSnapshotMonthFrom());
        logger.info("getStampDutyReportData startDate: " + startDate);
        LocalDate endDate = UploadUtil.getLastDayOfMonth(stumpDutySearchVO.getSnapshotYearTo(), stumpDutySearchVO.getSnapshotMonthTo());
        logger.info("getStampDutyReportData endDate: " + endDate);
        String groupCompanyCNName = groupCompany.getGroupCompanyCNNameByCode(groupCompanyCode);
        logger.info("getStampDutyReportData groupCompanyCNName: " + groupCompanyCNName);
        String groupCompanyTaxID = groupCompany.getGroupCompanyTaxIDByCNName(groupCompanyCNName);
        logger.info("getStampDutyReportData groupCompanyTaxID: " + groupCompanyTaxID);
        // List<Object> resultList = journalDumpRepository.searchReportData(stumpDutySearchVO.getGroupCompanyCode(), startDate, endDate);
        List<RateConfigurationVO> rateList = configurationDataService.getRateConfigurationVOInfoList();
        List<ReportGenerationVO> resultList = journalDumpRepository.searchReportData(stumpDutySearchVO.getGroupCompanyCode(), startDate, endDate)
                .stream().map(row -> resultRowToReportGenerationVO(row, groupCompanyCode, groupCompanyCNName, groupCompanyTaxID, startDate, endDate, rateList))
                .collect(Collectors.toList());
        logger.info("getStampDutyReportData get resultList success ");
        List<String> groupCompanyCNNameList = groupCompany.getGroupCompanyCNNameList();
        resultList.removeIf(reportGenerationVO ->
                !stumpDutySearchVO.isIncludeInterCompanyTrade()
                        && groupCompanyCNNameList.contains(reportGenerationVO.getCounterpartyChineseName()));
        return resultList;
    }


    public byte[] getStampDutyReportExcel(StumpDutySearchVO stumpDutySearchVO) throws IOException, ParseException {
        logger.info("getStampDutyReportExcel Start");
        logger.info("getStampDutyReportExcel groupCompanyCode" + stumpDutySearchVO.getGroupCompanyCode());
        switch (groupCompany.getGCStampDutyTemplateID(stumpDutySearchVO.getGroupCompanyCode())) {
            case 1: //Template of Shanghai(Hard Code)
                logger.info("getStampDutyReportExcel GCStampDutyTemplateID: 1");
                return getStampDutyReportExcelShanghai(stumpDutySearchVO);
            case 2: //Template of Zhejiang(Hard Code)
                logger.info("getStampDutyReportExcel GCStampDutyTemplateID: 2");
                return getStampDutyReportExcelZhejiang(stumpDutySearchVO);
            default:
                logger.info("getStampDutyReportExcel GCStampDutyTemplateID: default");
                return getStampDutyReportExcelDefault(stumpDutySearchVO);
            //throw new SituException("Template not exist, please check the configuration.");
        }
    }

    public String getStampDutyReportExcelFileType() {
        logger.info("getStampDutyReportExcelFileType Start");
        return stampDutyReportExcelFileType;
    }

    private byte[] getStampDutyReportExcelShanghai(StumpDutySearchVO stumpDutySearchVO) throws IOException, ParseException {
        logger.info("getStampDutyReportExcelShanghai Start");
        String groupCompanyCode = stumpDutySearchVO.getGroupCompanyCode();
        logger.info("getStampDutyReportExcelShanghai groupCompanyCode: " + groupCompanyCode);
        LocalDate startDate = UploadUtil.getFirstDayOfMonth(stumpDutySearchVO.getSnapshotYearFrom(), stumpDutySearchVO.getSnapshotMonthFrom());
        logger.info("getStampDutyReportExcelShanghai startDate: " + startDate.toString());
        LocalDate endDate = UploadUtil.getLastDayOfMonth(stumpDutySearchVO.getSnapshotYearTo(), stumpDutySearchVO.getSnapshotMonthTo());
        logger.info("getStampDutyReportExcelShanghai endDate: " + endDate.toString());
//        String groupCompanyCNName = groupCompany.getGroupCompanyCNNameByCode(groupCompanyCode);
//        String groupCompanyTaxID = groupCompany.getGroupCompanyTaxIDByCNName(groupCompanyCNName);
        List<String> groupCompanyCNNameList = groupCompany.getGroupCompanyCNNameList();
        List<Object> reportDataList = journalDumpRepository.searchReportData(stumpDutySearchVO.getGroupCompanyCode(), startDate, endDate);
        List<RateConfigurationVO> rateList = configurationDataService.getRateConfigurationVOInfoList();
        ClassPathResource classPathResource = new ClassPathResource("DownloadTemplate/TemplateOfShanghai.xls");
        stampDutyReportExcelFileType = ".xls";
        HSSFWorkbook wb = new HSSFWorkbook(classPathResource.getInputStream());
        HSSFSheet sheet = wb.getSheetAt(0);

        CreationHelper createHelper = wb.getCreationHelper();
        DateFormat dft = new SimpleDateFormat("yyyy-MM-dd");

        logger.info("getStampDutyReportExcelShanghai set head data");
        HSSFRow excelRowHead = sheet.getRow(3);
        HSSFCell cellHead1 = excelRowHead.getCell(3);//* 所属时期起
        cellHead1.setCellValue(dft.parse(startDate.toString()));
        HSSFCell cellHead2 = excelRowHead.getCell(6);//* 所属时期止
        cellHead2.setCellValue(dft.parse(endDate.toString()));
        HSSFCell cellHead3 = excelRowHead.getCell(10);//* 申报类型
        cellHead3.setCellValue("11|正常申报");

        logger.info("getStampDutyReportExcelShanghai set cell style");
        CellStyle cellStyleLineDefault = wb.createCellStyle();
        cellStyleLineDefault.setBorderTop(HSSFCellStyle.BORDER_THIN);
        cellStyleLineDefault.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        cellStyleLineDefault.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        cellStyleLineDefault.setBorderRight(HSSFCellStyle.BORDER_THIN);

        CellStyle cellStyleLineDate = wb.createCellStyle();
        cellStyleLineDate.setBorderTop(HSSFCellStyle.BORDER_THIN);
        cellStyleLineDate.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        cellStyleLineDate.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        cellStyleLineDate.setBorderRight(HSSFCellStyle.BORDER_THIN);
        cellStyleLineDate.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));

        CellStyle cellStyleLineAmount = wb.createCellStyle();
        cellStyleLineAmount.setBorderTop(HSSFCellStyle.BORDER_THIN);
        cellStyleLineAmount.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        cellStyleLineAmount.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        cellStyleLineAmount.setBorderRight(HSSFCellStyle.BORDER_THIN);
        cellStyleLineAmount.setDataFormat(createHelper.createDataFormat().getFormat("0.00_);[Red](0.00)"));

        int iRow = 9;
        int iNo = 1;

        logger.info("getStampDutyReportExcelShanghai export excel");
        for (Object row : reportDataList) {
            Object[] cells = (Object[]) row;
            List<Object> dataList = new ArrayList<>();

            String contractNo = (String) cells[0];
            String t5 = (String) cells[1];
            String t3 = (String) cells[2];
            String t8t9 = (String) cells[5];
            LocalDate actualSettlementDate = LocalDate.parse(cells[3].toString());
            BigDecimal sumVatExclusiveAmount = new BigDecimal(cells[4].toString());

            //空列
            dataList.add(null);
            //1 序号
            dataList.add(iNo);
            iNo++;
            //2 应税凭证编号
            dataList.add(contractNo);
            //3 应税凭证名称
            dataList.add(contractNo);
            //4 申报期限类型
            dataList.add("01|按次申报");
            //5 应税凭证数量
            dataList.add(1);
            //6 税目
            dataList.add("101110111|买卖合同");
            //7 子目
            dataList.add("");
            //8 税款所属期起
            dataList.add(startDate);
            //9 税款所属期止
            dataList.add(endDate);
            //10 应税凭证书立日期
            dataList.add(null);
            //11 计税金额
            dataList.add(sumVatExclusiveAmount);
            //12 实际结算日期
            dataList.add(actualSettlementDate);
            RateConfigurationVO rateConfigurationVO = getRateInfo(rateList, actualSettlementDate);
            //13 实际结算金额
            dataList.add(sumVatExclusiveAmount);
            //14 税率
            dataList.add(rateConfigurationVO != null ? rateConfigurationVO.getDisplayCNText() : "");
            BigDecimal vat = rateConfigurationVO != null ? rateConfigurationVO.getRate() : new BigDecimal(0);
            //15 应纳税额
            dataList.add(sumVatExclusiveAmount.multiply(vat).setScale(2, RoundingMode.HALF_UP));
            LegalEntityDetailsVO legalEntityDetailsVO = getLegalEntityInfo(groupCompanyCode, t3, t5, t8t9);
            //16 减免性质代码和项目名称
            dataList.add("");
            //17 减免税额
            dataList.add(null);
            //18 对方书立人信息 - 对方书立人名称
            String counterpartyChineseName = legalEntityDetailsVO == null ? "" : legalEntityDetailsVO.getLECNName();
            dataList.add(counterpartyChineseName);
            //19 对方书立人信息 - 对方书立人纳税人识别号（统一社会信用编码）
            dataList.add(legalEntityDetailsVO == null ? "" : legalEntityDetailsVO.getLETaxID());
            //20 对方书立人信息 - 对方书立人涉及金额
            dataList.add(new BigDecimal(0));

            if (!stumpDutySearchVO.isIncludeInterCompanyTrade() && groupCompanyCNNameList.contains(counterpartyChineseName))
                continue;
            HSSFRow excelRowLine = sheet.createRow(iRow);
            iRow++;
            for (int k = 1; k <= 20; k++) {
                HSSFCell cellLine = excelRowLine.createCell(k);
                switch (k) {
                    case 8:
                    case 9:
                    case 10:
                    case 12:
                        //日期
                        if (dataList.get(k) == null) {
                            cellLine.setCellValue("");
                        } else {
                            cellLine.setCellValue(dft.parse(dataList.get(k).toString()));
                        }
                        cellLine.setCellStyle(cellStyleLineDate);
                        break;
                    case 11:
                    case 13:
                    case 15:
                    case 17:
                    case 20:
                        //金额
                        cellLine.setCellFormula(null);
                        if (dataList.get(k) == null) {
                            cellLine.setCellValue("");
                        } else {
                            cellLine.setCellValue(Double.parseDouble(dataList.get(k).toString()));
                        }
                        cellLine.setCellStyle(cellStyleLineAmount);
                        break;
                    default:
                        cellLine.setCellValue(dataList.get(k) == null ? "" : dataList.get(k).toString());
                        cellLine.setCellStyle(cellStyleLineDefault);
                        break;
                }
            }
        }
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        wb.write(os);
        return os.toByteArray();
    }


    private byte[] getStampDutyReportExcelZhejiang(StumpDutySearchVO stumpDutySearchVO) throws IOException, ParseException {
        logger.info("getStampDutyReportExcelZhejiang Start");
        String groupCompanyCode = stumpDutySearchVO.getGroupCompanyCode();
        logger.info("getStampDutyReportExcelZhejiang groupCompanyCode: " + groupCompanyCode);
        LocalDate startDate = UploadUtil.getFirstDayOfMonth(stumpDutySearchVO.getSnapshotYearFrom(), stumpDutySearchVO.getSnapshotMonthFrom());
        logger.info("getStampDutyReportExcelZhejiang startDate: " + startDate.toString());
        LocalDate endDate = UploadUtil.getLastDayOfMonth(stumpDutySearchVO.getSnapshotYearTo(), stumpDutySearchVO.getSnapshotMonthTo());
        logger.info("getStampDutyReportExcelZhejiang endDate: " + endDate.toString());
//        String groupCompanyCNName = groupCompany.getGroupCompanyCNNameByCode(groupCompanyCode);
//        String groupCompanyTaxID = groupCompany.getGroupCompanyTaxIDByCNName(groupCompanyCNName);
        List<String> groupCompanyCNNameList = groupCompany.getGroupCompanyCNNameList();
        List<Object> reportDataList = journalDumpRepository.searchReportData(stumpDutySearchVO.getGroupCompanyCode(), startDate, endDate);

        ClassPathResource classPathResource = new ClassPathResource("DownloadTemplate/TemplateOfZhejiang.xlsx");
        stampDutyReportExcelFileType = ".xlsx";
        XSSFWorkbook wb = new XSSFWorkbook(classPathResource.getInputStream());
        XSSFSheet sheet = wb.getSheetAt(0);

        CreationHelper createHelper = wb.getCreationHelper();
        DateFormat dft = new SimpleDateFormat("yyyy-MM-dd");

        logger.info("getStampDutyReportExcelZhejiang set cell style");
        CellStyle cellStyleLineDefault = wb.createCellStyle();
        cellStyleLineDefault.setBorderTop(XSSFCellStyle.BORDER_THIN);
        cellStyleLineDefault.setBorderBottom(XSSFCellStyle.BORDER_THIN);
        cellStyleLineDefault.setBorderLeft(XSSFCellStyle.BORDER_THIN);
        cellStyleLineDefault.setBorderRight(XSSFCellStyle.BORDER_THIN);
        cellStyleLineDefault.setLocked(false);

        CellStyle cellStyleLineDate = wb.createCellStyle();
        cellStyleLineDate.setBorderTop(XSSFCellStyle.BORDER_THIN);
        cellStyleLineDate.setBorderBottom(XSSFCellStyle.BORDER_THIN);
        cellStyleLineDate.setBorderLeft(XSSFCellStyle.BORDER_THIN);
        cellStyleLineDate.setBorderRight(XSSFCellStyle.BORDER_THIN);
        cellStyleLineDate.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));
        cellStyleLineDate.setLocked(false);

        CellStyle cellStyleLineAmount = wb.createCellStyle();
        cellStyleLineAmount.setBorderTop(XSSFCellStyle.BORDER_THIN);
        cellStyleLineAmount.setBorderBottom(XSSFCellStyle.BORDER_THIN);
        cellStyleLineAmount.setBorderLeft(XSSFCellStyle.BORDER_THIN);
        cellStyleLineAmount.setBorderRight(XSSFCellStyle.BORDER_THIN);
//        cellStyleLineAmount.setDataFormat(createHelper.createDataFormat().getFormat("0.00_);[Red](0.00)"));
        cellStyleLineAmount.setLocked(false);

        logger.info("getStampDutyReportExcelZhejiang export excel");
        int iRow = 3;
        for (Object row : reportDataList) {
            Object[] cells = (Object[]) row;
            List<Object> dataList = new ArrayList<>();

            String contractNo = (String) cells[0];
            String t5 = (String) cells[1];
            String t3 = (String) cells[2];
            String t8t9 = (String) cells[5];
            LocalDate actualSettlementDate = LocalDate.parse(cells[3].toString());
            BigDecimal sumVatExclusiveAmount = new BigDecimal(cells[4].toString());

            //0 应税凭证编号
            dataList.add(contractNo);
            //1 应税凭证名称
            dataList.add(contractNo);
            //2 税目
            dataList.add("101110111|买卖合同");
            //3 子目
            dataList.add("");
            //4 应税凭证书立日期
            dataList.add(null);
            //5 计税金额
            dataList.add(sumVatExclusiveAmount);
            LegalEntityDetailsVO legalEntityDetailsVO = getLegalEntityInfo(groupCompanyCode, t3, t5, t8t9);
            //6 对方书立人信息 - 对方书立人名称
            String counterpartyChineseName = legalEntityDetailsVO == null ? "" : legalEntityDetailsVO.getLECNName();
            dataList.add(counterpartyChineseName);
            //7 对方书立人信息 - 对方书立人纳税人识别号（统一社会信用编码）
            dataList.add(legalEntityDetailsVO == null ? "" : legalEntityDetailsVO.getLETaxID());
            //8 对方书立人信息 - 对方书立人涉及金额
            dataList.add(new BigDecimal(0));
            //9 实际结算日期
            dataList.add(actualSettlementDate);
            //10 实际结算金额
            dataList.add(sumVatExclusiveAmount);
            //11 减免性质代码和项目名称
            dataList.add("");
            //12 减免税额
            dataList.add(null);

            if (!stumpDutySearchVO.isIncludeInterCompanyTrade() && groupCompanyCNNameList.contains(counterpartyChineseName))
                continue;
            XSSFRow excelRow = sheet.createRow(iRow);
            iRow++;
            for (int k = 0; k <= 12; k++) {
                XSSFCell cell = excelRow.createCell(k);
                switch (k) {
                    case 4:
                    case 9:
                        //日期
                        if (dataList.get(k) == null) {
                            cell.setCellValue("");
                        } else {
                            cell.setCellValue(dft.parse(dataList.get(k).toString()));
                        }
                        cell.setCellStyle(cellStyleLineDate);
                        break;
                    case 5:
                    case 8:
                    case 10:
                    case 12:
                        //金额
                        if (dataList.get(k) == null) {
                            cell.setCellValue("");
                        } else {
                            cell.setCellValue(Double.parseDouble(dataList.get(k).toString()));
                        }
                        cell.setCellStyle(cellStyleLineAmount);
                        break;
                    default:
                        cell.setCellValue(dataList.get(k) == null ? "" : dataList.get(k).toString());
                        cell.setCellStyle(cellStyleLineDefault);
                        break;
                }
            }
        }
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        wb.write(os);
        return os.toByteArray();
    }

    public byte[] getStampDutyReportExcelDefault(StumpDutySearchVO stumpDutySearchVO) throws IOException, ParseException {
        logger.info("getStampDutyReportExcelDefault Start");
        String groupCompanyCode = stumpDutySearchVO.getGroupCompanyCode();
        logger.info("getStampDutyReportExcelDefault groupCompanyCode: " + groupCompanyCode);
        LocalDate startDate = UploadUtil.getFirstDayOfMonth(stumpDutySearchVO.getSnapshotYearFrom(), stumpDutySearchVO.getSnapshotMonthFrom());
        logger.info("getStampDutyReportExcelDefault startDate: " + startDate.toString());
        LocalDate endDate = UploadUtil.getLastDayOfMonth(stumpDutySearchVO.getSnapshotYearTo(), stumpDutySearchVO.getSnapshotMonthTo());
        logger.info("getStampDutyReportExcelDefault endDate: " + endDate.toString());
        String groupCompanyCNName = groupCompany.getGroupCompanyCNNameByCode(groupCompanyCode);
        logger.info("getStampDutyReportExcelDefault groupCompanyCNName: " + groupCompanyCNName);
        String groupCompanyTaxID = groupCompany.getGroupCompanyTaxIDByCNName(groupCompanyCNName);
        logger.info("getStampDutyReportExcelDefault groupCompanyTaxID: " + groupCompanyTaxID);
        stampDutyReportExcelFileType = ".xlsx";
        List<Object> reportDataList = journalDumpRepository.searchReportData(stumpDutySearchVO.getGroupCompanyCode(), startDate, endDate);
        List<RateConfigurationVO> rateList = configurationDataService.getRateConfigurationVOInfoList();
        SXSSFWorkbook wb = new SXSSFWorkbook();
        SXSSFSheet sheet = (SXSSFSheet) wb.createSheet("Sheet1");
        SXSSFRow excelRow = (SXSSFRow) sheet.createRow(0);
        List<String> titleList = new ArrayList<>();
        titleList.add("纳税人识别号（统一社会信用编码）");
        titleList.add("纳税人（缴费人）名称");
        titleList.add("应税凭证税务编号");
        titleList.add("应税凭证编号");
        titleList.add("应税凭证名称");
        titleList.add("申报期限类型");
        titleList.add("应税凭证数量");
        titleList.add("税目");
        titleList.add("子目");
        titleList.add("税款所属期起");
        titleList.add("税款所属期止");
        titleList.add("应税凭证书立日期");
        titleList.add("计税金额");
        titleList.add("实际结算日期");
        titleList.add("实际结算金额");
        titleList.add("税率");
        titleList.add("减免性质代码和项目名称");
        titleList.add("对方书立人信息 - 对方书立人名称");
        titleList.add("对方书立人信息 - 对方书立人纳税人识别号（统一社会信用编码）");
        titleList.add("对方书立人信息 - 对方书立人涉及金额");
        titleList.add("错误信息");
        for (int i = 0; i < titleList.size(); i++) {
            SXSSFCell cell = (SXSSFCell) excelRow.createCell(i);
            cell.setCellValue(titleList.get(i));
        }

        CellStyle cellStyle = wb.createCellStyle();
        CreationHelper createHelper = wb.getCreationHelper();
        cellStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));
        DateFormat dft = new SimpleDateFormat("yyyy-MM-dd");

        logger.info("getStampDutyReportExcelDefault export excel");
        int iRow = 1;
        List<String> groupCompanyCNNameList = groupCompany.getGroupCompanyCNNameList();
        for (Object o : reportDataList) {
            ReportGenerationVO reportGenerationVO = resultRowToReportGenerationVO(o, groupCompanyCode, groupCompanyCNName, groupCompanyTaxID, startDate, endDate, rateList);
            if (!stumpDutySearchVO.isIncludeInterCompanyTrade() && groupCompanyCNNameList.contains(reportGenerationVO.getCounterpartyChineseName()))
                continue;
            excelRow = (SXSSFRow) sheet.createRow(iRow);
            iRow++;
            List<Object> dataList = new ArrayList<>();

            dataList.add(reportGenerationVO.getGroupCompanyTaxID());
            dataList.add(reportGenerationVO.getGroupCompanyChineseName());
            dataList.add(reportGenerationVO.getContractTaxNo());
            dataList.add(reportGenerationVO.getContractNo());
            dataList.add(reportGenerationVO.getContractName());
            dataList.add(reportGenerationVO.getByPeriodORByContract());
            dataList.add(reportGenerationVO.getContractCounts());
            dataList.add(reportGenerationVO.getTaxableItem());
            dataList.add(reportGenerationVO.getTaxableChildItem());
            dataList.add(reportGenerationVO.getStartDate());
            dataList.add(reportGenerationVO.getEndDate());
            dataList.add(reportGenerationVO.getTradeDate());
            dataList.add(reportGenerationVO.getTaxableAmountOFTheContract());
            dataList.add(reportGenerationVO.getActualSettlementDate());
            dataList.add(reportGenerationVO.getActualSettlementAmount());
            dataList.add(reportGenerationVO.getTaxRate());
            dataList.add(reportGenerationVO.getTaxDeductionAndExemptionCodeAndName());
            dataList.add(reportGenerationVO.getCounterpartyChineseName());
            dataList.add(reportGenerationVO.getCounterpartyTaxID());
            dataList.add(reportGenerationVO.getCounterpartyTaxableAmount());
            dataList.add(reportGenerationVO.getMappingFailMessage());
            for (int k = 0; k < titleList.size(); k++) {
                SXSSFCell cell = (SXSSFCell) excelRow.createCell(k);
                switch (k) {
                    case 9:
                    case 10:
                    case 11:
                    case 13:
                        if (dataList.get(k) == null) {
                            cell.setCellValue("");
                        } else {
                            cell.setCellValue(dft.parse(dataList.get(k).toString()));
                        }
                        cell.setCellStyle(cellStyle);
                        break;
                    case 12:
                    case 14:
                    case 19:
                        if (dataList.get(k) == null) {
                            cell.setCellValue("");
                        } else {
                            cell.setCellValue(Double.parseDouble(dataList.get(k).toString()));
                        }
                        break;
                    default:
                        cell.setCellValue(dataList.get(k) == null ? "" : dataList.get(k).toString());
                        break;
                }
            }
        }

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        wb.write(os);
        return os.toByteArray();
    }

    private LegalEntityDetailsVO getLegalEntityInfo(String groupCompanyCode, String t3, String t5, String t8t9) {
//        logger.info("getLegalEntityInfo Start");
        LegalEntityDetailsVO legalEntityDetailsVO = new LegalEntityDetailsVO();
        ARAPToTradeMappingEntity arapToTradeMappingEntity = "I01".equalsIgnoreCase(t5) ?
                arapToTradeMappingRepository.findTopByGroupCompanyCodeAndT3AndT8(groupCompanyCode, t3, t8t9) :
                arapToTradeMappingRepository.findTopByGroupCompanyCodeAndT3AndT9(groupCompanyCode, t3, t8t9);
//        logger.info("getLegalEntityInfo t3: " + t3);
//        logger.info("getLegalEntityInfo t5: " + t5);
//        logger.info("getLegalEntityInfo t8t9: " + t8t9);
        if (arapToTradeMappingEntity != null) {
//            logger.info("getLegalEntityInfo ARAP To TradeMapping success");
            ARAPToCPMappingEntity arapToCPMappingEntity =
                    arapToCPMappingRepository.findTopByGroupCompanyCodeAndAccountCode(
                            groupCompanyCode,
                            arapToTradeMappingEntity.getAccountCode());
            if (arapToCPMappingEntity != null) {
//                logger.info("getLegalEntityInfo ARAP To CPMapping success");
                LegalEntityDetailsEntity legalEntityDetailsEntity =
                        legalEntityDetailsRepository.findTopByLECNName(arapToCPMappingEntity.getCPName());
                if (legalEntityDetailsEntity != null) {
//                    logger.info("getLegalEntityInfo get legalEntityDetails success");
                    legalEntityDetailsVO = legalEntityDetailsMapper.entityToVO(legalEntityDetailsEntity);
                } else {
                    legalEntityDetailsVO.setLECNName(arapToCPMappingEntity.getCPName());
                    legalEntityDetailsVO.setLETaxID("");
                    legalEntityDetailsVO.setMappingFailMessage("[" + arapToCPMappingEntity.getCPName() + "], LegalEntity Details info missing.");
//                    logger.info("getLegalEntityInfo " + "[" + arapToCPMappingEntityList.get(0).getCPName() + "], LegalEntity Details info missing.");
                }
            } else {
                legalEntityDetailsVO.setMappingFailMessage("[" + groupCompanyCode + "], "
                        + "[" + arapToTradeMappingEntity.getAccountCode() + "], ARAP To CP Mapping Fail.");
//                logger.info("getLegalEntityInfo " + "[" + groupCompanyCode + "], "
//                        + "[" + arapToTradeMappingEntity.getAccountCode() + "], ARAP To CP Mapping Fail.");
            }
        } else {
            legalEntityDetailsVO.setMappingFailMessage("[" + groupCompanyCode + "],[" + t3 + "],[" + t8t9 + "], ARAP To Trade Mapping Fail.");
//            logger.info("getLegalEntityInfo " + "[" + groupCompanyCode + "],[" + t3 + "],[" + t8t9 + "], ARAP To Trade Mapping Fail.");
        }
        return legalEntityDetailsVO;
    }
//    private LegalEntityDetailsVO getLegalEntityInfo(String groupCompanyCode, String t3, String t5, String t8, String t9) {
//        LegalEntityDetailsVO legalEntityDetailsVO = new LegalEntityDetailsVO();
//        //List<ARAPToTradeMappingEntity> arapToTradeMappingEntityList;
//        //String contractNo = UploadUtil.convertSaturnFormatContractNo(groupCompanyCode, saturnContractNo);
//        ARAPToCPMappingEntity arapToTradeMappingEntity = "I01".equalsIgnoreCase(t5) ?
//                arapToTradeMappingRepository.findTopByGroupCompanyCodeT3T8(groupCompanyCode, t3, t8) :
//                arapToTradeMappingRepository.findTopByGroupCompanyCodeT3T9(groupCompanyCode, t3, t9);
//        if (arapToTradeMappingEntity != null) {
//            ARAPToCPMappingEntity arapToCPMappingEntity =
//                    arapToCPMappingRepository.findTopByGroupCompanyCodeAndAccountCode(
//                            groupCompanyCode,
//                            arapToTradeMappingEntity.getAccountCode());
//            if (arapToCPMappingEntity != null) {
//                LegalEntityDetailsEntity legalEntityDetailsEntity =
//                        legalEntityDetailsRepository.findTopByLECNName(arapToCPMappingEntity.getCPName());
//                if (legalEntityDetailsEntity != null) {
//                    legalEntityDetailsVO = legalEntityDetailsMapper.entityToVO(legalEntityDetailsEntity);
//                } else {
//                    legalEntityDetailsVO.setLECNName(arapToCPMappingEntity.getCPName());
//                    legalEntityDetailsVO.setLETaxID("");
//                    legalEntityDetailsVO.setMappingFailMessage("LegalEntity Details info missing.");
//                }
//            } else {
//                legalEntityDetailsVO.setMappingFailMessage("[" + groupCompanyCode + "], [" + arapToTradeMappingEntity.getAccountCode() + "], ARAP To CP Mapping Fail.");
//            }
//        } else {
//            if ("I01".equalsIgnoreCase(t5)) {
//                legalEntityDetailsVO.setMappingFailMessage("[" + groupCompanyCode + "],[" + t3 + "],[" + t8 + "]ARAP To Trade Mapping Fail.");
//            } else {
//                legalEntityDetailsVO.setMappingFailMessage("[" + groupCompanyCode + "],[" + t3 + "],[" + t9 + "]ARAP To Trade Mapping Fail.");
//            }
//        }
//        return legalEntityDetailsVO;
//    }

    private ReportGenerationVO resultRowToReportGenerationVO(Object row,
                                                             String groupCompanyCode,
                                                             String groupCompanyCNName,
                                                             String groupCompanyTaxID,
                                                             LocalDate startDate,
                                                             LocalDate endDate,
                                                             List<RateConfigurationVO> rateList) {
//        logger.info("resultRowToReportGenerationVO Start");
        Object[] cells = (Object[]) row;
        //应税凭证税务编号
        String contractTaxNo = "";
        //应税凭证编号
        String contractNo = (String) cells[0];
        //应税凭证名称
        String contractName = contractNo;
        //申报期限类型
        String byPeriodORByContract = "按次申报";
        //应税凭证数量
        String contractCounts = "1";
        //子目
        String taxableChildItem = "";
        //实际结算日期
        LocalDate actualSettlementDate = LocalDate.parse(cells[3].toString());
        //RateInfo
        RateConfigurationVO rateConfigurationVO = getRateInfo(rateList, actualSettlementDate);
        //计税金额, 实际结算金额
        BigDecimal actualSettlementAmount = (BigDecimal) cells[4];
        //应税凭证书立日期
        LocalDate tradeDate = null;
        //税目
        String taxableItem = rateConfigurationVO != null ? rateConfigurationVO.getTaxableItem() : "";
        //税率
        String taxRate = rateConfigurationVO != null ? rateConfigurationVO.getDisplayCNText() : "";
        //减免性质代码和项目名称
        String taxDeductionAndExemptionCodeAndName = "";
        String t5 = (String) cells[1];
        String t3 = (String) cells[2];
        String t8t9 = (String) cells[5];
        LegalEntityDetailsVO legalEntityDetailsVO = getLegalEntityInfo(groupCompanyCode, t3, t5, t8t9);
        //对方书立人信息 - 对方书立人名称
        String counterpartyChineseName = legalEntityDetailsVO == null ? "" : legalEntityDetailsVO.getLECNName();
        //对方书立人信息 - 对方书立人纳税人识别号（统一社会信用编码）
        String counterpartyTaxID = legalEntityDetailsVO == null ? "" : legalEntityDetailsVO.getLETaxID();
        //对方书立人信息 - 对方书立人涉及金额
        BigDecimal counterpartyTaxableAmount = new BigDecimal(0);
        String mappingFailMessage = legalEntityDetailsVO == null ? "" : legalEntityDetailsVO.getMappingFailMessage();

        ReportGenerationVO reportGenerationVO = new ReportGenerationVO();
        //纳税人识别号（统一社会信用编码）
        reportGenerationVO.setGroupCompanyTaxID(groupCompanyTaxID);
        //纳税人（缴费人）名称
        reportGenerationVO.setGroupCompanyChineseName(groupCompanyCNName);
        //应税凭证税务编号
        reportGenerationVO.setContractTaxNo(contractTaxNo);
        //应税凭证编号
        reportGenerationVO.setContractNo(contractNo);
        //应税凭证名称
        reportGenerationVO.setContractName(contractName);
        //申报期限类型
        reportGenerationVO.setByPeriodORByContract(byPeriodORByContract);
        //应税凭证数量
        reportGenerationVO.setContractCounts(contractCounts);
        //税目
        reportGenerationVO.setTaxableItem(taxableItem);
        //子目
        reportGenerationVO.setTaxableChildItem(taxableChildItem);
        //税款所属期起
        reportGenerationVO.setStartDate(startDate);
        //税款所属期止
        reportGenerationVO.setEndDate(endDate);
        //应税凭证书立日期
        reportGenerationVO.setTradeDate(tradeDate);
        //计税金额
        reportGenerationVO.setTaxableAmountOFTheContract(actualSettlementAmount);
        //实际结算日期
        reportGenerationVO.setActualSettlementDate(actualSettlementDate);
        //实际结算金额
        reportGenerationVO.setActualSettlementAmount(actualSettlementAmount);
        //税率
        reportGenerationVO.setTaxRate(taxRate);
        //减免性质代码和项目名称
        reportGenerationVO.setTaxDeductionAndExemptionCodeAndName(taxDeductionAndExemptionCodeAndName);
        //对方书立人信息 - 对方书立人名称
        reportGenerationVO.setCounterpartyChineseName(counterpartyChineseName);
        //对方书立人信息 - 对方书立人纳税人识别号（统一社会信用编码）
        reportGenerationVO.setCounterpartyTaxID(counterpartyTaxID);
        //对方书立人信息 - 对方书立人涉及金额
        reportGenerationVO.setCounterpartyTaxableAmount(counterpartyTaxableAmount);
        //对方书立人信息获取失败原因
        if (rateConfigurationVO == null) {
            if (mappingFailMessage != null && !mappingFailMessage.isEmpty()) {
                reportGenerationVO.setMappingFailMessage(MessageFormat.format(MessageDefine.error_DateRateNotExist, actualSettlementDate) + "\n" + mappingFailMessage);
            } else {
                reportGenerationVO.setMappingFailMessage(MessageFormat.format(MessageDefine.error_DateRateNotExist, actualSettlementDate));
            }
        } else {
            reportGenerationVO.setMappingFailMessage(mappingFailMessage);
        }
        return reportGenerationVO;
    }


    private RateConfigurationVO getRateInfo(List<RateConfigurationVO> rateList, LocalDate actualSettlementDate) {
        List<RateConfigurationVO> rateConfigurationVOList = rateList.stream().filter(
                        e -> e.getValidFrom().minusDays(1).isBefore(actualSettlementDate)
                                && (e.getValidTo() == null || (e.getValidTo() != null && e.getValidTo().plusDays(1).isAfter(actualSettlementDate))))
                .collect(Collectors.toList());
        if (CollectionUtils.isEmpty(rateConfigurationVOList)) {
            return null;
        } else {
            return rateConfigurationVOList.get(0);
        }
    }
}

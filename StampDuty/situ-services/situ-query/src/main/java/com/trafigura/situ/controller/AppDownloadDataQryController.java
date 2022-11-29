package com.trafigura.situ.controller;

import com.trafigura.situ.domain.DocumentInfoEntity;
import com.trafigura.situ.model.DocumentInfoVO;
import com.trafigura.situ.model.StumpDutySearchVO;
import com.trafigura.situ.service.AppDownloadDataQryService;
import com.trafigura.situ.service.StampDutyDataQryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController(value = "/api/download")
public class AppDownloadDataQryController {
    @Autowired
    AppDownloadDataQryService appDownloadDataQryService;
    @Autowired
    StampDutyDataQryService stampDutyDataQryService;

    //    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<SituResponse<DocumentInfoVO>> handleValidationExceptions(
//            Exception ex) {
//        ex.printStackTrace();
//        final ByteArrayOutputStream out = new ByteArrayOutputStream();
//        final PrintWriter printWriter = new PrintWriter(out, true);
//        ex.printStackTrace(printWriter);
//        final SituResponse<DocumentInfoVO> response = new SituResponse<>();
//        response.getErrors().add(new ErrorMessage(String.valueOf(HttpStatus.BAD_REQUEST.value()), out.toString()));
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).body(response);
//    }
    private final static Logger logger = LoggerFactory.getLogger(AppDownloadDataQryController.class);

    @GetMapping(path = "/downloadsourcefile/{docID}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    ResponseEntity<Resource> downloadSourceFile(@PathVariable(name = "docID") Long docID) {
        logger.info("downloadSourceFile(Get) Start");
        HttpHeaders headers = new HttpHeaders();
        DocumentInfoEntity documentInfoEntity = appDownloadDataQryService.getDocInfoByDocID(docID);
        final ByteArrayInputStream docInfoStream = new ByteArrayInputStream(documentInfoEntity.getBody().getDocBody());
        headers.add("Content-Disposition", "attachment; filename=\"" + documentInfoEntity.getFileName() + "\"");
        headers.add("access-control-expose-headers", "Content-Disposition");
        return ResponseEntity.status(HttpStatus.OK).headers(headers)
                .body(new InputStreamResource(docInfoStream));
    }

    @PostMapping(path = "/downloadsourcefile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    ResponseEntity<Resource> downloadSourceFile(@RequestBody DocumentInfoVO documentInfoVO) {
        logger.info("downloadSourceFile(Post) Start");
        HttpHeaders headers = new HttpHeaders();
        DocumentInfoEntity documentInfoEntity = appDownloadDataQryService.getDocInfoByDocID(documentInfoVO.getDocID());
        final ByteArrayInputStream inputStream = new ByteArrayInputStream(documentInfoEntity.getBody().getDocBody());
        headers.add("Content-Disposition", "attachment; filename=\"" + documentInfoEntity.getFileName() + "\"");
        headers.add("access-control-expose-headers", "Content-Disposition");
        return ResponseEntity.status(HttpStatus.OK).headers(headers)
                .body(new InputStreamResource(inputStream));
    }

    @PostMapping(path = "/downloadreport", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    ResponseEntity<Resource> downloadReport(@RequestBody StumpDutySearchVO stumpDutySearchVO) throws IOException, ParseException {
        logger.info("downloadReport Start");
        HttpHeaders headers = new HttpHeaders();
        byte[] wbByteAry = stampDutyDataQryService.getStampDutyReportExcel(stumpDutySearchVO);
        final ByteArrayInputStream inputStream = new ByteArrayInputStream(wbByteAry);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy_MM_dd");
        String fileName = "StampDutyReport_" + stumpDutySearchVO.getGroupCompanyCode() + "_" + sdf.format(new Date()) + stampDutyDataQryService.getStampDutyReportExcelFileType();
        headers.add("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        headers.add("access-control-expose-headers", "Content-Disposition");
        return ResponseEntity.status(HttpStatus.OK).headers(headers)
                .body(new InputStreamResource(inputStream));
    }

    @PostMapping(path = "/downloaddefaultreport", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    ResponseEntity<Resource> downloadDefaultReport(@RequestBody StumpDutySearchVO stumpDutySearchVO) throws IOException, ParseException {
        logger.info("downloadDefaultReport Start");
        HttpHeaders headers = new HttpHeaders();
        byte[] wbByteAry = stampDutyDataQryService.getStampDutyReportExcelDefault(stumpDutySearchVO);
        final ByteArrayInputStream inputStream = new ByteArrayInputStream(wbByteAry);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy_MM_dd");
        String fileName = "StampDutyReport_Default_" + stumpDutySearchVO.getGroupCompanyCode() + "_" + sdf.format(new Date()) + stampDutyDataQryService.getStampDutyReportExcelFileType();
        headers.add("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        headers.add("access-control-expose-headers", "Content-Disposition");
        return ResponseEntity.status(HttpStatus.OK).headers(headers)
                .body(new InputStreamResource(inputStream));
    }
}

package com.trafigura.situ.controller;

import com.trafigura.situ.model.DocumentHeadDTO;
import com.trafigura.situ.model.DocumentInfoVO;
import com.trafigura.situ.model.RateConfigurationVO;
import com.trafigura.situ.service.*;
import com.trafigura.situ.utils.SituResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/Situ")
public class SituCmdController {
    @Autowired
    UploadJournalDumpService uploadJournalDumpService;
    @Autowired
    UploadARAPToCPMappingService uploadARAPToCPMappingService;
    @Autowired
    UploadARAPToTradeMappingService uploadARAPToTradeMappingService;
    @Autowired
    UploadLegalEntityDetailsService uploadLegalEntityDetailsService;
    @Autowired
    RateConfigurationService rateConfigurationService;

//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<SituResponse<DocumentInfoVO>> handleValidationExceptions(
//            Exception ex) {
//        ex.printStackTrace();
////        final ByteArrayOutputStream out = new ByteArrayOutputStream();
////        final PrintWriter printWriter = new PrintWriter(new PrintStream(out));
////        ex.printStackTrace(printWriter);
//        final ByteArrayOutputStream out = new ByteArrayOutputStream();
//        final PrintWriter printWriter = new PrintWriter(out,true);
//
//        ex.printStackTrace(printWriter);
//
//        final SituResponse<DocumentInfoVO> response = new SituResponse<>();
//        response.getErrors().add(new ErrorMessage(String.valueOf(HttpStatus.BAD_REQUEST.value()), ex.getMessage()));
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).body(response);
//    }

    private final static Logger logger = LoggerFactory.getLogger(SituCmdController.class);

    //    @PreAuthorize("hasAnyRole('ROLE_GST','ROLE_SUPER_GST')")
    @RequestMapping(value = "/accountingupload/journaldump", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<SituResponse<DocumentInfoVO>> journaldump(
            @RequestPart(value = "file") MultipartFile documentToStore,
            @RequestPart(value = "documentHeadDTO") DocumentHeadDTO documentHeadDTO) throws Exception {
        logger.info("journaldump Start");
        SituResponse<DocumentInfoVO> successfulResponse = new SituResponse<>();
        documentHeadDTO.setFileName(documentToStore.getOriginalFilename());
        DocumentInfoVO data = uploadJournalDumpService.uploadJournalDump(documentToStore, documentHeadDTO);
        successfulResponse.setData(data);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(successfulResponse);
    }

    //    @PreAuthorize("hasAnyRole('ROLE_GST','ROLE_SUPER_GST')")
    @RequestMapping(value = "/accountingupload/ARAPToCPMapping", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<SituResponse<DocumentInfoVO>> ARAPToCPMapping(
            @RequestPart(value = "file") MultipartFile documentToStore,
            @RequestPart(value = "documentHeadDTO") DocumentHeadDTO documentHeadDTO) throws Exception {
        logger.info("ARAPToCPMapping Start");
        SituResponse<DocumentInfoVO> successfulResponse = new SituResponse<>();
        documentHeadDTO.setFileName(documentToStore.getOriginalFilename());
        DocumentInfoVO data = uploadARAPToCPMappingService.uploadARAPToCPMapping(documentToStore, documentHeadDTO);
        successfulResponse.setData(data);
//        successfulResponse.setData(uploadARAPToCPMappingService.uploadARAPToCPMapping(documentToStore, documentHeadDTO));
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(successfulResponse);
    }

    //    @PreAuthorize("hasAnyRole('ROLE_GST','ROLE_SUPER_GST')")
    @RequestMapping(value = "/accountingupload/ARAPToTraderMapping", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<SituResponse<DocumentInfoVO>> ARAPToTraderMapping(
            @RequestPart(value = "file") MultipartFile documentToStore,
            @RequestPart(value = "documentHeadDTO") DocumentHeadDTO documentHeadDTO) throws Exception {
        logger.info("ARAPToTraderMapping Start");
        SituResponse<DocumentInfoVO> successfulResponse = new SituResponse<>();
        documentHeadDTO.setFileName(documentToStore.getOriginalFilename());
        DocumentInfoVO data = uploadARAPToTradeMappingService.uploadARAPToTradeMapping(documentToStore, documentHeadDTO);
        successfulResponse.setData(data);
//        successfulResponse.setData(uploadARAPToTradeMappingService.uploadARAPToTradeMapping(documentToStore, documentHeadDTO));
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(successfulResponse);
    }

    //    @PreAuthorize("hasAnyRole('ROLE_GST','ROLE_SUPER_GST')")
    @RequestMapping(value = "/accountingupload/LegalEntityDetails", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<SituResponse<DocumentInfoVO>> LegalEntityDetails(
            @RequestPart(value = "file") MultipartFile documentToStore,
            @RequestPart(value = "documentHeadDTO") DocumentHeadDTO documentHeadDTO) throws Exception {
        logger.info("LegalEntityDetails Start");
        SituResponse<DocumentInfoVO> successfulResponse = new SituResponse<>();
        documentHeadDTO.setFileName(documentToStore.getOriginalFilename());
        DocumentInfoVO data = uploadLegalEntityDetailsService.uploadLegalEntityDetails(documentToStore, documentHeadDTO);
        successfulResponse.setData(data);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(successfulResponse);
    }


    @RequestMapping(value = "/rateconfiguration/saverate", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SituResponse<RateConfigurationVO>> saveRate(@RequestBody RateConfigurationVO rateConfigurationVO) {
        logger.info("saveRate Start");
        SituResponse<RateConfigurationVO> successfulResponse = new SituResponse<>();
        successfulResponse.setData(rateConfigurationService.saveConfiguration(rateConfigurationVO));
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(successfulResponse);
    }

    @RequestMapping(value = "/rateconfiguration/deleterate/{rateID}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SituResponse<Boolean>> deleteRate(@PathVariable(name = "rateID") Long rateID) {
        logger.info("deleteRate Start");
        SituResponse<Boolean> successfulResponse = new SituResponse<>();
        successfulResponse.setData(rateConfigurationService.deleteConfiguration(rateID));
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(successfulResponse);
    }


}

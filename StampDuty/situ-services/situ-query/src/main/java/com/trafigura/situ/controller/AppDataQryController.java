package com.trafigura.situ.controller;

import com.trafigura.onedesk.utils.UserUtils;
import com.trafigura.situ.model.*;
import com.trafigura.situ.security.model.AppAccountsDTO;
import com.trafigura.situ.service.ConfigurationDataService;
import com.trafigura.situ.service.StampDutyDataQryService;
import com.trafigura.situ.utils.GroupCompany;
import com.trafigura.situ.utils.SituResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController(value = "/api/query")
public class AppDataQryController {
    @Autowired
    StampDutyDataQryService stampDutyDataQryService;
    @Autowired
    ConfigurationDataService configurationDataService;
    @Autowired
    GroupCompany groupCompany;

    private final static Logger logger = LoggerFactory.getLogger(AppDataQryController.class);

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

    @PostMapping(path = "/reportgeneration", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<SituResponse<List<ReportGenerationVO>>> reportGeneration(@RequestBody StumpDutySearchVO stumpDutySearchVO) {
        logger.info("reportGeneration Start");
        SituResponse<List<ReportGenerationVO>> retVal = new SituResponse<>();
        retVal.setData(stampDutyDataQryService.getStampDutyReportData(stumpDutySearchVO));
        return ResponseEntity.status(HttpStatus.OK).body(retVal);
    }

    @PostMapping(path = "/docinfo", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<SituResponse<List<DocumentInfoVO>>> docInfo(@RequestBody DocumentInfoVO documentInfoVO) {
        logger.info("docInfo Start");
        SituResponse<List<DocumentInfoVO>> retVal = new SituResponse<>();
        retVal.setData(stampDutyDataQryService.getDocInfo());
        return ResponseEntity.status(HttpStatus.OK).body(retVal);
    }

    @GetMapping(path = "/viewmessage/{docID}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<SituResponse<List<SystemMessageVO>>> viewMessage(@PathVariable(name = "docID") Long docID) {
        logger.info("viewMessage Start");
        SituResponse<List<SystemMessageVO>> retVal = new SituResponse<>();
        retVal.setData(stampDutyDataQryService.getMessageInfo(docID));
        return ResponseEntity.status(HttpStatus.OK).body(retVal);
    }

    @GetMapping(path = "/groupcompany/list")
    ResponseEntity<SituResponse<List<GroupCompanyVO>>> getGroupCompanyList() {
        logger.info("getGroupCompanyList Start");
        SituResponse<List<GroupCompanyVO>> retVal = new SituResponse<>();
        retVal.setData(groupCompany.getGroupCompanyList());
        return ResponseEntity.status(HttpStatus.OK).body(retVal);
    }

    @GetMapping(path = "/getgcstampdutytemplate/list")
    ResponseEntity<SituResponse<List<GCStampDutyTemplateVO>>> getGCStampDutyTemplateList() {
        logger.info("getGCStampDutyTemplateList Start");
        SituResponse<List<GCStampDutyTemplateVO>> retVal = new SituResponse<>();
        retVal.setData(groupCompany.getGCStampDutyTemplateList());
        return ResponseEntity.status(HttpStatus.OK).body(retVal);
    }

    @RequestMapping(value = "/userDetail", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<SituResponse<AppAccountsDTO>> userDetail() {
        logger.info("userDetail Start");
        SituResponse<AppAccountsDTO> successfulResponse = new SituResponse<>();
        final AppAccountsDTO userDetails = (AppAccountsDTO) UserUtils.getCurrentUserDetails().orElse(null);
        successfulResponse.setData(userDetails);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(successfulResponse);
    }

    @GetMapping(path = "/getrateconfigurationinfo/{rateID}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<SituResponse<RateConfigurationVO>> getRateConfigurationInfo(@PathVariable(name = "rateID") Long rateID) {
        logger.info("getRateConfigurationInfo Start");
        SituResponse<RateConfigurationVO> retVal = new SituResponse<>();
        retVal.setData(configurationDataService.getRateByID(rateID));
        return ResponseEntity.status(HttpStatus.OK).body(retVal);
    }

    @GetMapping(path = "/getrateconfigurationinfolist", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<SituResponse<List<RateConfigurationVO>>> getRateConfigurationInfoList() {
        logger.info("getRateConfigurationInfoList Start");
        SituResponse<List<RateConfigurationVO>> retVal = new SituResponse<>();
        retVal.setData(configurationDataService.getRateConfigurationVOInfoList());
        return ResponseEntity.status(HttpStatus.OK).body(retVal);
    }


}

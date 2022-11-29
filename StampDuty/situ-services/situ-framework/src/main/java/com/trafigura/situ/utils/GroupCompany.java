package com.trafigura.situ.utils;


import com.trafigura.situ.domain.GroupCompanyEntity;
import com.trafigura.situ.domain.LegalEntityDetailsEntity;
import com.trafigura.situ.mapper.GCStampDutyTemplateMapper;
import com.trafigura.situ.mapper.GroupCompanyMapper;
import com.trafigura.situ.model.GCStampDutyTemplateVO;
import com.trafigura.situ.model.GroupCompanyVO;
import com.trafigura.situ.repository.GCStampDutyTemplateRepository;
import com.trafigura.situ.repository.GroupCompanyRepository;
import com.trafigura.situ.repository.LegalEntityDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupCompany {
    @Autowired
    GroupCompanyRepository groupCompanyRepository;
    @Autowired
    GroupCompanyMapper groupCompanyMapper;
    @Autowired
    GCStampDutyTemplateRepository gcStampDutyTemplateRepository;
    @Autowired
    GCStampDutyTemplateMapper gcStampDutyTemplateMapper;
    @Autowired
    LegalEntityDetailsRepository legalEntityDetailsRepository;

//    private static class TTS {
//        public static String getGroupCompanyCode() {
//            return "TTS";
//        }
//
//        public static String getGroupCompanyCNName() {
//            return "托克投资（中国）有限公司";
//        }
//
//        public static String getGroupCompanyTaxID() {
//            return "913100007178590583";
//        }
//    }
//
//    private static class TEZ {
//        public static String getGroupCompanyCode() {
//            return "TEZ";
//        }
//
//        public static String getGroupCompanyCNName() {
//            return "托克能源（浙江）有限公司";
//        }
//
//        public static String getGroupCompanyTaxID() {
//            return "91330901MA2A2TGQ4M";
//        }
//    }
//
//    private static class LCC {
//        public static String getGroupCompanyCode() {
//            return "LCC";
//        }
//
//        public static String getGroupCompanyCNName() {
//            return "利可昇信息技术有限公司";
//        }
//
//        public static String getGroupCompanyTaxID() {
//            return "91500000MA5YR06C0L";
//        }
//    }
//
//    private static class TCL {
//        public static String getGroupCompanyCode() {
//            return "TCL";
//        }
//
//        public static String getGroupCompanyCNName() {
//            return "宁波创坤贸易有限公司";
//        }
//
//        public static String getGroupCompanyTaxID() {
//            return "91330206062928322P";
//        }
//    }
//
//    private static class TTH {
//        public static String getGroupCompanyCode() {
//            return "TTH";
//        }
//
//        public static String getGroupCompanyCNName() {
//            return "托克贸易（海南）有限公司";
//        }
//
//        public static String getGroupCompanyTaxID() {
//            return "91460300MA5TQNPP0Y";
//        }
//    }
//
//    private static class TTY {
//        public static String getGroupCompanyCode() {
//            return "TTY";
//        }
//
//        public static String getGroupCompanyCNName() {
//            return "托克金通贸易（上海）有限公司";
//        }
//
//        public static String getGroupCompanyTaxID() {
//            return "91310000599730930E";
//        }
//    }
//
//    public static String getGroupCompanyCNNameByCode(String groupCompanyCode) {
//        if (groupCompanyCode == null) {
//            return null;
//        }
//        switch (groupCompanyCode.toUpperCase()) {
//            case "TTS":
//                return TTS.getGroupCompanyCNName();
//            case "TEZ":
//                return TEZ.getGroupCompanyCNName();
//            case "LCC":
//                return LCC.getGroupCompanyCNName();
//            case "TCL":
//                return TCL.getGroupCompanyCNName();
//            case "TTH":
//                return TTH.getGroupCompanyCNName();
//            case "TTY":
//                return TTY.getGroupCompanyCNName();
//            default:
//                return "";
//        }
//
//    }
//
//    public static String getGroupCompanyTaxIDByCode(String groupCompanyCode) {
//        if (groupCompanyCode == null) {
//            return null;
//        }
//        switch (groupCompanyCode.toUpperCase()) {
//            case "TTS":
//                return TTS.getGroupCompanyTaxID();
//            case "TEZ":
//                return TEZ.getGroupCompanyTaxID();
//            case "LCC":
//                return LCC.getGroupCompanyTaxID();
//            case "TCL":
//                return TCL.getGroupCompanyTaxID();
//            case "TTH":
//                return TTH.getGroupCompanyTaxID();
//            case "TTY":
//                return TTY.getGroupCompanyTaxID();
//            default:
//                return "";
//        }
//
//    }
//
//  //    public static List<String> groupCompanyCNNameList =
//            Arrays.asList(TTS.getGroupCompanyCNName(),
//                    TEZ.getGroupCompanyCNName(),
//                    LCC.getGroupCompanyCNName(),
//                    TCL.getGroupCompanyCNName(),
//                    TTH.getGroupCompanyCNName(),
//                    TTY.getGroupCompanyCNName());

    public List<String> getGroupCompanyCNNameList() {
        return groupCompanyRepository.getGroupCompanyNameList();
    }

    public String getGroupCompanyCNNameByCode(String groupCompanyCode) {
        GroupCompanyEntity groupCompanyEntity = groupCompanyRepository.findByGroupCompanyCode(groupCompanyCode);
        if (groupCompanyEntity != null) return groupCompanyEntity.getGroupCompanyCNName();
        return "";
    }

    public String getGroupCompanyTaxIDByCode(String groupCompanyCode) {
        //return legalEntityDetailsRepository.findTaxIDByLeCNName(this.getGroupCompanyCNNameByCode(groupCompanyCode));
        LegalEntityDetailsEntity legalEntityDetailsEntity = legalEntityDetailsRepository.findTopByLECNName(this.getGroupCompanyCNNameByCode(groupCompanyCode));
        if (legalEntityDetailsEntity != null) return legalEntityDetailsEntity.getLETaxID();
        return "";
    }

    public String getGroupCompanyTaxIDByCNName(String groupCompanyCNName) {
        //return legalEntityDetailsRepository.findTaxIDByLeCNName(groupCompanyCNName);
        LegalEntityDetailsEntity legalEntityDetailsEntity = legalEntityDetailsRepository.findTopByLECNName(groupCompanyCNName);
        if (legalEntityDetailsEntity != null) return legalEntityDetailsEntity.getLETaxID();
        return "";
    }

    public List<GroupCompanyVO> getGroupCompanyList() {
        return groupCompanyRepository.findAll(Sort.by(Sort.Direction.DESC, "groupCompanyID")).stream()
                .map(e -> groupCompanyMapper.entityToVO(e)).collect(Collectors.toList());
    }

    public List<GCStampDutyTemplateVO> getGCStampDutyTemplateList() {
        return gcStampDutyTemplateRepository.findAll(Sort.by(Sort.Direction.DESC, "gcStampDutyTemplateID")).stream()
                .map(e -> gcStampDutyTemplateMapper.entityToVO(e)).collect(Collectors.toList());
    }

    public int getGCStampDutyTemplateID(String groupCompanyCode){
        GroupCompanyEntity groupCompanyEntity = groupCompanyRepository.findByGroupCompanyCode(groupCompanyCode);
        if (groupCompanyEntity != null) return groupCompanyEntity.getGcStampDutyTemplateID().intValue();
        return -1;
    }
}

package org.eggsoft.cn.Service;

import org.eggsoft.cn.Repository.DictionaryRepository;
import org.eggsoft.cn.beans.Dictionary;
import org.eggsoft.cn.beans.TeamPlayerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("dictionaryService")
public class DictionaryService {

    @Autowired
    private DictionaryRepository dictionaryRepository;




    public List<Dictionary> getListBType(String  strType){
        //return null;
        return dictionaryRepository.findListByType(strType);
    }

    public List<Dictionary> getListBTypeAndName(String  strType,String  strName){
        //return null;
        return dictionaryRepository.findListByTypeAndName(strType,strName);
    }


    public Dictionary save(Dictionary u){
        return dictionaryRepository.save(u);
    }

    public List<Dictionary> saveAll(List<Dictionary> u){
        return dictionaryRepository.saveAll(u);
    }
}

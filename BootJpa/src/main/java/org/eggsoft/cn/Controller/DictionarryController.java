package org.eggsoft.cn.Controller;

import org.eggsoft.cn.Service.DictionaryService;
import org.eggsoft.cn.beans.Dictionary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dictionary")
public class DictionarryController {
    @Autowired
    private DictionaryService dictionaryService;




    @GetMapping(value = "/list/{strType}")
    public List<Dictionary> querylist(@PathVariable("strType") String strType) {
        return dictionaryService.getListBType(strType);
    }
///https://blog.csdn.net/qq_42651201/article/details/122365650 jpa常用查询方法使用总结&自定义sql查询

    @GetMapping(value = "/list/{strType}/{strName}")
    public List<Dictionary> querytypeandnamelist(@PathVariable("strType") String strType,@PathVariable("strName") String strName) {
        return dictionaryService.getListBTypeAndName(strType,strName);
    }


    @RequestMapping(method = RequestMethod.POST, value = "/save")
    public Dictionary save(@RequestBody Dictionary dictionary) {
        dictionaryService.save(dictionary);
        //Assert.assertNotNull(student.getId());
        return  dictionary;
    }

//https://blog.csdn.net/qq_38974638/article/details/120070128 JPA 内置方法使用（保存方法、删除方法、查询方法）
    @RequestMapping(method = RequestMethod.POST, value = "/saveAll")
    public List<Dictionary> saveAll(@RequestBody List<Dictionary> dictionaryList) {
        dictionaryService.saveAll(dictionaryList);
        //Assert.assertNotNull(student.getId());
        return  dictionaryList;
    }
}

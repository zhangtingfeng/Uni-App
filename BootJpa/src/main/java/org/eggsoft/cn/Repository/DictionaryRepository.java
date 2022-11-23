package org.eggsoft.cn.Repository;



import org.eggsoft.cn.beans.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {



    public List findListByTypeAndName(String strType,String strName);
    public List findListByType(String strType);
}

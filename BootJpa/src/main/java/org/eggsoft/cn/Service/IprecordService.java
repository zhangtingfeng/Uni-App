package org.eggsoft.cn.Service;


import org.eggsoft.cn.Repository.IpRecordRepository;
import org.eggsoft.cn.Repository.UserRepository;
import org.eggsoft.cn.beans.Iprecord;
import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("iprecordService")
public class IprecordService {
    @Autowired
    private IpRecordRepository ipRecordRepository;

    public List<Iprecord> getAllList(){
        return ipRecordRepository.findAll();
    }
    public Iprecord save(Iprecord u){
        return ipRecordRepository.save(u);
    }


}
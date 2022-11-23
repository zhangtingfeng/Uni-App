package org.eggsoft.cn.Repository;


import org.eggsoft.cn.beans.Iprecord;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;



@Repository
public interface IpRecordRepository extends JpaRepository<Iprecord, Long>{

    //默认提供了Optional<User> findById(Long id);




}
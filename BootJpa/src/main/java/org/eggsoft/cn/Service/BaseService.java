package org.eggsoft.cn.Service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

public class BaseService {
    @Autowired
    protected EntityManager entityManager;
    protected JPAQueryFactory jpaQueryFactory;

    @PostConstruct
    public void init(){
        jpaQueryFactory = new JPAQueryFactory(entityManager);
    }
}

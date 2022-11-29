package org.eggsoft.cn.Service;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.QBean;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import org.eggsoft.cn.Repository.TeamPlayerRepository;
import org.eggsoft.cn.Repository.UserRepository;
import org.eggsoft.cn.beans.QTeamPlayer;
import org.eggsoft.cn.beans.QTeamPlayerConfig;
import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service("teamPlayerService")
public class TeamPlayerService extends BaseService {

    @Autowired
    private TeamPlayerRepository teamPlayerRepository;

    public TeamPlayer getByID(Long id){
        return teamPlayerRepository.findById(id).get();
    }



    public List<TeamPlayer> getByNickname(String name){
        return teamPlayerRepository.findByNicknameLike(name);
    }

    public List<TeamPlayer> getAllList(){
        return teamPlayerRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public Page<TeamPlayer> getAllListPage(){
        return teamPlayerRepository.findAll(PageRequest.of(0, 1, Sort.by(Sort.Direction.ASC, "id")));
    }

    public TeamPlayer save(TeamPlayer u){
        return teamPlayerRepository.save(u);
    }

///https://blog.csdn.net/dndndnnffj/article/details/110648249 SpringData-JPA QueryDSL 快速入门
    public void getQDSLAllList(){
        QTeamPlayer mtProductInfo = QTeamPlayer.teamPlayer;

        JPAQuery<TeamPlayer> query = jpaQueryFactory.select(QTeamPlayer.teamPlayer).from(mtProductInfo);
        BooleanExpression c = mtProductInfo.id.eq(2L).or(mtProductInfo.id.eq(1L)).or(mtProductInfo.id.eq(3L));
        JPAQuery<TeamPlayer> where = query.where(c);
        List<TeamPlayer> fetch1 = where.fetch();
        System.out.println(fetch1);


    }


    public  List<Map>  getTupleQDSLAllList(){
        QTeamPlayer qTeamPlayer = QTeamPlayer.teamPlayer;
        QTeamPlayerConfig qTeamPlayerConfig = QTeamPlayerConfig.teamPlayerConfig;

        //创建查询内容和查询条件
        List<Tuple> fetch = jpaQueryFactory.select(qTeamPlayer.id, qTeamPlayer.nickname, qTeamPlayerConfig.configname)
                .from(qTeamPlayer, qTeamPlayerConfig)
                .where(qTeamPlayer.id.eq(qTeamPlayerConfig.teamplayerid)) //2表联查关系
                .fetch();

        //处理查询结果 封装为map
        List<Map> collect = fetch.stream().map(o -> {
            Map map = new HashMap();
            map.put("id", o.get(qTeamPlayer.id));
            map.put("name", o.get(qTeamPlayer.nickname));
            map.put("configname", o.get(qTeamPlayerConfig.configname));
            return map;
        }).collect(Collectors.toList());
return collect;

    }


    public List<TeamPlayer> getQDSLAllListOR_AND(){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<TeamPlayer> query = cb.createQuery(TeamPlayer.class);
        Root<TeamPlayer> root = query.from(TeamPlayer.class);
        Predicate id = cb.equal(root.get("id"), 1);
        Predicate id1 = cb.like(root.get("nickname"), "%9%");
        Predicate or = cb.or(id, id1);
        query.where(or);




        query.orderBy(cb.asc(root.get("id")));
        List<TeamPlayer> resultList = entityManager.createQuery(query).getResultList();
        resultList.forEach(r -> {
            r.setNickname("1");
        });
        //System.out.println(one);
        System.out.println(resultList);

        return resultList;



    }
}
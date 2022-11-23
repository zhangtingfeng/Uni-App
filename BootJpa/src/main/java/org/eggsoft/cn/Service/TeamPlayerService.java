package org.eggsoft.cn.Service;

import org.eggsoft.cn.Repository.TeamPlayerRepository;
import org.eggsoft.cn.Repository.UserRepository;
import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.User;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("teamPlayerService")
public class TeamPlayerService {

    @Autowired
    private TeamPlayerRepository teamPlayerRepository;

    public TeamPlayer getByID(Long id){
        return teamPlayerRepository.findById(id).get();
    }


    @PersistenceContext
    private EntityManager em;




    public List<TeamPlayer> getByNickname(String name){
        return teamPlayerRepository.findByNicknameLike(name);
    }


    public List<TeamPlayer> findByNicknameLikeNotDelete(String name){
        return teamPlayerRepository.findByNicknameLikeNotDelete(name);
    }

    @Transactional // 事务的注解
    public TeamPlayer save(TeamPlayer u){
        return teamPlayerRepository.save(u);
    }

    public void testentityManager(){

        List<Object[]> list = em
                .createQuery("select id from player_teamplayer c")
                .getResultList();

        System.out.println(list);
    }

    public List<TeamPlayer> getAllList(){
        return teamPlayerRepository.findAll();
    }

    public TeamPlayer save(TeamPlayer u){
        return teamPlayerRepository.save(u);
    }

}

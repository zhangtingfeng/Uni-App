package org.eggsoft.cn.Service;

import org.eggsoft.cn.Repository.TeamPlayerRepository;
import org.eggsoft.cn.Repository.UserRepository;
import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.User;
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



    public List<TeamPlayer> getByNickname(String name){
        return teamPlayerRepository.findByNicknameLike(name);
    }

    public List<TeamPlayer> getAllList(){
        return teamPlayerRepository.findAll();
    }

    public TeamPlayer save(TeamPlayer u){
        return teamPlayerRepository.save(u);
    }
}
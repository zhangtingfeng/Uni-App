package org.eggsoft.cn.Service;

import org.eggsoft.cn.Repository.TeamPlayerConfigRepository;
import org.eggsoft.cn.beans.Dictionary;
import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.TeamPlayerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("teamPlayerConfigService")
public class TeamPlayerConfigService {

    @Autowired
    private TeamPlayerConfigRepository teamPlayerConfigRepository;




    public List<TeamPlayerConfig> getListByTeamplayerID(Long teamplayerID){
        //return null;
        return teamPlayerConfigRepository.findListByTeamplayerid(teamplayerID);
    }


    public TeamPlayerConfig save(TeamPlayerConfig u){
        return teamPlayerConfigRepository.save(u);
    }

    public List<TeamPlayerConfig> saveAll(List<TeamPlayerConfig> u){
        return teamPlayerConfigRepository.saveAll(u);
    }
}
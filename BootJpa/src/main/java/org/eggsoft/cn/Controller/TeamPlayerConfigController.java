package org.eggsoft.cn.Controller;

import org.eggsoft.cn.Service.TeamPlayerConfigService;

import org.eggsoft.cn.Service.TeamPlayerService;
import org.eggsoft.cn.beans.Dictionary;
import org.eggsoft.cn.beans.TeamPlayerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teamPlayerConfig")
public class TeamPlayerConfigController {
    @Autowired
    private TeamPlayerConfigService teamPlayerServiceConfig;

    @Autowired
    private TeamPlayerService teamPlayerService;

    @RequestMapping(method = RequestMethod.POST, value = "/insert")
    public TeamPlayerConfig insert(@RequestBody TeamPlayerConfig teamPlayerConfig) {



        teamPlayerServiceConfig.save(teamPlayerConfig);
        return  teamPlayerConfig;
    }

    @GetMapping(value = "/list/{TeamplayerID}")
    public List<TeamPlayerConfig> querylist(long TeamplayerID) {

        return teamPlayerServiceConfig.getListByTeamplayerID((long)2);

    }


    @RequestMapping(method = RequestMethod.POST, value = "/saveAll")
    synchronized public List<TeamPlayerConfig> saveAll(@RequestBody List<TeamPlayerConfig> TeamPlayerConfigList) {
        teamPlayerServiceConfig.saveAll(TeamPlayerConfigList);
        //Assert.assertNotNull(student.getId());
        return  TeamPlayerConfigList;
    }
}

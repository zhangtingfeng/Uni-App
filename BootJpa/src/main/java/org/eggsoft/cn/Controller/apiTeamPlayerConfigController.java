package org.eggsoft.cn.Controller;

import org.eggsoft.cn.Service.TeamPlayerConfigService;

import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.TeamPlayerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/apiTeamPlayerConfig")
public class apiTeamPlayerConfigController {
    @Autowired
    private TeamPlayerConfigService teamPlayerServiceConfig;


    @RequestMapping(method = RequestMethod.POST, value = "/insert")
    public TeamPlayerConfig insert(@RequestBody TeamPlayerConfig teamPlayerConfig) {

        teamPlayerServiceConfig.save(teamPlayerConfig);
        return  teamPlayerConfig;
    }

    @GetMapping(value = "/list/{TeamplayerID}")
    public List<TeamPlayerConfig> querylist(long TeamplayerID) {

        return teamPlayerServiceConfig.getListByTeamplayerID((long)2);

    }
}

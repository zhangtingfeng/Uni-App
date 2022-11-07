package org.eggsoft.cn.Controller;

import org.eggsoft.cn.Service.TeamPlayerService;
import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.TeamPlayerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/teamPlayer")
public class TeamPlayerController {
    @Autowired
    private TeamPlayerService teamPlayerService;


    @RequestMapping(method = RequestMethod.POST, value = "/insert")
    public TeamPlayer insert(@RequestBody TeamPlayer teamPlayer) {

        teamPlayerService.save(teamPlayer);
        return  teamPlayer;
    }

    @GetMapping(value = "/list")
    public List<TeamPlayer> querylist() {

        return teamPlayerService.getAllList();

    }

    @GetMapping(value = "/getTeamPlayer/{operationtype}/{playerid}")
    public TeamPlayer getTeamPlayer(@PathVariable("operationtype") String operationtype,@PathVariable("playerid") String playerid)
    {
        if (operationtype.equals("add")) {
            TeamPlayer tTeamPlayer=new TeamPlayer();
           /* List<TeamPlayerConfig> teamPlayerConfigList=new ArrayList<TeamPlayerConfig>();
            TeamPlayerConfig teamPlayerConfig=new TeamPlayerConfig();
            teamPlayerConfigList.add(teamPlayerConfig);
            tTeamPlayer.setTeamPlayerConfig(teamPlayerConfigList);*/
            return tTeamPlayer;
        } else if (operationtype.equals("modify")) {
            return new TeamPlayer();
        }
        return null;
    }
}

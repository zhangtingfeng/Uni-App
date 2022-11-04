package org.eggsoft.cn.Controller;

import org.eggsoft.cn.Service.TeamPlayerService;
import org.eggsoft.cn.beans.TeamPlayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/apiTeamPlayer")
public class apiTeamPlayerController {
    @Autowired
    private TeamPlayerService teamPlayerService;


    @RequestMapping(method = RequestMethod.POST, value = "/insert")
    public TeamPlayer insert(@RequestBody TeamPlayer teamPlayer) {

        teamPlayerService.save(teamPlayer);
        return  teamPlayer;
    }

    @GetMapping(value = "/list")
    public List<TeamPlayer> querylist() {

        return teamPlayerService.getByNickname("%0%");

    }
}

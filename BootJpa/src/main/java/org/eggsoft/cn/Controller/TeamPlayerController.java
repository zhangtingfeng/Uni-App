package org.eggsoft.cn.Controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.eggsoft.cn.Service.DictionaryService;
import org.eggsoft.cn.Service.TeamPlayerService;
import org.eggsoft.cn.beans.Dictionary;
import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.TeamPlayerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Stream;

@RestController
@RequestMapping("/teamPlayer")
public class TeamPlayerController {
    @Autowired
    private TeamPlayerService teamPlayerService;

    @Autowired
    private DictionaryService dictionaryService;





    @RequestMapping(method = RequestMethod.POST, value = "/insert")
    public TeamPlayer insert(@RequestBody TeamPlayer teamPlayer) {

        teamPlayerService.save(teamPlayer);
        return teamPlayer;
    }

    @GetMapping(value = "/list")
    public List<TeamPlayer> querylist() {

        return teamPlayerService.getAllList();

    }

    @GetMapping(value = "/Caculist")
    public JSONObject Caculist() {
        List<TeamPlayer> TeamPlayerAllList = teamPlayerService.getAllList();
        List<Dictionary> myDictionaryList1 = dictionaryService.getListBTypeAndName("fix", "数据准确率");
        List<Dictionary> myDictionaryList2 = dictionaryService.getListBTypeAndName("fix", "几人一组");

        List<Dictionary> myDictionaryListCustom = dictionaryService.getListBType("Custome");

        if (myDictionaryList1.size() == 0 || myDictionaryList2.size() == 0) {
            return null;
        }
        ArrayList<TeamPlayer> arrayActiveList = new ArrayList<TeamPlayer>();
        ArrayList<TeamPlayer> arrayInactiveList = new ArrayList<TeamPlayer>();
        ArrayList<JSONObject> listJSONObject=new ArrayList<JSONObject>();


        for (int i = 0; i < TeamPlayerAllList.size(); i++) {
            TeamPlayer teamPlayer=TeamPlayerAllList.get(i);
            JSONObject object = new JSONObject();
            object.put("teamid", teamPlayer.getId().toString());
            object.put("TeamPlayer", teamPlayer);

            double numdouble=0;
            for (TeamPlayerConfig teamPlayerConfig : teamPlayer.getTeamPlayerConfig()) {
                for (Dictionary dictionary : myDictionaryListCustom) {
                   if (teamPlayerConfig.getConfigname().equals(dictionary.getName())){
                       numdouble+=teamPlayerConfig.getValue()*dictionary.getValue();
                       System.out.println("teamPlayerConfig.getValue()*dictionary.getValue()="+teamPlayerConfig.getValue()+"*"+dictionary.getValue());
                   }
                }
            }
            double doubleValue=myDictionaryList1.get(0).getValue();
            double doublerandom=getRandom(doubleValue, 1);
            object.put("showFixvalue", numdouble);
            numdouble=numdouble*doublerandom;
            System.out.println("numdouble="+numdouble);
            object.put("showCalavalue", numdouble);


            listJSONObject.add(object);

            //teamPlayer.["ddd"]=999;
        }

        ArrayList<JSONObject> listJSONActiveObject=new ArrayList<JSONObject>();
        ArrayList<JSONObject> listJSONInActiveObject=new ArrayList<JSONObject>();
        for (int i = 0; i < listJSONObject.size(); i++) {
            TeamPlayer TeamPlayerActive=(TeamPlayer)listJSONObject.get(i).get("TeamPlayer");
            if (TeamPlayerActive.getActive()==1){
                listJSONActiveObject.add(listJSONObject.get(i));
            }
            else{
                listJSONInActiveObject.add(listJSONObject.get(i));
            }
        }


        JSONObject object = new JSONObject();
        object.put("listJSONActiveObject", listJSONActiveObject);
        object.put("listJSONInActiveObject", listJSONInActiveObject);

        return object;

    }

    @GetMapping(value = "/getTeamPlayer/{operationtype}/{playerid}")
    public TeamPlayer getTeamPlayer(@PathVariable("operationtype") String operationtype, @PathVariable("playerid") String playerid) {
        if (operationtype.equals("add")) {
            TeamPlayer tTeamPlayer = new TeamPlayer();
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


    public double getRandom(double mindouble, double maxdouble)
    {

        int min=(int)(mindouble*100);
        int max=(int)(maxdouble*100);

        Random random = new Random();

// 先取0-max之间随机数，再对max - min + 1取余，最后加上min，就是最终随机数
        int s = random.nextInt(max) % (max - min + 1) + min;
        return (s*1.0)/100;
    }
}

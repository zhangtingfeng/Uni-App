package org.eggsoft.cn.Controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.core.JsonParser;
import org.eggsoft.cn.Service.DictionaryService;
import org.eggsoft.cn.Service.TeamPlayerService;
import org.eggsoft.cn.beans.Dictionary;
import org.eggsoft.cn.beans.TeamPlayer;
import org.eggsoft.cn.beans.TeamPlayerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;
import java.util.concurrent.TimeUnit;
@RestController
@RequestMapping("/teamPlayer")
public class TeamPlayerController extends BaseController {
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

    @GetMapping(value = {"/Caculist","/Caculist/{strType}"})
    synchronized public JSONObject Caculist(@PathVariable(name="strType", required = false) final String strType) {
        String RedisKey = "JSONObjectCaculist2";
        JSONObject returnJSONObject = null;
        try {
            Object objkey = redisServiceImpl.getKey(RedisKey);
            if (objkey!=null && objkey!="" && ( strType==null)){
                //JSONObject json = new JsonParser().parse((objkey.toString()).getAsJsonObject());
                returnJSONObject = JSONObject.parseObject(objkey.toString());
                return returnJSONObject;
            }

            //Object oreturnJSONObject= getRedisData(RedisKey);
            int intCounts = 40;
            ArrayList<JSONObject> mpList = new ArrayList<JSONObject>();

///1.取磁盘配置
            List<TeamPlayer> TeamPlayerAllList = teamPlayerService.getAllList();
            List<Dictionary> myDictionaryList2 = dictionaryService.getListBTypeAndName("fix", "几人一组");

            List<Dictionary> myDictionaryListCustom = dictionaryService.getListBType("Custome");
            // 2.计算40次组间标准差
            for (int i = 0; i < intCounts; i++) {
                JSONObject object = new JSONObject();
                JSONObject CaculistAction = CaculistAction(TeamPlayerAllList, myDictionaryList2, myDictionaryListCustom);
                object.put("Standard", CaculistAction.getDoubleValue("doubleStandardcha"));
                object.put("CaculistActionOBJ", CaculistAction);
                mpList.add(object);
            }
///uni.setStorageSync(univerifyInfoKey, univerifyInfo)
            Collections.sort(mpList, new Comparator<JSONObject>() {
                @Override
                public int compare(JSONObject p1, JSONObject p2) {
                    return p2.getShortValue("Standard") - p1.getShortValue("Standard");
                }
            });

            returnJSONObject = mpList.get(intCounts - 1).getJSONObject("CaculistActionOBJ");
            String StrJson=JSONObject.toJSONString(returnJSONObject, SerializerFeature.WriteMapNullValue,SerializerFeature.DisableCircularReferenceDetect);
            redisServiceImpl.setStr(RedisKey,StrJson ,TimeUnit.SECONDS.toSeconds(24*30*60*60));//30d过期);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

        }
        // 3.输出最小的标准差的分组详情
        return returnJSONObject;

    }

    synchronized private JSONObject CaculistAction(List<TeamPlayer> TeamPlayerAllList, List<Dictionary> myDictionaryList2, List<Dictionary> myDictionaryListCustom) {


        if (myDictionaryList2.size() == 0) {
            return null;
        }
        // ArrayList<TeamPlayer> arrayActiveList = new ArrayList<TeamPlayer>();
        // ArrayList<TeamPlayer> arrayInactiveList = new ArrayList<TeamPlayer>();
        ArrayList<JSONObject> listJSONObject = new ArrayList<JSONObject>();


        for (int i = 0; i < TeamPlayerAllList.size(); i++) {
            TeamPlayer teamPlayer = TeamPlayerAllList.get(i);
            JSONObject object = new JSONObject();
            object.put("teamid", teamPlayer.getId().toString());
            object.put("TeamPlayer", teamPlayer);

            double numdouble = 0;
            for (TeamPlayerConfig teamPlayerConfig : teamPlayer.getTeamPlayerConfig()) {
                for (Dictionary dictionary : myDictionaryListCustom) {
                    if (teamPlayerConfig.getConfigname().equals(dictionary.getName())) {
                        numdouble += teamPlayerConfig.getValue() * Double.parseDouble(dictionary.getValue());
                        System.out.println("teamPlayerConfig.getValue()*dictionary.getValue()=" + teamPlayerConfig.getValue() + "*" + dictionary.getValue());
                        break;
                    }
                }
            }
            String strRange = teamPlayer.getActivepercent();
            List<Integer> JSONObjectRange = (List<Integer>) JSONObject.parse(strRange);
            //double doubleValue = Double.parseDouble(myDictionaryList1.get(0).getValue());
            double doublerandom = getRandom(JSONObjectRange.get(0), JSONObjectRange.get(1));
            object.put("showFixvalue", numdouble);
            numdouble = numdouble * doublerandom / 100.0;
            System.out.println("numdouble=" + numdouble);
            object.put("showCalavalue", numdouble);
            object.put("showCalavalueRate", doublerandom);
            object.put("showCalavalueRangeRate", JSONObjectRange);

            listJSONObject.add(object);

            //teamPlayer.["ddd"]=999;
        }

        ArrayList<JSONObject> listJSONActiveMaybeObject = new ArrayList<JSONObject>();
        ArrayList<JSONObject> listJSONInActiveObject = new ArrayList<JSONObject>();
        for (int i = 0; i < listJSONObject.size(); i++) {
            TeamPlayer TeamPlayerActive = (TeamPlayer) listJSONObject.get(i).get("TeamPlayer");
            if (TeamPlayerActive.getActive() == 1) {
                listJSONActiveMaybeObject.add(listJSONObject.get(i));
            } else {
                listJSONInActiveObject.add(listJSONObject.get(i));
            }
        }
        int intHowpeopleInoneGroup = Integer.parseInt(myDictionaryList2.get(0).getValue());
        int intGroups = (int) (listJSONActiveMaybeObject.size() / intHowpeopleInoneGroup);

        Collections.shuffle(listJSONActiveMaybeObject);
        listJSONActiveMaybeObject.subList(0, intHowpeopleInoneGroup * intGroups);

        //listJSONActiveMaybeObject = ArrayList.newArrayList(listJSONActiveMaybeObject);

        ArrayList<JSONObject> mplayingList = new ArrayList<JSONObject>(listJSONActiveMaybeObject.subList(0, intHowpeopleInoneGroup * intGroups));
        ArrayList<JSONObject> mNotplayingList = new ArrayList<JSONObject>(listJSONActiveMaybeObject.subList(intHowpeopleInoneGroup * intGroups, listJSONActiveMaybeObject.size()));
        // 使用匿名比较器排序
        Collections.sort(mplayingList, new Comparator<JSONObject>() {
            @Override
            public int compare(JSONObject p1, JSONObject p2) {
                return p2.getShortValue("showCalavalue") - p1.getShortValue("showCalavalue");
            }
        });

       /* listJSONActiveObject.forEach(p -> {
            System.out.println(JSON.toJSONString(p));
        });*/


        int intMod = mplayingList.size() % intHowpeopleInoneGroup;
        JSONObject[] ListJSONObjectintGroups = new JSONObject[intGroups];
        int[][] intTeamplayerIDList = new int[intGroups][intHowpeopleInoneGroup];
        ///分开老大
        for (int i = 0; i < intGroups; i++) {
            intTeamplayerIDList[i][0] = mplayingList.get(i).getShortValue("teamid");

            for (int j = 1; j < intHowpeopleInoneGroup; j++) {
                intTeamplayerIDList[i][j] = 0;
                int intPos = j * intGroups + i;
                if (intPos < mplayingList.size()) {
                    int intGetValue = mplayingList.get(intPos).getShortValue("teamid");
                    // int intSetPos=(i+1)*intGroups-j;
                    intTeamplayerIDList[i][j] = intGetValue;
                }
            }
        }

        int[][] intnewArrayTeamplayerIDList = new int[intHowpeopleInoneGroup][intGroups];
        for (int i = 0; i < intTeamplayerIDList.length; i++) {
            for (int j = 0; j < intTeamplayerIDList[i].length; j++) {
                intnewArrayTeamplayerIDList[j][i] = intTeamplayerIDList[i][j];
            }
        }
        for (int i = 0; i < intnewArrayTeamplayerIDList.length; i++) {
            //int[] curList=intnewArrayTeamplayerIDList[i];
            shuffleintList(intnewArrayTeamplayerIDList[i]);
        }
        int[][] intnewAfterArrayTeamplayerIDList = new int[intGroups][intHowpeopleInoneGroup];
        for (int i = 0; i < intnewArrayTeamplayerIDList.length; i++) {
            for (int j = 0; j < intnewArrayTeamplayerIDList[i].length; j++) {
                intnewAfterArrayTeamplayerIDList[j][i] = intnewArrayTeamplayerIDList[i][j];
            }
        }


        JSONObject[][] okJSONObjectTeamplayerIDList = new JSONObject[intGroups][intHowpeopleInoneGroup];
        for (int i = 0; i < intnewAfterArrayTeamplayerIDList.length; i++) {
            for (int j = 0; j < intnewAfterArrayTeamplayerIDList[i].length; j++) {
                int myTeamID = intnewAfterArrayTeamplayerIDList[i][j];

                mplayingList.stream().filter(value -> {
                    return value.getInteger("teamid") == myTeamID;
                }).collect(Collectors.toList());
                List<JSONObject> selectResult = mplayingList.stream().filter(value -> {
                    return value.getInteger("teamid") == myTeamID;
                }).collect(Collectors.toList());
                okJSONObjectTeamplayerIDList[i][j] = selectResult.get(0);
            }


        }


        //debugger;
        Integer letuUUlength = okJSONObjectTeamplayerIDList.length;
        double[] okList = new double[letuUUlength];
        double[] okshowCalavalueRateList = new double[letuUUlength];
        double allSumokshowCalavalueRateList = 0;

        for (Integer i = 0; i < letuUUlength; i++) {
            double alllNum = (double) 0;
            double alllshowCalavalueRateNum = (double) 0;

            JSONObject[] letCurList = okJSONObjectTeamplayerIDList[i];
            for (Integer j = 0; j < letCurList.length; j++) {
                alllNum = alllNum + letCurList[j].getDoubleValue("showFixvalue");
                alllshowCalavalueRateNum = alllshowCalavalueRateNum + letCurList[j].getDoubleValue("showCalavalue");
            }
            okList[i] = alllNum;
            okshowCalavalueRateList[i] = alllshowCalavalueRateNum;

            allSumokshowCalavalueRateList += alllshowCalavalueRateNum;//计算平均值：
        }

        //计算平均值 计算方差：
        double doublePingJun = allSumokshowCalavalueRateList / letuUUlength;
        double[] FangChashowCalavalueRateList = new double[letuUUlength];
        double doublePingJunFangcha = 0;
        for (Integer i = 0; i < letuUUlength; i++) {
            FangChashowCalavalueRateList[i] = (Math.pow(okshowCalavalueRateList[i] - doublePingJun, 2));
            doublePingJunFangcha += FangChashowCalavalueRateList[i];
        }
        double doubleStandardcha = Math.sqrt(doublePingJunFangcha / letuUUlength);


        JSONObject object = new JSONObject();
        object.put("Mod", intMod);
        object.put("listJSONPlayingObject", mplayingList);
        object.put("listJSONNotPlayingObject", mNotplayingList);
        object.put("listJSONInActiveObject", listJSONInActiveObject);
        object.put("GroupTeamplayerIDList", intTeamplayerIDList);
        object.put("intnewArrayTeamplayerIDList", intnewArrayTeamplayerIDList);
        object.put("intnewAfterArrayTeamplayerIDList", intnewAfterArrayTeamplayerIDList);
        object.put("okJSONObjectTeamplayerIDList", okJSONObjectTeamplayerIDList);
        object.put("okList", okList);
        object.put("okshowCalavalueRateList", okshowCalavalueRateList);
        object.put("DictionaryListCustom", myDictionaryListCustom);
        object.put("doubleStandardcha", doubleStandardcha);
        return object;
    }


    @GetMapping(value = "/getTeamPlayer/{operationtype}/{playerid}")
    synchronized public TeamPlayer getTeamPlayer(@PathVariable("operationtype") String operationtype, @PathVariable("playerid") String playerid) {
        if (operationtype.equals("add")) {
            TeamPlayer tTeamPlayer = new TeamPlayer();
           /* List<TeamPlayerConfig> teamPlayerConfigList=new ArrayList<TeamPlayerConfig>();
            TeamPlayerConfig teamPlayerConfig=new TeamPlayerConfig();
            teamPlayerConfigList.add(teamPlayerConfig);
            tTeamPlayer.setTeamPlayerConfig(teamPlayerConfigList);*/
            return tTeamPlayer;
        } else if (operationtype.equals("modify")) {
            TeamPlayer tTeamPlayer = teamPlayerService.getByID(Long.valueOf(playerid));
            return tTeamPlayer;
        }
        return null;
    }

    public void shuffleintList(int[] arginput) {
        Random random = new Random();
        for (int i = 0; i < arginput.length; ++i) {
            int j = i + random.nextInt(arginput.length - i);
            int temp = arginput[i];
            arginput[i] = arginput[j];
            arginput[j] = temp;
        }

    }


    public double getRandom(double mindouble, double maxdouble) {

        int min = (int) (mindouble * 100);
        int max = (int) (maxdouble * 100);

        Random random = new Random();

// 先取0-max之间随机数，再对max - min + 1取余，最后加上min，就是最终随机数
        int s = random.nextInt(max) % (max - min + 1) + min;
        return (s * 1.0) / 100;
    }
}
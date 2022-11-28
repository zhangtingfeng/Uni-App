package org.eggsoft.cn.Controller;




import org.eggsoft.cn.common.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.eggsoft.cn.common.RedisServiceImpl;


public class BaseController {
    @Autowired
    protected RedisServiceImpl redisServiceImpl;

    @Autowired
    protected JsonUtil jsonUtilService;

/*

    // 操作Redis中的string类型的数据,先获取ValueOperation
    ValueOperations valueOperations = redisTemplate.opsForValue();

    // 添加数据到redis
        valueOperations.set(name, value);
        return "向redis添加string类型的数据";


    ValueOperations valueOperations = redisTemplate.opsForValue();
    Object v = valueOperations.get(key);
        return "key是" + key + ",它的值是:" + v;


    // 获取String类型的value
    String v = stringRedisTemplate.opsForValue().get(k);
        return "从redis中通过" + k + "获取到string类型的v=" + v;
*/
}